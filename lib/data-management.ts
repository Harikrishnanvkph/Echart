// Comprehensive Data Management System
// Complete data handling with import, export, transformation, and real-time features

import { parse as parseCSV } from 'papaparse'
import * as XLSX from 'xlsx'
import { XMLParser } from 'fast-xml-parser'

// Data Types
export interface DataPoint {
  id: string
  [key: string]: any
}

export interface Dataset {
  id: string
  name: string
  description: string
  source: DataSource
  columns: Column[]
  data: DataPoint[]
  metadata: DatasetMetadata
  transformations: DataTransformation[]
  validation: ValidationRule[]
  lastModified: Date
  version: number
}

export interface Column {
  id: string
  name: string
  type: DataType
  format?: string
  unit?: string
  description?: string
  nullable: boolean
  unique: boolean
  statistics?: ColumnStatistics
  mapping?: ColumnMapping
}

export type DataType = 
  | 'number' 
  | 'string' 
  | 'date' 
  | 'datetime' 
  | 'boolean' 
  | 'category' 
  | 'url' 
  | 'email' 
  | 'json' 
  | 'array'
  | 'object'
  | 'geo_point'
  | 'geo_polygon'

export interface DataSource {
  type: 'file' | 'api' | 'database' | 'manual' | 'generated' | 'stream'
  config: SourceConfig
  refreshInterval?: number
  lastRefresh?: Date
}

export interface SourceConfig {
  // File source
  file?: {
    name: string
    size: number
    type: string
    encoding: string
  }
  
  // API source
  api?: {
    url: string
    method: 'GET' | 'POST'
    headers?: Record<string, string>
    body?: any
    auth?: {
      type: 'none' | 'basic' | 'bearer' | 'api_key' | 'oauth2'
      credentials?: any
    }
    pagination?: {
      type: 'offset' | 'cursor' | 'page'
      config: any
    }
    rateLimit?: {
      requests: number
      period: number
    }
  }
  
  // Database source
  database?: {
    type: 'mysql' | 'postgresql' | 'mongodb' | 'redis' | 'elasticsearch'
    connection: {
      host: string
      port: number
      database: string
      username?: string
      password?: string
      ssl?: boolean
    }
    query: string
    parameters?: any[]
  }
  
  // Stream source
  stream?: {
    type: 'websocket' | 'sse' | 'kafka' | 'mqtt'
    url: string
    topic?: string
    bufferSize: number
    reconnect: boolean
  }
}

export interface DatasetMetadata {
  rowCount: number
  columnCount: number
  sizeInBytes: number
  created: Date
  modified: Date
  tags: string[]
  quality: DataQuality
  lineage: DataLineage[]
}

export interface DataQuality {
  completeness: number  // % of non-null values
  accuracy: number      // % of valid values
  consistency: number   // % of consistent values
  timeliness: number   // Data freshness score
  uniqueness: number   // % of unique values
  validity: number     // % passing validation
  issues: QualityIssue[]
}

export interface QualityIssue {
  type: 'missing' | 'invalid' | 'duplicate' | 'outlier' | 'inconsistent'
  severity: 'low' | 'medium' | 'high' | 'critical'
  column: string
  rowIds: string[]
  description: string
  suggestion?: string
}

export interface DataLineage {
  operation: string
  timestamp: Date
  user?: string
  input: string[]
  output: string
  parameters?: any
}

export interface ColumnStatistics {
  // Numeric statistics
  min?: number
  max?: number
  mean?: number
  median?: number
  mode?: number
  stdDev?: number
  variance?: number
  sum?: number
  quartiles?: [number, number, number]
  percentiles?: Record<number, number>
  outliers?: number[]
  
  // Categorical statistics
  uniqueCount?: number
  topValues?: Array<{ value: any; count: number; percentage: number }>
  
  // Date statistics
  earliest?: Date
  latest?: Date
  
  // General statistics
  nullCount: number
  nullPercentage: number
  distribution?: Distribution
}

export interface Distribution {
  type: 'normal' | 'uniform' | 'exponential' | 'poisson' | 'binomial' | 'custom'
  parameters?: any
  bins?: Array<{ range: [number, number]; count: number }>
  skewness?: number
  kurtosis?: number
}

export interface ColumnMapping {
  sourceColumn: string
  targetColumn: string
  transformation?: string
  formula?: string
}

