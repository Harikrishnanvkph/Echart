"use client"

import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChartTypeSelector } from '@/components/chart-type-selector'
import { ConfigurationPanel } from '@/components/configuration-panel'
import { CHART_TYPES } from '@/lib/chart-types-config'
import { exportManager } from '@/lib/export/export-manager'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Download,
  Upload,
  Share2,
  Save,
  Code,
  Image,
  FileText,
  Database,
  Settings,
  Palette,
  Layout,
  BarChart3,
  Menu,
  Cloud,
  Users,
  History,
  Sparkles,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

export default function EditorPage() {
  const [selectedChartType, setSelectedChartType] = useState('line')
  const [chartConfig, setChartConfig] = useState<any>({})
  const [chartData, setChartData] = useState<any[]>([])
  const [activePanel, setActivePanel] = useState('charts')
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [showDataDialog, setShowDataDialog] = useState(false)
  const chartRef = useRef<any>(null)

  // Initialize with sample data
  useEffect(() => {
    const sampleData = [
      { name: 'Mon', value: 120, category: 'A' },
      { name: 'Tue', value: 200, category: 'B' },
      { name: 'Wed', value: 150, category: 'A' },
      { name: 'Thu', value: 80, category: 'C' },
      { name: 'Fri', value: 70, category: 'B' },
      { name: 'Sat', value: 110, category: 'A' },
      { name: 'Sun', value: 130, category: 'C' }
    ]
    setChartData(sampleData)
    updateChartConfig('line', sampleData)
  }, [])

  const updateChartConfig = (type: string, data: any[]) => {
    const chartType = CHART_TYPES[type]
    if (!chartType) return

    // Build ECharts option based on chart type
    const option: any = {
      title: {
        text: 'Interactive Chart',
        subtext: 'Powered by ECharts',
        left: 'center'
      },
      tooltip: {
        trigger: type === 'pie' ? 'item' : 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        bottom: 0,
        data: [...new Set(data.map(d => d.category))]
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      toolbox: {
        feature: {
          dataZoom: { show: true },
          dataView: { show: true },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      ...chartConfig
    }

    // Configure based on chart type
    switch (type) {
      case 'line':
      case 'bar':
      case 'area':
        option.xAxis = {
          type: 'category',
          data: data.map(d => d.name),
          ...chartConfig.xAxis
        }
        option.yAxis = {
          type: 'value',
          ...chartConfig.yAxis
        }
        option.series = [{
          name: 'Series 1',
          type: type === 'area' ? 'line' : type,
          data: data.map(d => d.value),
          areaStyle: type === 'area' ? {} : undefined,
          smooth: type === 'line',
          ...chartConfig.series?.[0]
        }]
        break

      case 'pie':
      case 'doughnut':
        option.series = [{
          name: 'Data',
          type: 'pie',
          radius: type === 'doughnut' ? ['40%', '70%'] : '70%',
          data: data.map(d => ({ name: d.name, value: d.value })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          ...chartConfig.series?.[0]
        }]
        break

      case 'scatter':
        option.xAxis = { type: 'value', ...chartConfig.xAxis }
        option.yAxis = { type: 'value', ...chartConfig.yAxis }
        option.series = [{
          name: 'Scatter',
          type: 'scatter',
          data: data.map(d => [d.value, Math.random() * 100]),
          symbolSize: 10,
          ...chartConfig.series?.[0]
        }]
        break

      case 'radar':
        option.radar = {
          indicator: data.map(d => ({ name: d.name, max: 250 }))
        }
        option.series = [{
          name: 'Radar',
          type: 'radar',
          data: [{
            value: data.map(d => d.value),
            name: 'Data'
          }],
          ...chartConfig.series?.[0]
        }]
        break

      case 'gauge':
        option.series = [{
          name: 'Gauge',
          type: 'gauge',
          data: [{ value: data[0]?.value || 50, name: 'Score' }],
          detail: { formatter: '{value}' },
          ...chartConfig.series?.[0]
        }]
        break

      case 'funnel':
        option.series = [{
          name: 'Funnel',
          type: 'funnel',
          data: data.map(d => ({ name: d.name, value: d.value })).sort((a, b) => b.value - a.value),
          ...chartConfig.series?.[0]
        }]
        break

      case 'heatmap':
        const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a']
        const days = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday']
        const heatmapData = []
        for (let i = 0; i < 7; i++) {
          for (let j = 0; j < 12; j++) {
            heatmapData.push([j, i, Math.floor(Math.random() * 10)])
          }
        }
        option.xAxis = { type: 'category', data: hours }
        option.yAxis = { type: 'category', data: days }
        option.visualMap = {
          min: 0,
          max: 10,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%'
        }
        option.series = [{
          name: 'Heatmap',
          type: 'heatmap',
          data: heatmapData,
          label: { show: true },
          ...chartConfig.series?.[0]
        }]
        break

      default:
        // Default configuration for other chart types
        option.xAxis = { type: 'category', data: data.map(d => d.name) }
        option.yAxis = { type: 'value' }
        option.series = [{
          type: type,
          data: data.map(d => d.value)
        }]
    }

    setChartConfig(option)
  }

  const handleChartTypeChange = (type: string) => {
    setSelectedChartType(type)
    updateChartConfig(type, chartData)
  }

  const handleConfigChange = (path: string, value: any) => {
    const keys = path.split('.')
    const newConfig = { ...chartConfig }
    let current = newConfig
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {}
      }
      current = current[keys[i]]
    }
    
    current[keys[keys.length - 1]] = value
    setChartConfig(newConfig)
  }

  const handleExport = async (format: string) => {
    if (!chartRef.current) return

    try {
      switch (format) {
        case 'png':
        case 'jpg':
        case 'svg':
          await exportManager.exportAsImage(
            chartRef.current.getDom(),
            format as any,
            { filename: `chart.${format}` }
          )
          break
        case 'pdf':
          await exportManager.exportAsPDF(
            chartRef.current.getDom(),
            { filename: 'chart.pdf' }
          )
          break
        case 'json':
          await exportManager.exportAsJSON(chartConfig, { filename: 'chart-config.json' })
          break
        case 'html':
          await exportManager.exportAsHTML(chartConfig, chartData, { filename: 'chart.html' })
          break
        case 'csv':
          await exportManager.exportAsCSV(chartData, Object.keys(chartData[0] || {}).map(k => ({ id: k, name: k })), { filename: 'data.csv' })
          break
        case 'excel':
          await exportManager.exportAsExcel(chartData, Object.keys(chartData[0] || {}).map(k => ({ id: k, name: k })), { filename: 'data.xlsx' })
          break
      }
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  const handleCodeExport = async (framework: string) => {
    await exportManager.exportAsCode(chartConfig, framework as any, { filename: `chart.${framework}` })
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b px-4 py-3 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">ECharts Studio</span>
            <Badge variant="secondary">Pro</Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <Cloud className="h-4 w-4" />
            Save to Cloud
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Users className="h-4 w-4" />
            Collaborate
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <History className="h-4 w-4" />
            Version History
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Image className="mr-2 h-4 w-4" />
                  Export as Image
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => handleExport('png')}>PNG</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('jpg')}>JPG</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('svg')}>SVG</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('pdf')}>PDF</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <FileText className="mr-2 h-4 w-4" />
                  Export Data
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => handleExport('csv')}>CSV</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('excel')}>Excel</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('json')}>JSON</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Code className="mr-2 h-4 w-4" />
                  Export Code
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => handleCodeExport('react')}>React</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCodeExport('vue')}>Vue</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCodeExport('angular')}>Angular</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCodeExport('svelte')}>Svelte</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCodeExport('vanilla')}>Vanilla JS</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleExport('html')}>
                <Layout className="mr-2 h-4 w-4" />
                Export as HTML
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Sidebar */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <Tabs value={activePanel} onValueChange={setActivePanel} className="h-full flex flex-col">
              <TabsList className="w-full justify-start rounded-none border-b h-auto p-0">
                <TabsTrigger value="charts" className="rounded-none data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Charts
                </TabsTrigger>
                <TabsTrigger value="data" className="rounded-none data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Data
                </TabsTrigger>
                <TabsTrigger value="themes" className="rounded-none data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Themes
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="charts" className="flex-1 m-0">
                <ChartTypeSelector 
                  onSelectChart={handleChartTypeChange}
                  selectedChart={selectedChartType}
                />
              </TabsContent>
              
              <TabsContent value="data" className="flex-1 p-4">
                <div className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Data
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Database className="mr-2 h-4 w-4" />
                    Connect Database
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Current data: {chartData.length} rows
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="themes" className="flex-1 p-4">
                <div className="grid grid-cols-2 gap-2">
                  {['Default', 'Dark', 'Vintage', 'Macarons', 'Shine', 'Roma'].map(theme => (
                    <Button key={theme} variant="outline" size="sm" className="justify-start">
                      <Palette className="mr-2 h-4 w-4" />
                      {theme}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>

          <ResizableHandle />

          {/* Center - Chart Preview */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col">
              <div className="border-b px-4 py-2 flex items-center justify-between bg-muted/50">
                <div className="flex items-center gap-2">
                  <Badge>{CHART_TYPES[selectedChartType]?.label || 'Chart'}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {CHART_TYPES[selectedChartType]?.description}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Pause className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 p-4">
                {chartConfig && Object.keys(chartConfig).length > 0 && (
                  <ReactECharts
                    option={chartConfig}
                    style={{ height: '100%', width: '100%' }}
                    theme="default"
                    opts={{ renderer: 'svg' }}
                    onChartReady={(instance) => {
                      chartRef.current = instance
                    }}
                  />
                )}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Sidebar - Configuration */}
          <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
            <ConfigurationPanel 
              config={chartConfig}
              onConfigChange={handleConfigChange}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Status Bar */}
      <div className="border-t px-4 py-2 flex items-center justify-between text-sm bg-muted/50">
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">Ready</span>
          <Badge variant="outline">35+ Chart Types</Badge>
          <Badge variant="outline">500+ Options</Badge>
          <Badge variant="outline">Real-time Sync</Badge>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-7 gap-1">
            <Sparkles className="h-3 w-3" />
            Animation: On
          </Button>
          <Button variant="ghost" size="sm" className="h-7 gap-1">
            <Settings className="h-3 w-3" />
            Performance: Optimized
          </Button>
        </div>
      </div>
    </div>
  )
}