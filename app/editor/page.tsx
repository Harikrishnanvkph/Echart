"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Download,
  Upload,
  RefreshCw,
  Settings,
  BarChart3,
  LineChart,
  PieChart,
  ScatterChart,
  AreaChart,
  FileJson,
  FileImage,
  Code2,
  Palette,
  Database,
  Plus,
  Trash2,
  Copy,
  Save,
  Wrench
} from 'lucide-react'
import { ToolsPanel } from '@/components/tools-panel'

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

// Chart type definitions
const CHART_TYPES = [
  { id: 'line', name: 'Line Chart', icon: LineChart },
  { id: 'bar', name: 'Bar Chart', icon: BarChart3 },
  { id: 'pie', name: 'Pie Chart', icon: PieChart },
  { id: 'scatter', name: 'Scatter Plot', icon: ScatterChart },
  { id: 'area', name: 'Area Chart', icon: AreaChart },
  { id: 'radar', name: 'Radar Chart', icon: BarChart3 },
  { id: 'gauge', name: 'Gauge Chart', icon: BarChart3 },
  { id: 'funnel', name: 'Funnel Chart', icon: BarChart3 },
  { id: 'heatmap', name: 'Heatmap', icon: BarChart3 },
]

// Color themes
const COLOR_THEMES = {
  default: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  dark: ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373', '#73b9bc', '#7289ab'],
  colorful: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074'],
  warm: ['#ff7f50', '#ff6347', '#ffa500', '#ffd700', '#ff8c00', '#ff4500', '#dc143c', '#b22222', '#8b0000'],
  cool: ['#00ced1', '#4682b4', '#1e90ff', '#0000ff', '#4169e1', '#6495ed', '#00bfff', '#87ceeb', '#87cefa'],
}

// Sample data generator
const generateSampleData = (type: string, points: number = 7) => {
  const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const data = []
  
  for (let i = 0; i < points; i++) {
    data.push({
      name: categories[i] || `Cat ${i + 1}`,
      value: Math.floor(Math.random() * 100) + 20,
      value2: Math.floor(Math.random() * 100) + 20,
    })
  }
  
  return data
}

