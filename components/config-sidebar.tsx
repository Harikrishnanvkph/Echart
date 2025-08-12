"use client"

import React, { useState } from "react"
import { useChartStore, ChartType } from "@/lib/chart-store"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  LineChart,
  PieChart,
  ScatterChart,
  Radar,
  Activity,
  CircleDot,
  Target,
  Layers,
  TrendingUp,
  Grid3x3,
  Filter,
  Gauge,
  CandlestickChart,
  Settings,
  Database,
  Palette,
  Tag,
  Zap,
  Download,
  ChevronDown,
  Plus,
  Trash2,
  Edit2,
} from "lucide-react"

const chartTypes: { type: ChartType; label: string; icon: React.ElementType }[] = [
  { type: "bar", label: "Bar Chart", icon: BarChart3 },
  { type: "line", label: "Line Chart", icon: LineChart },
  { type: "pie", label: "Pie Chart", icon: PieChart },
  { type: "scatter", label: "Scatter Plot", icon: ScatterChart },
  { type: "radar", label: "Radar Chart", icon: Radar },
  { type: "area", label: "Area Chart", icon: Activity },
  { type: "doughnut", label: "Doughnut", icon: CircleDot },
  { type: "polar", label: "Polar Area", icon: Target },
  { type: "bubble", label: "Bubble Chart", icon: CircleDot },
  { type: "stackedBar", label: "Stacked Bar", icon: Layers },
  { type: "stackedArea", label: "Stacked Area", icon: TrendingUp },
  { type: "heatmap", label: "Heatmap", icon: Grid3x3 },
  { type: "funnel", label: "Funnel", icon: Filter },
  { type: "gauge", label: "Gauge", icon: Gauge },
]

interface ConfigSidebarProps {
  className?: string
}

