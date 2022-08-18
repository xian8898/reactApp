import styled from "@emotion/styled"
import { Row } from "components/lib"
import { useAuth } from "./context/auth-context"
import { ProjectListPage } from "./pages/project-list"
import {ReactComponent as SoftWareLogo} from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from "antd"


/**
 * grid 和 flex各自的应用场景
 * 1.要考虑，一维布局还是二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2.是从内容出阿里还是布局出发
 * 从内容出发：你现有一组（数量一般不固定），然后希望他们均匀分布在容器中，有内容自己的大小决定占据的空间
 * 从布局出发：先规划网格（网格数量固定），再把内容往里填充。
 * 从内容出发，用flex
 * 从布局出发，用grid
 */
export const AuthenticatedApp = () => {
    const {logout,user} = useAuth()
    
    return <Container>
        <PageHeader between={true}>
            <HeaderLeft gap={true}>
                <SoftWareLogo width={'18rem'} color={'reb(38, 132, 255)'}></SoftWareLogo>
                <h3>logo</h3>
                <h3>logo</h3>
            </HeaderLeft>
            <HeaderRight>
                <Dropdown overlay={<Menu>
                    <Menu.Item key={'logout'}>
                        <Button type={'link'} onClick={logout}>登出</Button>
                    </Menu.Item>
                </Menu>}>
                    <Button type={'link'} onClick={e => e.preventDefault()}>Hi, {user?.name}</Button>
                </Dropdown>
            </HeaderRight>
        </PageHeader>
        <Main>
            <ProjectListPage/>
        </Main>
    </Container>
}
const PageHeader = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
    z-index: 1;
`
const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main`
    height: calc(100vh - 6rem);
`
const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem calc(100vh - 6rem);
    height: 100vh;
`