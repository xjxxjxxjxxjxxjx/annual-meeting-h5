'use client'

import { useRouter } from 'next/navigation'
import { config } from '@/config'

const contactItems = [
  {
    icon: '👨‍💼',
    title: '年会总协调',
    name: '张主任',
    phone: '138-0001-0001',
  },
  {
    icon: '👩‍💼',
    title: '会务组',
    name: '李经理',
    phone: '138-0002-0002',
  },
  {
    icon: '👨‍💻',
    title: '技术组',
    name: '王工',
    phone: '138-0003-0003',
  },
  {
    icon: '🚗',
    title: '车辆调度',
    name: '赵师傅',
    phone: '138-0004-0004',
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
    <div className="page-container support-container" style={{ position: 'relative', width: '100%', minHeight: '100vh', minHeight: '100dvh', padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)', boxSizing: 'border-box' }}>
      {/* 整体背景 - 模拟长图效果 */}
      <div 
        className="support-full-bg"
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
            alt="会务保障头部"
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
          className="support-content"
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1vw 0',
            overflowY: 'auto'
          }}
        >
          {/* 主内容区域 */}
          <div 
            className="support-main"
            style={{ 
              width: '80vw'
            }}
          >
            {/* 主卡片 */}
            <div className="w-full bg-white/95 shadow-xl border-2 border-primary/30 overflow-hidden" style={{ borderRadius: '1.5vw' }}>
              <div className="bg-gradient-to-r from-primary/80 to-primary/90 px-6 py-3" style={{ padding: '3vw 4vw' }}>
                <h2 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontSize: '4vw' }}>
                  会务保障与联系方式
                </h2>
              </div>

              {/* 内容 - 使用overflow-y-auto实现滚动 */}
              <div className="p-6 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', padding: '3.5vw' }}>
                {/* 隐藏滚动条 */}
                <style jsx>{`
                  div::-webkit-scrollbar { display: none; }
                `}</style>
                
                <p className="text-gray-600 text-sm mb-1 text-center" style={{ fontSize: '3.5vw', marginBottom: '1.5vw' }}>
                  如有任何问题，请随时联系以下工作人员
                </p>

                <div className="space-y-4" style={{ gap: '1.5vw' }}>
                  {contactItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/20 hover:bg-primary/10 transition-colors"
                      style={{ padding: '1.5vw', gap: '1.5vw', borderRadius: '1vw' }}
                    >
                      <div className="flex items-center gap-4" style={{ gap: '1.5vw' }}>
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl" style={{ width: '8vw', height: '8vw', fontSize: '4vw' }}>
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm text-gray-600" style={{ fontSize: '2.5vw' }}>{item.title}</p>
                          <p className="text-lg font-semibold text-gray-800" style={{ fontSize: '3vw' }}>{item.name}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCall(item.phone)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
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

                <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/20" style={{ marginTop: '2vw', padding: '1.5vw', gap: '1.5vw', borderRadius: '1vw' }}>
                  <div className="flex items-start gap-3" style={{ gap: '1.5vw' }}>
                    <span className="text-2xl" style={{ fontSize: '3.5vw' }}>💡</span>
                    <div>
                      <p className="text-sm font-medium text-primary mb-1" style={{ fontSize: '2.8vw', marginBottom: '0.8vw' }}>温馨提示</p>
                      <p className="text-sm text-gray-600" style={{ fontSize: '2.5vw' }}>
                        请在工作时间（9:00-18:00）内联系会务组，其他紧急事务可随时拨打年会总协调电话。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 尾部背景图片 - 底部显示 */}
        <img 
          src="/images/notice/notice-bg(600).png"
          alt="会务保障尾部"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            zIndex: 1
          }}
        />
      </div>
    </div>
  )
}
