"use client"

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Settings,
  Palette,
  Type,
  Grid3x3,
  Activity,
  MousePointer,
  Layers,
  Sparkles,
  Database,
  Share2,
  Download,
  Cloud,
  Users,
  History,
  Zap,
  Eye,
  Gauge
} from 'lucide-react'

interface ConfigurationPanelProps {
  config: any
  onConfigChange: (path: string, value: any) => void
}

export function ConfigurationPanel({ config, onConfigChange }: ConfigurationPanelProps) {
  const [activeTab, setActiveTab] = useState('general')

  const handleChange = (path: string, value: any) => {
    onConfigChange(path, value)
  }

  return (
    <div className="w-full h-full flex flex-col bg-background">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold mb-1">Configuration Panel</h2>
        <p className="text-sm text-muted-foreground">500+ customization options</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start px-4 h-auto flex-wrap gap-1 py-2">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="title" className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            Title & Text
          </TabsTrigger>
          <TabsTrigger value="axes" className="flex items-center gap-2">
            <Grid3x3 className="w-4 h-4" />
            Axes
          </TabsTrigger>
          <TabsTrigger value="series" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Series
          </TabsTrigger>
          <TabsTrigger value="legend" className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Legend
          </TabsTrigger>
          <TabsTrigger value="tooltip" className="flex items-center gap-2">
            <MousePointer className="w-4 h-4" />
            Tooltip
          </TabsTrigger>
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="animation" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Animation
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Data
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="general" className="p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Chart Dimensions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Width</Label>
                    <Input 
                      type="text" 
                      placeholder="100%" 
                      defaultValue={config?.width || '100%'}
                      onChange={(e) => handleChange('width', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Height</Label>
                    <Input 
                      type="text" 
                      placeholder="400px" 
                      defaultValue={config?.height || '400px'}
                      onChange={(e) => handleChange('height', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Background & Border</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Background Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="color" 
                      className="w-20"
                      defaultValue={config?.backgroundColor || '#ffffff'}
                      onChange={(e) => handleChange('backgroundColor', e.target.value)}
                    />
                    <Input 
                      type="text" 
                      placeholder="#ffffff"
                      defaultValue={config?.backgroundColor || '#ffffff'}
                      onChange={(e) => handleChange('backgroundColor', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Border Radius</Label>
                  <Slider 
                    min={0} 
                    max={50} 
                    step={1}
                    defaultValue={[config?.borderRadius || 0]}
                    onValueChange={(value) => handleChange('borderRadius', value[0])}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Grid Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Left</Label>
                    <Input 
                      type="text" 
                      placeholder="10%" 
                      defaultValue={config?.grid?.left || '10%'}
                      onChange={(e) => handleChange('grid.left', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Right</Label>
                    <Input 
                      type="text" 
                      placeholder="10%" 
                      defaultValue={config?.grid?.right || '10%'}
                      onChange={(e) => handleChange('grid.right', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Top</Label>
                    <Input 
                      type="text" 
                      placeholder="60" 
                      defaultValue={config?.grid?.top || '60'}
                      onChange={(e) => handleChange('grid.top', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Bottom</Label>
                    <Input 
                      type="text" 
                      placeholder="60" 
                      defaultValue={config?.grid?.bottom || '60'}
                      onChange={(e) => handleChange('grid.bottom', e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Contain Label</Label>
                  <Switch 
                    defaultChecked={config?.grid?.containLabel}
                    onCheckedChange={(checked) => handleChange('grid.containLabel', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="title" className="p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Main Title</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Title Text</Label>
                  <Input 
                    type="text" 
                    placeholder="Chart Title"
                    defaultValue={config?.title?.text || ''}
                    onChange={(e) => handleChange('title.text', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Subtitle</Label>
                  <Input 
                    type="text" 
                    placeholder="Chart Subtitle"
                    defaultValue={config?.title?.subtext || ''}
                    onChange={(e) => handleChange('title.subtext', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Select 
                    defaultValue={config?.title?.left || 'center'}
                    onValueChange={(value) => handleChange('title.left', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Text Style</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Font Size</Label>
                  <Slider 
                    min={10} 
                    max={48} 
                    step={1}
                    defaultValue={[config?.title?.textStyle?.fontSize || 18]}
                    onValueChange={(value) => handleChange('title.textStyle.fontSize', value[0])}
                  />
                </div>
                <div>
                  <Label>Font Weight</Label>
                  <Select 
                    defaultValue={config?.title?.textStyle?.fontWeight || 'bold'}
                    onValueChange={(value) => handleChange('title.textStyle.fontWeight', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="bold">Bold</SelectItem>
                      <SelectItem value="bolder">Bolder</SelectItem>
                      <SelectItem value="lighter">Lighter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Text Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="color" 
                      className="w-20"
                      defaultValue={config?.title?.textStyle?.color || '#333333'}
                      onChange={(e) => handleChange('title.textStyle.color', e.target.value)}
                    />
                    <Input 
                      type="text" 
                      placeholder="#333333"
                      defaultValue={config?.title?.textStyle?.color || '#333333'}
                      onChange={(e) => handleChange('title.textStyle.color', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="axes" className="p-4 space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="xaxis">
                <AccordionTrigger>X-Axis Configuration</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <Label>Axis Type</Label>
                    <Select 
                      defaultValue={config?.xAxis?.type || 'category'}
                      onValueChange={(value) => handleChange('xAxis.type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="value">Value</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
                        <SelectItem value="time">Time</SelectItem>
                        <SelectItem value="log">Log</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Axis Name</Label>
                    <Input 
                      type="text" 
                      placeholder="X-Axis Label"
                      defaultValue={config?.xAxis?.name || ''}
                      onChange={(e) => handleChange('xAxis.name', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show Axis Line</Label>
                    <Switch 
                      defaultChecked={config?.xAxis?.axisLine?.show !== false}
                      onCheckedChange={(checked) => handleChange('xAxis.axisLine.show', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show Grid Lines</Label>
                    <Switch 
                      defaultChecked={config?.xAxis?.splitLine?.show}
                      onCheckedChange={(checked) => handleChange('xAxis.splitLine.show', checked)}
                    />
                  </div>
                  <div>
                    <Label>Label Rotation</Label>
                    <Slider 
                      min={-90} 
                      max={90} 
                      step={1}
                      defaultValue={[config?.xAxis?.axisLabel?.rotate || 0]}
                      onValueChange={(value) => handleChange('xAxis.axisLabel.rotate', value[0])}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="yaxis">
                <AccordionTrigger>Y-Axis Configuration</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <Label>Axis Type</Label>
                    <Select 
                      defaultValue={config?.yAxis?.type || 'value'}
                      onValueChange={(value) => handleChange('yAxis.type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="value">Value</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
                        <SelectItem value="time">Time</SelectItem>
                        <SelectItem value="log">Log</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Axis Name</Label>
                    <Input 
                      type="text" 
                      placeholder="Y-Axis Label"
                      defaultValue={config?.yAxis?.name || ''}
                      onChange={(e) => handleChange('yAxis.name', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show Axis Line</Label>
                    <Switch 
                      defaultChecked={config?.yAxis?.axisLine?.show !== false}
                      onCheckedChange={(checked) => handleChange('yAxis.axisLine.show', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show Grid Lines</Label>
                    <Switch 
                      defaultChecked={config?.yAxis?.splitLine?.show !== false}
                      onCheckedChange={(checked) => handleChange('yAxis.splitLine.show', checked)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="legend" className="p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Legend Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Show Legend</Label>
                  <Switch 
                    defaultChecked={config?.legend?.show !== false}
                    onCheckedChange={(checked) => handleChange('legend.show', checked)}
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {['top', 'bottom', 'left', 'right', 'center'].map(pos => (
                      <Button
                        key={pos}
                        variant={config?.legend?.orient === pos ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleChange('legend.orient', pos)}
                      >
                        {pos}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Type</Label>
                  <Select 
                    defaultValue={config?.legend?.type || 'plain'}
                    onValueChange={(value) => handleChange('legend.type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plain">Plain</SelectItem>
                      <SelectItem value="scroll">Scrollable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tooltip" className="p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tooltip Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Show Tooltip</Label>
                  <Switch 
                    defaultChecked={config?.tooltip?.show !== false}
                    onCheckedChange={(checked) => handleChange('tooltip.show', checked)}
                  />
                </div>
                <div>
                  <Label>Trigger</Label>
                  <Select 
                    defaultValue={config?.tooltip?.trigger || 'item'}
                    onValueChange={(value) => handleChange('tooltip.trigger', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="item">Item</SelectItem>
                      <SelectItem value="axis">Axis</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Axis Pointer Type</Label>
                  <Select 
                    defaultValue={config?.tooltip?.axisPointer?.type || 'line'}
                    onValueChange={(value) => handleChange('tooltip.axisPointer.type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line">Line</SelectItem>
                      <SelectItem value="shadow">Shadow</SelectItem>
                      <SelectItem value="cross">Cross</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="colors" className="p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Color Palette</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Theme</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['default', 'dark', 'vintage', 'macarons', 'shine', 'roma'].map(theme => (
                      <Button
                        key={theme}
                        variant="outline"
                        size="sm"
                        onClick={() => handleChange('theme', theme)}
                      >
                        {theme}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Custom Colors</Label>
                  <div className="flex gap-2 flex-wrap">
                    {[0, 1, 2, 3, 4].map(i => (
                      <Input 
                        key={i}
                        type="color" 
                        className="w-12 h-12"
                        defaultValue={config?.color?.[i] || '#5470c6'}
                        onChange={(e) => {
                          const colors = config?.color || []
                          colors[i] = e.target.value
                          handleChange('color', colors)
                        }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="animation" className="p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Animation Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable Animation</Label>
                  <Switch 
                    defaultChecked={config?.animation !== false}
                    onCheckedChange={(checked) => handleChange('animation', checked)}
                  />
                </div>
                <div>
                  <Label>Duration (ms)</Label>
                  <Slider 
                    min={0} 
                    max={5000} 
                    step={100}
                    defaultValue={[config?.animationDuration || 1000]}
                    onValueChange={(value) => handleChange('animationDuration', value[0])}
                  />
                </div>
                <div>
                  <Label>Easing</Label>
                  <Select 
                    defaultValue={config?.animationEasing || 'cubicOut'}
                    onValueChange={(value) => handleChange('animationEasing', value)}
                  >
                    <SelectTrigger>
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
                <div>
                  <Label>Delay (ms)</Label>
                  <Slider 
                    min={0} 
                    max={2000} 
                    step={50}
                    defaultValue={[config?.animationDelay || 0]}
                    onValueChange={(value) => handleChange('animationDelay', value[0])}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>

      <div className="p-4 border-t bg-muted/50">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">
            {Object.keys(config || {}).length} settings configured
          </Badge>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Reset All
            </Button>
            <Button size="sm">
              Apply Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}