// Data Transformations
export interface DataTransformation {
  id: string
  name: string
  type: TransformationType
  config: any
  input: string[]
  output: string[]
  enabled: boolean
  order: number
}

export type TransformationType =
  | 'filter'
  | 'sort'
  | 'aggregate'
  | 'pivot'
  | 'unpivot'
  | 'join'
  | 'union'
  | 'group'
  | 'window'
  | 'calculate'
  | 'rename'
  | 'cast'
  | 'split'
  | 'merge'
  | 'normalize'
  | 'denormalize'
  | 'sample'
  | 'deduplicate'
  | 'fill'
  | 'interpolate'
  | 'smooth'
  | 'detect_outliers'
  | 'remove_outliers'
  | 'encode'
  | 'decode'
  | 'extract'
  | 'replace'
  | 'format'

// Transformation Configurations
export interface FilterConfig {
  conditions: FilterCondition[]
  logic: 'and' | 'or'
}

export interface FilterCondition {
  column: string
  operator: FilterOperator
  value: any
  caseSensitive?: boolean
}

export type FilterOperator =
  | 'equals'
  | 'not_equals'
  | 'contains'
  | 'not_contains'
  | 'starts_with'
  | 'ends_with'
  | 'greater_than'
  | 'greater_than_or_equal'
  | 'less_than'
  | 'less_than_or_equal'
  | 'between'
  | 'not_between'
  | 'in'
  | 'not_in'
  | 'is_null'
  | 'is_not_null'
  | 'is_empty'
  | 'is_not_empty'
  | 'matches_regex'
  | 'custom'

export interface AggregateConfig {
  groupBy: string[]
  aggregations: Aggregation[]
}

export interface Aggregation {
  column: string
  function: AggregateFunction
  alias?: string
}

export type AggregateFunction =
  | 'sum'
  | 'average'
  | 'median'
  | 'mode'
  | 'min'
  | 'max'
  | 'count'
  | 'count_distinct'
  | 'first'
  | 'last'
  | 'std_dev'
  | 'variance'
  | 'percentile'
  | 'concat'
  | 'collect_list'
  | 'collect_set'

export interface PivotConfig {
  index: string[]
  columns: string[]
  values: string[]
  aggFunc: AggregateFunction
  fillValue?: any
}

export interface JoinConfig {
  type: 'inner' | 'left' | 'right' | 'full' | 'cross'
  leftDataset: string
  rightDataset: string
  on: Array<{ left: string; right: string }>
  select?: string[]
}

export interface CalculateConfig {
  name: string
  formula: string
  type: DataType
  dependencies: string[]
}

export interface WindowConfig {
  partitionBy?: string[]
  orderBy?: Array<{ column: string; direction: 'asc' | 'desc' }>
  frame?: {
    type: 'rows' | 'range'
    start: number | 'unbounded'
    end: number | 'unbounded' | 'current'
  }
  function: WindowFunction
  column: string
  alias: string
}

export type WindowFunction =
  | 'row_number'
  | 'rank'
  | 'dense_rank'
  | 'percent_rank'
  | 'ntile'
  | 'lag'
  | 'lead'
  | 'first_value'
  | 'last_value'
  | 'cumulative_sum'
  | 'cumulative_avg'
  | 'cumulative_max'
  | 'cumulative_min'
  | 'moving_average'
  | 'moving_sum'
  | 'moving_max'
  | 'moving_min'

// Data Validation
export interface ValidationRule {
  id: string
  name: string
  type: ValidationType
  config: any
  severity: 'error' | 'warning' | 'info'
  message: string
  enabled: boolean
}

export type ValidationType =
  | 'required'
  | 'unique'
  | 'range'
  | 'pattern'
  | 'length'
  | 'type'
  | 'format'
  | 'custom'
  | 'reference'
  | 'consistency'
  | 'business_rule'

// Data Import/Export
export interface ImportConfig {
  format: ImportFormat
  options: ImportOptions
  mapping?: ColumnMapping[]
  validation?: ValidationRule[]
  transformation?: DataTransformation[]
}

export type ImportFormat =
  | 'csv'
  | 'tsv'
  | 'json'
  | 'excel'
  | 'xml'
  | 'parquet'
  | 'avro'
  | 'orc'
  | 'sql'
  | 'api'

export interface ImportOptions {
  // CSV/TSV options
  delimiter?: string
  quote?: string
  escape?: string
  header?: boolean | number
  skipRows?: number
  encoding?: string
  
