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
  
  // 调试日志已移除

  return (
    <div className="page-container notice-detail-container" style={{ position: 'relative', width: '100%', padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* 整体背景 - 模拟长图效果 */}
      <div 
        className="notice-detail-full-bg"
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
        {/* 头部背景图片 - 顶部显示 */}
        <div style={{ position: 'relative', width: '100%', zIndex: 1, margin: 0, padding: 0, lineHeight: 0, overflow: 'hidden' }}>
          {/* 左上角返回按钮 */}
          <button
            onClick={() => router.push('/notice')}
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
            aria-label="返回参会须知"
          />
          <img 
            src="/images/背景切片/logo右.jpg"
            alt="参会须知头部"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              position: 'relative',
              zIndex: 1,
              margin: 0,
              padding: 0,
              lineHeight: 0,
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
            flex: 1,
            backgroundColor: '#D32F2F',
            backgroundImage: `url(/images/背景切片/中无.jpg)`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'top left',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0',
            overflow: 'visible',
            minHeight: 0
          }}
        >
          {/* 主内容区域 */}
          <div 
            className="notice-detail-main"
            style={{ 
              width: '80vw',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center'
            }}
          >
            {/* 可滚动文本容器 */}
            <div className="w-full bg-white/95 shadow-xl border-2 border-primary/30 overflow-hidden" style={{ borderRadius: '1.5vw', marginTop: '-8px', position: 'relative', zIndex: 2 }}>
              {/* 页面标题 - 黄色标题栏 */}
              <div style={{ background: '#FAF5BD', padding: '3vw 4vw' }}>
                <h2 style={{ 
                  color: '#E5482E', 
                  fontSize: '4vw', 
                  fontWeight: 'bold', 
                  margin: '0',
                  textAlign: 'left'
                }}>
                  {getTitle()}
                </h2>
              </div>
              
              {/* 内容 */}
              <div className="p-6 bg-[#f95d3e]" style={{ padding: '3.5vw' }}>

                
                {/* 文本内容 */}
                <div style={{ fontSize: '3.2vw', lineHeight: '1.6', color: 'white' }}>
                  <div style={{ marginBottom: '4vw' }}>
                    <p style={{ margin: '0', lineHeight: '1.5' }}>欢迎参加公司年会，为确保年会顺利进行，请遵守以下{getTitle()}：</p>
                  </div>
                  
                  {type === 'discipline' && (
                    <>
                      <div style={{ marginBottom: '4vw' }}>
                        <p style={{ fontWeight: 'bold', fontSize: '3.5vw', margin: '0 0 2.5vw 0' }}>一、会议出勤：</p>
                        <p style={{ margin: '0 0 3vw 0', paddingLeft: '2vw' }}>年会当日为正常出勤日，非履行正常请假程序，不得无故缺席会议。</p>
                      </div>
                      <div style={{ marginBottom: '4vw' }}>
                        <p style={{ fontWeight: 'bold', fontSize: '3.5vw', margin: '0 0 2.5vw 0' }}>二、入场就坐：</p>
                        <p style={{ margin: '0 0 2vw 0', paddingLeft: '2vw' }}>1、全体参会人员于会议开始前15分钟进场。</p>
                        <p style={{ margin: '0', paddingLeft: '2vw' }}>2、入场后，根据《会场座位排布图》及座位标识，在指定区域就坐，不得随意更换座位。</p>
                      </div>
                      <div style={{ marginBottom: '4vw' }}>
                        <p style={{ fontWeight: 'bold', fontSize: '3.5vw', margin: '0 0 2.5vw 0' }}>三、会场秩序：</p>
                        <p style={{ margin: '0 0 2vw 0', paddingLeft: '2vw' }}>1、会议期间，请保持安静，将手机调至静音或震动状态。</p>
                        <p style={{ margin: '0 0 2vw 0', paddingLeft: '2vw' }}>2、除大会安排的休息时间、演职人员换场或必要离场（如上洗手间）外，请勿在前、后门频繁进出，以免影响会议进程。</p>
                        <p style={{ margin: '0', paddingLeft: '2vw' }}>3、会议结束时，请全体人员听从指挥，优先走楼梯有序离场，注意安全，避免推挤。</p>
                      </div>
                      <div style={{ marginBottom: '4vw' }}>
                        <p style={{ fontWeight: 'bold', fontSize: '3.5vw', margin: '0 0 2.5vw 0' }}>四、节目与颁奖：</p>
                        <p style={{ margin: '0 0 2vw 0', paddingLeft: '2vw' }}>1、演职人员：请在参加完公司总结表彰环节后，再前往会议室外指定区域候场及换装，避免影响颁奖环节的庄重性与秩序。</p>
                        <p style={{ margin: '0 0 2vw 0', paddingLeft: '2vw' }}>2、获奖人员：请遵从现场工作人员引导，快速、有序地上台领奖，保持队伍紧凑，勿掉队、勿拖沓。</p>
                        <p style={{ margin: '0 0 2vw 0', paddingLeft: '2vw' }}>3、中奖人员：</p>
                        <p style={{ margin: '0 0 1vw 0', paddingLeft: '4vw' }}>抽中特等奖者，需本人上台领奖。</p>
                        <p style={{ margin: '0 0 1vw 0', paddingLeft: '4vw' }}>若特等奖中奖者因值班等客观原因未在场，由各业务单元行政/综管负责人代为上台领取。</p>
                        <p style={{ margin: '0', paddingLeft: '4vw' }}>其他等级奖项，于会议结束后统一安排发放。</p>
                      </div>
                      <div>
                        <p style={{ fontWeight: 'bold', fontSize: '3.5vw', margin: '0 0 2.5vw 0' }}>五、管理责任：</p>
                        <p style={{ margin: '0', paddingLeft: '2vw' }}>各部门负责人负有督促本部门成员全程参会的责任。如出现本部门人员批量缺席、迟到或中途无故批量离场等情况，将追究相应管理责任。</p>
                      </div>
                    </>
                  )}
                  
                  {type === 'transport' && (
                    <>
                      <div style={{ marginBottom: '4vw' }}>
                        <p style={{ fontWeight: 'bold', fontSize: '3.5vw', margin: '0 0 2.5vw 0' }}>一、出行方式：</p>
                        <p style={{ margin: '0 0 2vw 0', paddingLeft: '2vw' }}>1、九典本部：乘坐地铁、公交，自驾、拼车前往，乘车方式如下：</p>
                        <p style={{ margin: '0 0 2vw 0', paddingLeft: '4vw', lineHeight: '1.5' }}>地铁：麓谷公园站乘坐6号线→文昌阁站换乘1号线→北辰三角洲站（1口）下车→步行至北辰国际会议中心。（车程约1小时）</p>
                        <p style={{ margin: '0 0 2vw 0', paddingLeft: '4vw', lineHeight: '1.5' }}>公交：麓枫路麓天路口乘坐18路公交车→长沙轮渡站换乘804路公交车→北辰时代广场站下车→步行至北辰国际会议中心（全程约1小时30分）</p>
                        <p style={{ margin: '0 0 2vw 0', paddingLeft: '4vw' }}>自驾：导航"长沙北辰国际会议中心"→车辆停至地下车库（全程约30分钟）</p>
                        <p style={{ margin: '0', paddingLeft: '2vw' }}>2、九典宏阳、九典生产中心：根据乘车需求安排车辆接送。</p>
                      </div>
                      <div>
                        <p style={{ fontWeight: 'bold', fontSize: '3.5vw', margin: '0 0 2.5vw 0' }}>二、发车安排：</p>
                        <p style={{ margin: '0 0 2vw 0', paddingLeft: '2vw' }}>1、发车时间：九典生产中心、九典宏阳：11：30前发车</p>
                        <p style={{ margin: '0 0 2vw 0', paddingLeft: '6vw' }}>九典本部：乘坐公共交通人员11:30出发，自驾人员12:00出发</p>
                        <p style={{ margin: '0 0 2vw 0', paddingLeft: '2vw' }}>2、大巴车到点即发车，不等人，以免耽误整体参会。</p>
                        <p style={{ margin: '0 0 3vw 0', paddingLeft: '2vw' }}>3、返程发车时间根据晚宴结束情况安排，由业务单元行政部另行通知。</p>
                        
                        <p style={{ fontWeight: 'bold', fontSize: '3.5vw', margin: '0 0 2.5vw 0' }}>三、停车费缴纳：</p>
                        <p style={{ margin: '0', paddingLeft: '2vw' }}>会场当天共享免费停车二维码，扫码输入车牌即可免当日停车费。</p>
                      </div>
                    </>
                  )}
                  
                  {type === 'dining' && (
                    <>
                      <div style={{ marginBottom: '4vw' }}>
                        <p style={{ fontWeight: 'bold', fontSize: '3.5vw', margin: '0 0 2.5vw 0' }}>一、就餐位置</p>
                        <p style={{ margin: '0 0 2vw 0', paddingLeft: '2vw' }}>1、九州厅：九典制药（本部职能、信息中心、药物研究院）、九典宏阳、九典医药、普道医药、九典大药房、九典善诺、诺纳医药、人参漫漫、典恒医疗</p>
                        <p style={{ margin: '0', paddingLeft: '2vw' }}>2、国宾厅：九典生产中心</p>
                      </div>
                      <div style={{ marginBottom: '4vw' }}>
                        <p style={{ fontWeight: 'bold', fontSize: '3.5vw', margin: '0 0 2.5vw 0' }}>二、路线指引</p>
                        <p style={{ margin: '0 0 2vw 0', paddingLeft: '2vw' }}>1、前往九州厅（G层）：</p>
                        <p style={{ margin: '0 0 1vw 0', paddingLeft: '4vw' }}>方式一：会场外场楼梯下行 → G层右转 → 九州厅（请优先选择步行楼梯，以便快速疏散）</p>
                        <p style={{ margin: '0', paddingLeft: '4vw' }}>方式二：会场内扶梯下行 → G层直行 → 九州厅</p>
                      </div>
                      <div>
                        <p style={{ fontWeight: 'bold', fontSize: '3.5vw', margin: '0 0 2.5vw 0' }}>三、用餐礼仪</p>
                        <p style={{ margin: '0 0 2vw 0', paddingLeft: '2vw' }}>1、用餐安排于会议及演出结束后进行，所有参会者请勿提前离开会场。</p>
                        <p style={{ margin: '0 0 2vw 0', paddingLeft: '2vw' }}>2、进入餐厅后，根据预先排布的桌号及及桌签标识，对号入座（10人/桌）。</p>
                        <p style={{ margin: '0', paddingLeft: '2vw' }}>3、用餐时请注意礼仪，相互敬酒请保持适度、有序，避免劝酒、过量饮酒，共同营造愉悦、健康的聚餐氛围。</p>
                      </div>
                    </>
                  )}
                  
                  {type === 'dress' && (
                    <>
                      <div style={{ marginBottom: '2.5vw' }}>
                        <p style={{ margin: '0 0 2.5vw 0' }}>1、所有参会人员须佩戴工牌进入会场。</p>
                        <p style={{ margin: '0 0 2.5vw 0' }}>2、公司订制了工装的员工须着工装参会，其他员工着商务装参会。</p>
                        <p style={{ margin: '0 0 2.5vw 0' }}>3、获奖人员统一着黑色、藏青等深色系外套，浅色衬衣（优先白色），不允许穿大红大绿、蓬松款羽绒服等系列装扮。</p>
                        <p style={{ margin: '0 0 2.5vw 0' }}>4、演职人员如同为获奖人员，请先以获奖人员着装要求完成领奖，随后再更换演出服装。</p>
                        <p style={{ margin: '0' }}>5、目标宣誓环节、司庆仪式环节，上台人员要着正装。</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 尾部背景图片 - 底部显示 */}
        <div style={{ position: 'relative', width: '100%', lineHeight: 0 }}>
          <img 
            src="/images/背景切片/底-太阳.jpg"
            alt="参会须知尾部"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              zIndex: 0,
              margin: 0,
              padding: 0,
              lineHeight: 0,
              display: 'block'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;