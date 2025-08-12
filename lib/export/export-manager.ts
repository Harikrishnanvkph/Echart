// Export Manager - Handles all export functionality
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'

export interface ExportOptions {
  format: ExportFormat
  quality?: number
  scale?: number
  backgroundColor?: string
  includeData?: boolean
  includeConfig?: boolean
  filename?: string
  theme?: 'light' | 'dark'
}

export type ExportFormat = 
  | 'png'
  | 'jpg'
  | 'svg'
  | 'pdf'
  | 'excel'
  | 'csv'
  | 'json'
  | 'html'
  | 'code'

export class ExportManager {
  // Export chart as image
  async exportAsImage(
    chartElement: HTMLElement,
    format: 'png' | 'jpg' | 'svg',
    options: Partial<ExportOptions> = {}
  ): Promise<void> {
    const {
      quality = 1,
      scale = 2,
      backgroundColor = 'white',
      filename = `chart.${format}`
    } = options

    if (format === 'svg') {
      await this.exportAsSVG(chartElement, filename)
    } else {
      const canvas = await html2canvas(chartElement, {
        scale,
        backgroundColor,
        useCORS: true,
        logging: false
      })

      canvas.toBlob(
        (blob) => {
          if (blob) {
            saveAs(blob, filename)
          }
        },
        format === 'png' ? 'image/png' : 'image/jpeg',
        quality
      )
    }
  }

  // Export chart as SVG
  private async exportAsSVG(chartElement: HTMLElement, filename: string): Promise<void> {
    // Get SVG content from ECharts instance
    const echartsInstance = (chartElement as any).echartsInstance
    if (echartsInstance) {
      const svg = echartsInstance.renderToSVGString()
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
      saveAs(blob, filename)
    }
  }

  // Export chart as PDF
  async exportAsPDF(
    chartElement: HTMLElement,
    options: Partial<ExportOptions> = {}
  ): Promise<void> {
    const {
      scale = 2,
      backgroundColor = 'white',
      filename = 'chart.pdf',
      includeData = false,
      includeConfig = false
    } = options

    const canvas = await html2canvas(chartElement, {
      scale,
      backgroundColor,
      useCORS: true,
      logging: false
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    })

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)

    // Add additional pages for data and config if requested
    if (includeData || includeConfig) {
      pdf.addPage()
      // Add data/config content
    }

