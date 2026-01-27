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
    <div className="page-container home-container" style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100dvh',
      overflow: 'hidden' 
    }}>
      {/* 背景图 */}
      <div 
        className="home-full-bg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(/images/home/底-首页925.jpg)`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* 主内容区域：调整布局位置 */}
      <div 
        className="home-main"
        style={{ 
          position: 'absolute',
          top: '190px',
          left: '60px',
          right: '60px',
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <div className="grid grid-cols-2 gap-1 w-full"> 
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="relative flex justify-center items-center p-1"
            >
              {feature.isExternal ? (
                <a href={feature.href} target="_blank" rel="noopener noreferrer">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="max-w-full max-h-32 object-contain"
                    style={{ height: 'auto' }}
                  />
                </a>
              ) : (
                <Link href={feature.href}>
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="max-w-full max-h-32 object-contain"
                    style={{ height: 'auto' }}
                  />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;