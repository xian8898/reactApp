import { Form, Input, Button } from "antd"
import { useAuth } from "context/auth-context"
import { useAsync } from "utils/use-async"
// import { FormEvent } from "react"
import { LongButton } from "./login"


export const Register = ({onError}: {onError: (error: Error) => void}) => {
    const {register} = useAuth()
    const {run, isLoading} = useAsync(undefined, {throwOnError: true})
    const handleSubmit = ({cpassword, ...values}: {username: string, password: string, cpassword: string}) => {
        if (cpassword !== values.password) {
            onError(new Error('密码必须跟确认密码相同'))
            return
        }
        run(register(values).catch(onError))
    }
    return <Form onFinish={handleSubmit}>
    <Form.Item name={'username'} rules={[{required: true, message: "请输入用户名"}]}>
        <Input placeholder={"用户名"} type="text" />
    </Form.Item>
    <Form.Item name={'password'} rules={[{required: true, message: "请输入密码"}]}>
        <Input placeholder={"密码"} type="password" />
    </Form.Item>
    <Form.Item name={'cpassword'} rules={[{required: true, message: "请输入确认密码"}]}>
            <Input placeholder={"确认密码"} type="password" />
        </Form.Item>
    <Form.Item><LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>注册</LongButton></Form.Item>
</Form>
}