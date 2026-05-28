const fs = require("fs");
const path = require("path");

// ============================================================
// 内嵌映射数据（与 api/character.js 保持一致）
// ============================================================

const realmMapping = {
  "安苏": "安苏", "死亡之翼": "死亡之翼", "燃烧之刃": "燃烧之刃",
  "格瑞姆巴托": "格瑞姆巴托", "白银之手": "silver-hand", "伊利丹": "伊利丹",
  "玛瑟里顿": "玛瑟里顿", "伊森利恩": "伊森利恩", "埃德萨拉": "埃德萨拉",
  "加基森": "加基森", "希尔瓦娜斯": "希尔瓦娜斯", "血吼": "血吼",
  "古尔丹": "古尔丹", "雷霆之王": "雷霆之王", "天空之墙": "天空之墙",
  "贫瘠之地": "贫瘠之地", "风暴之眼": "风暴之眼", "克尔苏加德": "克尔苏加德",
  "霜狼": "霜狼", "金色平原": "金色平原", "暗影裂口": "暗影裂口",
  "阿古斯": "阿古斯", "萨尔": "萨尔", "玛诺洛斯": "玛诺洛斯",
  "燃烧军团": "燃烧军团", "洛丹伦": "洛丹伦", "普罗德摩": "普罗德摩",
  "德拉诺": "德拉诺", "图拉扬": "图拉扬", "迦罗娜": "迦罗娜",
  "主宰之剑": "主宰之剑", "阿格拉玛": "阿格拉玛", "阿克蒙德": "阿克蒙德",
  "艾欧纳尔": "艾欧纳尔", "艾莫莉丝": "艾莫莉丝", "艾苏恩": "艾苏恩",
  "爱斯特纳": "爱斯特纳", "暗影议会": "暗影议会", "奥拉基尔": "奥拉基尔",
  "奥蕾莉亚": "奥蕾莉亚", "巴纳扎尔": "巴纳扎尔", "巴瑟拉斯": "巴瑟拉斯",
  "白骨荒野": "白骨荒野", "暴风祭坛": "暴风祭坛", "壁炉谷": "壁炉谷",
  "冰风岗": "冰风岗", "冰霜之刃": "冰霜之刃", "布莱克摩": "布莱克摩",
  "布莱恩": "布莱恩", "布兰卡德": "布兰卡德", "尘风峡谷": "尘风峡谷",
  "雏龙之翼": "雏龙之翼", "刺骨利刃": "刺骨利刃", "达基萨斯": "达基萨斯",
  "达尔坎": "达尔坎", "达隆米尔": "达隆米尔", "达纳斯": "达纳斯",
  "达斯雷玛": "达斯雷玛", "大地之怒": "大地之怒", "大漩涡": "大漩涡",
  "丹莫德": "丹莫德", "地狱咆哮": "地狱咆哮", "冬拥湖": "冬拥湖",
  "恶魔之魂": "恶魔之魂", "耳语海岸": "耳语海岸", "法拉希姆": "法拉希姆",
  "菲拉斯": "菲拉斯", "芬里斯": "芬里斯", "风暴之鳞": "风暴之鳞",
  "风行者": "风行者", "弗塞雷迦": "弗塞雷迦", "戈古纳斯": "戈古纳斯",
  "鬼雾峰": "鬼雾峰", "哈卡": "哈卡", "哈兰": "哈兰", "海加尔": "海加尔",
  "寒冰皇冠": "寒冰皇冠", "黑暗魅影": "黑暗魅影", "黑暗虚空": "黑暗虚空",
  "黑暗之矛": "黑暗之矛", "黑铁": "黑铁", "红龙军团": "红龙军团",
  "红云台地": "红云台地", "毁灭之锤": "毁灭之锤", "火喉": "火喉",
  "火烟之谷": "火烟之谷", "火焰之树": "火焰之树", "激流之傲": "激流之傲",
  "激流堡": "激流堡", "加里索斯": "加里索斯", "浸毒之骨": "浸毒之骨",
  "巨龙之吼": "巨龙之吼", "卡德加": "卡德加", "卡德罗斯": "卡德罗斯",
  "卡拉赞": "卡拉赞", "卡珊德拉": "卡珊德拉", "凯尔萨斯": "凯尔萨斯",
  "恐怖图腾": "恐怖图腾", "库德兰": "库德兰", "库尔提拉斯": "库尔提拉斯",
  "狂风峭壁": "狂风峭壁", "拉格纳罗斯": "拉格纳罗斯", "拉文霍德": "拉文霍德",
  "拉文凯斯": "拉文凯斯", "兰娜瑟尔": "兰娜瑟尔", "蓝龙军团": "蓝龙军团",
  "雷斧堡垒": "雷斧堡垒", "雷克萨": "雷克萨", "雷霆之怒": "雷霆之怒",
  "莉亚德琳": "莉亚德琳", "利刃之拳": "利刃之拳", "龙骨平原": "龙骨平原",
  "洛肯": "洛肯", "洛萨": "洛萨", "玛法里奥": "玛法里奥",
  "玛格曼达": "玛格曼达", "玛格索尔": "玛格索尔", "麦迪文": "麦迪文",
  "麦姆": "麦姆", "梅尔加尼": "梅尔加尼", "梦境之树": "梦境之树",
  "密林游侠": "密林游侠", "摩摩尔": "摩摩尔", "末日行者": "末日行者",
  "暮色森林": "暮色森林", "穆戈尔": "穆戈尔", "纳克萨玛斯": "纳克萨玛斯",
  "奈法利安": "奈法利安", "能源舰": "能源舰", "诺兹多姆": "诺兹多姆",
  "普瑞斯托": "普瑞斯托", "千针石林": "千针石林", "轻风之语": "轻风之语",
  "燃烧平原": "燃烧平原", "熔火之心": "熔火之心", "瑞文戴尔": "瑞文戴尔",
  "萨格拉斯": "萨格拉斯", "萨菲隆": "萨菲隆", "塞拉摩": "塞拉摩",
  "塞泰克": "塞泰克", "桑德兰": "桑德兰", "山丘之王": "山丘之王",
  "闪电之刃": "闪电之刃", "深渊之巢": "深渊之巢", "深渊之喉": "深渊之喉",
  "石锤": "石锤", "石爪峰": "石爪峰", "世界之树": "世界之树",
  "试炼之环": "试炼之环", "守护之剑": "守护之剑", "霜之哀伤": "霜之哀伤",
  "水晶之刺": "水晶之刺", "死亡熔炉": "死亡熔炉", "苏塔恩": "苏塔恩",
  "索拉丁": "索拉丁", "索瑞森": "索瑞森", "塔伦米尔": "塔伦米尔",
  "踏梦者": "踏梦者", "泰兰德": "泰兰德", "太阳之井": "太阳之井",
  "提尔之手": "提尔之手", "提瑞斯法": "提瑞斯法", "铜龙军团": "铜龙军团",
  "瓦拉斯塔兹": "瓦拉斯塔兹", "瓦里玛萨斯": "瓦里玛萨斯", "瓦丝琪": "瓦丝琪",
  "外域": "外域", "万色星辰": "万色星辰", "亡语者": "亡语者",
  "巫妖之王": "巫妖之王", "无尽之海": "无尽之海", "午夜之镰": "午夜之镰",
  "希雷诺斯": "希雷诺斯", "夏维安": "夏维安", "鲜血熔炉": "鲜血熔炉",
  "血牙魔王": "血牙魔王", "亚雷戈斯": "亚雷戈斯", "伊莫塔尔": "伊莫塔尔",
  "伊萨里奥斯": "伊萨里奥斯", "遗忘海岸": "遗忘海岸", "银松森林": "银松森林",
  "鹰巢山": "鹰巢山", "影牙要塞": "影牙要塞", "永恒之井": "永恒之井",
  "永夜港": "永夜港", "勇士岛": "勇士岛", "幽暗沼泽": "幽暗沼泽",
  "羽月": "羽月", "元素之力": "元素之力", "月光林地": "月光林地",
  "月神殿": "月神殿", "扎拉赞恩": "扎拉赞恩", "战歌": "战歌",
  "蒸汽地窟": "蒸汽地窟", "织雾者": "织雾者", "蜘蛛王国": "蜘蛛王国",
  "逐日者": "逐日者", "自由之风": "自由之风", "祖阿曼": "祖阿曼",
  "祖尔金": "祖尔金", "诺森德": "诺森德", "奥杜尔": "奥杜尔",
  "永恒之眼": "永恒之井", "红玉圣殿": "红玉圣殿",
  "罗曼斯": "rommath", "耐萨里奥": "neltharion",
  "艾泽拉斯": "azshara", "凤凰之神": "alar", "风暴裂口": "stormrage",
  "莱斯霜语": "frostmourne", "青铜龙军团": "bronze-dragonflight",
  "塞纳里奥": "cenarius", "维克洛尔": "veknilash", "希尔盖": "naxxramas",
  "邪恶颅壳": "shadow-council", "岩石大厅": "ulduar", "夜歌": "moonglade",
  "达拉然": "northrend"
};