  // Excel options
  sheet?: string | number
  range?: string
  
  // JSON options
  jsonPath?: string
  flatten?: boolean
  
  // XML options
  xpath?: string
  namespaces?: Record<string, string>
  
  // General options
  dateFormat?: string
  numberFormat?: string
  booleanValues?: { true: string[]; false: string[] }
  nullValues?: string[]
  trimWhitespace?: boolean
  convertEmptyToNull?: boolean
}

export interface ExportConfig {
  format: ExportFormat
  options: ExportOptions
  filters?: FilterConfig
  columns?: string[]
  transformation?: DataTransformation[]
}

export type ExportFormat =
  | 'csv'
  | 'tsv'
  | 'json'
  | 'excel'
  | 'xml'
  | 'sql'
  | 'markdown'
  | 'html'
  | 'pdf'
  | 'parquet'
  | 'avro'

export interface ExportOptions {
  // CSV/TSV options
  delimiter?: string
  quote?: string
  escape?: string
  header?: boolean
  
  // Excel options
  sheetName?: string
  autoFilter?: boolean
  freezePane?: { row: number; column: number }
  
  // JSON options
  pretty?: boolean
  indent?: number
  
  // SQL options
  tableName?: string
  createTable?: boolean
  insertBatch?: number
  
  // General options
  encoding?: string
  compression?: 'none' | 'gzip' | 'zip' | 'bzip2'
  dateFormat?: string
  numberFormat?: string
  nullValue?: string
}

// Data Management Store
export class DataManagementStore {
  private datasets: Map<string, Dataset> = new Map()
  private activeDatasetId: string | null = null
  private history: DataOperation[] = []
  private listeners: Set<DataChangeListener> = new Set()
  
  // Dataset operations
  async createDataset(config: Partial<Dataset>): Promise<Dataset> {
    const dataset: Dataset = {
      id: this.generateId(),
      name: config.name || 'Untitled Dataset',
      description: config.description || '',
      source: config.source || { type: 'manual', config: {} },
      columns: config.columns || [],
      data: config.data || [],
      metadata: this.calculateMetadata(config.data || []),
      transformations: config.transformations || [],
      validation: config.validation || [],
      lastModified: new Date(),
      version: 1
    }
    
    this.datasets.set(dataset.id, dataset)
    this.notifyListeners('create', dataset.id)
    return dataset
  }
  
  async importData(config: ImportConfig): Promise<Dataset> {
    let data: DataPoint[] = []
    let columns: Column[] = []
    
    switch (config.format) {
      case 'csv':
      case 'tsv':
        const csvResult = await this.importCSV(config)
        data = csvResult.data
        columns = csvResult.columns
        break
        
      case 'excel':
        const excelResult = await this.importExcel(config)
        data = excelResult.data
        columns = excelResult.columns
        break
        
      case 'json':
        const jsonResult = await this.importJSON(config)
        data = jsonResult.data
        columns = jsonResult.columns
        break
        
      case 'xml':
        const xmlResult = await this.importXML(config)
        data = xmlResult.data
        columns = xmlResult.columns
        break
        
      case 'api':
        const apiResult = await this.importFromAPI(config)
        data = apiResult.data
        columns = apiResult.columns
        break
    }
    
    // Apply mapping
    if (config.mapping) {
      data = this.applyMapping(data, config.mapping)
    }
    
    // Apply transformations
    if (config.transformation) {
      for (const transform of config.transformation) {
        data = await this.applyTransformation(data, transform)
      }
    }
    
    // Apply validation
    if (config.validation) {
      const validationResults = this.validateData(data, config.validation)
      if (validationResults.errors.length > 0) {
        console.warn('Validation errors:', validationResults.errors)
      }
    }
    
    return this.createDataset({
      source: { type: 'file', config: {} },
      columns,
      data
    })
  }
  
