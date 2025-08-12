import type { EChartsOption } from 'echarts'
import { deepMerge, setByPath, getByPath, type PlainObject } from '@/lib/utils/object'

export type ControlType =
  | 'toggle' | 'number' | 'text' | 'select' | 'color' | 'slider' | 'json' | 'button'

export interface ToolControlOption {
  label: string
  value: string | number | boolean
}

export interface ToolControl {
  id: string
  label: string
  description?: string
  type: ControlType
  path: string
  min?: number
  max?: number
  step?: number
  options?: ToolControlOption[]
  placeholder?: string
  defaultValue?: any
  dependsOn?: string[]
  visibleWhen?: Array<{ path: string; equals: any }>
}

export interface ToolGroup {
  id: string
  label: string
  icon?: string
  controls: ToolControl[]
}

export interface ToolsRegistry {
  groups: ToolGroup[]
  apply: (option: EChartsOption, values: Record<string, any>) => EChartsOption
}

export function applyTools(option: EChartsOption, values: Record<string, any>): EChartsOption {
  let output: PlainObject = deepMerge({}, option as any)
  for (const [path, value] of Object.entries(values)) {
    output = setByPath(output, path, value)
  }
  return output as EChartsOption
}

// Builders
function range(min: number, max: number, step = 1): { min: number; max: number; step: number } {
  return { min, max, step }
}

function select(options: Array<string | number | { label: string; value: string | number }>): ToolControlOption[] {
  return options.map((o) => (typeof o === 'object' && 'label' in o ? o : { label: String(o), value: o as any }))
}

