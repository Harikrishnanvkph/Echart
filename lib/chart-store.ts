"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { EChartsOption } from "echarts"

export type ChartType = 
  | "bar" 
  | "line" 
  | "pie" 
  | "scatter" 
  | "radar" 
  | "area"
  | "doughnut"
  | "polar"
  | "bubble"
  | "stackedBar"
  | "stackedArea"
  | "heatmap"
  | "funnel"
  | "gauge"
  | "candlestick"

export interface ChartDataPoint {
  name: string
  value: number | number[]
  category?: string
}

export interface ChartDataset {
  label: string
  data: ChartDataPoint[]
  color?: string
  type?: ChartType
}

export interface ChartConfig {
  title?: string
  subtitle?: string
  theme?: "light" | "dark" | "custom"
  width?: number | string
  height?: number | string
  backgroundColor?: string
  showLegend?: boolean
  showTooltip?: boolean
  showGrid?: boolean
  animation?: boolean
  animationDuration?: number
}

interface ChartStore {
  // Chart data and configuration
  chartType: ChartType
  chartData: ChartDataset[]
  chartConfig: ChartConfig
  chartOption: EChartsOption
  
  // Actions
  setChartType: (type: ChartType) => void
  setChartData: (data: ChartDataset[]) => void
  updateChartConfig: (config: Partial<ChartConfig>) => void
  updateChartOption: (option: Partial<EChartsOption>) => void
  generateChartOption: () => void
  resetChart: () => void
  
  // Export states
  exportFormat: "png" | "svg" | "html"
  setExportFormat: (format: "png" | "svg" | "html") => void
}

const defaultChartConfig: ChartConfig = {
  title: "My Chart",
  subtitle: "",
  theme: "light",
  width: "100%",
  height: 400,
  backgroundColor: "transparent",
  showLegend: true,
  showTooltip: true,
  showGrid: true,
  animation: true,
  animationDuration: 1000,
}

const defaultChartData: ChartDataset[] = [
  {
    label: "Series 1",
    data: [
      { name: "Jan", value: 120 },
      { name: "Feb", value: 200 },
      { name: "Mar", value: 150 },
      { name: "Apr", value: 80 },
      { name: "May", value: 70 },
      { name: "Jun", value: 110 },
    ],
    color: "#5470c6",
  },
]