const dungeonMapping = {
  "MC": "MC-迈萨拉洞窟", "AA": "AA-艾杰斯亚学院", "MT": "MT-魔导师平台",
  "SEAT": "SEAT-执政团之座", "NPX": "NPX-节点希纳斯", "POS": "POS-萨隆矿坑",
  "WS": "WS-风行者之塔", "SR": "SR-通天峰", "ARAK": "AA-艾杰斯亚学院",
  "COT": "SZ-丝网之城", "SV": "SA-石牢", "DB": "PX-破晓者",
  "GB": "GB-格瑞姆巴托", "MISTS": "MW-迷雾之地", "SOB": "BB-伯拉勒斯之战",
  "NW": "HS-坏死之语", "RIFT": "AL-阿莱克丝塔萨的裂谷", "DARKFLAME": "FL-黑焰裂口",
  "EB": "YK-燃酿酒坊", "ML": "SS-圣索迪尔的陨落", "PSF": "FG-风歌高地",
  "WORKSHOP": "MC-麦卡贡车间", "KR": "ZQ-佐拉姆角", "DAWN": "HY-回音海岸",
  "UPPER": "HS-上层精灵", "LOWER": "XX-下层精灵", "ROOK": "AL-艾露恩之泪",
  "CW": "SF-塞兹仙林的迷雾", "PF": "BF-彼界", "SD": "SA-暗影大教堂",
  "TOTT": "FY-风云之巅", "HOA": "FL-风暴神殿", "WM": "CX-潮汐王座",
  "AD": "JD-巨龙地窟", "FH": "FH-自由镇", "TD": "TD-执政团之座",
  "BRH": "BR-黑鸦堡垒", "DHT": "DH-魔窟", "EOA": "AE-艾萨拉之眼",
  "COS": "QX-群星庭院", "MOTS": "MW-迷雾之地", "SIEGE": "BB-伯拉勒斯之战",
  "JY": "ZY-自由镇", "TOS": "TD-执政团之座", "LOWR": "XX-下层精灵",
  "UPPR": "HS-上层精灵"
};

