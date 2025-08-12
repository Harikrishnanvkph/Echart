export type PlainObject = Record<string, any>

export function isPlainObject(value: unknown): value is PlainObject {
  if (Object.prototype.toString.call(value) !== "[object Object]") return false
  const proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.prototype
}

export function deepMerge<T extends PlainObject, U extends PlainObject>(target: T, source: U): T & U {
  const output: PlainObject = Array.isArray(target) ? [...target] : { ...target }

  if (isPlainObject(target) && isPlainObject(source)) {
    for (const key of Object.keys(source)) {
      const sourceValue = (source as any)[key]
      const targetValue = (target as any)[key]

      if (Array.isArray(sourceValue)) {
        // For arrays, prefer source entirely unless both are arrays and we want to merge objects within
        output[key] = sourceValue.slice()
      } else if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
        output[key] = deepMerge(targetValue, sourceValue)
      } else {
        output[key] = sourceValue
      }
    }
  }

  return output as T & U
}

export function getByPath<T = any>(obj: PlainObject, path: string, defaultValue?: T): T | undefined {
  if (!path) return obj as any
  const segments = normalizePath(path)
  let current: any = obj
  for (const segment of segments) {
    if (current == null) return defaultValue
    current = current[segment]
  }
  return current ?? defaultValue
}

export function setByPath(obj: PlainObject, path: string, value: any): PlainObject {
  const segments = normalizePath(path)
  if (segments.length === 0) return obj

  let cursor: any = obj
  for (let i = 0; i < segments.length - 1; i++) {
    const key = segments[i]
    const nextKey = segments[i + 1]
    const shouldBeArray = typeof nextKey === "number" || (typeof nextKey === "string" && /^\d+$/.test(String(nextKey)))

    if (!(key in cursor) || cursor[key] == null) {
      cursor[key] = shouldBeArray ? [] : {}
    }

    cursor = cursor[key]
  }

  const lastKey = segments[segments.length - 1]
  cursor[lastKey] = value
  return obj
}

function normalizePath(path: string): Array<string | number> {
  // Convert paths like "series[0].itemStyle.color" or "xAxis.0.axisLabel.rotate"
  const parts: Array<string | number> = []
  const tokens = path
    .replace(/\[(\d+)\]/g, ".$1") // [0] => .0
    .split(".")
    .filter(Boolean)

  for (const token of tokens) {
    if (/^\d+$/.test(token)) {
      parts.push(Number(token))
    } else {
      parts.push(token)
    }
  }
  return parts
}