# 🛡️ WoW Cellmate

魔兽世界史诗大秘境角色查询工具 — 输入角色名和服务器，即可查看当前赛季大秘境总分数、各职责分数、最佳通关记录及队伍配置。

**Live Demo**: [wowcellmate.icu](http://www.wowcellmate.icu)

## ✨ Features

- **角色速查** — 支持 `角色名-服务器名` 格式输入，覆盖国服 260+ 服务器
- **大秘境总览** — 当前赛季总分、坦克/治疗/输出各职责分数，分数按颜色分等
- **最佳通关记录** — 显示每个副本的最高层数、分数、限时/超时状态
- **队伍配置展开** — 点击任意副本卡片，展开该次通关的完整 5 人队伍
- **队友详情** — 查看每位队友的职责、天赋专精、大秘境总分数
- **一键跳转** — 点击队伍中任意队友姓名，立即查询该角色的完整数据
- **服务器映射** — 内置国服中文服名到 Raider.io 英文 slug 的完整映射

## 🚀 Quick Start

```bash
# 本地开发
node scf-handler.js
# 访问 http://localhost:3000
```

```bash
# 部署到腾讯云 SCF
serverless deploy
```

## 🏗️ Architecture

```
┌─────────────┐     ┌──────────────────┐     ┌──────────────┐
│   Browser   │────▶│  Tencent SCF     │────▶│  Raider.io   │
│  (Vanilla)  │◀────│  (Node.js 18)    │◀────│  API v1      │
└─────────────┘     └──────────────────┘     └──────────────┘
     ▲                     ▲
     │  wowcellmate.icu    │  ap-hongkong
     │  (DNSPod)           │  (256MB / 15s)
```

- **前端**: 原生 HTML + CSS + JavaScript，零框架，无构建步骤
- **后端**: `scf-handler.js` — 自包含事件处理函数，零 npm 依赖，仅使用 Node.js 内置模块
- **部署**: 腾讯云函数计算 SCF（香港区），通过 API 网关对外暴露 HTTP 服务
- **数据源**: [Raider.io API v1](https://raider.io/api) — 角色信息、大秘境分数、副本详情

## 📡 API Endpoints

| 端点 | 参数 | 说明 |
|------|------|------|
| `GET /api/character` | `name`, `server` | 查询角色大秘境数据 |
| `GET /api/run-roster` | `season`, `runId` | 获取某次通关的完整队伍配置及队员分数 |

### Example

```bash
curl "http://www.wowcellmate.icu/api/character?name=绿码的土拨鼠&server=末日行者"
```

Response:

```json
{
  "character": {
    "name": "绿码的土拨鼠",
    "realm": "末日行者",
    "class": "Death Knight",
    "spec": "Unholy",
    "role": "dps",
    "item_level": 645
  },
  "mythic_plus": {
    "season": "season-mn-1",
    "total_score": 3374,
    "scores_by_role": { "tank": 0, "healer": 0, "dps": 3374 },
    "best_runs": [
      {
        "dungeon": "Maisara Caverns",
        "short_name": "MC",
        "display_name": "MC-迈萨拉洞窟",
        "level": 16,
        "score": 288.2,
        "timed": true,
        "keystone_run_id": 29589179
      }
    ]
  }
}
```

## 📁 Project Structure

```
├── index.html          # 前端页面
├── script.js           # 前端交互逻辑
├── style.css           # 样式
├── scf-handler.js      # 云函数入口（生产环境）
├── fc-handler.js       # 函数计算入口（本地开发 / 阿里云 FC）
├── serverless.yml      # Serverless Framework 部署配置
├── realm-mapping.json  # 国服服务器名映射表
├── dungeon-mapping.json # 副本缩写映射表
└── deploy.zip          # 部署包
```

## 🔧 Tech Stack

| 层级 | 技术 |
|------|------|
| 前端 | HTML5 · CSS3 · Vanilla JS |
| 后端 | Node.js 18.15 · Serverless |
| 云服务 | 腾讯云 SCF · API Gateway · DNSPod |
| 数据 | Raider.io API v1 |

## 📄 License

MIT

---

*数据来源：Raider.io · 仅支持魔兽世界中国大陆正式服*
