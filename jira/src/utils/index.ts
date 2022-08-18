import { useEffect, useState } from "react"

// object 范围更广，以下都不会报错
// let a: object
// a = {name: 'jack'}
// a = () => {}
// a = new RegExp('')

// let b: {[key: string]: unknown}
// b = {name: 'jack'}
// 以下会报错
// b = () => {}
// b = new RegExp()

export const isFalsy = (value: unknown) => value === 0 ? false : !value
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''


export const clearObject = (object: {[key: string]: unknown}) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key]
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result
}
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
        // 依赖乡里加上callback会造成无限循环，这个和useCallback和useMemo有关
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
export const useDebounce = <T>(value: T, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        // 每次在value变化以后设置一个定时器
        const timeout = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        // return 是每次在上一个useEffect处理完再运行
        return () => clearTimeout(timeout)
    }, [value, delay])
    return debounceValue
}