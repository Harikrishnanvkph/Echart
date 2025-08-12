// Comprehensive ECharts Chart Types Configuration
// 30+ chart types with full configuration options

export interface ChartTypeConfig {
  id: string
  label: string
  icon: string
  category: 'basic' | 'statistical' | 'relationship' | 'distribution' | 'flow' | 'map' | '3d' | 'financial' | 'custom'
  description: string
  dataRequirements: {
    minDimensions: number
    maxDimensions: number
    minMeasures: number
    maxMeasures: number
    dataTypes: Array<'number' | 'string' | 'date' | 'category'>
  }
  defaultConfig: any
  specificOptions?: any
}

export const CHART_TYPES: Record<string, ChartTypeConfig> = {
  // Basic Charts
  line: {
    id: 'line',
    label: 'Line Chart',
    icon: 'LineChart',
    category: 'basic',
    description: 'Display trends over time or ordered categories',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 2,
      minMeasures: 1,
      maxMeasures: 10,
      dataTypes: ['number', 'date', 'category']
    },
    defaultConfig: {
      smooth: false,
      showSymbol: true,
      symbolSize: 4,
      lineStyle: { width: 2 },
      areaStyle: null,
      step: false,
      connectNulls: false
    }
  },
  
  bar: {
    id: 'bar',
    label: 'Bar Chart',
    icon: 'BarChart3',
    category: 'basic',
    description: 'Compare values across categories',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 2,
      minMeasures: 1,
      maxMeasures: 10,
      dataTypes: ['number', 'category']
    },
    defaultConfig: {
      barWidth: 'auto',
      barGap: '30%',
      barCategoryGap: '20%',
      roundCap: false,
      showBackground: false,
      backgroundStyle: { color: 'rgba(180, 180, 180, 0.2)' }
    }
  },
  
  pie: {
    id: 'pie',
    label: 'Pie Chart',
    icon: 'PieChart',
    category: 'basic',
    description: 'Show proportions of a whole',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 1,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['number', 'category']
    },
    defaultConfig: {
      radius: ['0%', '75%'],
      center: ['50%', '50%'],
      roseType: false,
      startAngle: 90,
      minAngle: 0,
      minShowLabelAngle: 0,
      selectedMode: 'single',
      selectedOffset: 10,
      clockwise: true,
      avoidLabelOverlap: true
    }
  },
  
  scatter: {
    id: 'scatter',
    label: 'Scatter Plot',
    icon: 'ScatterChart',
    category: 'basic',
    description: 'Display correlation between variables',
    dataRequirements: {
      minDimensions: 0,
      maxDimensions: 1,
      minMeasures: 2,
      maxMeasures: 3,
      dataTypes: ['number']
    },
    defaultConfig: {
      symbolSize: 10,
      symbol: 'circle',
      large: false,
      largeThreshold: 2000
    }
  },
  
  area: {
    id: 'area',
    label: 'Area Chart',
    icon: 'Activity',
    category: 'basic',
    description: 'Show cumulative totals over time',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 2,
      minMeasures: 1,
      maxMeasures: 10,
      dataTypes: ['number', 'date', 'category']
    },
    defaultConfig: {
      smooth: false,
      stack: null,
      areaStyle: { opacity: 0.7 },
      emphasis: { focus: 'series' }
    }
  },
  
  // Statistical Charts
  boxplot: {
    id: 'boxplot',
    label: 'Box Plot',
    icon: 'BarChart3',
    category: 'statistical',
    description: 'Display distribution and outliers',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 2,
      minMeasures: 5,
      maxMeasures: 5,
      dataTypes: ['number']
    },
    defaultConfig: {
      boxWidth: [7, 50],
      itemStyle: { borderWidth: 1 }
    }
  },
  
  histogram: {
    id: 'histogram',
    label: 'Histogram',
    icon: 'BarChart3',
    category: 'statistical',
    description: 'Show frequency distribution',
    dataRequirements: {
      minDimensions: 0,
      maxDimensions: 1,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['number']
    },
    defaultConfig: {
      barWidth: '99.3%',
      bins: 'auto'
    }
  },
  
  violin: {
    id: 'violin',
    label: 'Violin Plot',
    icon: 'Activity',
    category: 'statistical',
    description: 'Combine box plot with kernel density',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 2,
      minMeasures: 1,
      maxMeasures: 10,
      dataTypes: ['number']
    },
    defaultConfig: {
      split: false,
      points: 'outliers'
    }
  },
  
  errorbar: {
    id: 'errorbar',
    label: 'Error Bar',
    icon: 'Activity',
    category: 'statistical',
    description: 'Show confidence intervals',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 1,
      minMeasures: 3,
      maxMeasures: 3,
      dataTypes: ['number']
    },
    defaultConfig: {
      itemStyle: { borderWidth: 1.5 },
      emphasis: { itemStyle: { borderWidth: 3 } }
    }
  },
  
  // Relationship Charts
  heatmap: {
    id: 'heatmap',
    label: 'Heatmap',
    icon: 'Grid3x3',
    category: 'relationship',
    description: 'Show patterns in matrix data',
    dataRequirements: {
      minDimensions: 2,
      maxDimensions: 2,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['number', 'category']
    },
    defaultConfig: {
      label: { show: true },
      emphasis: { itemStyle: { shadowBlur: 10 } }
    }
  },
  
  correlogram: {
    id: 'correlogram',
    label: 'Correlogram',
    icon: 'Grid3x3',
    category: 'relationship',
    description: 'Visualize correlation matrix',
    dataRequirements: {
      minDimensions: 0,
      maxDimensions: 0,
      minMeasures: 3,
      maxMeasures: 20,
      dataTypes: ['number']
    },
    defaultConfig: {
      colorScale: [-1, 1],
      showValues: true
    }
  },
  
  graph: {
    id: 'graph',
    label: 'Network Graph',
    icon: 'Share2',
    category: 'relationship',
    description: 'Display network relationships',
    dataRequirements: {
      minDimensions: 2,
      maxDimensions: 2,
      minMeasures: 0,
      maxMeasures: 5,
      dataTypes: ['string', 'category', 'number']
    },
    defaultConfig: {
      layout: 'force',
      force: {
        repulsion: 100,
        gravity: 0.1,
        edgeLength: 30
      },
      roam: true,
      draggable: true,
      symbolSize: 10,
      edgeSymbol: ['none', 'arrow']
    }
  },
  
  chord: {
    id: 'chord',
    label: 'Chord Diagram',
    icon: 'Circle',
    category: 'relationship',
    description: 'Show flow relationships',
    dataRequirements: {
      minDimensions: 2,
      maxDimensions: 2,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['category', 'number']
    },
    defaultConfig: {
      padAngle: 0.02,
      sortGroups: null,
      sortSubgroups: null,
      sortChords: null
    }
  },
  
  // Distribution Charts
  radar: {
    id: 'radar',
    label: 'Radar Chart',
    icon: 'Radar',
    category: 'distribution',
    description: 'Compare multiple variables',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 1,
      minMeasures: 3,
      maxMeasures: 20,
      dataTypes: ['number']
    },
    defaultConfig: {
      shape: 'polygon',
      startAngle: 90,
      splitNumber: 5,
      scale: false
    }
  },
  
  treemap: {
    id: 'treemap',
    label: 'Treemap',
    icon: 'Layers',
    category: 'distribution',
    description: 'Display hierarchical data as nested rectangles',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 5,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['category', 'number']
    },
    defaultConfig: {
      squareRatio: 0.5 * (1 + Math.sqrt(5)),
      leafDepth: null,
      drillDownIcon: '▶',
      roam: true,
      nodeClick: 'zoomToNode',
      zoomToNodeRatio: 0.32 * 0.32,
      levels: [],
      breadcrumb: { show: true }
    }
  },
  
  sunburst: {
    id: 'sunburst',
    label: 'Sunburst',
    icon: 'CircleDot',
    category: 'distribution',
    description: 'Radial hierarchy visualization',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 5,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['category', 'number']
    },
    defaultConfig: {
      radius: ['0%', '90%'],
      center: ['50%', '50%'],
      startAngle: 90,
      minAngle: 0,
      sort: 'desc',
      renderLabelForZeroData: false,
      nodeClick: 'rootToNode',
      levels: []
    }
  },
  
  pack: {
    id: 'pack',
    label: 'Circle Packing',
    icon: 'Circle',
    category: 'distribution',
    description: 'Nested circles for hierarchical data',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 5,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['category', 'number']
    },
    defaultConfig: {
      padding: 5,
      showLabels: true
    }
  },
  
  // Flow Charts
  sankey: {
    id: 'sankey',
    label: 'Sankey Diagram',
    icon: 'Filter',
    category: 'flow',
    description: 'Visualize flow and relationships',
    dataRequirements: {
      minDimensions: 2,
      maxDimensions: 2,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['category', 'number']
    },
    defaultConfig: {
      orient: 'horizontal',
      nodeAlign: 'justify',
      nodeGap: 8,
      nodeWidth: 20,
      layoutIterations: 32,
      draggable: true
    }
  },
  
  funnel: {
    id: 'funnel',
    label: 'Funnel Chart',
    icon: 'Filter',
    category: 'flow',
    description: 'Show stages in a process',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 1,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['category', 'number']
    },
    defaultConfig: {
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 0,
      funnelAlign: 'center',
      label: { show: true, position: 'inside' }
    }
  },
  
  gauge: {
    id: 'gauge',
    label: 'Gauge Chart',
    icon: 'Gauge',
    category: 'flow',
    description: 'Display progress or metrics',
    dataRequirements: {
      minDimensions: 0,
      maxDimensions: 1,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['number']
    },
    defaultConfig: {
      startAngle: 225,
      endAngle: -45,
      min: 0,
      max: 100,
      splitNumber: 10,
      radius: '75%',
      axisLine: {
        lineStyle: {
          width: 10,
          color: [[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]
        }
      },
      pointer: { width: 5 },
      detail: { formatter: '{value}%' }
    }
  },
  
  waterfall: {
    id: 'waterfall',
    label: 'Waterfall Chart',
    icon: 'BarChart3',
    category: 'flow',
    description: 'Show cumulative effect of values',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 1,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['category', 'number']
    },
    defaultConfig: {
      showTotal: true,
      totalLabel: 'Total',
      positiveColor: '#5470c6',
      negativeColor: '#ee6666',
      totalColor: '#fac858'
    }
  },
  
  // Map Charts
  map: {
    id: 'map',
    label: 'Geographic Map',
    icon: 'Map',
    category: 'map',
    description: 'Display data on geographic regions',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 1,
      minMeasures: 1,
      maxMeasures: 5,
      dataTypes: ['category', 'number']
    },
    defaultConfig: {
      map: 'world',
      roam: true,
      zoom: 1.2,
      center: null,
      aspectScale: 0.75,
      boundingCoords: null,
      scaleLimit: { min: 1, max: 5 },
      nameMap: null,
      selectedMode: false,
      label: { show: false },
      itemStyle: {
        areaColor: '#eee',
        borderColor: '#444',
        borderWidth: 0.5
      },
      emphasis: {
        label: { show: true },
        itemStyle: { areaColor: '#ffd700' }
      }
    }
  },
  
  scatter_map: {
    id: 'scatter_map',
    label: 'Scatter Map',
    icon: 'MapPin',
    category: 'map',
    description: 'Points on geographic map',
    dataRequirements: {
      minDimensions: 2,
      maxDimensions: 2,
      minMeasures: 0,
      maxMeasures: 5,
      dataTypes: ['number']
    },
    defaultConfig: {
      coordinateSystem: 'geo',
      symbolSize: 10,
      large: false,
      largeThreshold: 2000
    }
  },
  
  heatmap_map: {
    id: 'heatmap_map',
    label: 'Geographic Heatmap',
    icon: 'Map',
    category: 'map',
    description: 'Density visualization on map',
    dataRequirements: {
      minDimensions: 2,
      maxDimensions: 2,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['number']
    },
    defaultConfig: {
      coordinateSystem: 'geo',
      blurSize: 30,
      minOpacity: 0,
      maxOpacity: 1
    }
  },
  
  lines_map: {
    id: 'lines_map',
    label: 'Flow Map',
    icon: 'Navigation',
    category: 'map',
    description: 'Show movement between locations',
    dataRequirements: {
      minDimensions: 2,
      maxDimensions: 2,
      minMeasures: 0,
      maxMeasures: 3,
      dataTypes: ['number', 'category']
    },
    defaultConfig: {
      coordinateSystem: 'geo',
      polyline: false,
      effect: {
        show: true,
        period: 6,
        trailLength: 0.7,
        color: '#fff',
        symbolSize: 3
      },
      lineStyle: {
        color: '#000',
        width: 0,
        opacity: 0.5,
        curveness: 0.2
      }
    }
  },
  
  // 3D Charts
  bar3d: {
    id: 'bar3d',
    label: '3D Bar Chart',
    icon: 'Box',
    category: '3d',
    description: 'Three-dimensional bar visualization',
    dataRequirements: {
      minDimensions: 2,
      maxDimensions: 2,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['category', 'number']
    },
    defaultConfig: {
      grid3D: {
        boxWidth: 200,
        boxHeight: 100,
        boxDepth: 80,
        viewControl: {
          distance: 200,
          alpha: 20,
          beta: 40
        }
      },
      bevelSize: 0.3,
      bevelSmoothness: 2,
      shading: 'lambert'
    }
  },
  
  line3d: {
    id: 'line3d',
    label: '3D Line Chart',
    icon: 'Box',
    category: '3d',
    description: 'Three-dimensional line visualization',
    dataRequirements: {
      minDimensions: 0,
      maxDimensions: 1,
      minMeasures: 3,
      maxMeasures: 3,
      dataTypes: ['number']
    },
    defaultConfig: {
      grid3D: {
        viewControl: {
          projection: 'perspective',
          autoRotate: false,
          distance: 150
        }
      },
      lineStyle: { width: 4 }
    }
  },
  
  scatter3d: {
    id: 'scatter3d',
    label: '3D Scatter Plot',
    icon: 'Box',
    category: '3d',
    description: 'Three-dimensional scatter visualization',
    dataRequirements: {
      minDimensions: 0,
      maxDimensions: 1,
      minMeasures: 3,
      maxMeasures: 4,
      dataTypes: ['number']
    },
    defaultConfig: {
      grid3D: {
        viewControl: {
          projection: 'perspective',
          autoRotate: true,
          autoRotateSpeed: 10,
          distance: 200
        }
      },
      symbolSize: 10,
      itemStyle: { opacity: 0.8 }
    }
  },
  
  surface: {
    id: 'surface',
    label: '3D Surface',
    icon: 'Box',
    category: '3d',
    description: 'Three-dimensional surface plot',
    dataRequirements: {
      minDimensions: 0,
      maxDimensions: 0,
      minMeasures: 3,
      maxMeasures: 3,
      dataTypes: ['number']
    },
    defaultConfig: {
      grid3D: {
        viewControl: {
          projection: 'perspective',
          autoRotate: false,
          distance: 200
        }
      },
      wireframe: { show: false },
      shading: 'color',
      parametric: false
    }
  },
  
  globe: {
    id: 'globe',
    label: '3D Globe',
    icon: 'Globe',
    category: '3d',
    description: 'Data visualization on 3D globe',
    dataRequirements: {
      minDimensions: 2,
      maxDimensions: 2,
      minMeasures: 0,
      maxMeasures: 5,
      dataTypes: ['number']
    },
    defaultConfig: {
      globe: {
        baseTexture: '/world.topo.bathy.200401.jpg',
        heightTexture: '/world.topo.bathy.200401.jpg',
        displacementScale: 0.04,
        shading: 'realistic',
        environment: '/starfield.jpg',
        realisticMaterial: {
          roughness: 0.9
        },
        postEffect: {
          enable: true
        },
        viewControl: {
          autoRotate: true,
          autoRotateSpeed: 10
        }
      }
    }
  },
  
  // Financial Charts
  candlestick: {
    id: 'candlestick',
    label: 'Candlestick Chart',
    icon: 'CandlestickChart',
    category: 'financial',
    description: 'Stock price movements',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 1,
      minMeasures: 4,
      maxMeasures: 4,
      dataTypes: ['date', 'number']
    },
    defaultConfig: {
      itemStyle: {
        color: '#c23531',
        color0: '#314656',
        borderColor: '#c23531',
        borderColor0: '#314656',
        borderWidth: 1
      },
      barMaxWidth: 20,
      barMinWidth: null,
      barWidth: null
    }
  },
  
  ohlc: {
    id: 'ohlc',
    label: 'OHLC Chart',
    icon: 'TrendingUp',
    category: 'financial',
    description: 'Open-High-Low-Close chart',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 1,
      minMeasures: 4,
      maxMeasures: 4,
      dataTypes: ['date', 'number']
    },
    defaultConfig: {
      itemStyle: {
        color: '#06982d',
        color0: '#e01f54',
        borderColor: '#06982d',
        borderColor0: '#e01f54',
        borderWidth: 1
      }
    }
  },
  
  kagi: {
    id: 'kagi',
    label: 'Kagi Chart',
    icon: 'TrendingUp',
    category: 'financial',
    description: 'Price action chart ignoring time',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 1,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['date', 'number']
    },
    defaultConfig: {
      reversalAmount: 3,
      lineStyle: {
        yangLine: { color: '#06982d', width: 2 },
        yinLine: { color: '#e01f54', width: 1 }
      }
    }
  },
  
  // Custom & Advanced Charts
  parallel: {
    id: 'parallel',
    label: 'Parallel Coordinates',
    icon: 'Activity',
    category: 'custom',
    description: 'Multivariate data visualization',
    dataRequirements: {
      minDimensions: 0,
      maxDimensions: 1,
      minMeasures: 3,
      maxMeasures: 20,
      dataTypes: ['number']
    },
    defaultConfig: {
      layout: 'horizontal',
      parallelAxisDefault: {
        type: 'value',
        nameLocation: 'end',
        nameGap: 20,
        splitNumber: 5,
        nameTextStyle: { fontSize: 14 },
        axisLine: { lineStyle: { color: '#555' } },
        axisTick: { lineStyle: { color: '#555' } },
        splitLine: { show: false },
        axisLabel: { textStyle: { color: '#555' } }
      },
      inactiveOpacity: 0.05,
      activeOpacity: 1,
      lineStyle: { width: 1, opacity: 0.45 },
      progressive: 500,
      smooth: false
    }
  },
  
  themeRiver: {
    id: 'themeRiver',
    label: 'Theme River',
    icon: 'Activity',
    category: 'custom',
    description: 'Flowing stacked area chart',
    dataRequirements: {
      minDimensions: 2,
      maxDimensions: 2,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['date', 'category', 'number']
    },
    defaultConfig: {
      singleAxisIndex: 0,
      boundaryGap: ['10%', '10%'],
      label: { show: false }
    }
  },
  
  calendar: {
    id: 'calendar',
    label: 'Calendar Heatmap',
    icon: 'Calendar',
    category: 'custom',
    description: 'Data visualization on calendar',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 1,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['date', 'number']
    },
    defaultConfig: {
      calendar: {
        top: 120,
        left: 30,
        right: 30,
        cellSize: ['auto', 13],
        range: new Date().getFullYear(),
        itemStyle: {
          borderWidth: 0.5
        },
        yearLabel: { show: false }
      }
    }
  },
  
  pictorial: {
    id: 'pictorial',
    label: 'Pictorial Bar',
    icon: 'Image',
    category: 'custom',
    description: 'Bar chart with custom symbols',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 1,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['category', 'number']
    },
    defaultConfig: {
      symbol: 'rect',
      symbolSize: ['100%', '100%'],
      symbolOffset: [0, 0],
      symbolRotate: 0,
      symbolRepeat: false,
      symbolRepeatDirection: 'start',
      symbolMargin: 0,
      symbolClip: false,
      symbolBoundingData: null,
      symbolPatternSize: 400,
      barGap: '-100%',
      z: -1
    }
  },
  
  wordcloud: {
    id: 'wordcloud',
    label: 'Word Cloud',
    icon: 'Type',
    category: 'custom',
    description: 'Text visualization by frequency',
    dataRequirements: {
      minDimensions: 1,
      maxDimensions: 1,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['category', 'number']
    },
    defaultConfig: {
      shape: 'circle',
      sizeRange: [12, 60],
      rotationRange: [-90, 90],
      rotationStep: 45,
      gridSize: 8,
      drawOutOfBound: false,
      textStyle: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: function () {
          return 'rgb(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(',') + ')';
        }
      },
      emphasis: {
        focus: 'self',
        textStyle: {
          shadowBlur: 10,
          shadowColor: '#333'
        }
      }
    }
  },
  
  liquidfill: {
    id: 'liquidfill',
    label: 'Liquid Fill',
    icon: 'Droplet',
    category: 'custom',
    description: 'Animated liquid fill gauge',
    dataRequirements: {
      minDimensions: 0,
      maxDimensions: 1,
      minMeasures: 1,
      maxMeasures: 1,
      dataTypes: ['number']
    },
    defaultConfig: {
      shape: 'circle',
      radius: '50%',
      center: ['50%', '50%'],
      amplitude: '8%',
      waveLength: '80%',
      phase: 'auto',
      period: 'auto',
      direction: 'right',
      animationEasing: 'linear',
      animationEasingUpdate: 'linear',
      animationDuration: 2000,
      animationDurationUpdate: 1000,
      outline: {
        show: true,
        borderDistance: 8,
        itemStyle: {
          borderColor: '#294d99',
          borderWidth: 8,
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.25)'
        }
      },
      backgroundStyle: {
        color: '#e3f7ff'
      },
      label: {
        show: true,
        color: '#294d99',
        insideColor: '#fff',
        fontSize: 50,
        fontWeight: 'bold',
        align: 'center',
        baseline: 'middle',
        position: 'inside'
      }
    }
  }
}

