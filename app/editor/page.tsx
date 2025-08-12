"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
  Type,
  Grid3x3,
  Eye,
  Sparkles,
  SlidersHorizontal,
  FileText,
  ChevronRight,
  Info,
  Layers,
  MousePointer
} from 'lucide-react'

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

// Chart type definitions
const CHART_TYPES = [
  { id: 'line', name: 'Line', icon: LineChart, category: 'Basic' },
  { id: 'bar', name: 'Bar', icon: BarChart3, category: 'Basic' },
  { id: 'pie', name: 'Pie', icon: PieChart, category: 'Basic' },
  { id: 'scatter', name: 'Scatter', icon: ScatterChart, category: 'Basic' },
  { id: 'area', name: 'Area', icon: AreaChart, category: 'Basic' },
  { id: 'radar', name: 'Radar', icon: BarChart3, category: 'Advanced' },
  { id: 'gauge', name: 'Gauge', icon: BarChart3, category: 'Advanced' },
  { id: 'funnel', name: 'Funnel', icon: BarChart3, category: 'Advanced' },
  { id: 'heatmap', name: 'Heatmap', icon: Grid3x3, category: 'Advanced' },
]

// Color themes
const COLOR_THEMES = {
  default: {
    name: 'Default',
    colors: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
  },
  dark: {
    name: 'Dark',
    colors: ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373', '#73b9bc', '#7289ab']
  },
  colorful: {
    name: 'Colorful',
    colors: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074']
  },
  warm: {
    name: 'Warm',
    colors: ['#ff7f50', '#ff6347', '#ffa500', '#ffd700', '#ff8c00', '#ff4500', '#dc143c', '#b22222', '#8b0000']
  },
  cool: {
    name: 'Cool',
    colors: ['#00ced1', '#4682b4', '#1e90ff', '#0000ff', '#4169e1', '#6495ed', '#00bfff', '#87ceeb', '#87cefa']
  }
}