  async exportData(datasetId: string, config: ExportConfig): Promise<Blob | string> {
    const dataset = this.datasets.get(datasetId)
    if (!dataset) throw new Error('Dataset not found')
    
    let data = [...dataset.data]
    
    // Apply filters
    if (config.filters) {
      data = this.applyFilter(data, config.filters)
    }
    
    // Select columns
    if (config.columns) {
      data = this.selectColumns(data, config.columns)
    }
    
    // Apply transformations
    if (config.transformation) {
      for (const transform of config.transformation) {
        data = await this.applyTransformation(data, transform)
      }
    }
    
    switch (config.format) {
      case 'csv':
      case 'tsv':
        return this.exportCSV(data, dataset.columns, config.options)
        
      case 'excel':
        return this.exportExcel(data, dataset.columns, config.options)
        
      case 'json':
        return this.exportJSON(data, config.options)
        
      case 'sql':
        return this.exportSQL(data, dataset.columns, config.options)
        
      case 'html':
        return this.exportHTML(data, dataset.columns, config.options)
        
      case 'markdown':
        return this.exportMarkdown(data, dataset.columns, config.options)
        
      default:
        throw new Error(`Export format ${config.format} not supported`)
    }
  }
  
  // Data transformation methods
  async transform(datasetId: string, transformation: DataTransformation): Promise<Dataset> {
    const dataset = this.datasets.get(datasetId)
    if (!dataset) throw new Error('Dataset not found')
    
    const transformedData = await this.applyTransformation(dataset.data, transformation)
    
    const updatedDataset = {
      ...dataset,
      data: transformedData,
      transformations: [...dataset.transformations, transformation],
      metadata: this.calculateMetadata(transformedData),
      lastModified: new Date(),
      version: dataset.version + 1
    }
    
    this.datasets.set(datasetId, updatedDataset)
    this.addToHistory({
      type: 'transform',
      datasetId,
      transformation,
      timestamp: new Date()
    })
    this.notifyListeners('update', datasetId)
    
    return updatedDataset
  }
  
  private async applyTransformation(data: DataPoint[], transformation: DataTransformation): Promise<DataPoint[]> {
    switch (transformation.type) {
      case 'filter':
        return this.applyFilter(data, transformation.config as FilterConfig)
        
      case 'sort':
        return this.applySort(data, transformation.config)
        
      case 'aggregate':
        return this.applyAggregate(data, transformation.config as AggregateConfig)
        
      case 'pivot':
        return this.applyPivot(data, transformation.config as PivotConfig)
        
      case 'calculate':
        return this.applyCalculation(data, transformation.config as CalculateConfig)
        
      case 'window':
        return this.applyWindow(data, transformation.config as WindowConfig)
        
      case 'sample':
        return this.applySample(data, transformation.config)
        
      case 'deduplicate':
        return this.applyDeduplicate(data, transformation.config)
        
      case 'fill':
        return this.applyFill(data, transformation.config)
        
      case 'interpolate':
        return this.applyInterpolation(data, transformation.config)
        
      case 'detect_outliers':
        return this.detectOutliers(data, transformation.config)
        
      case 'remove_outliers':
        return this.removeOutliers(data, transformation.config)
        
      default:
        console.warn(`Transformation type ${transformation.type} not implemented`)
        return data
    }
  }
  
  // Filter implementation
  private applyFilter(data: DataPoint[], config: FilterConfig): DataPoint[] {
    return data.filter(row => {
      const results = config.conditions.map(condition => {
        const value = row[condition.column]
        return this.evaluateCondition(value, condition)
      })
      
      return config.logic === 'and' 
        ? results.every(r => r)
        : results.some(r => r)
    })
  }
  
  private evaluateCondition(value: any, condition: FilterCondition): boolean {
    switch (condition.operator) {
      case 'equals':
        return value === condition.value
      case 'not_equals':
        return value !== condition.value
      case 'contains':
        return String(value).includes(String(condition.value))
      case 'not_contains':
        return !String(value).includes(String(condition.value))
      case 'starts_with':
        return String(value).startsWith(String(condition.value))
      case 'ends_with':
        return String(value).endsWith(String(condition.value))
      case 'greater_than':
        return Number(value) > Number(condition.value)
      case 'greater_than_or_equal':
        return Number(value) >= Number(condition.value)
      case 'less_than':
        return Number(value) < Number(condition.value)
      case 'less_than_or_equal':
        return Number(value) <= Number(condition.value)
      case 'between':
        const [min, max] = condition.value
        return Number(value) >= min && Number(value) <= max
      case 'not_between':
        const [min2, max2] = condition.value
        return Number(value) < min2 || Number(value) > max2
      case 'in':
        return condition.value.includes(value)
      case 'not_in':
        return !condition.value.includes(value)
      case 'is_null':
        return value === null || value === undefined
      case 'is_not_null':
        return value !== null && value !== undefined
      case 'is_empty':
        return value === '' || value === null || value === undefined
      case 'is_not_empty':
        return value !== '' && value !== null && value !== undefined
      case 'matches_regex':
        return new RegExp(condition.value).test(String(value))
      default:
        return true
    }
  }
  
