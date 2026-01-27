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
    <div className="page-container notice-container" style={{ position: 'relative', width: '100%', minHeight: '100vh', minHeight: '100dvh', padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)', boxSizing: 'border-box' }}>
      {/* 整体背景 - 模拟长图效果 */}
      <div 
        className="notice-full-bg"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          minHeight: '100dvh',
          backgroundColor: '#F90101',
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
            className="absolute top-10 left-8 z-10"
            style={{
              width: '40px',
              height: '40px',
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
            src="/images/notice/notice-bg(1).png"
            alt="参会须知头部"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '300px',
              objectFit: 'cover'
            }}
          />
        </div>
        
        {/* 中间内容区域 - 可拉伸 */}
        <div 
          className="notice-content"
          style={{
            position: 'relative',
            width: '100%',
            padding: '20px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* 主内容区域 */}
          <div 
            className="notice-main"
            style={{ 
              width: '90%',
              maxWidth: '800px',
              padding: '0 5%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* 功能按钮网格 - 4行1列竖屏布局 */}
            <div className="w-full max-w-xs grid grid-cols-1 gap-0">
              {sortedNoticeItems.map((item) => (
                <div key={item.id} className="relative group">
                  <Link href={`/notice/${item.id}`} className="block">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto object-contain cursor-pointer"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 尾部背景图片 - 底部显示 */}
        <img 
          src="/images/notice/notice-bg(600).png"
          alt="参会须知尾部"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '400px',
            objectFit: 'cover'
          }}
        />
      </div>
    </div>
  );
};

export default Notice;