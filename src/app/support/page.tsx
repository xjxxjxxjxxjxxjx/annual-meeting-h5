'use client'

import { useRouter } from 'next/navigation'
import { config } from '@/config'

const contactItems = [
  {
    icon: '/images/微官网素材0203/联系人icon.png',
    title: '会务总调度',
    name: '刘鹰',
    phone: '18274859888',
    extension: '6888'
  },
  {
    icon: '/images/微官网素材0203/联系人icon.png',
    title: '会务总调度',
    name: '周霞',
    phone: '18874080692',
    extension: '61092'
  },
  {
    icon: '/images/微官网素材0203/联系人icon.png',
    title: '专项事务保障组',
    duty: '餐饮、交通、物资等后勤保障',
    name: '赵爽（九典本部）',
    phone: '13974869527'
  },
  {
    icon: '/images/微官网素材0203/联系人icon.png',
    title: '专项事务保障组',
    duty: '餐饮、交通、物资等后勤保障',
    name: '刘娟（九典生产中心）',
    phone: '15874957066',
    extension: '67066'
  },
  {
    icon: '/images/微官网素材0203/联系人icon.png',
    title: '专项事务保障组',
    duty: '餐饮、交通、物资等后勤保障',
    name: '王谦志（九典宏阳）',
    phone: '13787192334',
    extension: '6222'
  },
  {
    icon: '/images/微官网素材0203/联系人icon.png',
    title: '会场安全与秩序组',
    duty: '负责人员引导、出入口管理、现场秩序维护',
    name: '吴波',
    phone: '15581032093'
  },
  {
    icon: '/images/微官网素材0203/联系人icon.png',
    title: '会场安全与秩序组',
    duty: '负责人员引导、出入口管理、现场秩序维护',
    name: '郭跃华',
    phone: '13973791088',
    extension: '61088'
  },
]

export default function ContactPage() {
  const router = useRouter()

  const handleCall = (phone: string) => {
    // 清理电话号码，移除可能的分隔符
    const cleanPhone = phone.replace(/-/g, '')
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const telLink = `tel:${cleanPhone}`
    
    if (isMobile) {
      // 移动端直接跳转
      window.location.href = telLink
    } else {
      // 桌面端提供复制选项
      const confirmCall = confirm(`您正在使用桌面设备，无法直接拨打电话。\n\n电话：${phone}\n\n点击"确定"复制电话号码，"取消"关闭`)
      if (confirmCall) {
        // 复制电话号码到剪贴板
        navigator.clipboard.writeText(cleanPhone).then(() => {
          alert(`电话号码已复制到剪贴板：${cleanPhone}`)
        }).catch(err => {
          alert(`无法复制电话号码，您可以手动记录：${cleanPhone}`)
        })
      }
    }
  }

  return (
    <div className="page-container support-container" style={{ position: 'relative', width: '100%', height: '100vh', height: '100dvh', padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* 整体背景 - 模拟长图效果 */}
      <div 
        className="support-full-bg"
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
            src="/images/背景切片/logo右.jpg"
            alt="会务保障头部"
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
            backgroundImage: `url(/images/背景切片/中无.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            zIndex: 1
          }} />
        </div>
        
        {/* 中间内容区域 - 可拉伸 */}
        <div 
          className="support-content"
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
            backgroundImage: `url(/images/背景切片/中无.jpg)`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'top left',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1vw 0',
            overflowY: 'auto',
            minHeight: 0
          }}
        >
          {/* 主内容区域 */}
          <div 
            className="support-main"
            style={{ 
              width: '80vw',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start'
            }}
          >
            {/* 主卡片 */}
            <div className="w-full bg-white/95 shadow-xl border-2 border-primary/30 overflow-hidden" style={{ borderRadius: '1.5vw' }}>
              <div style={{ background: '#FAF5BD', padding: '3vw 4vw' }}>
                <h2 style={{ fontSize: '4vw', fontWeight: 'bold', color: '#E5482E', margin: '0' }}>
                  会务保障与联系方式
                </h2>
              </div>

              {/* 内容 - 使用overflow-y-auto实现滚动 */}
              <div className="p-6 overflow-y-auto bg-[#f95d3e]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', padding: '3.5vw' }}>
                {/* 隐藏滚动条 */}
                <style jsx>{`
                  div::-webkit-scrollbar { display: none; }
                `}</style>
                
                <div className="space-y-4" style={{ gap: '1.5vw' }}>
                  {contactItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-[#E5482E] rounded-2xl border border-[#FAF5BD] hover:bg-[#E5482E]/90 transition-colors"
                      style={{ padding: '1.5vw', gap: '1.5vw', borderRadius: '1vw' }}
                    >
                      <div className="flex items-center gap-4" style={{ gap: '1.5vw' }}>
                        <div className="w-14 h-14 bg-[#FAF5BD] rounded-2xl flex items-center justify-center" style={{ width: '8vw', height: '8vw' }}>
                          <img src={item.icon} alt="联系人图标" style={{ width: '60%', height: '60%', objectFit: 'contain' }} />
                        </div>
                        <div>
                          <p className="text-sm text-white" style={{ fontSize: '2.5vw' }}>{item.title}</p>
                          {item.duty && (
                            <p className="text-xs text-white/80" style={{ fontSize: '2.2vw', marginBottom: '0.5vw' }}>{item.duty}</p>
                          )}
                          <p className="text-lg font-semibold text-white" style={{ fontSize: '3vw' }}>{item.name}</p>
                          {item.extension && (
                            <p className="text-xs text-white/80" style={{ fontSize: '2.2vw' }}>分机: {item.extension}</p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCall(item.phone)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#FAF5BD] text-[#E5482E] rounded-xl hover:bg-[#FAF5BD]/90 transition-colors"
                        style={{ padding: '1.2vw 3vw', gap: '0.8vw' }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '3vw', height: '3vw' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="font-medium" style={{ fontSize: '2.5vw' }}>拨打</span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-[#f7714d] rounded-2xl border border-[#FAF5BD]" style={{ marginTop: '2vw', padding: '1.5vw', gap: '1.5vw', borderRadius: '1vw' }}>
                  <div className="flex items-start gap-3" style={{ gap: '1.5vw' }}>
                    <span className="text-2xl" style={{ fontSize: '3.5vw' }}>⚠️</span>
                    <div>
                      <p className="text-sm font-medium text-white mb-1" style={{ fontSize: '2.8vw', marginBottom: '0.8vw' }}>紧急联系</p>
                      <p className="text-sm text-white/80" style={{ fontSize: '2.5vw' }}>
                        如遇任何突发情况或需要帮助，请第一时间联系现场工作人员。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
            backgroundImage: `url(/images/背景切片/中无.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom center',
            zIndex: 1
          }} />
          <img 
            src="/images/背景切片/底-太阳.jpg"
            alt="会务保障尾部"
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
  )
}
