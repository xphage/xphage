function type(data: any): string {
  return Object.prototype.toString.call(data).slice(8, -1)
}

// Logic

export function eq(...items: any): boolean {
  for (let i = 0; i < items.length - 1; i++) {
    if (items[i] !== items[i + 1]) {
      if (type(items[i]) === type(items[i + 1])) {
        if (type(items[i]) === 'Array') {
          for (let j = 0; j < Math.max(items[i].length, items[i + 1].length); j++) {
            if (!this.eq(items[i][j], items[i + 1][j])) return false
          }
        } else if (type(items[i]) === 'Object') {
          if (Object.keys(items[i]).length === Object.keys(items[i + 1]).length) {
            for (const [key, value] of Object.entries(items[i])) {
              if (items[i + 1][key] !== value && !this.eq(items[i + 1][key], value)) return false
            }
          } else {
            return false
          }
        } else if (type(items[i]) === 'String') {
          if (items[i] !== items[i + 1]) return false
        } else {
          return false
        }
      } else {
        return false
      }
    }
  }
  return true
}

// Arrays

export function nth(items: any[], n: number) {
  return items[(items.length + n) % items.length]
}

export function range(start: number, end: number, step: number): number[] {
  let a = []
  if (!step) step = 1
  if (start > end) {
    step *= -1
    for (let i = start; i > end; i += step) {
      a.push(i)
    }
  } else {
    for (let i = start; i < end; i += step) {
      a.push(i)
    }
  }
  return a
}

export function sum(nums: number[]) {
  let n = 0
  for (const num of nums) {
    n += num
  }
  return n
}

export function includes(items: any[], x: any) {
  for (const item of items) {
    if (this.eq(item, x)) return true
  }
  return false
}

export function includesBy(items: any[], x: any, rule: any) {
  if (type(rule) === 'String') {
    for (const item of items) {
      if (this.eq(item[rule], x[rule])) return true
    }
    return false
  } else if (type(rule) === 'Array') {
    for (const item of items) {
      let b = true
      for (const key of rule) {
        if (!this.eq(item[key], x[key])) b = false
      }
      if (b) return true
    }
    return false
  } else if (type(rule) === 'Object') {

  } else if (type(rule) === 'Function') {
    for (const item of items) {
      if (this.eq(rule(item), rule(x))) return true
    }
    return false
  }
  return false
}

export function uniq(items: any[]): any[] {
  const a = []
  for (let i = 0; i < items.length; i++) {
    if (!this.includes(a, items[i])) a.push(items[i])
  }
  return a
}

export function uniqBy(items: object[], rule: any): object[] {
  const a = []
  for (let i = 0; i < items.length; i++) {
    if (!this.includesBy(a, items[i], rule)) a.push(items[i])
  }
  return a
}

export function uniqSorted(items: any[]) {
  const a = []
  for (let i = 0; i < items.length; i++) {
    if (!this.eq(this.nth(items, i), this.nth(items, i - 1))) a.push(items[i])
  }
  return a
}

export function uniqSortedBy(items: any[], rule: any) {
  const a = []
  if (type(rule) === 'String') {

  } else if (type(rule) === 'Array') {

  } else if (type(rule) === 'Object') {

  } else if (type(rule) === 'Function') {
    for (let i = 0; i < items.length; i++) {
      if (!this.eq(rule(this.nth(items, i)), rule(this.nth(items, i - 1)))) a.push(items[i])
    }
  }
  return a
}

export function choice(items: any[]) {
  return items[this.random(0, items.length)]
}

export function chunk(items: any[], n: number): any[] {
  if (n) {
    n = Math.abs(n)
  } else {
    n = 1
  }
  const chunks = []
  for (let i = 0; i < items.length; i += n) {
    chunks.push(items.slice(i, i + n))
  }
  return chunks
}

export function countif(a: any[], rule: string | string[]): number {
  let count = 0
  if (type(rule) === 'Array') {
    for (const item of a) {
      let s = ''
      for (let i = 1; i < rule.length; i++) {
        if (i - 1) {
          s += `${rule[0]}(${JSON.stringify(item)}${rule[i]})`
        } else {
          s += `(${JSON.stringify(item)}${rule[i]})`
        }
      }
      if ((new Function(`return ${s}`)())) count++
    }
  } else if (type(rule) === 'String') {
    for (const item of a) {
      if ((new Function(`return ${JSON.stringify(item)}${rule}`)())) count++
    }
  }
  return count
}

export function ifelse(items: any[], yes: any, no: any, fn: (item) => boolean): any[] {
  const a = []
  for (let i = 0; i < items.length; i++) {
    if (fn(items[i])) {
      a.push(yes)
    } else {
      a.push(no)
    }
  }
  return a
}

export function filter(objects: object[], rule: any): object[] {
  if (type(rule) === 'Array') {
    return objects.filter(x => this.matchesProperty(rule[0], rule[1])(x))
  } else if (type(rule) === 'Object') {
    return objects.filter(x => this.matches(rule)(x))
  } else if (type(rule) === 'String') {
    return objects.filter(x => this.property(rule)(x))
  } else if (type(rule) === 'Function') {
    return objects.filter(x => rule(x, objects))
  }
}

