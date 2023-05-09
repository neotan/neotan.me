// @ts-nocheck

import { cn, formatDate, formatNumber, isNilOrEmpty, isNumber, isObject } from '../helpers'

// write tests for function formatDate
describe('formatDate', () => {
  test('should return empty string if date is falsy', () => {
    expect(formatDate(undefined)).toBe('')
    expect(formatDate(null)).toBe('')
    expect(formatDate('')).toBe('')
  })

  test('should return formatted date if date is valid', () => {
    const input = new Date('2020-01-01')
    expect(formatDate(input)).toBe('2020-01-01')
    expect(formatDate(input, 'yyyy-MM-dd HH:mm')).toBe('2020-01-01 00:00')
    expect(formatDate(input, 'yyyy-MM-dd HH:mm:ss')).toBe('2020-01-01 00:00:00')
  })

  test('should return formatted date if date is Date object', () => {
    const input = new Date('2020-01-01')
    expect(formatDate(input)).toBe('2020-01-01')
    expect(formatDate(input, 'yyyy-MM-dd HH:mm')).toBe('2020-01-01 00:00')
    expect(formatDate(input, 'yyyy-MM-dd HH:mm:ss')).toBe('2020-01-01 00:00:00')
  })

  test('should return formatted date if date is number', () => {
    const input = 1577836800000
    expect(formatDate(input)).toBe('2020-01-01')
    expect(formatDate(input, 'yyyy-MM-dd HH:mm')).toBe('2020-01-01 00:00')
    expect(formatDate(input, 'yyyy-MM-dd HH:mm:ss')).toBe('2020-01-01 00:00:00')
  })
  test('should return formatted date if date is string', () => {
    const input = '2020-01-01'
    expect(formatDate(input)).toBe('2020-01-01')
    expect(formatDate(input, 'yyyy-MM-dd HH:mm')).toBe('2020-01-01 00:00')
    expect(formatDate(input, 'yyyy-MM-dd HH:mm:ss')).toBe('2020-01-01 00:00:00')
  })


  test('2should return formatted date if date is string', () => {
    const input = 'Jun/04/2015'
    expect(formatDate(input)).toBe('2020-01-01')
    expect(formatDate(input, 'yyyy-MM-dd HH:mm')).toBe('2020-01-01 00:00')
    expect(formatDate(input, 'yyyy-MM-dd HH:mm:ss')).toBe('2020-01-01 00:00:00')
  })
})

describe('formatNumber', () => {
  test('should return stringified value if number is falsy', () => {
    expect(formatNumber(undefined)).toBe(undefined)
    expect(formatNumber(null)).toBe(null)
    expect(formatNumber('')).toBe('')
  })

  test('should return formatted number if number is valid', () => {
    const input = 123456789
    expect(formatNumber(input)).toBe('123,456,789')
    expect(formatNumber(input, { style: 'currency', currency: 'USD' })).toBe('$123,456,789.00')
    expect(formatNumber(input, { style: 'currency', currency: 'EUR' })).toBe('€123,456,789.00')
    expect(formatNumber(input, { style: 'currency', currency: 'EUR' }, 'de-DE')).toBe('123.456.789,00 €')
  })

  test('should return formatted number if number is string', () => {
    const input = '123456789'
    expect(formatNumber(input)).toBe('123,456,789')
    expect(formatNumber(input, { style: 'currency', currency: 'USD' })).toBe('$123,456,789.00')
    expect(formatNumber(input, { style: 'currency', currency: 'EUR' })).toBe('€123,456,789.00')
    expect(formatNumber(input, { style: 'currency', currency: 'EUR' }, 'de-DE')).toBe('123.456.789,00 €')
  })

  test('should return formatted number if number is number', () => {
    const input = 123456789
    expect(formatNumber(input)).toBe('123,456,789')
    expect(formatNumber(input, { style: 'currency', currency: 'USD' })).toBe('$123,456,789.00')
    expect(formatNumber(input, { style: 'currency', currency: 'EUR' })).toBe('€123,456,789.00')
    expect(formatNumber(input, { style: 'currency', currency: 'EUR' }, 'de-DE')).toBe('123.456.789,00 €')
  })

  test('should return formatted number if number is Date object', () => {
    const input = new Date(123456789)
    expect(formatNumber(input)).toBe(input)
  })
})

describe('isNilOrEmpty', () => {
  test('should return true if value is falsy', () => {
    expect(isNilOrEmpty(undefined)).toBe(true)
    expect(isNilOrEmpty(null)).toBe(true)
    expect(isNilOrEmpty('')).toBe(true)
    expect(isNilOrEmpty({})).toBe(true)
    expect(isNilOrEmpty([])).toBe(true)
  })

  test('should return false if value is not falsy', () => {
    expect(isNilOrEmpty(' ')).toBe(false)
    expect(isNilOrEmpty('a')).toBe(false)
    expect(isNilOrEmpty(0)).toBe(false)
    expect(isNilOrEmpty(1)).toBe(false)
  })
})

describe('isNumber', () => {
  test('should return true if value is number', () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(1)).toBe(true)
    expect(isNumber(1.1)).toBe(true)
    expect(isNumber(Infinity)).toBe(true)
  })

  test('should return false if value is not number', () => {
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber('')).toBe(false)
    expect(isNumber(' ')).toBe(false)
    expect(isNumber('a')).toBe(false)
    expect(isNumber({})).toBe(false)
    expect(isNumber([])).toBe(false)
    expect(isNumber(NaN)).toBe(false)
  })
})

describe('isObject', () => {
  test('should return true if value is object', () => {
    expect(isObject({})).toBe(true)
  })

  test('should return false if value is not object', () => {
    expect(isObject(undefined)).toBe(false)
    expect(isObject(null)).toBe(false)
    expect(isObject('')).toBe(false)
    expect(isObject(' ')).toBe(false)
    expect(isObject('a')).toBe(false)
    expect(isObject(0)).toBe(false)
    expect(isObject(1)).toBe(false)
    expect(isObject(1.1)).toBe(false)
    expect(isObject(Infinity)).toBe(false)
    expect(isObject(NaN)).toBe(false)
    expect(isObject([])).toBe(false)
  })
})

describe('cn', () => {
  test('should return empty string if no arguments', () => {
    expect(cn()).toBe('')
  })

  test('should return empty string if all arguments are falsy', () => {
    expect(cn(undefined, null, '')).toBe('')
  })

  test('should return string with given arguments', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })

  test('should return string with given arguments and falsy arguments', () => {
    expect(cn('a', undefined, 'b', null, 'c', '')).toBe('a b c')
  })
})