// ============================================================
// 静态文件预加载（模块初始化时一次性读入内存）
// ============================================================

const STATIC = {};

function preload(filename, contentType) {
  try {
    const filePath = path.join(__dirname, filename);
    STATIC["/" + filename] = {
      body: fs.readFileSync(filePath, "utf-8"),
      contentType
    };
  } catch (e) {
    console.warn("静态文件预加载失败:", filename, e.message);
  }
}

preload("index.html", "text/html; charset=utf-8");
preload("style.css",  "text/css; charset=utf-8");
preload("script.js",  "application/javascript; charset=utf-8");

// "/" 也返回首页
if (STATIC["/index.html"]) {
  STATIC["/"] = { ...STATIC["/index.html"] };
}

// ============================================================
// API 处理
// ============================================================

async function handleApi(queryParams) {
  const { name, server } = queryParams;

  // 健康检查（无参数 GET）
  if (!name && !server) {
    return json(200, { status: "ok", timestamp: Date.now() });
  }

  if (!name || !server) {
    return json(400, {
      error: "请提供角色名称和服务器名称",
      example: "GET /api/character?name=角色名&server=服务器名"
    });
  }

  const realmSlug = realmMapping[server] || server;
  const url = `https://raider.io/api/v1/characters/profile?region=cn&realm=${encodeURIComponent(realmSlug)}&name=${encodeURIComponent(name)}&fields=mythic_plus_scores_by_season:current,mythic_plus_best_runs`;

  console.log("Realm:", server, "→ slug:", realmSlug, "| URL:", url);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      headers: { "Accept": "application/json" },
      signal: controller.signal
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("Raider.io error:", response.status, body.substring(0, 300));
      if (response.status === 400 || response.status === 404) {
        return json(404, {
          error: "未找到该角色",
          detail: `服务器: ${server}，角色: ${name}。请检查名称和服务器是否正确。`,
          _debug: { slug: realmSlug, raiderStatus: response.status, raiderMsg: body.substring(0, 150) }
        });
      }
      if (response.status === 429) {
        return json(429, { error: "请求过于频繁，请稍后再试" });
      }
      return json(502, {
        error: "查询服务暂时不可用，请稍后再试",
        _debug: { status: response.status, body: body.substring(0, 150) }
      });
    }

    const data = await response.json();

    const currentSeason = data.mythic_plus_scores_by_season?.[0];
    const seasonSlug = currentSeason?.season || "";

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
        season: seasonSlug,
        total_score: currentSeason?.scores?.all || 0,
        scores_by_role: currentSeason?.scores || {},
        best_runs: (data.mythic_plus_best_runs || []).map(run => ({
          dungeon: run.dungeon,
          short_name: run.short_name,
          display_name: dungeonMapping[run.short_name] || `${run.short_name}-${run.dungeon}`,
          level: run.mythic_level,
          score: run.score,
          timed: run.num_keystone_upgrades > 0,
          clear_time_ms: run.clear_time_ms,
          completed_at: run.completed_at,
          keystone_run_id: run.keystone_run_id,
          affixes: (run.affixes || []).map(a => a.name || a.slug || a)
        }))
      }
    };

    const score = result.mythic_plus.total_score;
    if (score >= 3000) result.mythic_plus.score_color = "legendary";
    else if (score >= 2700) result.mythic_plus.score_color = "elite";
    else if (score >= 2400) result.mythic_plus.score_color = "purple";
    else if (score >= 2000) result.mythic_plus.score_color = "blue";
    else if (score >= 1500) result.mythic_plus.score_color = "green";
    else if (score > 0) result.mythic_plus.score_color = "white";
    else result.mythic_plus.score_color = "none";

    clearTimeout(timeout);
    return json(200, result);
  } catch (err) {
    clearTimeout(timeout);
    console.error("API error:", err.message);
    if (err.name === "AbortError") {
      return json(504, {
        error: "查询超时，请稍后再试（Raider.io 可能暂时不可达）",
        _debug: { slug: realmSlug }
      });
    }
    return json(502, {
      error: "查询服务暂时不可用，请稍后再试",
      _debug: { error: err.message }
    });
  }
}