export function distill(objects: object[], rule: any): object[] {
  if (type(rule) === 'Array') {
    return [objects.filter(x => this.matchesProperty(rule[0], rule[1])(x)), objects.filter(x => !this.matchesProperty(rule[0], rule[1])(x))]
  } else if (type(rule) === 'Object') {
    return [objects.filter(x => this.matches(rule)(x)), objects.filter(x => !this.matches(rule)(x))]
  } else if (type(rule) === 'String') {
    return [objects.filter(x => this.property(rule)(x)), objects.filter(x => !this.property(rule)(x))]
  } else if (type(rule) === 'Function') {
    return [objects.filter(x => rule(x, objects)), objects.filter(x => !rule(x, objects))]
  }
}

export function find(objects: object[], rule: any): object {
  if (type(rule) === 'Array') {
    for (let i = 0; i < objects.length; i++) {
      if (this.matchesProperty(rule[0], rule[1])(objects[i])) return objects[i]
    }
  } else if (type(rule) === 'Object') {
    for (let i = 0; i < objects.length; i++) {
      if (this.matches(rule)(objects[i])) return objects[i]
    }
  } else if (type(rule) === 'String') {
    for (let i = 0; i < objects.length; i++) {
      if (this.property(rule)(objects[i])) return objects[i]
    }
  } else if (type(rule) === 'Function') {
    for (let i = 0; i < objects.length; i++) {
      if (rule(objects[i])) return objects[i]
    }
  }
}

export function findIndexes(objects: object[], rule: any): number[] {
  let idx = []
  if (type(rule) === 'Array') {
    for (let i = 0; i < objects.length; i++) {
      if (this.matchesProperty(rule[0], rule[1])(objects[i])) idx.push(i)
    }
  } else if (type(rule) === 'Object') {
    for (let i = 0; i < objects.length; i++) {
      if (this.matches(rule)(objects[i])) idx.push(i)
    }
  } else if (type(rule) === 'String') {
    for (let i = 0; i < objects.length; i++) {
      if (this.property(rule)(objects[i])) idx.push(i)
    }
  } else if (type(rule) === 'Function') {
    for (let i = 0; i < objects.length; i++) {
      if (rule(objects[i])) idx.push(i)
    }
  }
  return idx
}

export function zip(...arrays: any[][]): any[] {
  let zipped = []
  for (let i = 0; i < arrays[0].length; i++) {
    const items = []
    for (const a of arrays) {
      items.push(a[i])
    }
    zipped.push(items)
  }
  return zipped
}

export function search(items: any[], item: any): number {
  let start = 0
  let end = items.length
  let depth = Math.ceil(Math.log2(items.length + 1))
  let i = 0
  let mid = Math.floor((start + end) / 2)
  while (i <= depth) {
    mid = Math.floor((start + end) / 2)
    if (start >= end) {
      break
    }
    if (this.eq(item, items[mid])) {
      return mid
    } else if (item > items[mid]) {
      start = mid + 1
    } else {
      end = mid
    }
    i++
  }
  return -1
}

export function searchFit(items: any[], item: any): number[] {
  let start = 0
  let end = items.length
  let depth = Math.ceil(Math.log2(items.length + 1))
  let i = 0
  let mid = Math.floor((start + end) / 2)
  while (i <= depth) {
    mid = Math.floor((start + end) / 2)
    if (start >= end) {
      break
    }
    if (this.eq(item, items[mid])) {
      return [mid]
    } else if (item > items[mid]) {
      start = mid + 1
    } else {
      end = mid
    }
    i++
  }
  return [mid, i]
}

export function insert(item: any, items: any[], index: number): any[] {
  items.splice(index, 0, item)
  return items
}

export function insertSorted(item: any, items: any[]): any[] {
  items.splice(this.searchFit(items, item)[0], 0, item)
  return items
}

// Object

// Number

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

// Function

export function matches(rule: object) {
  return (o: object) => {
    for (const [key, value] of Object.entries(rule)) {
      if (o[key] !== value && !this.eq(o[key], value)) return false
    }
    return true
  }
}

export function matchesProperty(key: string | number, value: any) {
  return (o: object) => {
    return this.eq(o[key], value)
  }
}

export function property(key) {
  return (o: object) => {
    return o[key]
  }
}

export function must(rule: object) {
  return (o: object) => {
    for (const [key, value] of Object.entries(rule)) {
      if (type(value) === 'String') {
        if (!(new Function(`return ${JSON.stringify(o[key])}${value}`)())) return false
      } else if (type(value) === 'Array') {
        let s = ''
        for (let i = 1; i < value.length; i++) {
          if (i - 1) {
            s += `${value[0]}(${JSON.stringify(o[key])}${value[i]})`
          } else {
            s += `(${JSON.stringify(o[key])}${value[i]})`
          }
        }
        if (!(new Function(`return ${s}`)())) return false
      }
    }
    return true
  }
}