'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { config } from '@/config';

const Notice: React.FC = () => {
  const router = useRouter();
  // 参会须知按钮数据
  const noticeItems = [
    {
      id: 'discipline',
      title: '参会纪律',
      image: config.images.noticeButtons.discipline,
    },
    {
      id: 'transport',
      title: '车辆安排',
      image: config.images.noticeButtons.transport,
    },
    {
      id: 'dining',
      title: '用餐要求',
      image: config.images.noticeButtons.dining,
    },
    {
      id: 'dress',
      title: '着装要求',
      image: config.images.noticeButtons.dress,
    },
  ];

  // 调整按钮顺序：车辆安排、参会纪律、用餐要求、着装要求
  const sortedNoticeItems = [
    noticeItems.find(item => item.id === 'transport')!, // 车辆安排
    noticeItems.find(item => item.id === 'discipline')!, // 参会纪律
    noticeItems.find(item => item.id === 'dining')!, // 用餐要求
    noticeItems.find(item => item.id === 'dress')! // 着装要求
  ];

  return (
    <div className="page-container notice-container" style={{ position: 'relative', width: '100%', height: '100vh', height: '100dvh', padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* 整体背景 - 模拟长图效果 */}
      <div 
        className="notice-full-bg"
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
        <div style={{ position: 'relative', width: '100%' }}>
          {/* 左上角返回按钮 */}
          <button
            onClick={() => router.push('/')}
            className="absolute z-10"
            style={{
              width: '15vw',
              height: '23vw',
              top: '4vw',
              left: '4vw',
              backgroundImage: `url(/images/home/返回图标.png)`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              border: 'none',
              cursor: 'pointer'
            }}
            aria-label="返回首页"
          />
          <img 
            src="/images/背景切片/logo右大.jpg"
            alt="参会须知头部"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              zIndex: 1,
              display: 'block'
            }}
          />
          {/* 头部与中间衔接处覆盖层 */}
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '2px',
            backgroundImage: `url(/images/背景切片/主中.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            zIndex: 1
          }} />
        </div>
        
        {/* 中间内容区域 - 可拉伸 */}
        <div 
          className="notice-content"
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
            backgroundImage: `url(/images/背景切片/主中.jpg)`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'top left',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '4vw 0',
            overflowY: 'auto',
            minHeight: 0
          }}
        >
          {/* 主内容区域 */}
          <div 
            className="notice-main"
            style={{ 
              width: '65vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* 功能按钮网格 - 4行1列竖屏布局 */}
            <div className="w-full grid grid-cols-1 gap-0" style={{ gap: '2vw' }}>
              {sortedNoticeItems.map((item) => (
                <div key={item.id} className="relative group">
                  <Link href={`/notice/${item.id}`} className="block">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto object-contain cursor-pointer"
                      style={{ width: '100%', height: 'auto', objectFit: 'contain', transform: 'scale(1.2)', transformOrigin: 'center' }}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 尾部背景图片 - 底部显示 */}
        <div style={{ position: 'relative', width: '100%', lineHeight: 0 }}>
          {/* 中间与尾部衔接处覆盖层 */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '2px',
            backgroundImage: `url(/images/背景切片/主中.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom center',
            zIndex: 1
          }} />
          <img 
            src="/images/背景切片/底部-人.jpg"
            alt="参会须知尾部"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              zIndex: 0,
              display: 'block'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Notice;