// Core groups (seed ~60 controls). We will synthesize many more via programmatic expansion below.
const coreGroups: ToolGroup[] = [
  {
    id: 'title',
    label: 'Title',
    icon: 'Type',
    controls: [
      { id: 'title.text', label: 'Title Text', type: 'text', path: 'title.text', placeholder: 'Chart title' },
      { id: 'title.subtext', label: 'Subtitle', type: 'text', path: 'title.subtext' },
      { id: 'title.left', label: 'Title Align', type: 'select', path: 'title.left', options: select(['auto','left','center','right']) },
      { id: 'title.top', label: 'Title Vertical', type: 'select', path: 'title.top', options: select(['auto','top','middle','bottom']) },
      { id: 'title.textStyle.color', label: 'Title Color', type: 'color', path: 'title.textStyle.color' },
      { id: 'title.textStyle.fontSize', label: 'Title Font Size', type: 'number', path: 'title.textStyle.fontSize', ...range(8, 48, 1) },
    ],
  },
  {
    id: 'legend',
    label: 'Legend',
    icon: 'List',
    controls: [
      { id: 'legend.show', label: 'Show Legend', type: 'toggle', path: 'legend.show', defaultValue: true },
      { id: 'legend.orient', label: 'Orientation', type: 'select', path: 'legend.orient', options: select(['horizontal','vertical']) },
      { id: 'legend.left', label: 'Align', type: 'select', path: 'legend.left', options: select(['left','center','right']) },
      { id: 'legend.top', label: 'Vertical', type: 'select', path: 'legend.top', options: select(['top','middle','bottom']) },
      { id: 'legend.textStyle.color', label: 'Text Color', type: 'color', path: 'legend.textStyle.color' },
      { id: 'legend.itemWidth', label: 'Item Width', type: 'number', path: 'legend.itemWidth', ...range(4, 40) },
      { id: 'legend.itemHeight', label: 'Item Height', type: 'number', path: 'legend.itemHeight', ...range(4, 40) },
    ],
  },
  {
    id: 'tooltip',
    label: 'Tooltip',
    icon: 'SquareDashed',
    controls: [
      { id: 'tooltip.show', label: 'Show Tooltip', type: 'toggle', path: 'tooltip.show', defaultValue: true },
      { id: 'tooltip.trigger', label: 'Trigger', type: 'select', path: 'tooltip.trigger', options: select(['item','axis','none']) },
      { id: 'tooltip.axisPointer.type', label: 'Axis Pointer', type: 'select', path: 'tooltip.axisPointer.type', options: select(['line','shadow','cross','none']) },
      { id: 'tooltip.backgroundColor', label: 'Background', type: 'color', path: 'tooltip.backgroundColor' },
      { id: 'tooltip.borderWidth', label: 'Border Width', type: 'number', path: 'tooltip.borderWidth', ...range(0, 10) },
    ],
  },
  {
    id: 'grid',
    label: 'Grid',
    icon: 'Grid',
    controls: [
      { id: 'grid.show', label: 'Show Grid', type: 'toggle', path: 'grid.show' },
      { id: 'grid.left', label: 'Left', type: 'text', path: 'grid.left' },
      { id: 'grid.right', label: 'Right', type: 'text', path: 'grid.right' },
      { id: 'grid.top', label: 'Top', type: 'text', path: 'grid.top' },
      { id: 'grid.bottom', label: 'Bottom', type: 'text', path: 'grid.bottom' },
      { id: 'grid.containLabel', label: 'Contain Label', type: 'toggle', path: 'grid.containLabel' },
    ],
  },
  {
    id: 'xAxis',
    label: 'X Axis',
    icon: 'Axis3D',
    controls: [
      { id: 'xAxis.show', label: 'Show', type: 'toggle', path: 'xAxis.show', defaultValue: true },
      { id: 'xAxis.type', label: 'Type', type: 'select', path: 'xAxis.type', options: select(['value','category','time','log']) },
      { id: 'xAxis.name', label: 'Name', type: 'text', path: 'xAxis.name' },
      { id: 'xAxis.axisLabel.rotate', label: 'Label Rotate', type: 'number', path: 'xAxis.axisLabel.rotate', ...range(-90, 90) },
      { id: 'xAxis.axisLine.lineStyle.color', label: 'Line Color', type: 'color', path: 'xAxis.axisLine.lineStyle.color' },
      { id: 'xAxis.splitLine.show', label: 'Show Split Lines', type: 'toggle', path: 'xAxis.splitLine.show' },
    ],
  },
  {
    id: 'yAxis',
    label: 'Y Axis',
    icon: 'Axis3D',
    controls: [
      { id: 'yAxis.show', label: 'Show', type: 'toggle', path: 'yAxis.show', defaultValue: true },
      { id: 'yAxis.type', label: 'Type', type: 'select', path: 'yAxis.type', options: select(['value','category','time','log']) },
      { id: 'yAxis.name', label: 'Name', type: 'text', path: 'yAxis.name' },
      { id: 'yAxis.axisLabel.rotate', label: 'Label Rotate', type: 'number', path: 'yAxis.axisLabel.rotate', ...range(-90, 90) },
      { id: 'yAxis.axisLine.lineStyle.color', label: 'Line Color', type: 'color', path: 'yAxis.axisLine.lineStyle.color' },
      { id: 'yAxis.splitLine.show', label: 'Show Split Lines', type: 'toggle', path: 'yAxis.splitLine.show' },
    ],
  },
  {
    id: 'seriesCommon',
    label: 'Series (Common)',
    icon: 'Layers',
    controls: [
      { id: 'series[0].name', label: 'Series 1 Name', type: 'text', path: 'series[0].name' },
      { id: 'series[0].itemStyle.color', label: 'Series 1 Color', type: 'color', path: 'series[0].itemStyle.color' },
      { id: 'series[0].emphasis.focus', label: 'Focus', type: 'select', path: 'series[0].emphasis.focus', options: select(['none','series','self']) },
      { id: 'series[0].z', label: 'Z', type: 'number', path: 'series[0].z', ...range(-10, 10) },
      { id: 'series[1].name', label: 'Series 2 Name', type: 'text', path: 'series[1].name' },
      { id: 'series[1].itemStyle.color', label: 'Series 2 Color', type: 'color', path: 'series[1].itemStyle.color' },
    ],
  },
  {
    id: 'visualMap',
    label: 'Visual Map',
    icon: 'Palette',
    controls: [
      { id: 'visualMap.show', label: 'Show', type: 'toggle', path: 'visualMap.show' },
      { id: 'visualMap.type', label: 'Type', type: 'select', path: 'visualMap.type', options: select(['continuous','piecewise']) },
      { id: 'visualMap.orient', label: 'Orient', type: 'select', path: 'visualMap.orient', options: select(['horizontal','vertical']) },
      { id: 'visualMap.left', label: 'Left', type: 'select', path: 'visualMap.left', options: select(['left','center','right']) },
      { id: 'visualMap.top', label: 'Top', type: 'select', path: 'visualMap.top', options: select(['top','middle','bottom']) },
    ],
  },
  {
    id: 'dataset',
    label: 'Dataset',
    icon: 'Database',
    controls: [
      { id: 'dataset.source', label: 'Dataset Source (JSON)', type: 'json', path: 'dataset.source' },
    ],
  },
  {
    id: 'animation',
    label: 'Animation',
    icon: 'Zap',
    controls: [
      { id: 'animation', label: 'Enable', type: 'toggle', path: 'animation', defaultValue: true },
      { id: 'animationDuration', label: 'Duration', type: 'slider', path: 'animationDuration', ...range(0, 5000, 50) },
      { id: 'animationEasing', label: 'Easing', type: 'select', path: 'animationEasing', options: select(['linear','quadraticIn','quadraticOut','cubicInOut','elasticOut','bounceOut']) },
    ],
  },
]

