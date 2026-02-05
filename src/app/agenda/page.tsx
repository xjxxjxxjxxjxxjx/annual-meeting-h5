'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Agenda page component
 */
export default function AgendaPage() {
  const router = useRouter();
  // 状态管理：当前展开的议程项
  const [expandedAgenda, setExpandedAgenda] = useState<number | null>(null);

  // 切换议程项展开/收起状态
  const toggleAgenda = (index: number) => {
    setExpandedAgenda(expandedAgenda === index ? null : index);
  };

  return (
    <div className="page-container agenda-container" style={{ position: 'relative', width: '100%', padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* 整体背景 - 模拟长图效果 */}
      <div 
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
              cursor: 'pointer',
              position: 'absolute',
              zIndex: 10
            }}
            aria-label="返回首页"
          />
          <img 
            src="/images/背景切片/logo右.jpg"
            alt="议程页面头部"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              zIndex: 1,
              display: 'block'
            }}
          />
        </div>
        
        {/* 中间内容区域 - 可拉伸 */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
            backgroundImage: `url(/images/背景切片/中无.jpg)`,
            backgroundSize: '100.5% 101%',
            backgroundPosition: 'top left',
            backgroundRepeat: 'no-repeat',
            minHeight: 0,
            padding: '2vw 0',
            marginTop: '-1px',
            marginBottom: '-3px',
            zIndex: 1
          }}
        >
          
          {/* 会议议程图片 */}
          <div style={{ padding: '0 12vw', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <img 
              src="/images/微官网素材0203/会议议程.png"
              alt="会议议程"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                zIndex: 1
              }}
            />
          </div>
        </div>
        
        {/* 尾部背景图片 - 底部显示 */}
        <div style={{ position: 'relative', width: '100%', lineHeight: 0 }}>
          <img 
            src="/images/背景切片/底-太阳.jpg"
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
}



