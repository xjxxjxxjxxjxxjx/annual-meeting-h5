'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { config } from '@/config';

const Invitation: React.FC = () => {
  const router = useRouter();
  return (
    <div className="page-container invitation-container" style={{ position: 'relative', width: '100%', minHeight: '100vh', minHeight: '100dvh', padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)', boxSizing: 'border-box' }}>
      {/* 整体背景 - 模拟长图效果 */}
      <div 
        className="invitation-full-bg"
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
        
        {/* 邀请函图片 - 只显示这一个图片 */}
        <img 
          src="/images/home/邀请函.jpg"
          alt="邀请函"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain'
          }}
        />
      </div>
    </div>
  );
};

export default Invitation;