export function ConfigSidebar({ className }: ConfigSidebarProps) {
  const {
    chartType,
    setChartType,
    chartData,
    setChartData,
    chartConfig,
    updateChartConfig,
    setExportFormat,
    exportFormat,
  } = useChartStore()

  const [activeTab, setActiveTab] = useState("types")
  const [editingDataset, setEditingDataset] = useState<number | null>(null)
  const [dataInput, setDataInput] = useState("")

  const handleAddDataset = () => {
    const newDataset = {
      label: `Series ${chartData.length + 1}`,
      data: [
        { name: "A", value: Math.floor(Math.random() * 100) },
        { name: "B", value: Math.floor(Math.random() * 100) },
        { name: "C", value: Math.floor(Math.random() * 100) },
        { name: "D", value: Math.floor(Math.random() * 100) },
      ],
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    }
    setChartData([...chartData, newDataset])
  }

  const handleRemoveDataset = (index: number) => {
    setChartData(chartData.filter((_, i) => i !== index))
  }

  const handleUpdateDataset = (index: number, value: string) => {
    try {
      const parsedData = JSON.parse(value)
      const updatedData = [...chartData]
      updatedData[index] = { ...updatedData[index], ...parsedData }
      setChartData(updatedData)
      setEditingDataset(null)
      setDataInput("")
    } catch (error) {
      console.error("Invalid JSON format")
    }
  }

  const tabs = [
    { id: "types", label: "Chart Type", icon: BarChart3 },
    { id: "data", label: "Data", icon: Database },
    { id: "design", label: "Design", icon: Palette },
    { id: "labels", label: "Labels", icon: Tag },
    { id: "animations", label: "Animations", icon: Zap },
    { id: "export", label: "Export", icon: Download },
  ]

  return (
    <div className={cn("flex h-full bg-gray-50", className)}>
      {/* Tabs */}
      <div className="w-12 bg-white border-r flex flex-col items-center py-4 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "p-2 rounded-lg transition-colors",
              activeTab === tab.id
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100 text-gray-600"
            )}
            title={tab.label}
          >
            <tab.icon className="h-5 w-5" />
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 bg-white overflow-y-auto">
        <div className="p-4">
          {activeTab === "types" && (
            <div>
              <h3 className="font-semibold mb-4">Chart Type</h3>
              <div className="grid grid-cols-2 gap-2">
                {chartTypes.map((chart) => (
                  <button
                    key={chart.type}
                    onClick={() => setChartType(chart.type)}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-lg border transition-all",
                      chartType === chart.type
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <chart.icon className="h-4 w-4" />
                    <span className="text-sm">{chart.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "data" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Datasets</h3>
                <button
                  onClick={handleAddDataset}
                  className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </button>
              </div>
              
              <div className="space-y-3">
                {chartData.map((dataset, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <input
                        type="text"
                        value={dataset.label}
                        onChange={(e) => {
                          const updated = [...chartData]
                          updated[index].label = e.target.value
                          setChartData(updated)
                        }}
                        className="font-medium text-sm bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none"
                      />
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingDataset(index)
                            setDataInput(JSON.stringify(dataset.data, null, 2))
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleRemoveDataset(index)}
                          className="p-1 hover:bg-red-100 text-red-600 rounded"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    
                    {editingDataset === index ? (
                      <div>
                        <textarea
                          value={dataInput}
                          onChange={(e) => setDataInput(e.target.value)}
                          className="w-full h-32 p-2 border rounded text-xs font-mono"
                          placeholder="Enter JSON data..."
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleUpdateDataset(index, dataInput)}
                            className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingDataset(null)
                              setDataInput("")
                            }}
                            className="px-2 py-1 bg-gray-600 text-white rounded text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-600">
                        {dataset.data.length} data points
                      </div>
                    )}
                    
                    <div className="mt-2">
                      <label className="text-xs text-gray-600">Color</label>
                      <input
                        type="color"
                        value={dataset.color || "#5470c6"}
                        onChange={(e) => {
                          const updated = [...chartData]
                          updated[index].color = e.target.value
                          setChartData(updated)
                        }}
                        className="block w-full h-8 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "design" && (
            <div className="space-y-4">
              <h3 className="font-semibold">Design Settings</h3>
              
              <div>
                <label className="text-sm text-gray-600">Title</label>
                <input
                  type="text"
                  value={chartConfig.title || ""}
                  onChange={(e) => updateChartConfig({ title: e.target.value })}
                  className="w-full px-3 py-1.5 border rounded-md text-sm"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-600">Subtitle</label>
                <input
                  type="text"
                  value={chartConfig.subtitle || ""}
                  onChange={(e) => updateChartConfig({ subtitle: e.target.value })}
                  className="w-full px-3 py-1.5 border rounded-md text-sm"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-600">Background Color</label>
                <input
                  type="color"
                  value={chartConfig.backgroundColor || "#ffffff"}
                  onChange={(e) => updateChartConfig({ backgroundColor: e.target.value })}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-600">Height (px)</label>
                <input
                  type="number"
                  value={typeof chartConfig.height === "number" ? chartConfig.height : 400}
                  onChange={(e) => updateChartConfig({ height: parseInt(e.target.value) })}
                  className="w-full px-3 py-1.5 border rounded-md text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={chartConfig.showLegend}
                    onChange={(e) => updateChartConfig({ showLegend: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Show Legend</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={chartConfig.showTooltip}
                    onChange={(e) => updateChartConfig({ showTooltip: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Show Tooltip</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={chartConfig.showGrid}
                    onChange={(e) => updateChartConfig({ showGrid: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Show Grid</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === "animations" && (
            <div className="space-y-4">
              <h3 className="font-semibold">Animation Settings</h3>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={chartConfig.animation}
                  onChange={(e) => updateChartConfig({ animation: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm">Enable Animations</span>
              </label>
              
              {chartConfig.animation && (
                <div>
                  <label className="text-sm text-gray-600">Duration (ms)</label>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="100"
                    value={chartConfig.animationDuration || 1000}
                    onChange={(e) => updateChartConfig({ animationDuration: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 text-center">
                    {chartConfig.animationDuration}ms
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "export" && (
            <div className="space-y-4">
              <h3 className="font-semibold">Export Options</h3>
              
              <div className="space-y-2">
                {[
                  { value: "png", label: "PNG Image", icon: FileImage },
                  { value: "svg", label: "SVG Vector", icon: FileImage },
                  { value: "html", label: "HTML File", icon: FileCode },
                ].map((format) => (
                  <label
                    key={format.value}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                      exportFormat === format.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <input
                      type="radio"
                      name="exportFormat"
                      value={format.value}
                      checked={exportFormat === format.value}
                      onChange={(e) => setExportFormat(e.target.value as any)}
                      className="sr-only"
                    />
                    <format.icon className="h-5 w-5 text-gray-600" />
                    <div>
                      <div className="font-medium text-sm">{format.label}</div>
                      <div className="text-xs text-gray-500">
                        {format.value === "png" && "High-quality raster image"}
                        {format.value === "svg" && "Scalable vector graphics"}
                        {format.value === "html" && "Interactive standalone file"}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}