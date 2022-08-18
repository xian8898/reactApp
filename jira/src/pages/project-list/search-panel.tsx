// import { useState, useEffect } from "react"
// const apiUrl = process.env.REACT_APP_API_URL

import { Form, Input, Select } from "antd"

export interface User {
    id: string;
    name: string;
    title: string;
    email: string;
    token: string;
    organization: string
}
interface SearchPanelProps {
    users: User[];
    param: {
        name: string;
        personId: string;
    };
    setParam: (parem: SearchPanelProps['param']) => void
}
export const SearchPanel = ({param, setParam, users}: SearchPanelProps) => {
    
    
    return <Form style={{marginBottom: '2rem'}} layout="inline">
        <Form.Item>
            <Input type="text" value={param.name} placeholder="组织" onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })}/>
        </Form.Item>
        <Form.Item>
            <Select value={param.personId} placeholder="负责人" onChange={value => setParam({
                ...param,
                personId:value
            })}>
                <Select.Option value="">负责人</Select.Option>
                {
                    users.map(user => <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>)
                }
            </Select>
        </Form.Item>
    </Form>
}