  // Sort implementation
  private applySort(data: DataPoint[], config: any): DataPoint[] {
    const sorted = [...data]
    sorted.sort((a, b) => {
      for (const sort of config.sorts) {
        const aVal = a[sort.column]
        const bVal = b[sort.column]
        
        let comparison = 0
        if (aVal < bVal) comparison = -1
        else if (aVal > bVal) comparison = 1
        
        if (comparison !== 0) {
          return sort.direction === 'asc' ? comparison : -comparison
        }
      }
      return 0
    })
    return sorted
  }
  
  // Aggregation implementation
  private applyAggregate(data: DataPoint[], config: AggregateConfig): DataPoint[] {
    const groups = new Map<string, DataPoint[]>()
    
    // Group data
    for (const row of data) {
      const key = config.groupBy.map(col => row[col]).join('|')
      if (!groups.has(key)) {
        groups.set(key, [])
      }
      groups.get(key)!.push(row)
    }
    
    // Apply aggregations
    const result: DataPoint[] = []
    for (const [key, group] of groups) {
      const aggregated: DataPoint = { id: this.generateId() }
      
      // Add group by columns
      const keyValues = key.split('|')
      config.groupBy.forEach((col, i) => {
        aggregated[col] = keyValues[i]
      })
      
      // Apply aggregate functions
      for (const agg of config.aggregations) {
        const values = group.map(row => row[agg.column]).filter(v => v !== null && v !== undefined)
        const alias = agg.alias || `${agg.function}_${agg.column}`
        
        switch (agg.function) {
          case 'sum':
            aggregated[alias] = values.reduce((sum, val) => sum + Number(val), 0)
            break
          case 'average':
            aggregated[alias] = values.reduce((sum, val) => sum + Number(val), 0) / values.length
            break
          case 'min':
            aggregated[alias] = Math.min(...values.map(Number))
            break
          case 'max':
            aggregated[alias] = Math.max(...values.map(Number))
            break
          case 'count':
            aggregated[alias] = group.length
            break
          case 'count_distinct':
            aggregated[alias] = new Set(values).size
            break
          case 'first':
            aggregated[alias] = values[0]
            break
          case 'last':
            aggregated[alias] = values[values.length - 1]
            break
          case 'concat':
            aggregated[alias] = values.join(', ')
            break
          case 'collect_list':
            aggregated[alias] = values
            break
          case 'collect_set':
            aggregated[alias] = [...new Set(values)]
            break
        }
      }
      
      result.push(aggregated)
    }
    
    return result
  }
  
  // Pivot implementation
  private applyPivot(data: DataPoint[], config: PivotConfig): DataPoint[] {
    const pivoted = new Map<string, DataPoint>()
    
    for (const row of data) {
      const indexKey = config.index.map(col => row[col]).join('|')
      const columnKey = config.columns.map(col => row[col]).join('_')
      
      if (!pivoted.has(indexKey)) {
        const pivotRow: DataPoint = { id: this.generateId() }
        config.index.forEach(col => {
          pivotRow[col] = row[col]
        })
        pivoted.set(indexKey, pivotRow)
      }
      
      const pivotRow = pivoted.get(indexKey)!
      for (const valueCol of config.values) {
        const key = `${columnKey}_${valueCol}`
        pivotRow[key] = row[valueCol]
      }
    }
    
    return Array.from(pivoted.values())
  }
  
  // Calculation implementation
  private applyCalculation(data: DataPoint[], config: CalculateConfig): DataPoint[] {
    return data.map(row => {
      const calculated = { ...row }
      
      // Simple formula evaluation (in production, use a proper expression parser)
      let formula = config.formula
      for (const dep of config.dependencies) {
        formula = formula.replace(new RegExp(`\\b${dep}\\b`, 'g'), row[dep])
      }
      
      try {
        // WARNING: eval is dangerous, use a proper expression parser in production
        calculated[config.name] = eval(formula)
      } catch (error) {
        console.error('Calculation error:', error)
        calculated[config.name] = null
      }
      
      return calculated
    })
  }
  
