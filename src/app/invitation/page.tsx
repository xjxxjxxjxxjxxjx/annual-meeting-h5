'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { config } from '@/config';

const Invitation: React.FC = () => {
  const router = useRouter();
  return (
    <div className="page-container invitation-container" style={{ position: 'relative', width: '100%', height: '100vh', height: '100dvh', padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* 整体背景 - 模拟长图效果 */}
      <div 
        className="invitation-full-bg"
        style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          backgroundColor: '#D32F2F',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
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
        
        {/* 中间内容区域 - 可拉伸 */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
            backgroundImage: `url(/images/背景切片/中无.jpg)`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'top left',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 0
          }}
        >
          {/* 邀请函图片 - 只显示这一个图片 */}
          <img 
              src="/images/home/邀请函.jpg"
              alt="邀请函"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                zIndex: 1
              }}
            />
        </div>
      </div>
    </div>
  );
};

export default Invitation;