// Helper function to get chart types by category
export function getChartTypesByCategory(category: ChartTypeConfig['category']): ChartTypeConfig[] {
  return Object.values(CHART_TYPES).filter(chart => chart.category === category)
}

// Helper function to validate data for chart type
export function validateDataForChartType(
  chartType: string,
  dimensions: number,
  measures: number,
  dataTypes: string[]
): { valid: boolean; message?: string } {
  const config = CHART_TYPES[chartType]
  if (!config) {
    return { valid: false, message: 'Invalid chart type' }
  }
  
  const req = config.dataRequirements
  
  if (dimensions < req.minDimensions) {
    return { valid: false, message: `Requires at least ${req.minDimensions} dimension(s)` }
  }
  
  if (dimensions > req.maxDimensions) {
    return { valid: false, message: `Supports maximum ${req.maxDimensions} dimension(s)` }
  }
  
  if (measures < req.minMeasures) {
    return { valid: false, message: `Requires at least ${req.minMeasures} measure(s)` }
  }
  
  if (measures > req.maxMeasures) {
    return { valid: false, message: `Supports maximum ${req.maxMeasures} measure(s)` }
  }
  
  return { valid: true }
}

// Chart categories for UI grouping
export const CHART_CATEGORIES = [
  { id: 'basic', label: 'Basic Charts', icon: 'BarChart3' },
  { id: 'statistical', label: 'Statistical', icon: 'TrendingUp' },
  { id: 'relationship', label: 'Relationship', icon: 'Share2' },
  { id: 'distribution', label: 'Distribution', icon: 'PieChart' },
  { id: 'flow', label: 'Flow & Process', icon: 'Filter' },
  { id: 'map', label: 'Geographic', icon: 'Map' },
  { id: '3d', label: '3D Charts', icon: 'Box' },
  { id: 'financial', label: 'Financial', icon: 'DollarSign' },
  { id: 'custom', label: 'Custom & Advanced', icon: 'Settings' }
]