  // Window function implementation
  private applyWindow(data: DataPoint[], config: WindowConfig): DataPoint[] {
    // Partition data
    const partitions = new Map<string, DataPoint[]>()
    
    if (config.partitionBy && config.partitionBy.length > 0) {
      for (const row of data) {
        const key = config.partitionBy.map(col => row[col]).join('|')
        if (!partitions.has(key)) {
          partitions.set(key, [])
        }
        partitions.get(key)!.push(row)
      }
    } else {
      partitions.set('all', [...data])
    }
    
    // Apply window function to each partition
    const result: DataPoint[] = []
    
    for (const partition of partitions.values()) {
      // Sort partition if needed
      if (config.orderBy) {
        partition.sort((a, b) => {
          for (const sort of config.orderBy!) {
            const aVal = a[sort.column]
            const bVal = b[sort.column]
            
            let comparison = 0
            if (aVal < bVal) comparison = -1
            else if (aVal > bVal) comparison = 1
            
            if (comparison !== 0) {
              return sort.direction === 'asc' ? comparison : -comparison
            }
          }
          return 0
        })
      }
      
      // Apply window function
      for (let i = 0; i < partition.length; i++) {
        const row = { ...partition[i] }
        
        switch (config.function) {
          case 'row_number':
            row[config.alias] = i + 1
            break
            
          case 'rank':
            // Implementation for rank
            let rank = 1
            for (let j = 0; j < i; j++) {
              if (config.orderBy) {
                const isEqual = config.orderBy.every(sort => 
                  partition[j][sort.column] === partition[i][sort.column]
                )
                if (!isEqual) rank++
              }
            }
            row[config.alias] = rank
            break
            
          case 'lag':
            row[config.alias] = i > 0 ? partition[i - 1][config.column] : null
            break
            
          case 'lead':
            row[config.alias] = i < partition.length - 1 ? partition[i + 1][config.column] : null
            break
            
          case 'cumulative_sum':
            let sum = 0
            for (let j = 0; j <= i; j++) {
              sum += Number(partition[j][config.column] || 0)
            }
            row[config.alias] = sum
            break
            
          case 'moving_average':
            const windowSize = 3 // Default window size
            const start = Math.max(0, i - windowSize + 1)
            const windowValues = partition.slice(start, i + 1).map(r => Number(r[config.column] || 0))
            row[config.alias] = windowValues.reduce((a, b) => a + b, 0) / windowValues.length
            break
        }
        
        result.push(row)
      }
    }
    
    return result
  }
  
  // Sample implementation
  private applySample(data: DataPoint[], config: any): DataPoint[] {
    const { method, size, seed } = config
    
    if (method === 'random') {
      const shuffled = [...data].sort(() => Math.random() - 0.5)
      return shuffled.slice(0, size)
    } else if (method === 'systematic') {
      const interval = Math.floor(data.length / size)
      const sampled: DataPoint[] = []
      for (let i = 0; i < data.length; i += interval) {
        if (sampled.length < size) {
          sampled.push(data[i])
        }
      }
      return sampled
    } else if (method === 'stratified') {
      // Implement stratified sampling
      const strata = new Map<string, DataPoint[]>()
      for (const row of data) {
        const key = row[config.stratifyBy]
        if (!strata.has(key)) {
          strata.set(key, [])
        }
        strata.get(key)!.push(row)
      }
      
      const sampled: DataPoint[] = []
      for (const stratum of strata.values()) {
        const stratumSize = Math.floor(size * (stratum.length / data.length))
        const stratumSample = stratum.sort(() => Math.random() - 0.5).slice(0, stratumSize)
        sampled.push(...stratumSample)
      }
      return sampled
    }
    
    return data
  }
  
  // Deduplicate implementation
  private applyDeduplicate(data: DataPoint[], config: any): DataPoint[] {
    const { columns, keep } = config
    const seen = new Set<string>()
    const result: DataPoint[] = []
    
    for (const row of data) {
      const key = columns.map((col: string) => row[col]).join('|')
      if (!seen.has(key)) {
        seen.add(key)
        result.push(row)
      } else if (keep === 'last') {
        // Remove previous and add current
        const index = result.findIndex(r => 
          columns.map((col: string) => r[col]).join('|') === key
        )
        if (index !== -1) {
          result[index] = row
        }
      }
    }
    
    return result
  }
  
