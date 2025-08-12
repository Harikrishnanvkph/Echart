// Axis Configuration Options
export interface AxisConfig {
  id?: string
  show?: boolean
  type?: 'value' | 'category' | 'time' | 'log'
  name?: string
  nameLocation?: 'start' | 'middle' | 'center' | 'end'
  nameTextStyle?: TextStyle
  nameGap?: number
  nameRotate?: number
  inverse?: boolean
  
  // Bounds
  boundaryGap?: boolean | [string | number, string | number]
  min?: number | string | ((value: {min: number, max: number}) => number)
  max?: number | string | ((value: {min: number, max: number}) => number)
  scale?: boolean
  
  // Split
  splitNumber?: number
  minInterval?: number
  maxInterval?: number
  interval?: number
  logBase?: number
  
  // Grid Lines
  splitLine?: {
    show?: boolean
    interval?: number | 'auto' | ((index: number, value: string) => boolean)
    lineStyle?: LineStyle
  }
  
  splitArea?: {
    show?: boolean
    interval?: number | 'auto' | ((index: number, value: string) => boolean)
    areaStyle?: AreaStyle
  }
  
  // Minor Split
  minorTick?: {
    show?: boolean
    splitNumber?: number
    length?: number
    lineStyle?: LineStyle
  }
  
  minorSplitLine?: {
    show?: boolean
    lineStyle?: LineStyle
  }
  
  // Axis Line
  axisLine?: {
    show?: boolean
    onZero?: boolean
    onZeroAxisIndex?: number
    symbol?: string | [string, string]
    symbolSize?: [number, number]
    symbolOffset?: [number, number]
    lineStyle?: LineStyle
  }
  
  // Axis Tick
  axisTick?: {
    show?: boolean
    alignWithLabel?: boolean
    interval?: number | 'auto' | ((index: number, value: string) => boolean)
    inside?: boolean
    length?: number
    lineStyle?: LineStyle
  }
  
  // Axis Label
  axisLabel?: {
    show?: boolean
    interval?: number | 'auto' | ((index: number, value: string) => boolean)
    inside?: boolean
    rotate?: number
    margin?: number
    formatter?: string | ((value: any, index: number) => string)
    showMinLabel?: boolean
    showMaxLabel?: boolean
    hideOverlap?: boolean
    color?: string | ((value: any, index: number) => string)
    fontStyle?: 'normal' | 'italic' | 'oblique'
    fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number
    fontFamily?: string
    fontSize?: number
    align?: 'left' | 'center' | 'right'
    verticalAlign?: 'top' | 'middle' | 'bottom'
    lineHeight?: number
    backgroundColor?: string | object
    borderColor?: string
    borderWidth?: number
    borderType?: 'solid' | 'dashed' | 'dotted'
    borderRadius?: number
    padding?: number | number[]
    shadowColor?: string
    shadowBlur?: number
    shadowOffsetX?: number
    shadowOffsetY?: number
    width?: number
    height?: number
    textBorderColor?: string
    textBorderWidth?: number
    textBorderType?: 'solid' | 'dashed' | 'dotted'
    textShadowColor?: string
    textShadowBlur?: number
    textShadowOffsetX?: number
    textShadowOffsetY?: number
    overflow?: 'truncate' | 'break' | 'breakAll'
    ellipsis?: string
    rich?: Record<string, any>
  }
  
  // Pointer
  axisPointer?: {
    show?: boolean
    type?: 'line' | 'shadow' | 'none'
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
    lineStyle?: LineStyle
    shadowStyle?: {
      color?: string
      shadowBlur?: number
      shadowColor?: string
      shadowOffsetX?: number
      shadowOffsetY?: number
      opacity?: number
    }
    triggerTooltip?: boolean
    value?: number
    status?: 'show' | 'hide'
    handle?: {
      show?: boolean
      icon?: string
      size?: number | [number, number]
      margin?: number
      color?: string
      throttle?: number
      shadowBlur?: number
      shadowColor?: string
      shadowOffsetX?: number
      shadowOffsetY?: number
    }
  }
  
  // Data
  data?: Array<string | number | AxisDataItem>
  
  // Position (for grid axes)
  position?: 'top' | 'bottom' | 'left' | 'right'
  offset?: number
  gridIndex?: number
  
