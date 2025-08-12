// Tooltip Configuration Options
export interface TooltipConfig {
  show?: boolean
  trigger?: 'item' | 'axis' | 'none'
  triggerOn?: 'mousemove' | 'click' | 'mousemove|click' | 'none'
  
  // Show/Hide behavior
  showContent?: boolean
  alwaysShowContent?: boolean
  showDelay?: number
  hideDelay?: number
  enterable?: boolean
  confine?: boolean
  appendToBody?: boolean
  className?: string
  transitionDuration?: number
  
  // Position
  position?: TooltipPosition | TooltipPositionCallback
  
  // Formatter
  formatter?: string | TooltipFormatterCallback
  valueFormatter?: (value: number | string) => string
  
  // Background and Border
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
  
  // Padding
  padding?: number | [number, number] | [number, number, number, number]
  
  // Text Style
  textStyle?: {
    color?: string
    fontStyle?: 'normal' | 'italic' | 'oblique'
    fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number
    fontFamily?: string
    fontSize?: number
    lineHeight?: number
    width?: number | string
    height?: number | string
    textBorderColor?: string
    textBorderWidth?: number
    textBorderType?: 'solid' | 'dashed' | 'dotted'
    textBorderDashOffset?: number
    textShadowColor?: string
    textShadowBlur?: number
    textShadowOffsetX?: number
    textShadowOffsetY?: number
    overflow?: 'truncate' | 'break' | 'breakAll'
    ellipsis?: string
    rich?: Record<string, any>
  }
  
  // Extra CSS
  extraCssText?: string
  
  // Order
  order?: 'seriesAsc' | 'seriesDesc' | 'valueAsc' | 'valueDesc'
  
  // Render Mode
  renderMode?: 'html' | 'richText'
  
  // Axis Pointer
  axisPointer?: {
    type?: 'line' | 'shadow' | 'cross' | 'none'
    axis?: 'auto' | 'x' | 'y' | 'radius' | 'angle'
    snap?: boolean
    z?: number
    label?: {
      show?: boolean
      precision?: number | 'auto'
      formatter?: string | ((params: any) => string)
      margin?: number
      color?: string
      fontStyle?: string
      fontWeight?: string | number
      fontFamily?: string
      fontSize?: number
      lineHeight?: number
      width?: number | string
      height?: number | string
      textBorderColor?: string
      textBorderWidth?: number
      textShadowColor?: string
      textShadowBlur?: number
      textShadowOffsetX?: number
      textShadowOffsetY?: number
      borderWidth?: number
      borderColor?: string
      padding?: number | number[]
      backgroundColor?: string
      shadowBlur?: number
      shadowColor?: string
      shadowOffsetX?: number
      shadowOffsetY?: number
    }
    lineStyle?: {
      color?: string
      width?: number
      type?: 'solid' | 'dashed' | 'dotted'
      dashOffset?: number
      cap?: 'butt' | 'round' | 'square'
      join?: 'bevel' | 'round' | 'miter'
      miterLimit?: number
      shadowBlur?: number
      shadowColor?: string
      shadowOffsetX?: number
      shadowOffsetY?: number
      opacity?: number
    }
    shadowStyle?: {
      color?: string
      shadowBlur?: number
      shadowColor?: string
      shadowOffsetX?: number
      shadowOffsetY?: number
      opacity?: number
    }
    crossStyle?: {
      color?: string
      width?: number
      type?: 'solid' | 'dashed' | 'dotted'
      dashOffset?: number
      cap?: 'butt' | 'round' | 'square'
      join?: 'bevel' | 'round' | 'miter'
      miterLimit?: number
      shadowBlur?: number
      shadowColor?: string
      shadowOffsetX?: number
      shadowOffsetY?: number
      opacity?: number
      textStyle?: any
    }
    animation?: boolean
    animationThreshold?: number
    animationDuration?: number
    animationEasing?: string
    animationDelay?: number | ((dataIndex: number, params: any) => number)
    animationDurationUpdate?: number
    animationEasingUpdate?: string
    animationDelayUpdate?: number | ((dataIndex: number, params: any) => number)
  }
}

