// 全局配置文件
// 集中管理所有图片路径、外部链接、电话号码等配置项

export const config = {
  // 主色调配置
  colors: {
    primary: '#DE2910',
    secondary: '#C91E0C',
    background: '#FFFFFF',
    text: '#333333',
  },
  
  // 外部链接配置
  externalLinks: {
    imageLive: 'https://example.com/image-live', // 图片直播链接
    meetingLive: 'https://example.com/meeting-live', // 会议直播链接
  },
  
  // 图片路径配置
  images: {
    // 首页背景图
    homeBg: '/images/home/底-首页.jpg',
    
    // 功能按钮图标
    icons: {
      invitation: '/images/home/1.png',
      imageLive: '/images/home/2.png',
      agenda: '/images/home/3.png',
      meetingLive: '/images/home/4.png',
      seating: '/images/home/5.png',
      notice: '/images/home/6.png',
      dining: '/images/home/7.png',
      support: '/images/home/8.png',
    },
    
    // 邀请函图片
    invitation: '/images/home/邀请函.jpg',
    
    // 参会须知背景图
    noticeBg: '/images/notice/notice-bg.jpg',
    
    // 参会须知详情背景图
    noticeDetails: {
      discipline: '/images/other/no-text-bg/discipline-bg.jpg',
      transport: '/images/other/no-text-bg/transport-bg.jpg',
      dining: '/images/other/no-text-bg/dining-bg.jpg',
      dress: '/images/other/no-text-bg/dress-bg.jpg',
    },
    
    // 参会须知按钮图片
    noticeButtons: {
      discipline: '/images/notice/discipline-btn.png',
      transport: '/images/notice/transport-btn.png',
      dining: '/images/notice/dining-btn.png',
      dress: '/images/notice/dress-btn.png',
    },
    
    // 座位排布图
    seatingMap: '/images/home/座位详情图.jpg',
  },
  
  // 电话号码配置
  phoneNumbers: {
    support: ['138-0001-0001', '138-0002-0002'], // 会务保障电话号码
  },
  
  // API配置
  api: {
    baseUrl: '/api', // API基础地址
  },
  
  // 座位图配置
  seating: {
    background: '/images/home/底-首页.jpg', // 座位排布背景图
    detailImage: '/images/home/座位详情图.jpg', // 座位详情图
  },
  
  // 餐饮安排配置
  dining: {
    background: '/images/home/底-首页.jpg', // 餐饮安排背景图
  },
  
  // 会务保障配置
  support: {
    background: '/images/home/底-首页.jpg', // 会务保障背景图
  },
};