// Programmatic expansion across series[0..49] and style subpaths to reach 1000+ controls
function expandSeriesControls(count: number): ToolGroup[] {
  const groups: ToolGroup[] = []
  for (let i = 0; i < count; i++) {
    groups.push({
      id: `series-${i}`,
      label: `Series ${i + 1}`,
      icon: 'Layers',
      controls: [
        { id: `series[${i}].type`, label: 'Type', type: 'select', path: `series[${i}].type`, options: select(['line','bar','pie','scatter','radar','heatmap','funnel','gauge']) },
        { id: `series[${i}].name`, label: 'Name', type: 'text', path: `series[${i}].name` },
        { id: `series[${i}].itemStyle.color`, label: 'Color', type: 'color', path: `series[${i}].itemStyle.color` },
        { id: `series[${i}].itemStyle.opacity`, label: 'Opacity', type: 'slider', path: `series[${i}].itemStyle.opacity`, ...range(0, 1, 0.05) },
        { id: `series[${i}].symbol`, label: 'Symbol', type: 'select', path: `series[${i}].symbol`, options: select(['none','circle','rect','roundRect','triangle','diamond','pin','arrow']) },
        { id: `series[${i}].symbolSize`, label: 'Symbol Size', type: 'slider', path: `series[${i}].symbolSize`, ...range(0, 40, 1) },
        { id: `series[${i}].lineStyle.width`, label: 'Line Width', type: 'slider', path: `series[${i}].lineStyle.width`, ...range(0, 12, 1) },
        { id: `series[${i}].lineStyle.type`, label: 'Line Type', type: 'select', path: `series[${i}].lineStyle.type`, options: select(['solid','dashed','dotted']) },
        { id: `series[${i}].areaStyle.opacity`, label: 'Area Opacity', type: 'slider', path: `series[${i}].areaStyle.opacity`, ...range(0, 1, 0.05) },
        { id: `series[${i}].smooth`, label: 'Smooth', type: 'toggle', path: `series[${i}].smooth` },
        { id: `series[${i}].stack`, label: 'Stack', type: 'text', path: `series[${i}].stack` },
        { id: `series[${i}].barWidth`, label: 'Bar Width', type: 'text', path: `series[${i}].barWidth` },
        { id: `series[${i}].label.show`, label: 'Show Label', type: 'toggle', path: `series[${i}].label.show` },
        { id: `series[${i}].label.formatter`, label: 'Label Format', type: 'text', path: `series[${i}].label.formatter`, placeholder: '{b}: {c}' },
        { id: `series[${i}].label.position`, label: 'Label Position', type: 'select', path: `series[${i}].label.position`, options: select(['top','left','right','bottom','inside','center']) },
      ],
    })
  }
  return groups
}

function expandAxesVariants(): ToolGroup[] {
  const axes = ['xAxis', 'yAxis'] as const
  const props = [
    ['axisLabel.color','color'],
    ['axisLabel.fontSize','number', 8, 32, 1],
    ['axisLabel.rotate','number', -90, 90, 1],
    ['axisLine.lineStyle.color','color'],
    ['axisLine.lineStyle.width','number', 0, 6, 1],
    ['splitLine.show','toggle'],
    ['splitLine.lineStyle.type','select',['solid','dashed','dotted']],
  ] as const

  const groups: ToolGroup[] = []
  for (const axis of axes) {
    const controls: ToolControl[] = []
    for (const p of props) {
      const [sub, kind] = p as any
      const id = `${axis}.${sub}`
      if (kind === 'color') {
        controls.push({ id, label: sub, type: 'color', path: `${axis}.${sub}` })
      } else if (kind === 'toggle') {
        controls.push({ id, label: sub, type: 'toggle', path: `${axis}.${sub}` })
      } else if (kind === 'select') {
        controls.push({ id, label: sub, type: 'select', path: `${axis}.${sub}`, options: select((p as any)[2]) })
      } else if (kind === 'number') {
        const [, , min, max, step] = p as any
        controls.push({ id, label: sub, type: 'number', path: `${axis}.${sub}`, min, max, step })
      }
    }
    groups.push({ id: `${axis}-style`, label: `${axis.toUpperCase()} Style`, icon: 'Axis3D', controls })
  }
  return groups
}

function expandGridPositions(): ToolGroup {
  return {
    id: 'grid-spacing',
    label: 'Grid Spacing',
    icon: 'Grid',
    controls: ['left','right','top','bottom','width','height'].map((k) => ({
      id: `grid.${k}`,
      label: k[0].toUpperCase() + k.slice(1),
      type: 'text',
      path: `grid.${k}`,
    })),
  }
}

// Synthesize many palette stops
function expandColorPaletteStops(count: number): ToolGroup {
  const controls: ToolControl[] = []
  for (let i = 0; i < count; i++) {
    controls.push({ id: `color[${i}]`, label: `Color ${i + 1}`, type: 'color', path: `color[${i}]` })
  }
  return { id: 'palette', label: 'Palette', icon: 'Palette', controls }
}

// Build the registry
const synthesizedGroups: ToolGroup[] = [
  ...coreGroups,
  ...expandSeriesControls(60), // 60 series groups * ~15 controls = 900 controls approx
  ...expandAxesVariants(),      // ~2 groups * ~7 controls = 14
  expandGridPositions(),        // ~6
  expandColorPaletteStops(120), // 120 colors
]

export const toolsRegistry: ToolsRegistry = {
  groups: synthesizedGroups,
  apply: applyTools,
}