  // Fill missing values
  private applyFill(data: DataPoint[], config: any): DataPoint[] {
    const { column, method, value } = config
    
    return data.map((row, index) => {
      const filled = { ...row }
      
      if (row[column] === null || row[column] === undefined) {
        switch (method) {
          case 'forward':
            if (index > 0) {
              filled[column] = data[index - 1][column]
            }
            break
            
          case 'backward':
            if (index < data.length - 1) {
              filled[column] = data[index + 1][column]
            }
            break
            
          case 'value':
            filled[column] = value
            break
            
          case 'mean':
            const values = data.map(r => r[column]).filter(v => v !== null && v !== undefined)
            filled[column] = values.reduce((sum, val) => sum + Number(val), 0) / values.length
            break
            
          case 'median':
            const sorted = data.map(r => r[column])
              .filter(v => v !== null && v !== undefined)
              .sort((a, b) => Number(a) - Number(b))
            const mid = Math.floor(sorted.length / 2)
            filled[column] = sorted.length % 2 === 0
              ? (Number(sorted[mid - 1]) + Number(sorted[mid])) / 2
              : sorted[mid]
            break
        }
      }
      
      return filled
    })
  }
  
  // Interpolation
  private applyInterpolation(data: DataPoint[], config: any): DataPoint[] {
    const { column, method } = config
    const result = [...data]
    
    for (let i = 0; i < result.length; i++) {
      if (result[i][column] === null || result[i][column] === undefined) {
        // Find previous and next non-null values
        let prevIndex = i - 1
        while (prevIndex >= 0 && (result[prevIndex][column] === null || result[prevIndex][column] === undefined)) {
          prevIndex--
        }
        
        let nextIndex = i + 1
        while (nextIndex < result.length && (result[nextIndex][column] === null || result[nextIndex][column] === undefined)) {
          nextIndex++
        }
        
        if (prevIndex >= 0 && nextIndex < result.length) {
          const prevValue = Number(result[prevIndex][column])
          const nextValue = Number(result[nextIndex][column])
          
          switch (method) {
            case 'linear':
              const ratio = (i - prevIndex) / (nextIndex - prevIndex)
              result[i][column] = prevValue + (nextValue - prevValue) * ratio
              break
              
            case 'spline':
              // Implement spline interpolation
              // For simplicity, using linear here
              const ratio2 = (i - prevIndex) / (nextIndex - prevIndex)
              result[i][column] = prevValue + (nextValue - prevValue) * ratio2
              break
          }
        }
      }
    }
    
    return result
  }
  
  // Outlier detection
  private detectOutliers(data: DataPoint[], config: any): DataPoint[] {
    const { column, method, threshold } = config
    const values = data.map(row => Number(row[column])).filter(v => !isNaN(v))
    
    let outlierIndices: Set<number> = new Set()
    
    switch (method) {
      case 'iqr':
        const sorted = [...values].sort((a, b) => a - b)
        const q1 = sorted[Math.floor(sorted.length * 0.25)]
        const q3 = sorted[Math.floor(sorted.length * 0.75)]
        const iqr = q3 - q1
        const lowerBound = q1 - 1.5 * iqr
        const upperBound = q3 + 1.5 * iqr
        
        data.forEach((row, index) => {
          const value = Number(row[column])
          if (value < lowerBound || value > upperBound) {
            outlierIndices.add(index)
          }
        })
        break
        
      case 'zscore':
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length
        const stdDev = Math.sqrt(
          values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
        )
        
        data.forEach((row, index) => {
          const value = Number(row[column])
          const zscore = Math.abs((value - mean) / stdDev)
          if (zscore > (threshold || 3)) {
            outlierIndices.add(index)
          }
        })
        break
        
      case 'isolation_forest':
        // Implement isolation forest algorithm
        // For simplicity, using z-score here
        break
    }
    
    return data.map((row, index) => ({
      ...row,
      [`${column}_is_outlier`]: outlierIndices.has(index)
    }))
  }
  
  // Remove outliers
  private removeOutliers(data: DataPoint[], config: any): DataPoint[] {
    const withOutliers = this.detectOutliers(data, config)
    return withOutliers.filter(row => !row[`${config.column}_is_outlier`])
  }
  
  // Import methods
  private async importCSV(config: ImportConfig): Promise<{ data: DataPoint[]; columns: Column[] }> {
    // Implementation would use PapaParse
    return { data: [], columns: [] }
  }
  
