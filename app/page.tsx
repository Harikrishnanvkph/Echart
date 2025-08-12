"use client"

import React from "react"
import Link from "next/link"
import {
  BarChart3,
  LineChart,
  PieChart,
  ScatterChart,
  Sparkles,
  Download,
  Database,
  ArrowRight,
  Play,
  Settings,
  Zap,
  Palette,
  FileCode,
  Globe,
  Shield,
  Github,
} from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Sparkles,
      title: "Multiple Chart Types",
      description: "Bar, line, pie, scatter, radar, heatmap, and more chart types.",
    },
    {
      icon: Palette,
      title: "Customizable Design",
      description: "Full control over colors, labels, animations, and styling.",
    },
    {
      icon: Database,
      title: "Dynamic Data",
      description: "Add, edit, and manage multiple datasets with ease.",
    },
    {
      icon: Download,
      title: "Export Anywhere",
      description: "Export as PNG, SVG, or interactive HTML files.",
    },
    {
      icon: Zap,
      title: "Smooth Animations",
      description: "Beautiful transitions and interactive animations.",
    },
    {
      icon: Settings,
      title: "Advanced Options",
      description: "Fine-tune every aspect of your charts.",
    },
  ]

  const chartTypes = [
    { name: "Bar", icon: BarChart3, color: "bg-blue-100 text-blue-700" },
    { name: "Line", icon: LineChart, color: "bg-green-100 text-green-700" },
    { name: "Pie", icon: PieChart, color: "bg-purple-100 text-purple-700" },
    { name: "Scatter", icon: ScatterChart, color: "bg-orange-100 text-orange-700" },
    { name: "Radar", icon: BarChart3, color: "bg-pink-100 text-pink-700" },
    { name: "Heatmap", icon: BarChart3, color: "bg-indigo-100 text-indigo-700" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ECharts Studio
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#charts" className="text-gray-600 hover:text-gray-900 transition-colors">
                Chart Types
              </a>
              <Link
                href="/editor"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Open Editor
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:20px_20px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Powered by Apache ECharts
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Create Beautiful
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Interactive Charts
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Professional charting made simple. Build, customize, and export stunning data visualizations
              with our powerful chart editor powered by ECharts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/editor"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all text-lg font-medium"
              >
                <Play className="h-5 w-5" />
                Start Creating
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 transition-all text-lg font-medium"
              >
                <Settings className="h-5 w-5" />
                Learn More
              </a>
            </div>
          </div>
          
          {/* Preview Image */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
            <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="aspect-video bg-white rounded-lg shadow-inner flex items-center justify-center">
                  <BarChart3 className="h-24 w-24 text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to create professional charts
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl border border-gray-200 hover:border-purple-200 hover:shadow-lg transition-all"
              >
                <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-purple-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chart Types Section */}
      <section id="charts" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Supported Chart Types
            </h2>
            <p className="text-xl text-gray-600">
              Choose from a wide variety of chart types
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {chartTypes.map((type, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 px-6 py-3 rounded-full ${type.color} shadow-sm hover:shadow-md transition-all`}
              >
                <type.icon className="h-5 w-5" />
                <span className="font-medium">{type.name}</span>
              </div>
            ))}
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gray-100 text-gray-700 shadow-sm">
              <span className="font-medium">+ 8 More Types</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Visualize Your Data?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Start creating beautiful charts in seconds
          </p>
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 rounded-xl hover:shadow-xl transition-all text-lg font-medium"
          >
            <Sparkles className="h-5 w-5" />
            Open Chart Editor
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">ECharts Studio</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Shield className="h-5 w-5" />
              </a>
            </div>
            
            <div className="text-sm text-gray-400">
              © 2024 ECharts Studio. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