  // Animation
  animation?: boolean
  animationThreshold?: number
  animationDuration?: number
  animationEasing?: string
  animationDelay?: number | ((idx: number) => number)
  animationDurationUpdate?: number
  animationEasingUpdate?: string
  animationDelayUpdate?: number | ((idx: number) => number)
  
  // Z-level
  zlevel?: number
  z?: number
  
  // Silent
  silent?: boolean
  triggerEvent?: boolean
}

export interface AxisDataItem {
  value?: string | number
  textStyle?: TextStyle
  icon?: string
}

export interface TextStyle {
  color?: string
  fontStyle?: 'normal' | 'italic' | 'oblique'
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number
  fontFamily?: string
  fontSize?: number
  align?: 'left' | 'center' | 'right'
  verticalAlign?: 'top' | 'middle' | 'bottom'
  lineHeight?: number
  backgroundColor?: string | object
  borderColor?: string
  borderWidth?: number
  borderType?: 'solid' | 'dashed' | 'dotted'
  borderDashOffset?: number
  borderRadius?: number
  padding?: number | number[]
  shadowColor?: string
  shadowBlur?: number
  shadowOffsetX?: number
  shadowOffsetY?: number
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

export interface LineStyle {
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

export interface AreaStyle {
  color?: string | string[] | object
  origin?: 'auto' | 'start' | 'end'
  shadowBlur?: number
  shadowColor?: string
  shadowOffsetX?: number
  shadowOffsetY?: number
  opacity?: number
}

export const DEFAULT_X_AXIS_CONFIG: AxisConfig = {
  show: true,
  type: 'category',
  position: 'bottom',
  nameLocation: 'end',
  nameGap: 15,
  boundaryGap: true,
  axisLine: {
    show: true,
    lineStyle: {
      color: '#333',
      width: 1,
      type: 'solid'
    }
  },
  axisTick: {
    show: true,
    alignWithLabel: false,
    length: 5,
    lineStyle: {
      color: '#333',
      width: 1,
      type: 'solid'
    }
  },
  axisLabel: {
    show: true,
    interval: 'auto',
    rotate: 0,
    margin: 8,
    color: '#333',
    fontSize: 12
  },
  splitLine: {
    show: false,
    lineStyle: {
      color: '#ccc',
      width: 1,
      type: 'solid'
    }
  },
  splitArea: {
    show: false
  }
}

export const DEFAULT_Y_AXIS_CONFIG: AxisConfig = {
  show: true,
  type: 'value',
  position: 'left',
  nameLocation: 'end',
  nameGap: 15,
  axisLine: {
    show: true,
    lineStyle: {
      color: '#333',
      width: 1,
      type: 'solid'
    }
  },
  axisTick: {
    show: true,
    length: 5,
    lineStyle: {
      color: '#333',
      width: 1,
      type: 'solid'
    }
  },
  axisLabel: {
    show: true,
    color: '#333',
    fontSize: 12
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: '#ccc',
      width: 1,
      type: 'solid'
    }
  },
  splitArea: {
    show: false
  }
}

export const AXIS_TYPE_OPTIONS = [
  { value: 'value', label: 'Numerical Axis' },
  { value: 'category', label: 'Category Axis' },
  { value: 'time', label: 'Time Axis' },
  { value: 'log', label: 'Log Axis' }
]

export const AXIS_POSITION_OPTIONS = {
  xAxis: [
    { value: 'top', label: 'Top' },
    { value: 'bottom', label: 'Bottom' }
  ],
  yAxis: [
    { value: 'left', label: 'Left' },
    { value: 'right', label: 'Right' }
  ]
}

export const AXIS_NAME_LOCATION_OPTIONS = [
  { value: 'start', label: 'Start' },
  { value: 'middle', label: 'Middle' },
  { value: 'center', label: 'Center' },
  { value: 'end', label: 'End' }
]

export const AXIS_LABEL_FORMATTER_PRESETS = {
  thousands: (value: number) => value.toLocaleString(),
  percentage: (value: number) => `${(value * 100).toFixed(1)}%`,
  currency: (value: number) => `$${value.toLocaleString()}`,
  scientific: (value: number) => value.toExponential(2),
  decimal: (value: number) => value.toFixed(2),
  integer: (value: number) => Math.round(value).toString(),
  date: (value: any) => new Date(value).toLocaleDateString(),
  time: (value: any) => new Date(value).toLocaleTimeString(),
  datetime: (value: any) => new Date(value).toLocaleString()
}