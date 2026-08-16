# Clash-Config

个人 Mihomo / Clash Verge Rev 配置。

## 主配置

- `mihomo/ACL4SSR_ZHT.yaml`：基于 ACL4SSR Online Full 思路重新整理的个人版。

## 主要功能

- 香港 / 台湾 / 新加坡 / 日本 / 美国 / 韩国地区自动测速
- 全局自动选择与手动切换
- OpenAI / Telegram / YouTube / Netflix 独立策略组
- Microsoft / Apple / 游戏 / 网易云音乐分流
- 国内媒体与国外媒体分流
- ACL4SSR 广告规则
- Rabbit-Spec `China.list` 国内直连规则
- 国内 DNS 使用腾讯 DoH + 阿里 DoH
- Fake-IP DNS
- Cloudflare `generate_204` 作为节点延迟测试地址

## Clash Verge Rev 使用

将下面的 Raw 地址作为配置文件使用：

`https://raw.githubusercontent.com/zhaohantao1360-hash/Clash-Config/main/mihomo/ACL4SSR_ZHT.yaml`

## 测试建议

### 1. 配置加载

在 Clash Verge Rev 导入后，确认配置没有 YAML 解析错误，并检查策略组是否正常出现。

### 2. 节点测速

- `♻️ 自动选择`：全节点测速
- 地区组：按照节点名称匹配地区后自动测速
- 测速 URL：`https://cp.cloudflare.com/generate_204`
- 间隔：300 秒
- 超时：5000 ms
- 容差：80 ms

### 3. 分流测试

建议依次访问：

- OpenAI / ChatGPT → `💬 OpenAi`
- Telegram → `📲 电报消息`
- YouTube → `📹 油管视频`
- Netflix → `🎥 奈飞视频`
- 国内常用网站 → `🎯 全球直连`

### 4. Netflix 解锁测试

节点测速成功不代表 Netflix 解锁成功。`🎥 奈飞节点` 会优先筛选节点名称中包含 `NF / 奈飞 / Netflix / 解锁 / Media` 的节点；最终是否解锁仍需实际播放或使用 Netflix 地区检测页面验证。

### 5. DNS 测试

确认国内域名解析正常、国外域名在代理模式下正常访问。如果出现个别网站异常，可优先检查 Fake-IP 与 DNS 分流。

## 说明

该配置不包含任何机场订阅地址、UUID、密码、私钥或其他敏感信息。节点来源由 Clash Verge 的订阅配置自行提供。