async function handleRunRoster(queryParams) {
  const { season, runId } = queryParams;

  if (!season || !runId) {
    return json(400, { error: "请提供 season 和 runId 参数" });
  }

  const runUrl = `https://raider.io/api/v1/mythic-plus/run-details?season=${encodeURIComponent(season)}&id=${encodeURIComponent(runId)}`;

  console.log("Run roster URL:", runUrl);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const runResp = await fetch(runUrl, {
      headers: { "Accept": "application/json" },
      signal: controller.signal
    });

    if (!runResp.ok) {
      clearTimeout(timeout);
      return json(502, { error: "获取副本详情失败", _debug: { status: runResp.status } });
    }

    const runData = await runResp.json();
    const roster = runData.roster || [];

    // Extract basic info from roster
    const members = roster.map(member => {
      const char = member.character;
      const realmDisplay = char.realm?.altName || char.realm?.name || "";
      const realmSlug = char.realm?.slug || "";
      return {
        name: char.name,
        realm: realmDisplay,
        realmSlug: realmSlug,
        class: char.class?.name || char.class || "",
        spec: char.spec?.name || char.active_spec_name || "",
        role: char.spec?.role || char.role || "",
        thumbnail: char.thumbnail_url || "",
        profile_url: char.path ? `https://raider.io${char.path}` : ""
      };
    });

    // Fetch M+ scores for all 5 members in parallel (max 5 concurrent)
    const scoreResults = await Promise.allSettled(
      members.map(member => {
        const realmSlug = member.realmSlug || realmMapping[member.realm] || member.realm;
        const charUrl = `https://raider.io/api/v1/characters/profile?region=cn&realm=${encodeURIComponent(realmSlug)}&name=${encodeURIComponent(member.name)}&fields=mythic_plus_scores_by_season:current`;

        const ctl = new AbortController();
        const t = setTimeout(() => ctl.abort(), 5000);

        return fetch(charUrl, {
          headers: { "Accept": "application/json" },
          signal: ctl.signal
        })
          .then(r => r.ok ? r.json() : null)
          .catch(() => null)
          .finally(() => clearTimeout(t));
      })
    );

    // Enrich members with scores
    const enrichedMembers = members.map((member, i) => {
      const result = scoreResults[i];
      let score = null;
      let classFromApi = null;
      if (result.status === "fulfilled" && result.value) {
        score = result.value.mythic_plus_scores_by_season?.[0]?.scores?.all ?? null;
        classFromApi = result.value.class || null;
      }
      return {
        ...member,
        class: member.class || classFromApi || "",
        score: score !== null ? score : null
      };
    });

    clearTimeout(timeout);
    return json(200, {
      dungeon: {
        name: runData.dungeon?.name || "",
        short_name: runData.dungeon?.short_name || "",
        level: runData.mythic_level
      },
      roster: enrichedMembers
    });
  } catch (err) {
    clearTimeout(timeout);
    console.error("Run roster error:", err.message);
    return json(502, { error: "获取队伍信息失败", _debug: { error: err.message } });
  }
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
    isBase64Encoded: false
  };
}

