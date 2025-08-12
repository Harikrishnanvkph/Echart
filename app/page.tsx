"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Activity,
  Download,
  Code,
  Users,
  Cloud,
  Sparkles,
  Database,
  Settings,
  Palette,
  Layers,
  MousePointer,
  Grid3x3,
  ArrowRight,
  Check
} from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "35+ Chart Types",
      description: "Comprehensive collection including basic, statistical, financial, and 3D charts"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "500+ Configuration Options",
      description: "Fine-tune every aspect of your charts with detailed controls"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Complete Data Management",
      description: "Import, export, transform, and manage data with 25+ transformation types"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Professional Export",
      description: "Export as PNG, JPG, SVG, PDF, Excel, CSV, JSON, and HTML"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Code Generation",
      description: "Generate code for React, Vue, Angular, Svelte, and Vanilla JS"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Real-time Collaboration",
      description: "Work together with live cursor tracking and instant sync"
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud Storage",
      description: "Save, share, and manage projects in the cloud"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Advanced Animations",
      description: "Timeline-based animations with keyframes and easing"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Theme Support",
      description: "Multiple built-in themes with custom color palettes"
    }
  ]

  const chartTypes = [
    "Line", "Bar", "Pie", "Scatter", "Area", "Radar",
    "Gauge", "Funnel", "Heatmap", "Tree", "Treemap", "Sunburst",
    "Sankey", "Parallel", "ThemeRiver", "Calendar", "Boxplot", "Candlestick",
    "Graph", "Lines", "PictorialBar", "Custom", "Polar", "RadialBar",
    "Waterfall", "Bullet", "ProgressBar", "StepLine", "StepArea", "RangeBar",
    "RangeArea", "DumbbellPlot", "LollipopChart", "DotPlot", "SlopeChart"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Professional ECharts Configuration Studio
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            ECharts Studio Pro
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            The most comprehensive ECharts configuration tool with 500+ options, 
            35+ chart types, and professional export capabilities
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/editor">
              <Button size="lg" className="gap-2">
                Open Editor
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              View Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need for Professional Charts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Chart Types Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">35+ Chart Types Available</h2>
          <p className="text-muted-foreground">
            From basic visualizations to complex statistical and financial charts
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
          {chartTypes.map((type) => (
            <Badge key={type} variant="outline" className="py-2 px-3">
              {type}
            </Badge>
          ))}
        </div>
      </div>

      {/* Configuration Options */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              500+ Configuration Options
            </h2>
            <div className="space-y-4">
              {[
                "Title & Subtitle styling with 50+ options",
                "X/Y Axis configuration with labels, ticks, and grid",
                "Legend positioning and styling",
                "Tooltip customization and formatting",
                "Color themes and custom palettes",
                "Animation timing and easing functions",
                "Data zoom and visual mapping",
                "Responsive design settings",
                "Accessibility features",
                "Performance optimizations"
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <Grid3x3 className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-base">Axes Config</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Type, labels, ticks, grid lines, bounds, and more
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <Layers className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-base">Legend Config</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Position, layout, icons, selection, and paging
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <MousePointer className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-base">Tooltip Config</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Trigger, position, formatter, and styling
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <Sparkles className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-base">Animation Config</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Duration, easing, delay, and keyframes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Start Creating Professional Charts Today
            </h2>
            <p className="text-lg mb-8 opacity-90">
              No sign-up required. Full features available immediately.
            </p>
            <Link href="/editor">
              <Button size="lg" variant="secondary" className="gap-2">
                Launch Editor
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
