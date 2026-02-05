'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { config } from '@/config'

export default function SeatLayoutPage() {
  const router = useRouter()
  const [showFullImage, setShowFullImage] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // 缩放和拖拽相关状态
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 })
  
  // 重置缩放和位置
  const resetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // 处理点击图片（关闭查看器）
  const handleImageClick = () => {
    setShowFullImage(false)
    resetZoom() // 关闭时重置缩放和位置
  }

  // 鼠标/触摸开始事件
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (scale === 1) return // 未缩放时不允许拖拽
    
    setIsDragging(true)
    if ('touches' in e) {
      const touch = e.touches[0]
      setStartDrag({ x: touch.clientX - position.x, y: touch.clientY - position.y })
    } else {
      setStartDrag({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  // 鼠标/触摸移动事件
  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    
    let clientX, clientY
    if ('touches' in e) {
      const touch = e.touches[0]
      clientX = touch.clientX
      clientY = touch.clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }
    
    setPosition({ 
      x: clientX - startDrag.x, 
      y: clientY - startDrag.y 
    })
  }

  // 鼠标/触摸结束事件
  const handleEnd = () => {
    setIsDragging(false)
  }

  // 鼠标滚轮缩放
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setScale(prev => Math.max(1, Math.min(5, prev * delta)))
  }

  // 触摸缩放事件
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
      setStartDrag({ x: distance, y: distance })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault()
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const currentDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
      const scaleFactor = currentDistance / startDrag.x
      setScale(prev => Math.max(1, Math.min(5, prev * scaleFactor)))
    }
  }

  return (
    <div className="page-container seating-container" style={{ position: 'relative', width: '100%', padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* 整体背景 - 模拟长图效果 */}
      <div 
        className="seating-full-bg"
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
            alt="座位排布头部"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              zIndex: 1,
              display: 'block'
            }}
          />
        </div>
        
        {/* 中间内容区域 - 可拉伸 */}
        <div 
          className="seating-content"
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
            backgroundImage: `url(/images/背景切片/中无.jpg)`,
            backgroundSize: '100.5% 101%',
            backgroundPosition: 'top left',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '4vw 0',
            minHeight: 0,
            marginTop: '-1px',
            marginBottom: '-3px',
            zIndex: 1
          }}
        >

          {/* 主内容区域 */}
          <div 
            className="seating-main"
            style={{ 
              width: '80vw'
            }}
          >
            {/* 主卡片 */}
            <div className="w-full bg-white/95 shadow-xl border-2 border-primary/30 overflow-hidden transition-all duration-500" style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(8px)', borderRadius: '1.5vw' }}>
              {/* 头部 */}
              <div style={{ background: '#FAF5BD', padding: '3vw 4vw' }}>
                <h2 style={{ fontSize: '4vw', fontWeight: 'bold', color: '#E5482E', margin: '0' }}>
                  会场平面图与座位分区
                </h2>
              </div>

              {/* 内容 */}
              <div className="p-6 bg-[#f95d3e]" style={{ padding: '3.5vw' }}>
              

                <div>
                  {/* 座位分区图 */}
                  <div 
                    className="relative cursor-pointer overflow-hidden border-2 border-primary/30 hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 delay-200"
                    style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(4px)', borderRadius: '2vw', minHeight: '200px' }}
                    onClick={() => setShowFullImage(true)}
                  >
                    {/* 使用图片替换HTML结构 */}
                    <img 
                      src={config.images.seatingMap} 
                      alt="座位分区图" 
                      className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105"
                      style={{ height: 'auto', width: '100%' }}
                    />
                    
                    {/* 图片遮罩效果 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#E5482E]/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* 查看大图提示 */}
                    <div className="absolute bottom-3 right-3 bg-[#FAF5BD] text-[#E5482E] text-xs px-3 py-1 rounded-full flex items-center gap-1 hover:bg-[#FAF5BD]/90 transition-all duration-300 transform hover:scale-105 shadow-lg" style={{ bottom: '3vw', right: '3vw', padding: '1vw 3vw', gap: '1vw' }}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '3vw', height: '3vw' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span style={{ fontSize: '2.4vw' }}>查看大图</span>
                    </div>
                  </div>
                </div>
                <div>
                  {/* 分区说明 */}
                  <div className="mt-6 bg-[#f7714d] p-5 border border-[#FAF5BD] transition-all duration-500 delay-300" style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(4px)', marginTop: '3vw', padding: '2.5vw', gap: '1.5vw', borderRadius: '1.5vw' }}>
                    <h4 className="text-md font-semibold text-white mb-4 flex items-center gap-2" style={{ fontSize: '3.5vw', marginBottom: '2vw', gap: '1.2vw' }}>
                      <span style={{ fontSize: '4vw' }}></span>
                      分区说明
                    </h4>
                    <div className="space-y-3" style={{ gap: '2vw' }}>
                      {[
                        { area: 'A/B区', desc: '高管及特邀嘉宾' },
                        { area: 'C/D区', desc: '研发部门与技术团队' },
                        { area: 'E/F区', desc: '市场销售与运营团队' },
                        { area: 'G/H区', desc: '行政财务与后勤支持' }
                      ].map((item, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-4 p-3 bg-[#f7714d] rounded-lg hover:bg-[#f7714d]/90 transition-all duration-300 transform hover:translate-x-2 hover:shadow-md border border-[#FAF5BD]"
                          style={{ opacity: isLoaded ? 1 : 0, transitionDelay: `${400 + index * 100}ms`, padding: '2.5vw', gap: '2vw' }}
                        >
                          <div className="font-bold min-w-[60px] text-center bg-[#FAF5BD] rounded-full py-1 px-3" style={{ minWidth: '16vw', padding: '0.6vw 2vw', fontSize: '2.8vw', color: '#e5482e' }}>{item.area}</div>
                          <div className="text-sm text-white flex-1" style={{ fontSize: '2.8vw' }}>{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 尾部背景图片 - 底部显示 */}
        <div style={{ position: 'relative', width: '100%', lineHeight: 0 }}>
          <img 
            src="/images/背景切片/底-太阳.jpg"
            alt="座位排布尾部"
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

      {/* 全屏图片预览 */}
      {showFullImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-0" 
        >
          {/* 顶部按钮 */}
          <div className="absolute top-4 right-4 flex gap-3 z-50">
            {/* 重置按钮 */}
            <button
              onClick={resetZoom}
              className="bg-primary/80 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-primary transition-all duration-300 transform hover:scale-110"
              title="重置视角"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            
            {/* 关闭按钮 */}
            <button
              onClick={() => {
                setShowFullImage(false)
                resetZoom()
              }}
              className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/80 transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 图片查看区域 */}
          <div 
            className="relative w-full h-full overflow-hidden"
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={(e) => {
              handleTouchStart(e)
              handleStart(e)
            }}
            onTouchMove={(e) => {
              handleTouchMove(e)
              handleMove(e)
            }}
            onTouchEnd={handleEnd}
            onWheel={handleWheel}
            style={{ touchAction: 'none' }}
          >
            {/* 缩放容器 */}
            <div 
              className="absolute inset-0 flex items-center justify-center" 
              style={{
                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out'
              }}
            >
              {/* 完整座位图 */}
              <img 
                src={config.images.seatingMap} 
                alt="完整座位排布图" 
                className="max-w-full max-h-full object-contain"
                style={{
                  userSelect: 'none',
                  cursor: scale > 1 ? 'grab' : 'default'
                }}
              />
            </div>
          </div>
          
          {/* 操作提示 */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary/80 text-white text-xs px-4 py-2 rounded-full flex items-center gap-1 shadow-lg">
            <span>💡</span>
            <div>
              双指缩放查看细节 | 单指拖拽移动 | 点击重置
            </div>
          </div>
        </div>
      )}
    </div>
  )
};
