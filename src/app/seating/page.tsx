'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { config } from '@/config'

export default function SeatLayoutPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  // 控制原图查看模态框的显示/隐藏
  const [showOriginalImage, setShowOriginalImage] = useState(false)
  // 控制图片的缩放和位置
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  /**
   * 打开原图查看模态框
   */
  const handleOpenOriginalImage = () => {
    // 重置缩放和位置
    setScale(1)
    setPosition({ x: 0, y: 0 })
    setShowOriginalImage(true)
  }

  /**
   * 关闭原图查看模态框
   */
  const handleCloseOriginalImage = () => {
    setShowOriginalImage(false)
  }

  // 触摸事件相关变量，使用 useRef 存储以避免组件重新渲染时被重置
  const initialDistance = useRef(0)
  const initialScale = useRef(1)
  const initialPosition = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)

  /**
   * 处理触摸开始事件
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      // 单指触摸，准备拖动
      isDragging.current = true
      initialPosition.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      }
    } else if (e.touches.length === 2) {
      // 双指触摸，准备缩放
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      initialDistance.current = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      )
      initialScale.current = scale
    }
  }

  /**
   * 处理触摸移动事件
   */
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging.current) {
      // 单指拖动
      const newX = e.touches[0].clientX - initialPosition.current.x
      const newY = e.touches[0].clientY - initialPosition.current.y
      setPosition({ x: newX, y: newY })
    } else if (e.touches.length === 2) {
      // 双指缩放
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const currentDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      )
      if (initialDistance.current > 0) {
        const newScale = Math.max(0.5, Math.min(3, initialScale.current * (currentDistance / initialDistance.current)))
        setScale(newScale)
      }
    }
  }

  /**
   * 处理触摸结束事件
   */
  const handleTouchEnd = () => {
    isDragging.current = false
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
            justifyContent: 'center',
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
              <div className="p-6 bg-[#f95d3e]" style={{ padding: '1vw' }}>
              

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {/* 座位分区图 */}
                  <div 
                    className="relative overflow-hidden border-2 border-primary/30 hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 delay-200"
                    style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(4px)', borderRadius: '2vw', minHeight: '200px', maxWidth: '90%', padding: 0, margin: 0, cursor: 'default' }}
                  >
                    {/* 使用图片替换HTML结构 */}
                    <img 
                      src="/images/微官网素材0203/座位分布图.png" 
                      alt="座位分区图" 
                      className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105 cursor-pointer"
                      style={{ height: 'auto', width: '100%', margin: 0, padding: 0, display: 'block', cursor: 'pointer' }}
                      onClick={handleOpenOriginalImage}
                      title="点击查看原图"
                    />
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

      {/* 原图查看模态框 */}
      {showOriginalImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={handleCloseOriginalImage}
        >
          <div 
            className="relative max-w-full max-h-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <button
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
              onClick={handleCloseOriginalImage}
              aria-label="关闭"
            >
              ×
            </button>
            {/* 原图显示容器 */}
            <div
              className="relative max-w-full max-h-[90vh] overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              style={{ touchAction: 'none' }}
            >
              {/* 原图显示 */}
              <img 
                src="/images/微官网素材0203/座位分布图.png" 
                alt="座位分区图原图" 
                className="max-w-full max-h-[90vh] object-contain transition-transform duration-100"
                style={{
                  transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  )
};
