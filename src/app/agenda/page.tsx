'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { config } from '@/config';

const scheduleItems = [
  { time: '14:00-15:00', title: '签到入场', description: '领取年会资料及伴手礼' },
  { time: '15:00-15:30', title: '开场致辞', description: '公司领导发表新年致辞' },
  { time: '15:30-17:00', title: '表彰大会', description: '优秀员工及团队表彰' },
  { time: '17:00-17:30', title: '抽奖环节', description: '惊喜大奖等你来拿' },
  { time: '17:30-19:00', title: '晚宴开始', description: '美食与节目表演' },
  { time: '19:00-20:30', title: '文艺演出', description: '各部门精彩节目' },
  { time: '20:30-21:00', title: '合影留念', description: '全体大合影' },
];

const Agenda: React.FC = () => {
  const router = useRouter();
  
  return (
    <div className="page-container agenda-container" style={{ position: 'relative', width: '100%', minHeight: '100vh', minHeight: '100dvh', padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)', boxSizing: 'border-box' }}>
      {/* 整体背景 - 模拟长图效果 */}
      <div 
        className="agenda-full-bg"
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
            className="absolute z-10"
            style={{
              width: '12vw',
              height: '22vw',
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
            src="/images/notice/notice-bg(1).png"
            alt="会议议程头部"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              zIndex: 1
            }}
          />
        </div>
        
        {/* 中间内容区域 - 可拉伸 */}
        <div 
          className="agenda-content"
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '4vw 0',
            overflowY: 'auto'
          }}
        >
          
          {/* 中央内容区域 */}
          <div 
            className="agenda-main"
            style={{
              width: '80vw'
            }}
          >
            <div 
              className="bg-white/95 rounded-lg shadow-xl border-2 border-primary/30 overflow-hidden"
              style={{ borderRadius: '1.5vw' }}
            >
              {/* 移除滚动限制，全部内容展示 */}
              <div className="w-full p-6" style={{ padding: '3.5vw' }}>
                <div className="w-full">
                  {/* 容器标题 */}
                  <h1 className="text-2xl font-bold text-primary mb-6 text-center" style={{ fontSize: '5vw', marginBottom: '5vw' }}>会议议程</h1>
                  
                  {/* 议程内容 */}
                  <div className="space-y-6" style={{ gap: '1vw' }}>
                    {scheduleItems.map((item, index) => (
                      <div key={index} className="bg-primary/5 p-4 rounded-xl border-l-4 border-primary" style={{ padding: '1.5vw', borderRadius: '1vw' }}>
                        <div className="flex items-center gap-2 mb-2" style={{ marginBottom: '0.8vw', gap: '1vw' }}>
                          <div className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full" style={{ fontSize: '2.5vw', padding: '0.5vw 2vw', backgroundColor: '#FFF3F3', borderRadius: '1vw' }}>
                            {item.time}
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1" style={{ fontSize: '3.5vw', marginBottom: '0.5vw', color: '#333' }}>{item.title}</h3>
                        <p className="text-gray-600" style={{ fontSize: '2.8vw', color: '#666' }}>{item.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* 额外内容示例 */}
                  <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20" style={{ marginTop: '2vw', padding: '1.5vw', borderRadius: '1vw', border: '1px solid #FFE0E0' }}>
                    <h2 className="text-lg font-bold text-primary mb-3" style={{ fontSize: '3.5vw', marginBottom: '1.5vw', color: '#D32F2F' }}>温馨提示</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600" style={{ paddingLeft: '3.5vw', gap: '1vw', fontSize: '2.8vw', color: '#666' }}>
                      <li>请提前15分钟入场</li>
                      <li>请遵守会场纪律</li>
                      <li>请保管好个人物品</li>
                      <li>如有特殊需求，请联系会务组</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 尾部背景图片 - 底部显示 */}
        <img 
          src="/images/notice/notice-bg(600).png"
          alt="会议议程尾部"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            zIndex: 1
          }}
        />
      </div>
    </div>
  );
};

export default Agenda;