'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { config } from '@/config'
import * as XLSX from 'xlsx'

interface DiningInfo {
  name: string
  employeeId: string
  tableNumber: string
  department: string
}

export default function DiningSeatingPage() {
  const router = useRouter()
  const [searchEmployeeId, setSearchEmployeeId] = useState('')
  const [diningData, setDiningData] = useState<DiningInfo[]>([])
  const [loading, setLoading] = useState(true)

  // 从CSV文件读取数据
  useEffect(() => {
    const loadDiningData = async () => {
      try {
        setLoading(true)
        // 读取CSV文件
        const response = await fetch('/data/dining-data.xlsx')
        const csvText = await response.text()
        
        // 解析CSV数据
        const lines = csvText.split('\n').filter(line => line.trim())
        const headers = lines[0].split(',')
        const rawData = lines.slice(1).map(line => {
          const values = line.split(',')
          const row: any = {}
          headers.forEach((header, index) => {
            row[header] = values[index] || ''
          })
          return row
        })
        
        // 转换数据格式
        const formattedData: DiningInfo[] = rawData.map((item: any) => ({
          name: item['姓名'] || '',
          employeeId: item['工号'] || '',
          tableNumber: item['餐桌号'] || '',
          department: item['部门'] || ''
        }))
        
        setDiningData(formattedData)
        console.log('成功加载数据:', formattedData)
      } catch (error) {
        console.error('读取数据失败:', error)
        // 出错时使用空数组
        setDiningData([])
      } finally {
        setLoading(false)
      }
    }

    loadDiningData()
  }, [])

  const filteredResults = useMemo(() => {
    if (!searchEmployeeId.trim()) return []
    const keyword = searchEmployeeId.toLowerCase().trim()
    return diningData.filter(
      (item) =>
        item.employeeId.toLowerCase().includes(keyword) ||
        item.name.toLowerCase().includes(keyword) ||
        item.department.toLowerCase().includes(keyword)
    )
  }, [searchEmployeeId, diningData])

  return (
    <div className="page-container dining-container" style={{ position: 'relative', width: '100%', minHeight: '100vh', minHeight: '100dvh', padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)', boxSizing: 'border-box' }}>
      {/* 整体背景 - 模拟长图效果 */}
      <div 
        className="dining-full-bg"
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
          <img 
            src="/images/notice/notice-bg(1).png"
            alt="餐饮安排头部"
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
          className="dining-content"
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
            className="dining-main"
            style={{ 
              width: '90%',
              maxWidth: '800px',
              padding: '0 5%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* 主卡片 */}
            <div className="w-full bg-white/95 rounded-2xl shadow-xl border-2 border-primary/30 overflow-hidden">
              <div className="bg-gradient-to-r from-primary/80 to-primary/90 px-6 py-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  餐饮座位安排
                </h2>
              </div>

              {/* 内容 - 使用overflow-y-auto实现滚动 */}
              <div className="p-6 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {/* 隐藏滚动条 */}
                <style jsx>{`
                  div::-webkit-scrollbar { display: none; }
                `}</style>
                
                {loading ? (
                  <div className="text-center py-8">
                    <div className="text-4xl block mb-2">⏳</div>
                    <div className="text-gray-700">正在加载数据...</div>
                  </div>
                ) : (
                  <>
                    <div className="mb-0">
                      <div className="relative">
                        <input
                          type="text"
                          value={searchEmployeeId}
                          onChange={(e) => setSearchEmployeeId(e.target.value)}
                        
                          className="w-full px-4 py-2 pl-12 border-2 border-primary/30 rounded-xl focus:border-primary focus:outline-none transition-colors text-lg bg-white placeholder-primary/50"
                          style={{
                            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)'
                          }}
                        />
                        <svg
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>

                    {searchEmployeeId.trim() && (
                      <div className="space-y-3">
                        <div className="text-sm text-gray-600">
                          {filteredResults.length > 0
                            ? `找到 ${filteredResults.length} 位同事`
                            : ' '}
                        </div>

                        {filteredResults.length > 0 && (
                          <div className="space-y-3">
                            {filteredResults.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/20 hover:bg-primary/10 transition-colors"
                              >
                                <div>
                                  <div className="text-lg font-semibold text-gray-800">{item.name}</div>
                                  <div className="text-sm text-gray-600">{item.department}</div>
                                  <div className="text-xs text-gray-500 mt-1">工号: {item.employeeId}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-3xl font-bold text-primary">{item.tableNumber}</div>
                                  <div className="text-xs text-gray-600">餐桌号</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {filteredResults.length === 0 && (
                          <div className="text-center py-8">
                            <div className="text-4xl block mb-2">🔍</div>
                            <div className="text-gray-700">未查询到相关信息，请联系会务组</div>
                            <div className="text-sm text-gray-500 mt-1">请检查输入信息是否正确</div>
                          </div>
                        )}
                      </div>
                    )}

                    {!searchEmployeeId.trim() && (
                      <div className="text-center py-8">
                        <div className="text-4xl block mb-1">🍽️</div>
                        <div className="text-gray-700">输入工号、姓名、部门开始查询</div>
                      </div>
                    )}
                  </>
                )}

                {/* 用餐时间说明 */}
                <div className="mt-4 bg-primary/5 rounded-xl p-4 border border-primary/20">
                  <h4 className="text-md font-semibold text-primary mb-3">用餐时间安排</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="text-primary font-bold mt-1">🍲</div>
                      <div>
                        <div className="text-sm text-gray-800 font-medium">晚餐时间</div>
                        <div className="text-xs text-gray-600">18:30 - 20:00</div>
                      </div>
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
          alt="餐饮安排尾部"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '400px',
            objectFit: 'cover'
          }}
        />
      </div>
    </div>
  )
};
