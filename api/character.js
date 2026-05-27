// Fully self-contained — no require() calls, all mappings inlined for Vercel bundler

const realmMapping = {
  "安苏": "安苏", "死亡之翼": "死亡之翼", "燃烧之刃": "燃烧之刃",
  "格瑞姆巴托": "格瑞姆巴托", "白银之手": "白银之手", "伊利丹": "伊利丹",
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
  // English slug exceptions — Raider.io requires these exact slugs
  "罗曼蒂克": "silver-hand",
  "耐萨里奥": "neltharion",
  "艾泽拉斯": "azshara",
  "凤凰之神": "alar",
  "风暴裂口": "stormrage",
  "莱斯霜语": "frostmourne",
  "青铜龙军团": "bronze-dragonflight",
  "塞纳里奥": "cenarius",
  "维克洛尔": "veknilash",
  "希尔盖": "naxxramas",
  "邪恶颅壳": "shadow-council",
  "岩石大厅": "ulduar",
  "夜歌": "moonglade",
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

module.exports = async (req, res) => {
  // Health check / ping endpoint
  if (req.method === "GET" && !req.query.name && !req.query.server) {
    return res.json({ status: "ok", timestamp: Date.now() });
  }

  const { name, server } = req.query;

  if (!name || !server) {
    return res.status(400).json({
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
        return res.status(404).json({
          error: "未找到该角色",
          detail: `服务器: ${server}，角色: ${name}。请检查名称和服务器是否正确。`,
          _debug: { slug: realmSlug, raiderStatus: response.status, raiderMsg: body.substring(0, 150) }
        });
      }
      if (response.status === 429) {
        return res.status(429).json({ error: "请求过于频繁，请稍后再试" });
      }
      return res.status(502).json({
        error: "查询服务暂时不可用，请稍后再试",
        _debug: { status: response.status, body: body.substring(0, 150) }
      });
    }

    const data = await response.json();

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

    const score = result.mythic_plus.total_score;
    if (score >= 3000) result.mythic_plus.score_color = "legendary";
    else if (score >= 2700) result.mythic_plus.score_color = "elite";
    else if (score >= 2400) result.mythic_plus.score_color = "purple";
    else if (score >= 2000) result.mythic_plus.score_color = "blue";
    else if (score >= 1500) result.mythic_plus.score_color = "green";
    else if (score > 0) result.mythic_plus.score_color = "white";
    else result.mythic_plus.score_color = "none";

    clearTimeout(timeout);
    return res.json(result);
  } catch (err) {
    clearTimeout(timeout);
    console.error("API error:", err.message);
    if (err.name === "AbortError") {
      return res.status(504).json({
        error: "查询超时，请稍后再试（Raider.io 可能暂时不可达）",
        _debug: { slug: realmSlug }
      });
    }
    return res.status(502).json({
      error: "查询服务暂时不可用，请稍后再试",
      _debug: { error: err.message }
    });
  }
};
