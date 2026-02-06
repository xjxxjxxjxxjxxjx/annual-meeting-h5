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
        const response = await fetch('/data/餐桌排布(1).csv')
        
        if (!response.ok) {
          throw new Error(`文件请求失败: ${response.status}`)
        }
        
        // 读取文本数据
        const csvText = await response.text()
        
        // 解析CSV数据
        const lines = csvText.split('\n').filter(line => line.trim())
        
        if (lines.length < 2) {
          throw new Error('CSV文件数据不足')
        }
        
        // 获取表头（处理可能的BOM字符和空格）
        const headerLine = lines[0].replace(/^\ufeff/, '').trim()
        const headers = headerLine.split(',').map(header => header.trim())
        
        // 解析数据行
        const rawData = lines.slice(1).map((line, index) => {
          const values = line.split(',').map(value => value.trim())
          const row: any = {}
          headers.forEach((header, i) => {
            row[header] = values[i] || ''
          })
          return row
        })
        
        // 转换数据格式
        const formattedData: DiningInfo[] = rawData.map((item: any) => {
          const formatted = {
            name: item['姓名'] || item['name'] || '',
            employeeId: item['工号'] || item['employeeId'] || item['id'] || '',
            tableNumber: item['餐桌号'] || item['tableNumber'] || item['table'] || '',
            department: item['部门'] || item['department'] || ''
          }
          return formatted
        })
        
        setDiningData(formattedData)
      } catch (error) {
        console.error('读取数据失败:', error)
        // 出错时使用模拟数据作为备用
        const mockData: DiningInfo[] = [
          { name: '张三', employeeId: '001', tableNumber: '1', department: '生产部' },
          { name: '李四', employeeId: '002', tableNumber: '1', department: '生产部' },
          { name: '王五', employeeId: '003', tableNumber: '2', department: '质检部' },
          { name: '赵六', employeeId: '004', tableNumber: '2', department: '质检部' },
          { name: '钱七', employeeId: '005', tableNumber: '3', department: '行政部' },
          { name: '孙八', employeeId: '006', tableNumber: '3', department: '行政部' },
          { name: '周九', employeeId: '007', tableNumber: '4', department: '研发部' },
          { name: '吴十', employeeId: '008', tableNumber: '4', department: '研发部' }
        ]
        setDiningData(mockData)
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
    <div className="page-container dining-container" style={{ position: 'relative', width: '100%', padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* 整体背景 - 模拟长图效果 */}
      <div 
        className="dining-full-bg"
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
            alt="餐饮安排头部"
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
          className="dining-content"
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
            backgroundImage: `url(/images/背景切片/中无.jpg)`,
            backgroundSize: '100.5% 101%',
            backgroundPosition: 'top left',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
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
            className="dining-main"
            style={{ 
              width: '80vw'
            }}
          >
            {/* 主卡片 */}
            <div className="w-full bg-white/95 shadow-xl border-2 border-primary/30 overflow-hidden" style={{ borderRadius: '1.5vw' }}>
              <div style={{ background: '#FAF5BD', padding: '3vw 4vw' }}>
                <h2 style={{ fontSize: '4vw', fontWeight: 'bold', color: '#E5482E', margin: '0' }}>
                  餐饮座位安排
                </h2>
              </div>

              {/* 内容 */}
              <div className="p-6 bg-[#f95d3e]" style={{ padding: '3.5vw' }}>

                
                {loading ? (
                  <div className="text-center py-8">
                    <div className="text-4xl block mb-2">⏳</div>
                    <div className="text-white">正在加载数据...</div>
                  </div>
                ) : (
                  <>
                    <div className="mb-0">
                      <div className="relative">
                        <input
                          type="text"
                          value={searchEmployeeId}
                          onChange={(e) => setSearchEmployeeId(e.target.value)}
                        
                          className="w-full px-4 py-2 pl-12 border-2 border-[#FAF5BD] rounded-xl focus:border-[#FAF5BD] focus:outline-none transition-colors text-lg bg-[#E5482E] text-white placeholder-white/70"
                          style={{
                            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                            padding: '3vw 5vw 3vw 18vw',
                            fontSize: '4vw'
                          }}
                        />
                        <svg
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{ width: '4.8vw', height: '4.8vw', left: '4.5vw' }}
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
                      <div className="space-y-3" style={{ gap: '1.5vw', marginTop: '1.5vw' }}>
                        <div className="text-sm text-white" style={{ fontSize: '2.8vw' }}>
                          {filteredResults.length > 0
                            ? `找到 ${filteredResults.length} 位同事`
                            : '未找到相关信息'}
                        </div>

                        {filteredResults.length > 0 && (
                          <div className="space-y-3" style={{ gap: '1.5vw' }}>
                            {filteredResults.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-white/20 rounded-2xl border border-white/30 hover:bg-white/30 transition-colors"
                              style={{ padding: '1.5vw', gap: '1.5vw', borderRadius: '1vw' }}
                              >
                                <div>
                                  <div className="text-lg font-semibold text-white" style={{ fontSize: '3vw' }}>{item.name}</div>
                                  <div className="text-sm text-white/80" style={{ fontSize: '2.5vw' }}>工号: {item.employeeId}</div>
                                  <div className="text-sm text-white/80" style={{ fontSize: '2.5vw' }}>部门: {item.department}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-3xl font-bold text-white" style={{ fontSize: '4vw' }}>{item.tableNumber}</div>
                                  <div className="text-xs text-white/80" style={{ fontSize: '2.2vw' }}>餐桌号</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {filteredResults.length === 0 && (
                          <div className="text-center py-4">
                            <div className="text-4xl block mb-2">🔍</div>
                            <div className="text-white" style={{ fontSize: '2.8vw' }}>未查询到相关信息，请联系会务组</div>
                            <div className="text-sm text-white/80 mt-1" style={{ fontSize: '2.5vw' }}>请检查输入信息是否正确</div>
                          </div>
                        )}
                      </div>
                    )}

                    {!searchEmployeeId.trim() && (
                      <div className="text-center py-4">
                        <div className="block mb-1" style={{ fontSize: '6vw' }}>🍽️</div>
                        <div className="text-white" style={{ fontSize: '2.8vw' }}>输入工号、姓名、部门开始查询</div>
                      </div>
                    )}
                  </>
                )}

                {/* 用餐时间说明 */}
                <div className="mt-4 bg-[#f7714d] p-4 border border-[#FAF5BD]" style={{ borderRadius: '1vw', padding: '1.5vw' }}>
                  <h4 className="text-md font-semibold text-white mb-3" style={{ fontSize: '3vw' }}>用餐时间安排</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div>
                        <div className="text-sm text-white font-medium" style={{ fontSize: '2.8vw' }}>晚餐时间</div>
                        <div className="text-xs text-white/80" style={{ fontSize: '2.5vw' }}>17:30 - 20:00</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 餐位分布图 */}
                  <div className="mt-4 space-y-4">
                    <div>
                      <h5 className="text-sm text-white font-medium mb-2" style={{ fontSize: '2.8vw' }}>九州厅用餐排布图</h5>
                      <div 
                        className="relative overflow-hidden border-2 border-primary/30 hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        style={{ borderRadius: '1vw', overflow: 'hidden', cursor: 'default' }}
                      >
                        <img 
                          src="/images/微官网素材0203/餐位分布图1.jpg" 
                          alt="九州厅用餐排布图" 
                          className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105"
                          style={{ width: '100%', height: 'auto', cursor: 'default' }}
                        />
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm text-white font-medium mb-2" style={{ fontSize: '2.8vw' }}>国宾厅用餐排布图</h5>
                      <div 
                        className="relative overflow-hidden border-2 border-primary/30 hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        style={{ borderRadius: '1vw', overflow: 'hidden', cursor: 'default' }}
                      >
                        <img 
                          src="/images/微官网素材0203/餐位分布图2.jpg" 
                          alt="国宾厅用餐排布图" 
                          className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105"
                          style={{ width: '100%', height: 'auto', cursor: 'default' }}
                        />
                      </div>
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
            alt="餐饮安排尾部"
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
};