// Sample data generator
const generateSampleData = (type: string, points: number = 7) => {
  const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon 2', 'Tue 2', 'Wed 2', 'Thu 2', 'Fri 2', 'Sat 2', 'Sun 2', 'Mon 3', 'Tue 3', 'Wed 3', 'Thu 3', 'Fri 3', 'Sat 3']
  const data = []
  
  for (let i = 0; i < points; i++) {
    data.push({
      name: categories[i] || `Item ${i + 1}`,
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
  const [chartTitle, setChartTitle] = useState('Sales Performance')
  const [chartSubtitle, setChartSubtitle] = useState('Weekly Analysis')
  const [showLegend, setShowLegend] = useState(true)
  const [legendPosition, setLegendPosition] = useState('bottom')
  const [showTooltip, setShowTooltip] = useState(true)
  const [tooltipTrigger, setTooltipTrigger] = useState('axis')
  const [showGrid, setShowGrid] = useState(true)
  const [animationDuration, setAnimationDuration] = useState([1000])
  const [animationEasing, setAnimationEasing] = useState('cubicOut')
  const [selectedTheme, setSelectedTheme] = useState('default')
  const [xAxisLabel, setXAxisLabel] = useState('Time Period')
  const [yAxisLabel, setYAxisLabel] = useState('Values')
  const [xAxisRotate, setXAxisRotate] = useState([0])
  const [dataPoints, setDataPoints] = useState(7)
  const [showDataLabels, setShowDataLabels] = useState(false)
  const [chartRadius, setChartRadius] = useState([70])
  
  const chartRef = useRef<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Build chart configuration
  const buildChartOption = useCallback(() => {
    const baseOption: any = {
      title: {
        text: chartTitle,
        subtext: chartSubtitle,
        left: 'center',
        top: 10,
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#333'
        },
        subtextStyle: {
          fontSize: 14,
          color: '#666'
        }
      },
      tooltip: {
        show: showTooltip,
        trigger: selectedChart === 'pie' ? 'item' : tooltipTrigger,
        axisPointer: {
          type: tooltipTrigger === 'axis' ? 'shadow' : 'cross'
        },
        formatter: selectedChart === 'pie' ? '{b}: {c} ({d}%)' : undefined
      },
      legend: {
        show: showLegend,
        type: 'scroll',
        orient: legendPosition === 'left' || legendPosition === 'right' ? 'vertical' : 'horizontal',
        [legendPosition]: legendPosition === 'center' ? '50%' : 10,
        data: ['Series 1', 'Series 2']
      },
      color: COLOR_THEMES[selectedTheme as keyof typeof COLOR_THEMES].colors,
      animation: true,
      animationDuration: animationDuration[0],
      animationEasing: animationEasing,
      grid: showGrid && selectedChart !== 'pie' && selectedChart !== 'gauge' ? {
        left: '5%',
        right: '5%',
        bottom: legendPosition === 'bottom' ? '15%' : '10%',
        top: '15%',
        containLabel: true
      } : undefined,
      toolbox: {
        show: true,
        orient: 'horizontal',
        left: 'right',
        top: 'top',
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      }
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
            nameLocation: 'middle',
            nameGap: 30,
            data: chartData.map(d => d.name),
            axisLabel: {
              rotate: xAxisRotate[0],
              interval: 0
            },
            splitLine: {
              show: showGrid
            }
          },
          yAxis: {
            type: 'value',
            name: yAxisLabel,
            nameLocation: 'middle',
            nameGap: 50,
            splitLine: {
              show: showGrid
            }
          },
          series: [
            {
              name: 'Series 1',
              type: selectedChart === 'area' ? 'line' : selectedChart,
              data: chartData.map(d => d.value),
              smooth: selectedChart === 'line',
              areaStyle: selectedChart === 'area' ? { opacity: 0.7 } : undefined,
              itemStyle: {
                borderRadius: selectedChart === 'bar' ? [8, 8, 0, 0] : 0
              },
              label: {
                show: showDataLabels,
                position: 'top'
              },
              emphasis: {
                focus: 'series'
              }
            },
            {
              name: 'Series 2',
              type: selectedChart === 'area' ? 'line' : selectedChart,
              data: chartData.map(d => d.value2),
              smooth: selectedChart === 'line',
              areaStyle: selectedChart === 'area' ? { opacity: 0.7 } : undefined,
              itemStyle: {
                borderRadius: selectedChart === 'bar' ? [8, 8, 0, 0] : 0
              },
              label: {
                show: showDataLabels,
                position: 'top'
              },
              emphasis: {
                focus: 'series'
              }
            }
          ]
        }

      case 'pie':
        return {
          ...baseOption,
          series: [{
            name: 'Data Distribution',
            type: 'pie',
            radius: [`${Math.max(0, chartRadius[0] - 30)}%`, `${chartRadius[0]}%`],
            center: ['50%', '55%'],
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
              show: showDataLabels,
              formatter: '{b}: {c} ({d}%)'
            },
            labelLine: {
              show: showDataLabels
            }
          }]
        }

      case 'scatter':
        return {
          ...baseOption,
          xAxis: {
            type: 'value',
            name: xAxisLabel,
            nameLocation: 'middle',
            nameGap: 30,
            splitLine: {
              show: showGrid
            }
          },
          yAxis: {
            type: 'value',
            name: yAxisLabel,
            nameLocation: 'middle',
            nameGap: 50,
            splitLine: {
              show: showGrid
            }
          },
          series: [{
            name: 'Scatter Data',
            type: 'scatter',
            data: chartData.map(d => [d.value, d.value2]),
            symbolSize: (data: number[]) => Math.sqrt(data[0] * data[1]) / 2,
            itemStyle: {
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowOffsetY: 2
            },
            label: {
              show: showDataLabels,
              formatter: (params: any) => `(${params.data[0]}, ${params.data[1]})`
            },
            emphasis: {
              focus: 'self',
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
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
            })),
            radius: `${chartRadius[0]}%`,
            splitNumber: 5,
            splitArea: {
              show: showGrid
            }
          },
          series: [{
            name: 'Comparison',
            type: 'radar',
            data: [
              {
                value: chartData.map(d => d.value),
                name: 'Series 1',
                label: {
                  show: showDataLabels
                }
              },
              {
                value: chartData.map(d => d.value2),
                name: 'Series 2',
                label: {
                  show: showDataLabels
                }
              }
            ],
            emphasis: {
              lineStyle: {
                width: 4
              }
            }
          }]
        }

      case 'gauge':
        const gaugeValue = chartData[0]?.value || 75
        return {
          ...baseOption,
          series: [{
            name: 'Performance',
            type: 'gauge',
            radius: `${chartRadius[0]}%`,
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: {
              color: COLOR_THEMES[selectedTheme as keyof typeof COLOR_THEMES].colors[0]
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
              fontSize: 32,
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
            name: 'Conversion',
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
              position: showDataLabels ? 'outside' : 'inside',
              formatter: '{b}: {c}'
            },
            labelLine: {
              length: showDataLabels ? 20 : 10,
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
            })).filter(d => d.value > 0)
          }]
        }

      case 'heatmap':
        const hours = ['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p']
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
              color: COLOR_THEMES[selectedTheme as keyof typeof COLOR_THEMES].colors
            }
          },
          series: [{
            name: 'Activity',
            type: 'heatmap',
            data: heatmapData,
            label: {
              show: showDataLabels
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
  }, [selectedChart, chartData, chartTitle, chartSubtitle, showLegend, legendPosition, showTooltip, tooltipTrigger, showGrid, animationDuration, animationEasing, selectedTheme, xAxisLabel, yAxisLabel, xAxisRotate, showDataLabels, chartRadius])

  // Handlers
  const handleChartTypeChange = (type: string) => {
    setSelectedChart(type)
    setChartData(generateSampleData(type, dataPoints))
    toast.success(`Switched to ${CHART_TYPES.find(c => c.id === type)?.name} chart`)
  }

  const handleDataPointsChange = (value: number[]) => {
    setDataPoints(value[0])
    setChartData(generateSampleData(selectedChart, value[0]))
  }

  const handleRefreshData = () => {
    setChartData(generateSampleData(selectedChart, dataPoints))
    toast.success('Data refreshed successfully')
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
      link.download = `chart-${Date.now()}.${format}`
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
    link.download = `chart-data-${Date.now()}.json`
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Data exported successfully')
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
          toast.error('Invalid data format. Expected an array.')
        }
      } catch (error) {
        toast.error('Failed to parse JSON file')
      }
    }
    reader.readAsText(file)
  }

  const handleCopyConfig = () => {
    const config = buildChartOption()
    navigator.clipboard.writeText(JSON.stringify(config, null, 2))
    toast.success('Configuration copied to clipboard')
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold">ECharts Studio</h1>
              </div>
              <Badge variant="secondary">Professional</Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshData}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Configuration Panel */}
        <aside className="w-96 bg-white border-r shadow-sm overflow-y-auto">
          <ScrollArea className="h-full">
            <div className="p-4">
              {/* Chart Type Selection Section */}
              <Card className="mb-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Chart Type Selection
                  </CardTitle>
                  <CardDescription>Choose your visualization type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Basic', 'Advanced'].map(category => (
                      <div key={category}>
                        <Label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                          {category} Charts
                        </Label>
                        <div className="grid grid-cols-3 gap-2">
                          {CHART_TYPES.filter(t => t.category === category).map((type) => {
                            const Icon = type.icon
                            return (
                              <Button
                                key={type.id}
                                variant={selectedChart === type.id ? 'default' : 'outline'}
                                size="sm"
                                className="h-16 flex-col gap-1 text-xs"
                                onClick={() => handleChartTypeChange(type.id)}
                              >
                                <Icon className="h-4 w-4" />
                                <span>{type.name}</span>
                              </Button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Configuration Sections */}
              <Accordion type="multiple" defaultValue={['text', 'axes', 'appearance']} className="space-y-2">
                {/* Text Configuration */}
                <AccordionItem value="text" className="border rounded-lg">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      <span className="font-medium">Text & Labels</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="title" className="text-sm">Chart Title</Label>
                        <Input
                          id="title"
                          value={chartTitle}
                          onChange={(e) => setChartTitle(e.target.value)}
                          placeholder="Enter chart title"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="subtitle" className="text-sm">Subtitle</Label>
                        <Input
                          id="subtitle"
                          value={chartSubtitle}
                          onChange={(e) => setChartSubtitle(e.target.value)}
                          placeholder="Enter subtitle"
                          className="mt-1"
                        />
                      </div>

                      {selectedChart !== 'pie' && selectedChart !== 'gauge' && (
                        <>
                          <Separator />
                          <div>
                            <Label htmlFor="xaxis" className="text-sm">X-Axis Label</Label>
                            <Input
                              id="xaxis"
                              value={xAxisLabel}
                              onChange={(e) => setXAxisLabel(e.target.value)}
                              placeholder="X-Axis label"
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="yaxis" className="text-sm">Y-Axis Label</Label>
                            <Input
                              id="yaxis"
                              value={yAxisLabel}
                              onChange={(e) => setYAxisLabel(e.target.value)}
                              placeholder="Y-Axis label"
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label className="text-sm">X-Axis Label Rotation</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Slider
                                value={xAxisRotate}
                                onValueChange={setXAxisRotate}
                                min={-90}
                                max={90}
                                step={15}
                                className="flex-1"
                              />
                              <span className="text-sm font-medium w-12 text-right">{xAxisRotate[0]}°</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Visual Elements */}
                <AccordionItem value="appearance" className="border rounded-lg">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span className="font-medium">Visual Elements</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      {/* Legend Settings */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="legend" className="text-sm">Show Legend</Label>
                          <Switch
                            id="legend"
                            checked={showLegend}
                            onCheckedChange={setShowLegend}
                          />
                        </div>
                        {showLegend && (
                          <div>
                            <Label className="text-sm">Legend Position</Label>
                            <Select value={legendPosition} onValueChange={setLegendPosition}>
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="top">Top</SelectItem>
                                <SelectItem value="bottom">Bottom</SelectItem>
                                <SelectItem value="left">Left</SelectItem>
                                <SelectItem value="right">Right</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>

                      <Separator />

                      {/* Tooltip Settings */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="tooltip" className="text-sm">Show Tooltip</Label>
                          <Switch
                            id="tooltip"
                            checked={showTooltip}
                            onCheckedChange={setShowTooltip}
                          />
                        </div>
                        {showTooltip && selectedChart !== 'pie' && (
                          <div>
                            <Label className="text-sm">Tooltip Trigger</Label>
                            <Select value={tooltipTrigger} onValueChange={setTooltipTrigger}>
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="axis">Axis</SelectItem>
                                <SelectItem value="item">Item</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>

                      <Separator />

                      {/* Grid & Labels */}
                      {selectedChart !== 'pie' && selectedChart !== 'gauge' && (
                        <div className="flex items-center justify-between">
                          <Label htmlFor="grid" className="text-sm">Show Grid Lines</Label>
                          <Switch
                            id="grid"
                            checked={showGrid}
                            onCheckedChange={setShowGrid}
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <Label htmlFor="datalabels" className="text-sm">Show Data Labels</Label>
                        <Switch
                          id="datalabels"
                          checked={showDataLabels}
                          onCheckedChange={setShowDataLabels}
                        />
                      </div>

                      {(selectedChart === 'pie' || selectedChart === 'radar' || selectedChart === 'gauge') && (
                        <div>
                          <Label className="text-sm">Chart Size</Label>
                                                  <div className="flex items-center gap-2 mt-1">
                          <Slider
                            value={chartRadius}
                            onValueChange={setChartRadius}
                            min={40}
                            max={90}
                            step={5}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium w-12 text-right">{chartRadius[0]}%</span>
                        </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Style & Theme */}
                <AccordionItem value="style" className="border rounded-lg">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      <span className="font-medium">Style & Theme</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm">Color Theme</Label>
                        <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(COLOR_THEMES).map(([key, theme]) => (
                              <SelectItem key={key} value={key}>{theme.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm mb-2 block">Color Palette Preview</Label>
                        <div className="grid grid-cols-9 gap-1">
                          {COLOR_THEMES[selectedTheme as keyof typeof COLOR_THEMES].colors.map((color, i) => (
                            <div
                              key={i}
                              className="h-8 rounded border border-gray-200"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Animation */}
                <AccordionItem value="animation" className="border rounded-lg">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span className="font-medium">Animation</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm">Animation Duration (ms)</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Slider
                            value={animationDuration}
                            onValueChange={setAnimationDuration}
                            min={0}
                            max={3000}
                            step={100}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium w-14 text-right">{animationDuration[0]}ms</span>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm">Animation Easing</Label>
                        <Select value={animationEasing} onValueChange={setAnimationEasing}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="linear">Linear</SelectItem>
                            <SelectItem value="cubicIn">Cubic In</SelectItem>
                            <SelectItem value="cubicOut">Cubic Out</SelectItem>
                            <SelectItem value="cubicInOut">Cubic In-Out</SelectItem>
                            <SelectItem value="elasticOut">Elastic Out</SelectItem>
                            <SelectItem value="bounceOut">Bounce Out</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Data Management */}
                <AccordionItem value="data" className="border rounded-lg">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      <span className="font-medium">Data Management</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm">Number of Data Points</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Slider
                            value={[dataPoints]}
                            onValueChange={handleDataPointsChange}
                            min={3}
                            max={20}
                            step={1}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium w-8 text-right">{dataPoints}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          size="sm"
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
                          size="sm"
                          onClick={handleExportData}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Export Current Data
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          size="sm"
                          onClick={handleRefreshData}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Generate New Data
                        </Button>
                      </div>

                      <div>
                        <Label className="text-sm mb-2 block">Current Data Preview</Label>
                        <div className="bg-gray-50 rounded-md border p-2 max-h-48 overflow-auto">
                          <pre className="text-xs font-mono">
                            {JSON.stringify(chartData.slice(0, 3), null, 2)}
                            {chartData.length > 3 && '\n... and ' + (chartData.length - 3) + ' more items'}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ScrollArea>
        </aside>

        {/* Chart Preview Area */}
        <main className="flex-1 p-6 overflow-auto">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Chart Preview</CardTitle>
                  <CardDescription>
                    {CHART_TYPES.find(t => t.id === selectedChart)?.name} Chart • {dataPoints} data points
                  </CardDescription>
                </div>
                <Badge variant="outline" className="gap-1">
                  <Info className="h-3 w-3" />
                  Interactive
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-5rem)]">
              <ReactECharts
                option={buildChartOption()}
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
                onChartReady={(instance) => {
                  chartRef.current = instance
                }}
              />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}