// ============================================================
// FC 主入口 — HTTP 触发器
// FC 3.0 HTTP 函数使用 (req, res, context) 签名
// 同时兼容事件函数格式 (event, context) → 返回 response 对象
// ============================================================

exports.handler = async (a, b, c) => {
  let method, pathname, queryParams, res;

  // 判断是否为 HTTP 函数格式: (req, res, context)
  // res 有 setHeader/end 或 send/status 方法，而 FC context 没有
  const isHttpFn = b && (typeof b.setHeader === "function" || typeof b.send === "function");

  if (isHttpFn) {
    // HTTP 函数格式: req 是原始 HTTP 请求
    const req = a;
    res = b;
    method = (req.method || "GET").toUpperCase();
    const parsed = new URL(req.url || "/", "http://localhost");
    pathname = parsed.pathname;
    queryParams = Object.fromEntries(parsed.searchParams);
  } else {
    // 事件格式: 可能是 Buffer（s invoke）或已解析对象（真实 HTTP 触发器）
    let event = a;

    // s invoke 传入的是 Buffer，需要解码
    if (Buffer.isBuffer(event)) {
      try { event = JSON.parse(event.toString()); } catch (_) {}
    } else if (typeof event === "string") {
      try { event = JSON.parse(event); } catch (_) {}
    }

    // 兼容多种字段名（不同 FC 版本 / 触发器类型）
    method = (event.httpMethod || event.method || "GET").toUpperCase();
    pathname = event.rawPath || event.path || "/";
    queryParams = event.queryStringParameters || event.queryParameters || {};
    // 如果 queryStringParameters 不存在但 rawQueryString 存在，手动解析
    if (!queryParams || Object.keys(queryParams).length === 0) {
      const qs = event.rawQueryString || "";
      if (qs) {
        queryParams = Object.fromEntries(new URLSearchParams(qs));
      }
    }
    if (event.body && typeof event.body === "string" && event.body.startsWith("{")) {
      try {
        const bodyParams = JSON.parse(event.body);
        if (bodyParams && typeof bodyParams === "object" && !Array.isArray(bodyParams)) {
          queryParams = { ...queryParams, ...bodyParams };
        }
      } catch (_) {}
    }
  }

  console.log("route:", method, pathname, JSON.stringify(queryParams));

  if (isHttpFn) {
    // HTTP 函数格式: req 是原始 HTTP 请求，直接解析 url
    const req = a;
    res = b;
    method = (req.method || "GET").toUpperCase();
    const parsed = new URL(req.url || "/", "http://localhost");
    pathname = parsed.pathname;
    queryParams = Object.fromEntries(parsed.searchParams);
  } else {
    // 事件函数格式: event 对象 — 兼容多种可能字段名
    method = (a.httpMethod || a.method || (a.requestContext && a.requestContext.http && a.requestContext.http.method) || "GET").toUpperCase();
    // 路径可能来自多个字段
    pathname = a.rawPath || a.path || "/";
    queryParams = a.queryStringParameters || a.queryParameters || {};
  }

  console.log("route:", method, pathname, JSON.stringify(queryParams));

  // API 路由
  if (pathname === "/api/run-roster") {
    const result = await handleRunRoster(queryParams);
    if (isHttpFn) {
      res.setHeader("Content-Type", result.headers["Content-Type"]);
      res.statusCode = result.statusCode;
      return res.end(result.body);
    }
    return result;
  }

  if (pathname === "/api/character" || pathname.startsWith("/api/")) {
    const result = await handleApi(queryParams);
    if (isHttpFn) {
      res.setHeader("Content-Type", result.headers["Content-Type"]);
      res.statusCode = result.statusCode;
      return res.end(result.body);
    }
    return result;
  }

  // 静态文件
  const file = STATIC[pathname];
  if (file) {
    if (isHttpFn) {
      res.setHeader("Content-Type", file.contentType);
      res.setHeader("Cache-Control", "no-store");
      res.statusCode = 200;
      return res.end(file.body);
    }
    return { statusCode: 200, headers: { "Content-Type": file.contentType, "Cache-Control": "no-store" }, body: file.body, isBase64Encoded: false };
  }

  // 兜底首页
  if (STATIC["/"]) {
    if (isHttpFn) {
      res.setHeader("Content-Type", STATIC["/"].contentType);
      res.setHeader("Cache-Control", "no-store");
      res.statusCode = 200;
      return res.end(STATIC["/"].body);
    }
    return { statusCode: 200, headers: { "Content-Type": STATIC["/"].contentType, "Cache-Control": "no-store" }, body: STATIC["/"].body, isBase64Encoded: false };
  }

  if (isHttpFn) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.statusCode = 404;
    return res.end("Not Found");
  }
  return { statusCode: 404, headers: { "Content-Type": "text/plain; charset=utf-8" }, body: "Not Found", isBase64Encoded: false };
};

