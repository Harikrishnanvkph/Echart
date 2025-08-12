"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Download,
  Settings,
  Palette,
  Database,
  FileJson,
  ArrowRight,
  Sparkles,
  Zap,
  Shield
} from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "9 Chart Types",
      description: "Line, Bar, Pie, Scatter, Area, Radar, Gauge, Funnel, and Heatmap charts"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Full Customization",
      description: "Customize titles, axes, legends, tooltips, colors, and animations"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Data Management",
      description: "Import JSON data, generate sample data, and export configurations"
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "Export Options",
      description: "Export charts as PNG, SVG, or JSON data files"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "5 Color Themes",
      description: "Choose from Default, Dark, Colorful, Warm, and Cool themes"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Smooth Animations",
      description: "Configurable animation duration and easing effects"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Powered by Apache ECharts
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ECharts Studio
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Create beautiful, interactive charts with our intuitive chart builder.
            Customize every aspect and export your visualizations instantly.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/editor">
              <Button size="lg" className="gap-2">
                Open Chart Editor
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a 
              href="https://echarts.apache.org/en/option.html" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-blue-600 mb-3">{feature.icon}</div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Chart Types Preview */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Supported Chart Types</h2>
          <p className="text-gray-600">
            Create various types of visualizations for your data
          </p>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
          {[
            { name: 'Line', icon: LineChart },
            { name: 'Bar', icon: BarChart3 },
            { name: 'Pie', icon: PieChart },
            { name: 'Scatter', icon: BarChart3 },
            { name: 'Area', icon: BarChart3 },
            { name: 'Radar', icon: BarChart3 },
            { name: 'Gauge', icon: BarChart3 },
            { name: 'Funnel', icon: BarChart3 },
            { name: 'Heatmap', icon: BarChart3 },
          ].map((type) => {
            const Icon = type.icon
            return (
              <div
                key={type.name}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border hover:border-blue-300 hover:shadow-md transition-all"
              >
                <Icon className="h-8 w-8 text-gray-600 mb-2" />
                <span className="text-sm font-medium">{type.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-12 text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">
              Start Building Charts Today
            </h2>
            <p className="text-lg mb-8 opacity-90">
              No sign-up required. Free and open-source. Export unlimited charts.
            </p>
            <Link href="/editor">
              <Button size="lg" variant="secondary" className="gap-2">
                Launch Editor Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">ECharts Studio</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a 
                href="https://echarts.apache.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                ECharts Docs
              </a>
              <a 
                href="https://github.com/apache/echarts" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                GitHub
              </a>
              <span>© 2024 ECharts Studio</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
