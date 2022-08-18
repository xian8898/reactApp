import { Project } from "pages/project-list/list"
import { useState } from "react"

interface state<D> {
    stat: 'idle' | 'loading' | 'error' | 'success',
    error: Error | null,
    data: D | null
}
const defaultInitailState = {
    stat: 'idle',
    data: null,
    error: null
    
}
const defaultInitailConfig = {
    throwOnError: false
}
export const useAsync = <D>(initailState?: state<D>, initailConfig?: typeof defaultInitailConfig) => {
    const config = {...defaultInitailConfig,...initailConfig}
    const [state, setState] = useState({
        ...defaultInitailState,
        ...initailState
    })
    
    const setData = (data: D) => setState({
        data,
        error: null,
        stat: 'success'
    })
    const setError = (error: Error) => setState({
        error,
        stat: 'error',
        data: null
    })
    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error('必须传入Promise类型参数')
        }
        setState({
            ...state,
            stat: 'loading'
        })
        return promise.then((data) => {
            setData(data)
            return data
        // catch会消化异常，如果不主动抛出，接收不到异常
        }).catch((error) => {
            setError(error)
            if (config.throwOnError) return Promise.reject(error)
            return error
        })
    }
    return {
        isError: state.stat === 'error',
        isLoading: state.stat === 'loading',
        isIdle: state.stat === 'idle',
        isSuccess: state.stat === 'success',
        ...state,
        run,
        setData,
        setError
    }
}