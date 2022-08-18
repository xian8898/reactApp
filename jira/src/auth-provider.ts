import { User } from "./pages/project-list/search-panel"
const apiUrl = process.env.REACT_APP_API_URL

// 在真实环境中如果使用firebase这种第三方auth服务，本文件不需要开发者开发
const localStorangeKey = '__auth_provider_token__'
export const getToken = () => window.localStorage.getItem(localStorangeKey)
export const handleUserResponse = ({user}:{user: User}) => {
    window.localStorage.setItem(localStorangeKey, user.token || '')
    return user
}
export const login = (data: {username: string;password: string}) => {
    return fetch(`${apiUrl}/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async response => {
        const data = await response.json()
        if (response.ok) {
            return handleUserResponse(data)
        } else {
            return Promise.reject(data)
        }
    })
}
export const register = (data: {username: string;password: string}) => {
    return fetch(`${apiUrl}/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async response => {
        const data = await response.json()
        if (response.ok) {
            return handleUserResponse(data)
        } else {
            return Promise.reject(data)
        }
    })
}
export const logout = async () => window.localStorage.removeItem(localStorangeKey)