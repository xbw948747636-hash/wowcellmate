const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Load realm name mapping
let realmMapping = {};
try {
  realmMapping = require("./realm-mapping.json");
} catch (e) {
  console.warn("realm-mapping.json not found, server name translation disabled");
}

// Load dungeon abbreviation mapping
let dungeonMapping = {};
try {
  dungeonMapping = require("./dungeon-mapping.json");
} catch (e) {
  console.warn("dungeon-mapping.json not found, dungeon abbreviation disabled");
}

// Serve static files
app.use(express.static(path.join(__dirname)));

// GET /api/character?name=X&server=Y
app.get("/api/character", async (req, res) => {
  const { name, server } = req.query;

  if (!name || !server) {
    return res.status(400).json({
      error: "请提供角色名称和服务器名称",
      example: "GET /api/character?name=角色名&server=服务器名"
    });
  }

  // Resolve realm slug (try mapping, fallback to lowercase)
  const realmSlug = realmMapping[server] || server.toLowerCase().replace(/\s+/g, "-");

  try {
    // Query Raider.io API for CN region
    const fields = [
      "mythic_plus_scores_by_season:current",
      "mythic_plus_best_runs"
    ].join(",");

    const url = `https://raider.io/api/v1/characters/profile?region=cn&realm=${encodeURIComponent(realmSlug)}&name=${encodeURIComponent(name)}&fields=${encodeURIComponent(fields)}`;

    const response = await fetch(url, {
      headers: { "Accept": "application/json" }
    });

    if (!response.ok) {
      if (response.status === 400 || response.status === 404) {
        return res.status(404).json({
          error: "未找到该角色",
          detail: `服务器: ${server}，角色: ${name}。请检查名称和服务器是否正确。`
        });
      }
      if (response.status === 429) {
        return res.status(429).json({
          error: "请求过于频繁，请稍后再试"
        });
      }
      return res.status(502).json({
        error: "查询服务暂时不可用，请稍后再试"
      });
    }

    const data = await response.json();

    // Extract and format the relevant data
    const result = {
      character: {
        name: data.name,
        realm: server,
        class: data.class,
        role: data.role,
        spec: data.active_spec_name,
        faction: data.faction,
        thumbnail: data.thumbnail_url,
        profile_url: data.profile_url,
        item_level: data.gear?.item_level_equipped || null
      },
      mythic_plus: {
        total_score: data.mythic_plus_scores_by_season?.[0]?.scores?.all || 0,
        scores_by_role: data.mythic_plus_scores_by_season?.[0]?.scores || {},
        best_runs: (data.mythic_plus_best_runs || []).map(run => ({
          dungeon: run.dungeon,
          short_name: run.short_name,
          display_name: dungeonMapping[run.short_name] || `${run.short_name}-${run.dungeon}`,
          level: run.mythic_level,
          score: run.score,
          timed: run.num_keystone_upgrades > 0,
          clear_time_ms: run.clear_time_ms,
          completed_at: run.completed_at
        }))
      }
    };

    // Add color indicator for score bracket
    const score = result.mythic_plus.total_score;
    if (score >= 3000) result.mythic_plus.score_color = "legendary";
    else if (score >= 2700) result.mythic_plus.score_color = "elite";
    else if (score >= 2400) result.mythic_plus.score_color = "purple";
    else if (score >= 2000) result.mythic_plus.score_color = "blue";
    else if (score >= 1500) result.mythic_plus.score_color = "green";
    else if (score > 0) result.mythic_plus.score_color = "white";
    else result.mythic_plus.score_color = "none";

    res.json(result);
  } catch (err) {
    console.error("API error:", err.message);
    res.status(502).json({
      error: "查询服务暂时不可用，请稍后再试"
    });
  }
});

app.listen(PORT, () => {
  console.log(`WoW M+ 查询服务已启动: http://localhost:${PORT}`);
});