export const useChartStore = create<ChartStore>()(
  persist(
    (set, get) => ({
      chartType: "bar",
      chartData: defaultChartData,
      chartConfig: defaultChartConfig,
      chartOption: {},
      exportFormat: "png",

      setChartType: (type) => {
        set({ chartType: type })
        get().generateChartOption()
      },

      setChartData: (data) => {
        set({ chartData: data })
        get().generateChartOption()
      },

      updateChartConfig: (config) => {
        set((state) => ({
          chartConfig: { ...state.chartConfig, ...config },
        }))
        get().generateChartOption()
      },

      updateChartOption: (option) => {
        set((state) => ({
          chartOption: { ...state.chartOption, ...option },
        }))
      },

      generateChartOption: () => {
        const { chartType, chartData, chartConfig } = get()
        
        // Base configuration
        const baseOption: EChartsOption = {
          title: {
            text: chartConfig.title,
            subtext: chartConfig.subtitle,
            left: "center",
          },
          tooltip: chartConfig.showTooltip
            ? {
                trigger: chartType === "pie" || chartType === "doughnut" ? "item" : "axis",
              }
            : undefined,
          legend: chartConfig.showLegend
            ? {
                bottom: 0,
                data: chartData.map((d) => d.label),
              }
            : undefined,
          grid: chartConfig.showGrid && chartType !== "pie" && chartType !== "doughnut" && chartType !== "radar"
            ? {
                left: "3%",
                right: "4%",
                bottom: "10%",
                top: "15%",
                containLabel: true,
              }
            : undefined,
          backgroundColor: chartConfig.backgroundColor,
        }

        let specificOption: EChartsOption = {}

        // Generate specific options based on chart type
        switch (chartType) {
          case "bar":
          case "stackedBar":
            specificOption = {
              xAxis: {
                type: "category",
                data: chartData[0]?.data.map((d) => d.name) || [],
              },
              yAxis: {
                type: "value",
              },
              series: chartData.map((dataset) => ({
                name: dataset.label,
                type: "bar",
                data: dataset.data.map((d) => d.value),
                itemStyle: dataset.color ? { color: dataset.color } : undefined,
                stack: chartType === "stackedBar" ? "total" : undefined,
              })),
            }
            break

          case "line":
          case "area":
          case "stackedArea":
            specificOption = {
              xAxis: {
                type: "category",
                data: chartData[0]?.data.map((d) => d.name) || [],
                boundaryGap: false,
              },
              yAxis: {
                type: "value",
              },
              series: chartData.map((dataset) => ({
                name: dataset.label,
                type: "line",
                data: dataset.data.map((d) => d.value),
                itemStyle: dataset.color ? { color: dataset.color } : undefined,
                areaStyle: chartType === "area" || chartType === "stackedArea" ? {} : undefined,
                stack: chartType === "stackedArea" ? "total" : undefined,
                smooth: true,
              })),
            }
            break

          case "pie":
          case "doughnut":
            specificOption = {
              series: [
                {
                  name: chartData[0]?.label || "Data",
                  type: "pie",
                  radius: chartType === "doughnut" ? ["40%", "70%"] : "70%",
                  data: chartData[0]?.data.map((d) => ({
                    name: d.name,
                    value: d.value,
                  })) || [],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                  },
                },
              ],
            }
            break

          case "scatter":
          case "bubble":
            specificOption = {
              xAxis: {
                type: "value",
                scale: true,
              },
              yAxis: {
                type: "value",
                scale: true,
              },
              series: chartData.map((dataset) => ({
                name: dataset.label,
                type: "scatter",
                data: dataset.data.map((d) => 
                  Array.isArray(d.value) ? d.value : [d.value, d.value]
                ),
                itemStyle: dataset.color ? { color: dataset.color } : undefined,
                symbolSize: chartType === "bubble" ? (data: any) => Math.sqrt(data[2] || data[1]) * 5 : undefined,
              })),
            }
            break

          case "radar":
            const indicators = chartData[0]?.data.map((d) => ({
              name: d.name,
              max: Math.max(...chartData.flatMap(ds => ds.data.map(d => d.value as number))) * 1.2,
            })) || []
            
            specificOption = {
              radar: {
                indicator: indicators,
              },
              series: [
                {
                  name: "Radar Chart",
                  type: "radar",
                  data: chartData.map((dataset) => ({
                    name: dataset.label,
                    value: dataset.data.map((d) => 
                      Array.isArray(d.value) ? d.value[0] : d.value
                    ),
                  })),
                },
              ],
            }
            break

          case "polar":
            specificOption = {
              angleAxis: {
                type: "category",
                data: chartData[0]?.data.map((d) => d.name) || [],
              },
              radiusAxis: {},
              polar: {},
              series: chartData.map((dataset) => ({
                name: dataset.label,
                type: "bar",
                data: dataset.data.map((d) => d.value),
                coordinateSystem: "polar",
                itemStyle: dataset.color ? { color: dataset.color } : undefined,
              })),
            }
            break

          case "heatmap":
            const heatmapData: any[] = []
            chartData.forEach((dataset, i) => {
              dataset.data.forEach((d, j) => {
                heatmapData.push([j, i, d.value])
              })
            })
            
            specificOption = {
              xAxis: {
                type: "category",
                data: chartData[0]?.data.map((d) => d.name) || [],
              },
              yAxis: {
                type: "category",
                data: chartData.map((d) => d.label),
              },
              visualMap: {
                min: 0,
                max: Math.max(...heatmapData.map(d => d[2])),
                calculable: true,
                orient: "horizontal",
                left: "center",
                bottom: "0%",
              },
              series: [
                {
                  name: "Heatmap",
                  type: "heatmap",
                  data: heatmapData,
                  label: {
                    show: true,
                  },
                },
              ],
            }
            break

          case "funnel":
            specificOption = {
              series: [
                {
                  name: chartData[0]?.label || "Funnel",
                  type: "funnel",
                  data: chartData[0]?.data.map((d) => ({
                    name: d.name,
                    value: d.value,
                  })) || [],
                  left: "10%",
                  width: "80%",
                },
              ],
            }
            break

          case "gauge":
            specificOption = {
              series: [
                {
                  name: chartData[0]?.label || "Gauge",
                  type: "gauge",
                                  data: [
                  {
                    value: Array.isArray(chartData[0]?.data[0]?.value) 
                      ? chartData[0].data[0].value[0] 
                      : (chartData[0]?.data[0]?.value || 0),
                    name: chartData[0]?.data[0]?.name || "Score",
                  },
                ],
                  detail: {
                    formatter: "{value}",
                  },
                },
              ],
            }
            break
        }

        const finalOption = { ...baseOption, ...specificOption }
        set({ chartOption: finalOption })
      },

      resetChart: () => {
        set({
          chartType: "bar",
          chartData: defaultChartData,
          chartConfig: defaultChartConfig,
          chartOption: {},
        })
        get().generateChartOption()
      },

      setExportFormat: (format) => set({ exportFormat: format }),
    }),
    {
      name: "chart-storage",
      partialize: (state) => ({
        chartType: state.chartType,
        chartData: state.chartData,
        chartConfig: state.chartConfig,
      }),
    }
  )
)