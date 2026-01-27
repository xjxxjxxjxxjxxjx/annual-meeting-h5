'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { config } from '@/config';


interface NoticeDetailParams {
  params: Promise<{ type: string }>;
}

const NoticeDetail = ({ params }: NoticeDetailParams) => {
  const router = useRouter();
  // 在Next.js 16+中，params是一个Promise，需要使用React.use()来获取其值
  const { type } = React.use(params);
  
  // 获取页面标题
  const getTitle = () => {
    switch (type) {
      case 'discipline': return '参会纪律';
      case 'transport': return '车辆安排';
      case 'dining': return '用餐要求';
      case 'dress': return '着装要求';
      default: return '参会须知';
    }
  };

  // 直接计算背景图片路径
  const backgroundMap: Record<string, string> = {
    discipline: config.images.noticeDetails.discipline,
    transport: config.images.noticeDetails.transport,
    dining: config.images.noticeDetails.dining,
    dress: config.images.noticeDetails.dress
  };
  
  // 获取对应类型的背景图
  const backgroundImage = backgroundMap[type] || config.images.noticeBg;
  
  // 添加调试日志
  console.log('params.type:', type);
  console.log('Background image being used:', backgroundImage);
  console.log('Available background maps:', backgroundMap);

  return (
    <div className="page-container notice-detail-container" style={{ position: 'relative', width: '100%', minHeight: '100vh', minHeight: '100dvh', padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)', boxSizing: 'border-box' }}>
      {/* 整体背景 - 模拟长图效果 */}
      <div 
        className="notice-detail-full-bg"
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
            onClick={() => router.push('/notice')}
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
            aria-label="返回参会须知"
          />
          <img 
            src={{
              transport: '/images/other/no-text-bg/transport-bg(1).png',
              discipline: '/images/other/no-text-bg/discipline-bg(1).png',
              dining: '/images/other/no-text-bg/dining-bg(yc).png',
              dress: '/images/other/no-text-bg/dress-bg(1).png'
            }[type] || '/images/notice/notice-bg(1).png'}
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
          className="notice-detail-content"
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
            className="notice-detail-main"
            style={{ 
              width: '90%',
              maxWidth: '800px',
              padding: '0 5%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* 可滚动文本容器 */}
            <div className="w-full bg-white/95 rounded-2xl shadow-xl border-2 border-primary/30 overflow-hidden">
              {/* 内容 - 使用overflow-y-auto实现滚动 */}
              <div className="p-6 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {/* 隐藏滚动条 */}
                <style jsx>{`
                  div::-webkit-scrollbar { display: none; }
                `}</style>
                
                {/* 文本内容 */}
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>欢迎参加公司年会，为确保年会顺利进行，请遵守以下{getTitle()}：</p>
                  
                  {type === 'discipline' && (
                    <>
                      <p>1. 请提前15分钟到达会场，配合工作人员进行签到。</p>
                      <p>2. 进入会场后，请按照指定座位就坐，不要随意更换位置。</p>
                      <p>3. 会议期间请将手机调至静音或震动状态，不要随意走动或大声喧哗。</p>
                      <p>4. 请遵守会场秩序，尊重演讲者和表演者。</p>
                      <p>5. 请勿在会场内吸烟、饮食或乱扔垃圾。</p>
                      <p>6. 会议结束后，请有序离场，不要拥挤。</p>
                      <p>7. 请保管好个人物品，如有丢失请及时联系会务组。</p>
                      <p>8. 如有特殊需求，请随时联系现场工作人员。</p>
                      <p>感谢您的配合，祝您年会愉快！</p>
                    </>
                  )}
                  
                  {type === 'transport' && (
                    <>
                      <p>1. 公司将提供大巴车接送，请提前10分钟到达指定上车地点。</p>
                      <p>2. 上车地点：公司正门停车场。</p>
                      <p>3. 发车时间：下午13:00准时发车，请务必准时到达。</p>
                      <p>4. 返程时间：晚上21:30，请在会场门口集合。</p>
                      <p>5. 如有自驾需求，请提前联系行政部报备，以便安排停车位。</p>
                      <p>6. 自驾路线：请导航至XXX酒店停车场。</p>
                      <p>7. 停车费用由公司统一支付，请保存好停车票。</p>
                      <p>8. 请遵守交通规则，注意行车安全。</p>
                      <p>感谢您的配合，祝您年会愉快！</p>
                    </>
                  )}
                  
                  {type === 'dining' && (
                    <>
                      <p>1. 晚餐时间：18:30 - 20:00，请按照指定餐桌就坐。</p>
                      <p>2. 餐桌号查询：请使用餐饮座位安排页面查询您的餐桌号。</p>
                      <p>3. 请遵守用餐礼仪，文明用餐。</p>
                      <p>4. 请勿浪费食物，按需取餐。</p>
                      <p>5. 用餐期间请保持桌面整洁，不要大声喧哗。</p>
                      <p>6. 如需特殊饮食（如素食、清真等），请提前联系会务组。</p>
                      <p>7. 请勿在餐桌上吸烟或饮酒过量。</p>
                      <p>8. 用餐结束后，请将餐具放回指定位置。</p>
                      <p>感谢您的配合，祝您用餐愉快！</p>
                    </>
                  )}
                  
                  {type === 'dress' && (
                    <>
                      <p>1. 请穿着正式服装出席年会。</p>
                      <p>2. 男士：建议穿着西装、衬衫、领带，皮鞋。</p>
                      <p>3. 女士：建议穿着连衣裙、套装或礼服，高跟鞋。</p>
                      <p>4. 请避免穿着过于休闲或暴露的服装。</p>
                      <p>5. 如有表演环节，请按照节目要求穿着指定服装。</p>
                      <p>6. 请保持服装整洁，注意个人形象。</p>
                      <p>7. 请避免佩戴过于夸张的饰品。</p>
                      <p>8. 请穿着舒适的鞋子，以便活动。</p>
                      <p>感谢您的配合，祝您年会愉快！</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 尾部背景图片 - 底部显示 */}
        <img 
          src="/images/other/no-text-bg/dining-bg(1).png"
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

export default NoticeDetail;