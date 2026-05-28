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

// Roster cache: keyed by runId, stores { loading: bool, data: [...] }
const rosterCache = {};

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
  const season = mythic_plus.season || "";

  if (runs.length === 0) {
    grid.innerHTML = `<div class="dungeons-empty">该角色当前赛季暂无大秘境通关记录</div>`;
  } else {
    // Sort by level desc, then score desc
    runs.sort((a, b) => b.level - a.level || b.score - a.score);

    grid.innerHTML = runs.map((run, idx) => {
      const timed = run.timed;
      const levelClass = "l" + Math.min(run.level, 18);
      const runId = run.keystone_run_id || "";
      return `
        <div class="dungeon-card ${timed ? "timed" : "untimed"}" data-run-id="${escapeHtml(runId)}" data-season="${escapeHtml(season)}" data-index="${idx}">
          <div class="dungeon-card-top" onclick="toggleRoster(this.parentElement)">
            <div class="dungeon-name" title="${escapeHtml(run.dungeon)}">${escapeHtml(run.display_name || run.short_name || run.dungeon)}</div>
            <div class="dungeon-level ${levelClass}">+${run.level}</div>
            <div class="dungeon-meta">
              <span class="dungeon-score">${run.score.toFixed(1)} 分</span>
              <span class="dungeon-badge ${timed ? "badge-timed" : "badge-untimed"}">${timed ? "限时" : "超时"}</span>
            </div>
            <div class="roster-toggle-hint">点击查看队伍配置 ▾</div>
          </div>
          <div class="roster-panel" style="display:none;"></div>
        </div>
      `;
    }).join("");
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

async function toggleRoster(card) {
  const panel = card.querySelector(".roster-panel");
  const runId = card.dataset.runId;
  const season = card.dataset.season;

  // If already expanded, collapse
  if (panel.style.display !== "none") {
    panel.style.display = "none";
    panel.innerHTML = "";
    card.classList.remove("expanded");
    // Clear any polling interval stored on the card
    if (card._rosterPoll) { clearInterval(card._rosterPoll); card._rosterPoll = null; }
    return;
  }

  // Expand
  card.classList.add("expanded");
  panel.style.display = "block";

  // Check cache
  if (rosterCache[runId]) {
    if (rosterCache[runId].loading) {
      panel.innerHTML = `<div class="roster-loading"><div class="roster-spinner"></div><span>正在获取队伍配置...</span></div>`;
      // Poll for completion
      card._rosterPoll = setInterval(() => {
        if (!rosterCache[runId] || !rosterCache[runId].loading) {
          clearInterval(card._rosterPoll);
          card._rosterPoll = null;
          if (panel.style.display !== "none") {
            panel.innerHTML = renderRoster(rosterCache[runId]);
          }
        }
      }, 200);
      return;
    }
    panel.innerHTML = renderRoster(rosterCache[runId]);
    return;
  }

  // Start fetching
  rosterCache[runId] = { loading: true };
  panel.innerHTML = `<div class="roster-loading"><div class="roster-spinner"></div><span>正在获取队伍配置...</span></div>`;

  try {
    const url = `/api/run-roster?season=${encodeURIComponent(season)}&runId=${encodeURIComponent(runId)}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error("API error");
    const result = await resp.json();
    rosterCache[runId] = result.roster || [];
    if (panel.style.display !== "none") {
      panel.innerHTML = renderRoster(rosterCache[runId]);
    }
  } catch (err) {
    rosterCache[runId] = [];
    if (panel.style.display !== "none") {
      panel.innerHTML = `<div class="roster-error">获取队伍配置失败，请重试</div>`;
    }
  }
}

function renderRoster(roster) {
  if (!roster || roster.length === 0) {
    return `<div class="roster-error">暂无队伍数据</div>`;
  }

  return roster.map(member => {
    const icon = ROLE_ICONS[member.role] || "⚔️";
    const roleLabel = ROLE_LABELS[member.role] || member.role;
    const scoreDisplay = member.score !== null && member.score !== undefined
      ? `<span class="roster-score">${member.score.toFixed(1)}</span>`
      : `<span class="roster-score roster-score--na">—</span>`;
    const safeName = escapeHtml(member.name);
    const safeRealm = escapeHtml(member.realmSlug || member.realm);
    const titleText = member.realmSlug
      ? `点击查询 ${member.name}-${member.realmSlug}`
      : `点击查询 ${member.name}`;

    return `
      <div class="roster-member">
        <div class="roster-member-left">
          <span class="roster-role-icon" title="${roleLabel}">${icon}</span>
          <div class="roster-member-info">
            <span class="roster-member-name roster-clickable"
                  title="${titleText}"
                  onclick="event.stopPropagation(); searchRosterMember('${safeName}','${safeRealm}')">${safeName}</span>
            <span class="roster-member-spec">${escapeHtml(member.spec)} ${escapeHtml(member.class)}</span>
          </div>
        </div>
        <div class="roster-member-right">
          <span class="roster-score-label">大秘分数</span>
          ${scoreDisplay}
        </div>
      </div>
    `;
  }).join("");
}

async function searchRosterMember(name, realm) {
  if (!name || !realm) return;

  // Update search input to reflect the new character
  searchInput.value = name + "-" + realm;

  // Collapse all expanded roster panels
  document.querySelectorAll(".roster-panel").forEach(p => {
    p.style.display = "none";
    p.innerHTML = "";
  });
  document.querySelectorAll(".dungeon-card.expanded").forEach(c => {
    c.classList.remove("expanded");
  });

  // Bypass the dash-parsing logic and query directly
  hideAll();
  statusSection.style.display = "block";
  loadingState.style.display = "flex";

  try {
    const url = `/api/character?name=${encodeURIComponent(name)}&server=${encodeURIComponent(realm)}`;
    const resp = await fetch(url);

    if (!resp.ok) {
      const body = await resp.json().catch(() => ({}));
      if (resp.status === 404) {
        showError("未找到该角色", body.detail || `服务器 "${realm}" 中未找到角色 "${name}"。`);
      } else if (resp.status === 429) {
        showError("请求过于频繁", "请稍等片刻后再试。");
      } else {
        showError("查询失败", body.error || "服务暂时不可用，请稍后再试。");
      }
      return;
    }

    const data = await resp.json();
    renderResults(data);
    window.scrollTo({ top: resultsSection.offsetTop - 40, behavior: "smooth" });
  } catch (err) {
    showError("网络错误", "无法连接到查询服务，请检查网络后重试。");
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
