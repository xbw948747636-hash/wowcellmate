const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const statusSection = document.getElementById("statusSection");
const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const errorMessage = document.getElementById("errorMessage");
const resultsSection = document.getElementById("resultsSection");

// Role icons for display
const ROLE_ICONS = { tank: "🛡️", healer: "💚", dps: "⚔️" };
const ROLE_LABELS = { tank: "坦克", healer: "治疗", dps: "输出" };

// Search handler
async function doSearch() {
  const raw = searchInput.value.trim();
  if (!raw) return;

  // Parse "角色名-服务器名"
  const dashIndex = raw.lastIndexOf("-");
  if (dashIndex < 1 || dashIndex === raw.length - 1) {
    showError("格式错误", "请输入正确的格式：角色名称-服务器名称（如：张三-死亡之翼），中间用短横线（-）连接。");
    return;
  }

  const name = raw.substring(0, dashIndex).trim();
  const server = raw.substring(dashIndex + 1).trim();

  if (!name || !server) {
    showError("格式错误", "角色名称和服务器名称不能为空。");
    return;
  }

  // Show loading
  hideAll();
  statusSection.style.display = "block";
  loadingState.style.display = "flex";
  loadingState.classList.add("loading-state");

  try {
    const url = `/api/character?name=${encodeURIComponent(name)}&server=${encodeURIComponent(server)}`;
    const resp = await fetch(url);

    if (!resp.ok) {
      const body = await resp.json().catch(() => ({}));
      if (resp.status === 404) {
        showError("未找到该角色", body.detail || `服务器 "${server}" 中未找到角色 "${name}"，请检查名称和服务器是否正确。`);
      } else if (resp.status === 429) {
        showError("请求过于频繁", "请稍等片刻后再试。");
      } else {
        showError("查询失败", body.error || "服务暂时不可用，请稍后再试。");
      }
      return;
    }

    const data = await resp.json();
    renderResults(data);
  } catch (err) {
    showError("网络错误", "无法连接到查询服务，请检查网络后重试。");
  }
}

function hideAll() {
  statusSection.style.display = "none";
  loadingState.style.display = "none";
  errorState.style.display = "none";
  resultsSection.style.display = "none";
}

function showError(title, detail) {
  hideAll();
  statusSection.style.display = "block";
  errorState.style.display = "block";
  errorMessage.textContent = detail;
}

function renderResults(data) {
  hideAll();
  resultsSection.style.display = "flex";
  window.scrollTo({ top: resultsSection.offsetTop - 40, behavior: "smooth" });

  const { character, mythic_plus } = data;

  // Character info
  document.getElementById("charName").textContent = `${character.name} - ${character.realm}`;
  document.getElementById("charDetail").textContent = [
    character.spec && `${character.spec}`,
    character.class,
    character.faction
  ].filter(Boolean).join(" · ");

  document.getElementById("charIlvl").textContent = character.item_level || "—";
  document.getElementById("charSpec").textContent = character.spec || "—";

  const profileLink = document.getElementById("charProfileLink");
  if (character.profile_url) {
    profileLink.href = character.profile_url;
    profileLink.style.display = "";
  } else {
    profileLink.style.display = "none";
  }

  const thumb = document.getElementById("charThumbnail");
  if (character.thumbnail) {
    thumb.src = character.thumbnail;
    thumb.style.display = "";
  } else {
    thumb.style.display = "none";
  }

  // Score
  const scoreEl = document.getElementById("totalScore");
  scoreEl.textContent = mythic_plus.total_score.toFixed(1);
  scoreEl.className = "score-value " + (mythic_plus.score_color || "none");

  // Role scores
  const rolesDiv = document.getElementById("scoreRoles");
  const scores = mythic_plus.scores_by_role || {};
  const roleEntries = [
    { key: "tank", label: "坦克", icon: "🛡️" },
    { key: "healer", label: "治疗", icon: "💚" },
    { key: "dps", label: "输出", icon: "⚔️" }
  ];
  rolesDiv.innerHTML = roleEntries
    .filter(r => scores[r.key] > 0)
    .map(r =>
      `<div class="role-score">
        <span class="role-icon">${r.icon}</span>
        <span class="role-name">${r.label}</span>
        <span class="role-value">${scores[r.key].toFixed(1)}</span>
      </div>`
    ).join("");

  // Dungeon cards
  const grid = document.getElementById("dungeonsGrid");
  const runs = mythic_plus.best_runs || [];

  if (runs.length === 0) {
    grid.innerHTML = `<div class="dungeons-empty">该角色当前赛季暂无大秘境通关记录</div>`;
  } else {
    // Sort by level desc, then score desc
    runs.sort((a, b) => b.level - a.level || b.score - a.score);

    grid.innerHTML = runs.map(run => {
      const timed = run.timed;
      const levelClass = "l" + Math.min(run.level, 18);

      return `
        <div class="dungeon-card ${timed ? "timed" : "untimed"}">
          <div class="dungeon-name" title="${run.dungeon}">${run.display_name || run.short_name || run.dungeon}</div>
          <div class="dungeon-level ${levelClass}">+${run.level}</div>
          <div class="dungeon-meta">
            <span class="dungeon-score">${run.score.toFixed(1)} 分</span>
            <span class="dungeon-badge ${timed ? "badge-timed" : "badge-untimed"}">${timed ? "限时" : "超时"}</span>
          </div>
        </div>
      `;
    }).join("");
  }
}

// Event listeners
searchBtn.addEventListener("click", doSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") doSearch();
});

// Quick search preset cards
document.querySelectorAll(".preset-card").forEach(card => {
  card.addEventListener("click", () => {
    const query = card.dataset.query;
    searchInput.value = query;
    document.querySelectorAll(".preset-card").forEach(c => c.classList.remove("active-preset"));
    card.classList.add("active-preset");
    doSearch();
  });
});

// Focus input on load
searchInput.focus();
