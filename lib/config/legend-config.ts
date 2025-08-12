// Legend Configuration Options
export interface LegendConfig {
  id?: string
  show?: boolean
  type?: 'plain' | 'scroll'
  
  // Position
  left?: number | string | 'left' | 'center' | 'right'
  top?: number | string | 'top' | 'middle' | 'bottom'
  right?: number | string
  bottom?: number | string
  width?: number | string
  height?: number | string
  
  // Orientation and Layout
  orient?: 'horizontal' | 'vertical'
  align?: 'auto' | 'left' | 'right'
  
  // Padding and Gap
  padding?: number | [number, number] | [number, number, number, number]
  itemGap?: number
  itemWidth?: number
  itemHeight?: number
  
  // Symbol
  symbolKeepAspect?: boolean
  formatter?: string | ((name: string) => string)
  
  // Selection
  selectedMode?: boolean | 'single' | 'multiple'
  inactiveColor?: string
  inactiveBorderColor?: string
  inactiveBorderWidth?: number
  selected?: Record<string, boolean>
  
  // Text Style
  textStyle?: {
    color?: string
    fontStyle?: 'normal' | 'italic' | 'oblique'
    fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number
    fontFamily?: string
    fontSize?: number
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
  
  // Icon
  icon?: string
  itemStyle?: {
    color?: string
    borderColor?: string
    borderWidth?: number
    borderType?: 'solid' | 'dashed' | 'dotted'
    borderDashOffset?: number
    cap?: 'butt' | 'round' | 'square'
    join?: 'bevel' | 'round' | 'miter'
    miterLimit?: number
    shadowBlur?: number
    shadowColor?: string
    shadowOffsetX?: number
    shadowOffsetY?: number
    opacity?: number
    decal?: object
  }
  
  // Line Style (for line series)
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
  
  // Emphasis
  emphasis?: {
    selectorLabel?: {
      show?: boolean
      distance?: number
      rotate?: number
      offset?: [number, number]
      color?: string
      fontStyle?: string
      fontWeight?: string | number
      fontFamily?: string
      fontSize?: number
      align?: 'left' | 'center' | 'right'
      verticalAlign?: 'top' | 'middle' | 'bottom'
      lineHeight?: number
      backgroundColor?: string | object
      borderColor?: string
      borderWidth?: number
      borderType?: string
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
      textShadowColor?: string
      textShadowBlur?: number
      textShadowOffsetX?: number
      textShadowOffsetY?: number
      rich?: Record<string, any>
    }
  }
  
  // Selector (for legend type: 'scroll')
  selector?: boolean | Array<{
    type: 'all' | 'inverse'
    title?: string
  }>
  selectorLabel?: {
    show?: boolean
    distance?: number
    rotate?: number
    offset?: [number, number]
    color?: string
    fontStyle?: string
    fontWeight?: string | number
    fontFamily?: string
    fontSize?: number
    align?: 'left' | 'center' | 'right'
    verticalAlign?: 'top' | 'middle' | 'bottom'
    lineHeight?: number
    backgroundColor?: string | object
    borderColor?: string
    borderWidth?: number
    borderType?: string
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
    textShadowColor?: string
    textShadowBlur?: number
    textShadowOffsetX?: number
    textShadowOffsetY?: number
    rich?: Record<string, any>
  }
  selectorPosition?: 'auto' | 'start' | 'end'
  selectorItemGap?: number
  selectorButtonGap?: number
  
  // Paging (for legend type: 'scroll')
  pageButtonItemGap?: number
  pageButtonGap?: number
  pageButtonPosition?: 'start' | 'end'
  pageFormatter?: string | ((current: number, total: number) => string)
  pageIcons?: {
    horizontal?: [string, string]
    vertical?: [string, string]
  }
  pageIconColor?: string
  pageIconInactiveColor?: string
  pageIconSize?: number | [number, number]
  pageTextStyle?: {
    color?: string
    fontStyle?: string
    fontWeight?: string | number
    fontFamily?: string
    fontSize?: number
    lineHeight?: number
    width?: number
    height?: number
    textBorderColor?: string
    textBorderWidth?: number
    textShadowColor?: string
    textShadowBlur?: number
    textShadowOffsetX?: number
    textShadowOffsetY?: number
    rich?: Record<string, any>
  }
  
  // Scroll
  scrollDataIndex?: number
  pageButtonItemGap?: number
  pageButtonGap?: number
  
  // Animation
  animation?: boolean
  animationDurationUpdate?: number
  
  // Background
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number | [number, number, number, number]
  shadowBlur?: number
  shadowColor?: string
  shadowOffsetX?: number
  shadowOffsetY?: number
  
  // Data
  data?: Array<string | LegendDataItem>
  
  // Tooltip
  tooltip?: {
    show?: boolean
    trigger?: 'item' | 'axis' | 'none'
    triggerOn?: 'mousemove' | 'click' | 'mousemove|click' | 'none'
    alwaysShowContent?: boolean
    showDelay?: number
    hideDelay?: number
    enterable?: boolean
    confine?: boolean
    transitionDuration?: number
    position?: any
    formatter?: string | ((params: any) => string)
    backgroundColor?: string
    borderColor?: string
    borderWidth?: number
    padding?: number | number[]
    textStyle?: any
    extraCssText?: string
  }
  
  // Z-level
  zlevel?: number
  z?: number
}

export interface LegendDataItem {
  name?: string
  icon?: string
  itemStyle?: any
  lineStyle?: any
  symbolRotate?: number
  textStyle?: any
}

export const DEFAULT_LEGEND_CONFIG: LegendConfig = {
  show: true,
  type: 'plain',
  left: 'center',
  top: 'top',
  orient: 'horizontal',
  align: 'auto',
  padding: 5,
  itemGap: 10,
  itemWidth: 25,
  itemHeight: 14,
  symbolKeepAspect: true,
  selectedMode: true,
  inactiveColor: '#ccc',
  textStyle: {
    color: '#333',
    fontSize: 12
  },
  backgroundColor: 'transparent',
  borderColor: '#ccc',
  borderWidth: 0,
  borderRadius: 0,
  z: 2
}

export const LEGEND_POSITION_PRESETS = {
  topLeft: { left: 'left', top: 'top', orient: 'horizontal' },
  topCenter: { left: 'center', top: 'top', orient: 'horizontal' },
  topRight: { left: 'right', top: 'top', orient: 'horizontal' },
  bottomLeft: { left: 'left', top: 'bottom', orient: 'horizontal' },
  bottomCenter: { left: 'center', top: 'bottom', orient: 'horizontal' },
  bottomRight: { left: 'right', top: 'bottom', orient: 'horizontal' },
  leftTop: { left: 'left', top: 'top', orient: 'vertical' },
  leftMiddle: { left: 'left', top: 'middle', orient: 'vertical' },
  leftBottom: { left: 'left', top: 'bottom', orient: 'vertical' },
  rightTop: { left: 'right', top: 'top', orient: 'vertical' },
  rightMiddle: { left: 'right', top: 'middle', orient: 'vertical' },
  rightBottom: { left: 'right', top: 'bottom', orient: 'vertical' }
}

export const LEGEND_ICON_OPTIONS = [
  { value: 'circle', label: 'Circle' },
  { value: 'rect', label: 'Rectangle' },
  { value: 'roundRect', label: 'Rounded Rectangle' },
  { value: 'triangle', label: 'Triangle' },
  { value: 'diamond', label: 'Diamond' },
  { value: 'pin', label: 'Pin' },
  { value: 'arrow', label: 'Arrow' },
  { value: 'none', label: 'None' }
]

export const LEGEND_ORIENT_OPTIONS = [
  { value: 'horizontal', label: 'Horizontal' },
  { value: 'vertical', label: 'Vertical' }
]

export const LEGEND_ALIGN_OPTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' }
]