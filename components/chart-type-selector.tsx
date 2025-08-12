"use client"

import React, { useState } from 'react'
import { CHART_TYPES, CHART_CATEGORIES, getChartTypesByCategory } from '@/lib/chart-types-config'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  ScatterChart,
  Activity,
  TrendingUp,
  Share2,
  Filter,
  Map,
  Box,
  DollarSign,
  Settings,
  Grid3x3
} from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  'BarChart3': <BarChart3 className="w-4 h-4" />,
  'LineChart': <LineChart className="w-4 h-4" />,
  'PieChart': <PieChart className="w-4 h-4" />,
  'ScatterChart': <ScatterChart className="w-4 h-4" />,
  'Activity': <Activity className="w-4 h-4" />,
  'TrendingUp': <TrendingUp className="w-4 h-4" />,
  'Share2': <Share2 className="w-4 h-4" />,
  'Filter': <Filter className="w-4 h-4" />,
  'Map': <Map className="w-4 h-4" />,
  'Box': <Box className="w-4 h-4" />,
  'DollarSign': <DollarSign className="w-4 h-4" />,
  'Settings': <Settings className="w-4 h-4" />,
  'Grid3x3': <Grid3x3 className="w-4 h-4" />
}

interface ChartTypeSelectorProps {
  onSelectChart: (chartType: string) => void
  selectedChart?: string
}

export function ChartTypeSelector({ onSelectChart, selectedChart }: ChartTypeSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState('basic')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCharts = searchQuery
    ? Object.values(CHART_TYPES).filter(chart => 
        chart.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chart.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : getChartTypesByCategory(selectedCategory as any)

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold mb-2">Chart Gallery</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Choose from 35+ chart types with full customization
        </p>
        <input
          type="text"
          placeholder="Search charts..."
          className="w-full px-3 py-2 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {!searchQuery && (
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1">
          <TabsList className="w-full justify-start px-4 h-auto flex-wrap">
            {CHART_CATEGORIES.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center gap-2"
              >
                {iconMap[category.icon]}
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <ScrollArea className="flex-1 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
              {filteredCharts.map(chart => (
                <Card 
                  key={chart.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedChart === chart.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => onSelectChart(chart.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        {iconMap[chart.icon] || <BarChart3 className="w-4 h-4" />}
                        {chart.label}
                      </CardTitle>
                      {selectedChart === chart.id && (
                        <Badge variant="default">Selected</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs">
                      {chart.description}
                    </CardDescription>
                    <div className="mt-3 flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        {chart.dataRequirements.minDimensions}-{chart.dataRequirements.maxDimensions} Dimensions
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {chart.dataRequirements.minMeasures}-{chart.dataRequirements.maxMeasures} Measures
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Tabs>
      )}

      {searchQuery && (
        <ScrollArea className="flex-1 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            {filteredCharts.length > 0 ? (
              filteredCharts.map(chart => (
                <Card 
                  key={chart.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedChart === chart.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => onSelectChart(chart.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        {iconMap[chart.icon] || <BarChart3 className="w-4 h-4" />}
                        {chart.label}
                      </CardTitle>
                      {selectedChart === chart.id && (
                        <Badge variant="default">Selected</Badge>
                      )}
                    </div>
                    <Badge variant="secondary" className="mt-1">
                      {CHART_CATEGORIES.find(c => c.id === chart.category)?.label}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs">
                      {chart.description}
                    </CardDescription>
                    <div className="mt-3 flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        {chart.dataRequirements.minDimensions}-{chart.dataRequirements.maxDimensions} Dimensions
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {chart.dataRequirements.minMeasures}-{chart.dataRequirements.maxMeasures} Measures
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No charts found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </ScrollArea>
      )}

      <div className="p-4 border-t bg-muted/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Total: {Object.keys(CHART_TYPES).length} chart types available
          </span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('basic')
            }}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  )
}