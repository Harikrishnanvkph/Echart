"use client"

import React, { useState } from 'react'
import { toolsRegistry } from '@/lib/tools/registry'
import { useChartStore } from '@/lib/chart-store'
import { cn } from '@/lib/utils'

interface ToolsPanelProps {
  className?: string
  option?: any
  onOptionChange?: (nextOption: any, overrides: Record<string, any>) => void
}

export function ToolsPanel({ className, option, onOptionChange }: ToolsPanelProps) {
  const store = useChartStore()
  const useExternal = !!option && !!onOptionChange

  const { chartOption, updateChartOption } = store

  const [overrides, setOverrides] = useState<Record<string, any>>({})
  const groups = toolsRegistry.groups

  const handleChange = (path: string, value: any) => {
    setOverrides((prev) => {
      const next = { ...prev, [path]: value }
      const base = useExternal ? option : chartOption
      const merged = toolsRegistry.apply(base as any, next)
      if (useExternal) {
        onOptionChange?.(merged, next)
      } else {
        updateChartOption(merged as any)
      }
      return next
    })
  }

  const renderControl = (control: any) => {
    const id = control.id
    const path = control.path
    const type = control.type

    const onChange = (value: any) => handleChange(path, value)

    switch (type) {
      case 'toggle':
        return (
          <label key={id} className="flex items-center justify-between py-1.5">
            <span className="text-sm text-gray-700">{control.label}</span>
            <input type="checkbox" className="h-4 w-4" onChange={(e) => onChange(e.target.checked)} />
          </label>
        )
      case 'number':
        return (
          <div key={id} className="space-y-1">
            <label className="text-sm text-gray-700">{control.label}</label>
            <input
              type="number"
              min={control.min}
              max={control.max}
              step={control.step ?? 1}
              className="w-full px-2 py-1 border rounded text-sm"
              onChange={(e) => onChange(Number(e.target.value))}
            />
          </div>
        )
      case 'slider':
        return (
          <div key={id} className="space-y-1">
            <label className="text-sm text-gray-700">{control.label}</label>
            <input
              type="range"
              min={control.min ?? 0}
              max={control.max ?? 100}
              step={control.step ?? 1}
              className="w-full"
              onChange={(e) => onChange(Number(e.target.value))}
            />
          </div>
        )
      case 'text':
        return (
          <div key={id} className="space-y-1">
            <label className="text-sm text-gray-700">{control.label}</label>
            <input
              type="text"
              className="w-full px-2 py-1 border rounded text-sm"
              placeholder={control.placeholder}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        )
      case 'color':
        return (
          <div key={id} className="space-y-1">
            <label className="text-sm text-gray-700">{control.label}</label>
            <input
              type="color"
              className="w-full h-9 rounded"
              onChange={(e) => onChange(e.target.value)}
              defaultValue="#5470c6"
            />
          </div>
        )
      case 'select':
        return (
          <div key={id} className="space-y-1">
            <label className="text-sm text-gray-700">{control.label}</label>
            <select
              className="w-full px-2 py-1 border rounded text-sm bg-white"
              onChange={(e) => onChange(e.target.value)}
            >
              <option value="">Select</option>
              {(control.options || []).map((opt: any) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        )
      case 'json':
        return (
          <div key={id} className="space-y-1">
            <label className="text-sm text-gray-700">{control.label}</label>
            <textarea
              className="w-full h-28 p-2 border rounded text-xs font-mono"
              placeholder="Enter JSON"
              onBlur={(e) => {
                try { onChange(JSON.parse(e.target.value || 'null')) } catch {}
              }}
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={cn('flex h-full bg-gray-50', className)}>
      <div className="flex-1 bg-white overflow-y-auto">
        <div className="p-4 space-y-6">
          {groups.map((group) => (
            <div key={group.id} className="border rounded-lg">
              <div className="px-3 py-2 border-b bg-gray-50 font-medium text-sm">{group.label}</div>
              <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                {group.controls.map((control) => renderControl(control))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}