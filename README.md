# TS3 Web

TeamSpeak 3 服务器 Web 管理界面。

## 功能

- 服务器状态监控（在线人数、运行时间、版本等）
- 网络流量统计（上传/下载流量、数据包）
- 频道树形列表（支持展开/折叠）
- 在线用户列表（所在频道、延迟、客户端平台）
- 一键连接（复制地址 / 启动客户端）
- 客户端下载链接
- 备用语音方案（YY / KOOK）
- 自动主题切换（根据北京日出日落）
- 深色/浅色/自动三种主题模式
- 服务器端数据缓存（10秒刷新）
- 用户使用指南弹窗

## 部署

### 前置要求

- Node.js 16+（https://nodejs.org）
- TeamSpeak 3 服务器已开启 Server Query

### 安装

```bash
git clone https://gitee.com/dalovemoli/ts3-web.git
cd ts3-web
npm install
```

### 配置

```bash
cp .env.example .env
```

编辑 `.env`：

```env
# 网站名称
SITE_NAME=TS3 Web

# 模拟模式（预览界面时设为 true）
MOCK=false

# TeamSpeak 3 Server Query
TS3_HOST=你的服务器IP
TS3_QUERY_PORT=10011
TS3_QUERY_USER=serveradmin
TS3_QUERY_PASS=你的密码

# 语音端口
TS3_SERVER_PORT=9987

# Web 端口
WEB_PORT=3000

# 客户端下载地址
DOWNLOAD_WINDOWS=https://www.teamspeak.com/downloads
DOWNLOAD_MACOS=https://www.teamspeak.com/downloads
DOWNLOAD_LINUX=https://www.teamspeak.com/downloads

# YY频道号（备用方案，留空则不显示）
YY_CHANNEL_ID=

# KOOK频道链接（备用方案，留空则不显示）
KOOK_URL=
```

### 运行

```bash
npm start
```

访问 `http://localhost:3000`

### 生产部署

```bash
# 安装 pm2
npm install -g pm2

# 启动服务
pm2 start server.js --name ts3-web

# 保存并设置开机自启
pm2 save
pm2 startup
```

### 模拟模式

如需预览界面效果，将 `.env` 中 `MOCK` 设为 `true`：

```env
MOCK=true
```

## Server Query 配置

### 开启 Server Query

确保 TS3 服务器的 `ts3server.ini` 中包含：

```ini
query_port=10011
query_ip=0.0.0.0
```

### IP 白名单

如果连接失败，检查服务器上的 `query_ip_allowlist.txt`，添加你的 IP：

```bash
echo "你的IP" >> /path/to/teamspeak3-server/query_ip_allowlist.txt
```

## 项目结构

```
ts3-web/
├── server.js           # 后端 API
├── public/
│   └── index.html      # 前端界面
├── package.json
├── .env.example        # 配置模板
├── .gitignore
└── README.md
```

## API

| 端点 | 说明 |
|------|------|
| `GET /api/config` | 站点配置、下载地址、备用方案 |
| `GET /api/status` | 服务器状态 |
| `GET /api/channels` | 频道列表（树形） |
| `GET /api/clients` | 在线用户列表 |

## 开源仓库

https://gitee.com/dalovemoli/ts3-web
