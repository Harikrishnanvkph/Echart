"use client"

import React, { useRef, useEffect, useState } from "react"
import ReactEChartsCore from "echarts-for-react/lib/core"
import * as echarts from "echarts/core"
import {
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  RadarChart,
  HeatmapChart,
  FunnelChart,
  GaugeChart,
} from "echarts/charts"
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  PolarComponent,
  RadarComponent,
} from "echarts/components"
import { CanvasRenderer } from "echarts/renderers"
import { useChartStore } from "@/lib/chart-store"
import { cn } from "@/lib/utils"
import {
  Download,
  RefreshCw,
  Maximize2,
  Minimize2,
  RotateCcw,
  FileImage,
  FileCode,
  FileText,
} from "lucide-react"
import html2canvas from "html2canvas"
import { saveAs } from "file-saver"

// Register ECharts components
echarts.use([
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  RadarChart,
  HeatmapChart,
  FunnelChart,
  GaugeChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  PolarComponent,
  RadarComponent,
  CanvasRenderer,
])

interface ChartPreviewProps {
  className?: string
}

export function ChartPreview({ className }: ChartPreviewProps) {
  const chartRef = useRef<ReactEChartsCore>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const {
    chartOption,
    chartConfig,
    generateChartOption,
    resetChart,
    exportFormat,
  } = useChartStore()

  useEffect(() => {
    generateChartOption()
  }, [])

  const handleExportImage = async () => {
    if (chartRef.current) {
      const echartsInstance = chartRef.current.getEchartsInstance()
      const base64 = echartsInstance.getDataURL({
        type: "png",
        pixelRatio: 2,
        backgroundColor: chartConfig.backgroundColor || "#fff",
      })
      
      // Convert base64 to blob and download
      const byteString = atob(base64.split(",")[1])
      const mimeString = base64.split(",")[0].split(":")[1].split(";")[0]
      const ab = new ArrayBuffer(byteString.length)
      const ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      const blob = new Blob([ab], { type: mimeString })
      saveAs(blob, `chart-${Date.now()}.png`)
    }
  }

  const handleExportSVG = () => {
    if (chartRef.current) {
      // Note: SVG export would require svg renderer configuration
      // For now, we'll use the image export as fallback
      handleExportImage()
    }
  }

  const handleExportHTML = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${chartConfig.title || "Chart Export"}</title>
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background: ${chartConfig.backgroundColor || "#ffffff"};
        }
        #chart {
            width: 100%;
            height: 600px;
            max-width: 1200px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div id="chart"></div>
    <script>
        var chart = echarts.init(document.getElementById('chart'));
        var option = ${JSON.stringify(chartOption, null, 2)};
        chart.setOption(option);
        window.addEventListener('resize', function() {
            chart.resize();
        });
    </script>
</body>
</html>`
    
    const blob = new Blob([htmlContent], { type: "text/html" })
    saveAs(blob, `chart-${Date.now()}.html`)
  }

  const handleExport = () => {
    switch (exportFormat) {
      case "png":
        handleExportImage()
        break
      case "svg":
        handleExportSVG()
        break
      case "html":
        handleExportHTML()
        break
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col bg-white rounded-lg border shadow-sm",
        isFullscreen && "fixed inset-0 z-50 rounded-none",
        className
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b px-4 py-2">
        <h3 className="text-sm font-medium">Chart Preview</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={resetChart}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            title="Reset Chart"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              if (chartRef.current) {
                chartRef.current.getEchartsInstance().resize()
              }
            }}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
          <div className="w-px h-4 bg-gray-300" />
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 p-4">
        <ReactEChartsCore
          ref={chartRef}
          echarts={echarts}
          option={chartOption}
          style={{
            height: typeof chartConfig.height === "number" 
              ? `${chartConfig.height}px` 
              : chartConfig.height || "400px",
            width: typeof chartConfig.width === "number"
              ? `${chartConfig.width}px`
              : chartConfig.width || "100%",
          }}
          notMerge={true}
          lazyUpdate={true}
          theme={chartConfig.theme}
        />
      </div>
    </div>
  )
}