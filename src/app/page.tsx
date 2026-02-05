'use client';

import React from 'react';
import Link from 'next/link';
import { config } from '@/config';


const Home: React.FC = () => {
  // 功能按钮数据
  const features = [
    {
      id: 'invitation',
      title: '会议邀请函',
      icon: config.images.icons.invitation,
      href: '/invitation', // 修改为内部路由，不再直接链接图片
    },
    {
      id: 'image-live',
      title: '图片直播',
      icon: config.images.icons.imageLive,
      href: config.externalLinks.imageLive,
      isExternal: true,
    },
    {
      id: 'agenda',
      title: '会议议程',
      icon: config.images.icons.agenda,
      href: '/agenda',
    },
    {
      id: 'meeting-live',
      title: '会议直播',
      icon: config.images.icons.meetingLive,
      href: config.externalLinks.meetingLive,
      isExternal: true,
    },
    {
      id: 'seating',
      title: '座位排布',
      icon: config.images.icons.seating,
      href: '/seating',
    },
    {
      id: 'notice',
      title: '参会须知',
      icon: config.images.icons.notice,
      href: '/notice',
    },
    {
      id: 'dining',
      title: '餐饮安排',
      icon: config.images.icons.dining,
      href: '/dining',
    },
    {
      id: 'support',
      title: '会务保障',
      icon: config.images.icons.support,
      href: '/support',
    },
  ];

   return (
    <div className="page-container home-container" style={{ position: 'relative', width: '100%', padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* 整体背景 - 模拟长图效果 */}
      <div 
        className="home-full-bg"
        style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* 头部背景图片 - 顶部显示 */}
        <div style={{ position: 'relative', width: '100%', lineHeight: 0 }}>
          <img 
            src="/images/背景切片/logo左.jpg"
            alt="主页头部"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>
        
        {/* 中间内容区域 - 可拉伸 */}
        <div 
          className="home-content"
          style={{
            position: 'relative',
            width: '100%',
            padding: '0',
            flex: 1,
            backgroundImage: `url(/images/背景切片/主中.jpg)`,
            backgroundSize: '100.5% 101%',
            backgroundPosition: 'top left',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: 0,
            margin: '-3px 0',
            zIndex: 1
          }}
        >
          {/* 主内容区域 */}
          <div 
            className="home-main"
            style={{ 
              width: '65vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* 按键网格 */}
            <div 
              className="buttons-grid"
              style={{
                position: 'relative',
                width: '90vw',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0',
                padding: '0',
              }}
            >
              {features.map((feature) => (
                <div 
                  key={feature.id} 
                  className="button-item"
                  style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0',
                    aspectRatio: '1.5',
                  }}
                >
                  {feature.isExternal ? (
                    <a href={feature.href} target="_blank" rel="noopener noreferrer" style={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img
                        src={feature.icon}
                        alt={feature.title}
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'contain',
                        }}
                      />
                    </a>
                  ) : (
                    <Link href={feature.href} style={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img
                        src={feature.icon}
                        alt={feature.title}
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'contain',
                        }}
                      />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 尾部背景图片 - 底部显示 */}
        <div style={{ position: 'relative', width: '100%', lineHeight: 0 }}>
          <img 
            src="/images/背景切片/底部-人.jpg"
            alt="主页尾部"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              zIndex: 0,
              display: 'block'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;