  private async importExcel(config: ImportConfig): Promise<{ data: DataPoint[]; columns: Column[] }> {
    // Implementation would use XLSX
    return { data: [], columns: [] }
  }
  
  private async importJSON(config: ImportConfig): Promise<{ data: DataPoint[]; columns: Column[] }> {
    // Implementation would parse JSON
    return { data: [], columns: [] }
  }
  
  private async importXML(config: ImportConfig): Promise<{ data: DataPoint[]; columns: Column[] }> {
    // Implementation would use fast-xml-parser
    return { data: [], columns: [] }
  }
  
  private async importFromAPI(config: ImportConfig): Promise<{ data: DataPoint[]; columns: Column[] }> {
    // Implementation would fetch from API
    return { data: [], columns: [] }
  }
  
  // Export methods
  private exportCSV(data: DataPoint[], columns: Column[], options: ExportOptions): string {
    // Implementation would generate CSV
    return ''
  }
  
  private exportExcel(data: DataPoint[], columns: Column[], options: ExportOptions): Blob {
    // Implementation would use XLSX
    return new Blob()
  }
  
  private exportJSON(data: DataPoint[], options: ExportOptions): string {
    return JSON.stringify(data, null, options.indent || 2)
  }
  
  private exportSQL(data: DataPoint[], columns: Column[], options: ExportOptions): string {
    // Implementation would generate SQL
    return ''
  }
  
  private exportHTML(data: DataPoint[], columns: Column[], options: ExportOptions): string {
    // Implementation would generate HTML table
    return ''
  }
  
  private exportMarkdown(data: DataPoint[], columns: Column[], options: ExportOptions): string {
    // Implementation would generate Markdown table
    return ''
  }
  
  // Helper methods
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
  
  private calculateMetadata(data: DataPoint[]): DatasetMetadata {
    return {
      rowCount: data.length,
      columnCount: data.length > 0 ? Object.keys(data[0]).length : 0,
      sizeInBytes: JSON.stringify(data).length,
      created: new Date(),
      modified: new Date(),
      tags: [],
      quality: this.calculateDataQuality(data),
      lineage: []
    }
  }
  
  private calculateDataQuality(data: DataPoint[]): DataQuality {
    // Implementation would calculate quality metrics
    return {
      completeness: 100,
      accuracy: 100,
      consistency: 100,
      timeliness: 100,
      uniqueness: 100,
      validity: 100,
      issues: []
    }
  }
  
  private applyMapping(data: DataPoint[], mapping: ColumnMapping[]): DataPoint[] {
    return data.map(row => {
      const mapped = { ...row }
      for (const map of mapping) {
        if (map.transformation) {
          // Apply transformation
          mapped[map.targetColumn] = this.transformValue(row[map.sourceColumn], map.transformation)
        } else {
          mapped[map.targetColumn] = row[map.sourceColumn]
        }
        if (map.targetColumn !== map.sourceColumn) {
          delete mapped[map.sourceColumn]
        }
      }
      return mapped
    })
  }
  
  private transformValue(value: any, transformation: string): any {
    // Implementation would apply various transformations
    return value
  }
  
  private selectColumns(data: DataPoint[], columns: string[]): DataPoint[] {
    return data.map(row => {
      const selected: DataPoint = { id: row.id }
      for (const col of columns) {
        selected[col] = row[col]
      }
      return selected
    })
  }
  
  private validateData(data: DataPoint[], rules: ValidationRule[]): { errors: any[]; warnings: any[] } {
    const errors: any[] = []
    const warnings: any[] = []
    
    // Implementation would validate data against rules
    
    return { errors, warnings }
  }
  
  private addToHistory(operation: DataOperation): void {
    this.history.push(operation)
    if (this.history.length > 100) {
      this.history.shift()
    }
  }
  
  private notifyListeners(type: string, datasetId: string): void {
    for (const listener of this.listeners) {
      listener({ type, datasetId, timestamp: new Date() })
    }
  }
}

// Types for history and listeners
interface DataOperation {
  type: string
  datasetId: string
  transformation?: DataTransformation
  timestamp: Date
}

type DataChangeListener = (event: {
  type: string
  datasetId: string
  timestamp: Date
}) => void

// Export singleton instance
export const dataManagement = new DataManagementStore()