export default function EditorPage() {
  // State management
  const [selectedChart, setSelectedChart] = useState('line')
  const [chartData, setChartData] = useState(() => generateSampleData('line'))
  const [chartTitle, setChartTitle] = useState('My Chart')
  const [chartSubtitle, setChartSubtitle] = useState('Data Visualization')
  const [showLegend, setShowLegend] = useState(true)
  const [showTooltip, setShowTooltip] = useState(true)
  const [showGrid, setShowGrid] = useState(true)
  const [animationDuration, setAnimationDuration] = useState([1000])
  const [selectedTheme, setSelectedTheme] = useState('default')
  const [xAxisLabel, setXAxisLabel] = useState('Category')
  const [yAxisLabel, setYAxisLabel] = useState('Value')
  const [dataPoints, setDataPoints] = useState(7)
  const [customOption, setCustomOption] = useState<any | null>(null)
  
  const chartRef = useRef<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Build chart configuration
  const buildChartOption = useCallback(() => {
    const baseOption: any = {
      title: {
        text: chartTitle,
        subtext: chartSubtitle,
        left: 'center',
        top: 20,
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold'
        },
        subtextStyle: {
          fontSize: 14
        }
      },
      tooltip: {
        show: showTooltip,
        trigger: selectedChart === 'pie' ? 'item' : 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        show: showLegend,
        bottom: 10,
        data: ['Series 1', 'Series 2']
      },
      color: COLOR_THEMES[selectedTheme as keyof typeof COLOR_THEMES],
      animation: true,
      animationDuration: animationDuration[0],
      grid: showGrid ? {
        left: '5%',
        right: '5%',
        bottom: '15%',
        top: '20%',
        containLabel: true
      } : undefined
    }

    // Configure based on chart type
    switch (selectedChart) {
      case 'line':
      case 'bar':
      case 'area':
        return {
          ...baseOption,
          xAxis: {
            type: 'category',
            name: xAxisLabel,
            data: chartData.map(d => d.name),
            axisLabel: {
              rotate: 0
            }
          },
          yAxis: {
            type: 'value',
            name: yAxisLabel
          },
          series: [
            {
              name: 'Series 1',
              type: selectedChart === 'area' ? 'line' : selectedChart,
              data: chartData.map(d => d.value),
              smooth: selectedChart === 'line',
              areaStyle: selectedChart === 'area' ? {} : undefined,
              itemStyle: {
                borderRadius: selectedChart === 'bar' ? [8, 8, 0, 0] : 0
              }
            },
            {
              name: 'Series 2',
              type: selectedChart === 'area' ? 'line' : selectedChart,
              data: chartData.map(d => d.value2),
              smooth: selectedChart === 'line',
              areaStyle: selectedChart === 'area' ? {} : undefined,
              itemStyle: {
                borderRadius: selectedChart === 'bar' ? [8, 8, 0, 0] : 0
              }
            }
          ]
        }

      case 'pie':
        return {
          ...baseOption,
          series: [{
            name: 'Data',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            data: chartData.map(d => ({
              name: d.name,
              value: d.value
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              show: true,
              formatter: '{b}: {c} ({d}%)'
            }
          }]
        }

      case 'scatter':
        return {
          ...baseOption,
          xAxis: {
            type: 'value',
            name: xAxisLabel,
            splitLine: {
              show: showGrid
            }
          },
          yAxis: {
            type: 'value',
            name: yAxisLabel,
            splitLine: {
              show: showGrid
            }
          },
          series: [{
            name: 'Scatter',
            type: 'scatter',
            data: chartData.map(d => [d.value, d.value2]),
            symbolSize: 12,
            itemStyle: {
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowOffsetY: 2
            }
          }]
        }

      case 'radar':
        return {
          ...baseOption,
          radar: {
            indicator: chartData.map(d => ({
              name: d.name,
              max: 150
            }))
          },
          series: [{
            name: 'Radar',
            type: 'radar',
            data: [
              {
                value: chartData.map(d => d.value),
                name: 'Series 1'
              },
              {
                value: chartData.map(d => d.value2),
                name: 'Series 2'
              }
            ]
          }]
        }

      case 'gauge':
        const gaugeValue = chartData[0]?.value || 75
        return {
          ...baseOption,
          series: [{
            name: 'Gauge',
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: {
              color: COLOR_THEMES[selectedTheme as keyof typeof COLOR_THEMES][0]
            },
            progress: {
              show: true,
              width: 30
            },
            pointer: {
              show: true,
              length: '80%',
              width: 8
            },
            axisLine: {
              lineStyle: {
                width: 30
              }
            },
            axisTick: {
              distance: -30,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              distance: -35,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: -20,
              color: '#999',
              fontSize: 12
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '35%'],
              fontSize: 28,
              fontWeight: 'bolder',
              formatter: '{value}%',
              color: 'inherit'
            },
            data: [{
              value: gaugeValue,
              name: 'Score'
            }]
          }]
        }

      case 'funnel':
        return {
          ...baseOption,
          series: [{
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 100,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: chartData.map((d, i) => ({
              value: 100 - (i * 15),
              name: d.name
            }))
          }]
        }

      case 'heatmap':
        const hours = ['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p']
        const days = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday']
        const heatmapData = []
        for (let i = 0; i < 7; i++) {
          for (let j = 0; j < 12; j++) {
            heatmapData.push([j, i, Math.floor(Math.random() * 10)])
          }
        }
        
        return {
          ...baseOption,
          xAxis: {
            type: 'category',
            data: hours,
            splitArea: {
              show: true
            }
          },
          yAxis: {
            type: 'category',
            data: days,
            splitArea: {
              show: true
            }
          },
          visualMap: {
            min: 0,
            max: 10,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '5%',
            inRange: {
              color: COLOR_THEMES[selectedTheme as keyof typeof COLOR_THEMES]
            }
          },
          series: [{
            name: 'Heatmap',
            type: 'heatmap',
            data: heatmapData,
            label: {
              show: true
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }

      default:
        return baseOption
    }
  }, [selectedChart, chartData, chartTitle, chartSubtitle, showLegend, showTooltip, showGrid, animationDuration, selectedTheme, xAxisLabel, yAxisLabel])

  // Handlers
  const handleChartTypeChange = (type: string) => {
    setSelectedChart(type)
    setChartData(generateSampleData(type, dataPoints))
    setCustomOption(null)
    toast.success(`Switched to ${type} chart`)
  }

  const handleDataPointsChange = (value: number[]) => {
    setDataPoints(value[0])
    setChartData(generateSampleData(selectedChart, value[0]))
  }

  const handleRefreshData = () => {
    setChartData(generateSampleData(selectedChart, dataPoints))
    toast.success('Data refreshed')
  }

  const handleExportImage = async (format: 'png' | 'svg') => {
    if (!chartRef.current) return
    
    try {
      const instance = chartRef.current
      const url = instance.getDataURL({
        type: format,
        pixelRatio: 2,
        backgroundColor: '#fff'
      })
      
      const link = document.createElement('a')
      link.download = `chart.${format}`
      link.href = url
      link.click()
      
      toast.success(`Chart exported as ${format.toUpperCase()}`)
    } catch (error) {
      toast.error('Failed to export chart')
    }
  }

  const handleExportData = () => {
    const dataStr = JSON.stringify(chartData, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'chart-data.json'
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Data exported as JSON')
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (Array.isArray(data)) {
          setChartData(data)
          setDataPoints(data.length)
          toast.success('Data imported successfully')
        } else {
          toast.error('Invalid data format')
        }
      } catch (error) {
        toast.error('Failed to parse JSON file')
      }
    }
    reader.readAsText(file)
  }

  const handleCopyConfig = () => {
    const config = customOption || buildChartOption()
    navigator.clipboard.writeText(JSON.stringify(config, null, 2))
    toast.success('Configuration copied to clipboard')
  }

  const baseOption = buildChartOption()
  const effectiveOption = customOption || baseOption

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-semibold">ECharts Studio</h1>
          <Badge variant="secondary">v2.0</Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshData}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleExportImage('png')}>
                <FileImage className="mr-2 h-4 w-4" />
                Export as PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportImage('svg')}>
                <FileImage className="mr-2 h-4 w-4" />
                Export as SVG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportData}>
                <FileJson className="mr-2 h-4 w-4" />
                Export Data (JSON)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyConfig}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Configuration
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-80 bg-white border-r flex flex-col">
          <Tabs defaultValue="chart" className="flex-1 flex flex-col">
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="chart" className="flex-1">Chart</TabsTrigger>
              <TabsTrigger value="data" className="flex-1">Data</TabsTrigger>
              <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
              <TabsTrigger value="tools" className="flex-1"><Wrench className="h-4 w-4 mr-2"/>Tools</TabsTrigger>
            </TabsList>
            
            <ScrollArea className="flex-1">
              <TabsContent value="chart" className="p-4 space-y-4 m-0">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Chart Type</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {CHART_TYPES.map((type) => {
                      const Icon = type.icon
                      return (
                        <Button
                          key={type.id}
                          variant={selectedChart === type.id ? 'default' : 'outline'}
                          size="sm"
                          className="h-20 flex-col gap-1"
                          onClick={() => handleChartTypeChange(type.id)}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-xs">{type.name}</span>
                        </Button>
                      )
                    })}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="title">Chart Title</Label>
                    <Input
                      id="title"
                      value={chartTitle}
                      onChange={(e) => setChartTitle(e.target.value)}
                      placeholder="Enter chart title"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={chartSubtitle}
                      onChange={(e) => setChartSubtitle(e.target.value)}
                      placeholder="Enter subtitle"
                    />
                  </div>

                  {selectedChart !== 'pie' && selectedChart !== 'gauge' && (
                    <>
                      <div>
                        <Label htmlFor="xaxis">X-Axis Label</Label>
                        <Input
                          id="xaxis"
                          value={xAxisLabel}
                          onChange={(e) => setXAxisLabel(e.target.value)}
                          placeholder="X-Axis label"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="yaxis">Y-Axis Label</Label>
                        <Input
                          id="yaxis"
                          value={yAxisLabel}
                          onChange={(e) => setYAxisLabel(e.target.value)}
                          placeholder="Y-Axis label"
                        />
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="data" className="p-4 space-y-4 m-0">
                <div>
                  <Label>Data Points</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Slider
                      value={[dataPoints]}
                      onValueChange={handleDataPointsChange}
                      min={3}
                      max={20}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-8">{dataPoints}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Import JSON Data
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleImportData}
                  />
                  
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleExportData}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Current Data
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleRefreshData}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate New Data
                  </Button>
                </div>

                <Separator />

                <div>
                  <Label className="mb-2 block">Current Data</Label>
                  <div className="bg-gray-50 rounded-md p-3 max-h-96 overflow-auto">
                    <pre className="text-xs">
                      {JSON.stringify(chartData, null, 2)}
                    </pre>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="style" className="p-4 space-y-4 m-0">
                <div>
                  <Label>Color Theme</Label>
                  <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="colorful">Colorful</SelectItem>
                      <SelectItem value="warm">Warm</SelectItem>
                      <SelectItem value="cool">Cool</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Animation Duration (ms)</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Slider
                      value={animationDuration}
                      onValueChange={setAnimationDuration}
                      min={0}
                      max={3000}
                      step={100}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">{animationDuration[0]}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="mb-2 block">Color Palette</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {COLOR_THEMES[selectedTheme as keyof typeof COLOR_THEMES].map((color, i) => (
                      <div
                        key={i}
                        className="h-8 rounded border"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tools" className="p-2 space-y-4 m-0">
                <ToolsPanel
                  className="h-[calc(100vh-200px)]"
                  option={baseOption}
                  onOptionChange={(next, _overrides) => setCustomOption(next)}
                />
                <div className="px-4 pb-4">
                  <Button variant="outline" className="w-full" onClick={() => setCustomOption(null)}>
                    Reset Tool Overrides
                  </Button>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </aside>

        {/* Chart Preview */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          <Card className="h-full bg-white">
            <div className="h-full p-4">
              <ReactECharts
                option={effectiveOption}
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
                onChartReady={(instance) => {
                  chartRef.current = instance
                }}
              />
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}