// 事件函数格式 → 返回 { statusCode, headers, body }
async function routeResponse(method, rawPath, queryParams) {
  if (rawPath === "/api/character" || rawPath.startsWith("/api/")) {
    return handleApi(queryParams);
  }

  const file = STATIC[rawPath];
  if (file) {
    return {
      statusCode: 200,
      headers: { "Content-Type": file.contentType, "Cache-Control": "no-store" },
      body: file.body,
      isBase64Encoded: false
    };
  }

  if (STATIC["/"]) {
    return {
      statusCode: 200,
      headers: { "Content-Type": STATIC["/"].contentType, "Cache-Control": "no-store" },
      body: STATIC["/"].body,
      isBase64Encoded: false
    };
  }

  return { statusCode: 404, headers: { "Content-Type": "text/plain; charset=utf-8" }, body: "Not Found", isBase64Encoded: false };
}

// HTTP 函数格式 → 直接写入 res
async function routeHttp(req, res, method, rawPath, queryParams) {
  if (rawPath === "/api/character" || rawPath.startsWith("/api/")) {
    const result = await handleApi(queryParams);
    res.setHeader("Content-Type", result.headers["Content-Type"] || "application/json");
    res.statusCode = result.statusCode;
    res.end(result.body);
    return;
  }

  const file = STATIC[rawPath];
  if (file) {
    res.setHeader("Content-Type", file.contentType);
    res.setHeader("Cache-Control", "no-store");
    res.statusCode = 200;
    res.end(file.body);
    return;
  }

  if (STATIC["/"]) {
    res.setHeader("Content-Type", STATIC["/"].contentType);
    res.statusCode = 200;
    res.end(STATIC["/"].body);
    return;
  }

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.statusCode = 404;
  res.end("Not Found");
}

// ============================================================
// 本地开发服务器（直接运行 `node fc-handler.js`）
// ============================================================

if (require.main === module) {
  const http = require("http");
  const PORT = process.env.PORT || 3000;

  http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    const event = {
      httpMethod: req.method,
      path: url.pathname,
      queryStringParameters: Object.fromEntries(url.searchParams)
    };
    const result = await exports.handler(event, {});
    const headers = result.headers || {};
    res.writeHead(result.statusCode, headers);
    res.end(result.body || "");
  }).listen(PORT, () => {
    console.log(`本地测试服务已启动: http://localhost:${PORT}`);
    console.log("按 Ctrl+C 停止");
  });
}