    pdf.save(filename)
  }

  // Export data as Excel
  async exportAsExcel(
    data: any[],
    columns: any[],
    options: Partial<ExportOptions> = {}
  ): Promise<void> {
    const { filename = 'data.xlsx' } = options

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Data')

    // Add formatting
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1')
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_col(C) + '1'
      if (!ws[address]) continue
      ws[address].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: 'FFFFAA00' } },
        alignment: { horizontal: 'center' }
      }
    }

    XLSX.writeFile(wb, filename)
  }

  // Export data as CSV
  async exportAsCSV(
    data: any[],
    columns: any[],
    options: Partial<ExportOptions> = {}
  ): Promise<void> {
    const { filename = 'data.csv' } = options

    const headers = columns.map(col => col.name || col.id).join(',')
    const rows = data.map(row => 
      columns.map(col => {
        const value = row[col.id]
        // Escape values containing commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value
      }).join(',')
    )

    const csv = [headers, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    saveAs(blob, filename)
  }

  // Export data as JSON
  async exportAsJSON(
    data: any,
    options: Partial<ExportOptions> = {}
  ): Promise<void> {
    const { filename = 'data.json' } = options

    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' })
    saveAs(blob, filename)
  }

  // Export as HTML
  async exportAsHTML(
    chartConfig: any,
    data: any[],
    options: Partial<ExportOptions> = {}
  ): Promise<void> {
    const { filename = 'chart.html', theme = 'light' } = options

    const html = this.generateHTMLTemplate(chartConfig, data, theme)
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    saveAs(blob, filename)
  }

  // Generate standalone HTML template
  private generateHTMLTemplate(
    chartConfig: any,
    data: any[],
    theme: 'light' | 'dark'
  ): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ECharts Visualization</title>
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'};
            color: ${theme === 'dark' ? '#ffffff' : '#333333'};
        }
        #chart-container {
            width: 100%;
            height: 600px;
            background-color: ${theme === 'dark' ? '#2a2a2a' : '#ffffff'};
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
            margin-bottom: 20px;
        }
        h1 {
            margin: 0 0 10px 0;
            font-size: 24px;
            font-weight: 600;
        }
        .description {
            color: ${theme === 'dark' ? '#b0b0b0' : '#666666'};
            font-size: 14px;
        }
        .controls {
            margin-top: 20px;
            padding: 15px;
            background-color: ${theme === 'dark' ? '#2a2a2a' : '#f5f5f5'};
            border-radius: 8px;
        }
        button {
            padding: 8px 16px;
            margin-right: 10px;
            background-color: ${theme === 'dark' ? '#4a4a4a' : '#007bff'};
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: ${theme === 'dark' ? '#5a5a5a' : '#0056b3'};
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${chartConfig.title?.text || 'Chart Visualization'}</h1>
        <p class="description">${chartConfig.title?.subtext || 'Interactive chart powered by ECharts'}</p>
    </div>
    
    <div id="chart-container"></div>
    
    <div class="controls">
        <button onclick="downloadImage()">Download as PNG</button>
        <button onclick="downloadData()">Download Data</button>
        <button onclick="toggleTheme()">Toggle Theme</button>
        <button onclick="resetZoom()">Reset Zoom</button>
    </div>

    <script>
        // Initialize chart
        const chartDom = document.getElementById('chart-container');
        const myChart = echarts.init(chartDom, '${theme}');
        
        // Chart configuration
        const option = ${JSON.stringify(chartConfig, null, 2)};
        
        // Set option
        myChart.setOption(option);
        
        // Make chart responsive
        window.addEventListener('resize', function() {
            myChart.resize();
        });
        
        // Download functions
        function downloadImage() {
            const url = myChart.getDataURL({
                type: 'png',
                pixelRatio: 2,
                backgroundColor: '#fff'
            });
            const a = document.createElement('a');
            a.href = url;
            a.download = 'chart.png';
            a.click();
        }
        
        function downloadData() {
            const data = ${JSON.stringify(data)};
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.json';
            a.click();
            URL.revokeObjectURL(url);
        }
        
        function toggleTheme() {
            const isDark = document.body.style.backgroundColor === 'rgb(26, 26, 26)';
            const newTheme = isDark ? 'light' : 'dark';
            
            document.body.style.backgroundColor = isDark ? '#ffffff' : '#1a1a1a';
            document.body.style.color = isDark ? '#333333' : '#ffffff';
            
            myChart.dispose();
            myChart = echarts.init(chartDom, newTheme);
            myChart.setOption(option);
        }
        
        function resetZoom() {
            myChart.dispatchAction({
                type: 'restore'
            });
        }
    </script>
</body>
</html>`
  }

  // Export configuration as code
  async exportAsCode(
    chartConfig: any,
    framework: CodeFramework,
    options: Partial<ExportOptions> = {}
  ): Promise<void> {
    const { filename = `chart.${this.getFileExtension(framework)}` } = options

    const code = this.generateCode(chartConfig, framework)
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, filename)
  }

  // Generate code for different frameworks
  private generateCode(chartConfig: any, framework: CodeFramework): string {
    switch (framework) {
      case 'react':
        return this.generateReactCode(chartConfig)
      case 'vue':
        return this.generateVueCode(chartConfig)
      case 'angular':
        return this.generateAngularCode(chartConfig)
      case 'svelte':
        return this.generateSvelteCode(chartConfig)
      case 'vanilla':
      default:
        return this.generateVanillaCode(chartConfig)
    }
  }

  // Generate React code
  private generateReactCode(chartConfig: any): string {
    return `import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const ChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    
    const option = ${JSON.stringify(chartConfig, null, 2)};
    
    chart.setOption(option);
    
    // Handle resize
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default ChartComponent;`
  }

  // Generate Vue code
  private generateVueCode(chartConfig: any): string {
    return `<template>
  <div ref="chartRef" :style="{ width: '100%', height: '400px' }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref(null);
let chart = null;

onMounted(() => {
  chart = echarts.init(chartRef.value);
  
  const option = ${JSON.stringify(chartConfig, null, 2)};
  
  chart.setOption(option);
  
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (chart) {
    chart.dispose();
  }
});

const handleResize = () => {
  if (chart) {
    chart.resize();
  }
};
</script>`
  }

  // Generate Angular code
  private generateAngularCode(chartConfig: any): string {
    return `import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart',
  template: '<div #chartContainer style="width: 100%; height: 400px;"></div>'
})
export class ChartComponent implements OnInit, OnDestroy {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  private chart: any;

  ngOnInit(): void {
    this.initChart();
    window.addEventListener('resize', this.handleResize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize);
    if (this.chart) {
      this.chart.dispose();
    }
  }

  private initChart(): void {
    this.chart = echarts.init(this.chartContainer.nativeElement);
    
    const option = ${JSON.stringify(chartConfig, null, 2)};
    
    this.chart.setOption(option);
  }

  private handleResize = (): void => {
    if (this.chart) {
      this.chart.resize();
    }
  }
}`
  }

  // Generate Svelte code
  private generateSvelteCode(chartConfig: any): string {
    return `<script>
  import { onMount, onDestroy } from 'svelte';
  import * as echarts from 'echarts';
  
  let chartContainer;
  let chart;
  
  onMount(() => {
    chart = echarts.init(chartContainer);
    
    const option = ${JSON.stringify(chartConfig, null, 2)};
    
    chart.setOption(option);
    
    window.addEventListener('resize', handleResize);
  });
  
  onDestroy(() => {
    window.removeEventListener('resize', handleResize);
    if (chart) {
      chart.dispose();
    }
  });
  
  function handleResize() {
    if (chart) {
      chart.resize();
    }
  }
</script>

<div bind:this={chartContainer} style="width: 100%; height: 400px;"></div>`
  }

  // Generate Vanilla JavaScript code
  private generateVanillaCode(chartConfig: any): string {
    return `// Initialize ECharts
const chartDom = document.getElementById('chart-container');
const myChart = echarts.init(chartDom);

// Chart configuration
const option = ${JSON.stringify(chartConfig, null, 2)};

// Set option
myChart.setOption(option);

// Make chart responsive
window.addEventListener('resize', function() {
  myChart.resize();
});

// Cleanup (call when removing chart)
// myChart.dispose();`
  }

  // Get file extension for framework
  private getFileExtension(framework: CodeFramework): string {
    switch (framework) {
      case 'react':
        return 'jsx'
      case 'vue':
        return 'vue'
      case 'angular':
        return 'ts'
      case 'svelte':
        return 'svelte'
      case 'vanilla':
      default:
        return 'js'
    }
  }
}

export type CodeFramework = 'react' | 'vue' | 'angular' | 'svelte' | 'vanilla'

// Export singleton instance
export const exportManager = new ExportManager()