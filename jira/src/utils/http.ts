import { logout } from "auth-provider"
import qs from "qs"
import { useAuth } from "context/auth-context"


const apiUrl = process.env.REACT_APP_API_URL
interface Config extends RequestInit {
    data?: object,
    token?: string
}
export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '',
            ...headers
        },
        ...customConfig
    }
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data)
    }
    return window.fetch(`${apiUrl}/${endpoint}`, config).then(async response => {
        if (response.status === 401) {
            await logout()
            window.location.reload()
            return Promise.reject('请重新登陆！')
        }
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            return Promise.reject(data)
        }
    })
}

// JS 中的typeof,是在runtime时运行的
// return typeof 1 === 'number'

// TS 中的typeof,是在静态环境运行的
// return (...[endpoint, config]: Parameters<typeof http>) =>
export const useHttp = () => {
    const {user} = useAuth()
    // Utility Type 用法：用泛型给她传入一个其他类型，然后Utility type 对这个类型进行某种操作（Parameters 是其中一个Utility type）
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}



// // 联合类型
// let myFavoriteNumber: string | number
// myFavoriteNumber = 'seven'
// myFavoriteNumber = 7
// // 下面会报这个错 Type '{}' is not assignable to type 'string | number'.
// // myFavoriteNumber = {}
// let jackFavoriteNumber: string | number



// // 类型别名type在很多情况下可以和interface互换 如下：Person
// // interface Person {
// //     name: string
// // }
// // type Person = {
// //     name: string
// // }
// // const xiaoMing: Person = {name: 'xiaoming'}

// // 类型别名type: interface 在这种情况下没法替代type(联合类型)
// type FavoriteNumber = string | number
// let roseFavoriteNumber: FavoriteNumber = '6'



// // interface没法实现Utility Type （工具类型？）Partial 和 Omit
// type Person = {
//     name: string;
//     age: number
// }
// // const xiaoMing: Person = {name: 'xiaoMing'}
// // Partial 是Person类型所有字段变可选
// // Omit 是删除后面填写的字段多个可写 Omit<Person, 'name' | 'age'>
// const xiaoMing: Partial<Person> = {name: 'xiaoMing'}
// const xiaoHong: Omit<Person, 'name'> = {age: 8} // Omit操作键值对 Person
// type PersonKeys = keyof Person // 得到联合类型 "name" | "age"
// type PersonOnlyName = Pick<Person, 'name'>
// type Age = Exclude<PersonKeys, 'name'> // Exclude操作联合类型PersonKeys ( "name" | "age" )

// // type Partial<T> = {
// //     [P in keyof T]?: T[P];
// // };

// // type Exclude<T, U> = T extends U ? never : T;
// // type Pick<T, K extends keyof T> = {
// //     [P in K]: T[P];
// // };
// // type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;