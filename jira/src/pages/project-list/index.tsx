import { useState,useEffect } from 'react'
import {SearchPanel, User} from './search-panel'
import {List, Project} from './list'
import { clearObject, useDebounce, useMount } from 'utils'
// import * as qs from 'qs'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useAsync } from 'utils/use-async'
// const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListPage = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState<User[]>([])


    const paramDebounce = useDebounce(param, 200)
    const client = useHttp()
    const {run, isLoading, error, data: list} = useAsync<Project[]>()

    useMount(() => {
        client('users').then(setUsers)
        // fetch(`${apiUrl}/users`).then(async response => {
        //     if (response.ok) {
        //         setUsers(await response.json())
        //     }
        // })
    })
    useEffect(() => {
        run(client('projects',{
            data: clearObject(param)
        }))
        // fetch(`${apiUrl}/projects?${qs.stringify(clearObject(param))}`).then(async response => {
        //     if (response.ok) {
        //         setList(await response.json())
        //     }
        // })
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramDebounce])
    return <Container>
        <h1>项目列表</h1>
        <SearchPanel param={param} setParam={setParam} users={users} />
        {error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null}
        <List loading={isLoading} dataSource={list || []} users={users}/>
    </Container>
}

const Container = styled.div`
    padding: 3.2rem;
`