export type TooltipPosition = 
  | [number | string, number | string]
  | 'top' 
  | 'left' 
  | 'right' 
  | 'bottom'
  | 'inside'
  | 'insideLeft'
  | 'insideRight'
  | 'insideTop'
  | 'insideBottom'
  | 'insideTopLeft'
  | 'insideBottomLeft'
  | 'insideTopRight'
  | 'insideBottomRight'

export type TooltipPositionCallback = (
  point: [number, number],
  params: any,
  dom: HTMLElement,
  rect: any,
  size: { contentSize: [number, number], viewSize: [number, number] }
) => [number, number] | { left?: number | string; top?: number | string }

export type TooltipFormatterCallback = (
  params: any,
  ticket: string,
  callback: (ticket: string, html: string) => void
) => string | HTMLElement | HTMLElement[]

export const DEFAULT_TOOLTIP_CONFIG: TooltipConfig = {
  show: true,
  trigger: 'item',
  triggerOn: 'mousemove|click',
  showContent: true,
  alwaysShowContent: false,
  showDelay: 0,
  hideDelay: 100,
  enterable: false,
  confine: false,
  appendToBody: false,
  transitionDuration: 0.4,
  backgroundColor: 'rgba(50, 50, 50, 0.9)',
  borderColor: '#333',
  borderWidth: 0,
  borderRadius: 4,
  padding: 10,
  textStyle: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20
  },
  axisPointer: {
    type: 'line',
    axis: 'auto',
    snap: false,
    lineStyle: {
      color: '#555',
      width: 1,
      type: 'solid',
      opacity: 0.5
    },
    shadowStyle: {
      color: 'rgba(150, 150, 150, 0.3)'
    },
    crossStyle: {
      color: '#555',
      width: 1,
      type: 'dashed',
      opacity: 0.5
    }
  }
}

export const TOOLTIP_FORMATTER_PRESETS = {
  default: (params: any) => {
    if (Array.isArray(params)) {
      return params.map(p => 
        `${p.marker} ${p.seriesName}: <b>${p.value}</b>`
      ).join('<br/>')
    }
    return `${params.marker} ${params.seriesName}<br/>${params.name}: <b>${params.value}</b>`
  },
  
  percentage: (params: any) => {
    const value = Array.isArray(params) ? params[0].value : params.value
    const percent = Array.isArray(params) ? params[0].percent : params.percent
    return `${params.name}<br/>Value: ${value}<br/>Percentage: ${percent}%`
  },
  
  currency: (params: any) => {
    const value = Array.isArray(params) ? params[0].value : params.value
    return `${params.name}: $${value.toLocaleString()}`
  },
  
  detailed: (params: any) => {
    if (Array.isArray(params)) {
      let result = `<div style="font-weight: bold; margin-bottom: 5px">${params[0].name}</div>`
      params.forEach(p => {
        result += `
          <div style="display: flex; justify-content: space-between; align-items: center; margin: 2px 0">
            <span>${p.marker} ${p.seriesName}:</span>
            <span style="font-weight: bold; margin-left: 20px">${p.value}</span>
          </div>
        `
      })
      return result
    }
    return `
      <div style="font-weight: bold">${params.seriesName}</div>
      <div>${params.name}: ${params.value}</div>
    `
  },
  
  custom: (template: string) => {
    return (params: any) => {
      let result = template
      const data = Array.isArray(params) ? params[0] : params
      
      // Replace placeholders
      result = result.replace(/{name}/g, data.name || '')
      result = result.replace(/{value}/g, data.value || '')
      result = result.replace(/{seriesName}/g, data.seriesName || '')
      result = result.replace(/{percent}/g, data.percent || '')
      result = result.replace(/{marker}/g, data.marker || '')
      
      return result
    }
  }
}

export const TOOLTIP_TRIGGER_OPTIONS = [
  { value: 'item', label: 'Item (hover on data point)' },
  { value: 'axis', label: 'Axis (hover anywhere on chart)' },
  { value: 'none', label: 'None (disabled)' }
]

export const TOOLTIP_AXIS_POINTER_OPTIONS = [
  { value: 'line', label: 'Line' },
  { value: 'shadow', label: 'Shadow' },
  { value: 'cross', label: 'Cross' },
  { value: 'none', label: 'None' }
]