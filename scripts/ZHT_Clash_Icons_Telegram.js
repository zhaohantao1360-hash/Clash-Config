// ZHT Clash Verge Rev 全局扩展脚本
// 作用：
// 1. 给现有策略组统一换成 Qure Color 彩色图标
// 2. 新增「🇭🇰 香港ISP优选」测速组
// 3. 自动把「🇭🇰 香港ISP优选」加入 Telegram 策略组
// 4. 不修改原有规则集、DNS、节点来源
//
// 使用位置：Clash Verge Rev → 全局扩展脚本

const QURE = 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/';

const icons = {
  '🚀 节点选择': QURE + 'Proxy.png',
  '🚀 手动切换': QURE + 'Server.png',
  '♻️ 自动选择': QURE + 'Round_Robin.png',
  '🧪 测试节点': QURE + 'Speedtest.png',
  '⚡ ISP优选': QURE + 'BGP.png',
  '🇭🇰 香港节点': QURE + 'HK.png',
  '🇨🇳 台湾节点': QURE + 'Taiwan.png',
  '🇸🇬 狮城节点': QURE + 'Singapore.png',
  '🇯🇵 日本节点': QURE + 'Japan.png',
  '🇺🇲 美国节点': QURE + 'United_States.png',
  '🇰🇷 韩国节点': QURE + 'Korea.png',
  '🌍 其他地区': QURE + 'Global.png',
  '💬 OpenAI': QURE + 'Bot.png',
  '📲 Telegram': QURE + 'Telegram.png',
  '📹 YouTube': QURE + 'YouTube.png',
  '🎥 Netflix': QURE + 'Netflix.png',
  '🎥 奈飞节点': QURE + 'Netflix.png',
  '📺 巴哈姆特': QURE + 'Bahamut.png',
  '📺 哔哩哔哩': QURE + 'bilibili.png',
  'Ⓜ️ Microsoft': QURE + 'Microsoft.png',
  '🍎 Apple': QURE + 'Apple.png',
  '🎮 游戏平台': QURE + 'Game.png',
  '🌍 国外媒体': QURE + 'ForeignMedia.png',
  '🌏 国内媒体': QURE + 'DomesticMedia.png',
  '🛑 广告拦截': QURE + 'Reject.png',
  '🍃 应用净化': QURE + 'Filter.png',
  '🎯 全球直连': QURE + 'Direct.png',
  '🐟 漏网之鱼': QURE + 'Final.png',
  '🇭🇰 香港ISP': QURE + 'BGP.png',
};

function main(config) {
  const groups = config['proxy-groups'] || [];

  // 新增香港 ISP 优选组；如果已有则复用
  let hkIsp = groups.find(g => g.name === '🇭🇰 香港ISP优选');
  if (!hkIsp) {
    hkIsp = {
      name: '🇭🇰 香港ISP优选',
      type: 'url-test',
      include-all: true,
      filter: '(?i)(香港\\s*ISP|HK\\s*ISP|Hong ?Kong.*ISP)',
      'exclude-filter': '(?i)(到期时间|到期|剩余流量|剩余|流量|邀请码|邀请|官网|打不开网站|无法订阅|重新复制|订阅|套餐|重置|官方|Expire|Traffic|Invite|Official|Subscribe|Reset)',
      url: 'https://cp.cloudflare.com/generate_204',
      interval: 300,
      tolerance: 60,
      timeout: 5000,
      lazy: true,
      icon: QURE + 'BGP.png'
    };
    groups.push(hkIsp);
  }

  // 给现有组设置图标
  for (const group of groups) {
    if (icons[group.name]) group.icon = icons[group.name];
  }

  // 香港 ISP 优选放到 Telegram 最前面，便于直接选择
  const telegram = groups.find(g => g.name === '📲 Telegram');
  if (telegram) {
    telegram.icon = QURE + 'Telegram.png';
    telegram.proxies = telegram.proxies || [];
    telegram.proxies = telegram.proxies.filter(name => name !== '🇭🇰 香港ISP优选');
    telegram.proxies.unshift('🇭🇰 香港ISP优选');
  }

  // 如果原配置使用旧名称，也给旧香港 ISP 组补图标
  const oldHkIsp = groups.find(g => g.name === '🇭🇰 香港ISP');
  if (oldHkIsp) oldHkIsp.icon = QURE + 'BGP.png';

  config['proxy-groups'] = groups;
  return config;
}
