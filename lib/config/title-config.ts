// Title and Text Configuration Options
export interface TitleConfig {
  show: boolean
  text: string
  link?: string
  target?: 'self' | 'blank'
  subtext?: string
  sublink?: string
  subtarget?: 'self' | 'blank'
  
  // Position
  left?: number | string | 'left' | 'center' | 'right'
  top?: number | string | 'top' | 'middle' | 'bottom'
  right?: number | string
  bottom?: number | string
  
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
  
  // Subtext Style
  subtextStyle?: {
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
  
  // Alignment
  textAlign?: 'auto' | 'left' | 'right' | 'center'
  textVerticalAlign?: 'auto' | 'top' | 'bottom' | 'middle'
  
  // Spacing
  padding?: number | [number, number] | [number, number, number, number]
  itemGap?: number
  
  // Background
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number | [number, number, number, number]
  shadowBlur?: number
  shadowColor?: string
  shadowOffsetX?: number
  shadowOffsetY?: number
  
  // Z-level
  zlevel?: number
  z?: number
  
  // Animation
  triggerEvent?: boolean
  animation?: boolean
  animationThreshold?: number
  animationDuration?: number
  animationEasing?: string
  animationDelay?: number | ((idx: number) => number)
  animationDurationUpdate?: number
  animationEasingUpdate?: string
  animationDelayUpdate?: number | ((idx: number) => number)
}

export const DEFAULT_TITLE_CONFIG: TitleConfig = {
  show: true,
  text: '',
  textStyle: {
    color: '#333',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    fontSize: 18,
    lineHeight: 18
  },
  subtextStyle: {
    color: '#aaa',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 12,
    lineHeight: 12
  },
  textAlign: 'auto',
  textVerticalAlign: 'auto',
  padding: 5,
  itemGap: 10,
  zlevel: 0,
  z: 2,
  left: 'center',
  top: 'auto',
  triggerEvent: false
}

export const TITLE_POSITION_PRESETS = {
  topLeft: { left: 'left', top: 'top' },
  topCenter: { left: 'center', top: 'top' },
  topRight: { left: 'right', top: 'top' },
  middleLeft: { left: 'left', top: 'middle' },
  center: { left: 'center', top: 'middle' },
  middleRight: { left: 'right', top: 'middle' },
  bottomLeft: { left: 'left', top: 'bottom' },
  bottomCenter: { left: 'center', top: 'bottom' },
  bottomRight: { left: 'right', top: 'bottom' }
}

export const TEXT_STYLE_PRESETS = {
  heading1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40
  },
  heading2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32
  },
  heading3: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24
  },
  body: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: 16
  },
  small: {
    fontSize: 10,
    fontWeight: 'normal',
    lineHeight: 14
  }
}