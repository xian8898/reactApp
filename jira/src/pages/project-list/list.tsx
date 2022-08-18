import { Table, TableProps } from "antd"
import dayjs from "dayjs"
import { User } from "./search-panel"

export interface Project {
    id: string;
    personId: string;
    name: string;
    created: string;
    organization: string
}
interface ListProps extends TableProps<Project> {
    users: User[]
}
export const List = ({users, ...props}: ListProps) => {
    return <Table pagination={false} columns={[{
        title: '名称',
        key: 'name',
        dataIndex: 'name',
        sorter:(a, b) => a.name.localeCompare(b.name)
    }, {
        title: '负责人',
        key: 'personId',
        render(values, project) {
            return <span>{users.find((item) => item.id === project.personId)?.name || '未知'}</span>
        }
    }, {
        title: '部门',
        key: 'organization',
        dataIndex: 'organization'
    }, {
        title: '创建时间',
        key: 'created',
        render(value, project) {
            return <span>
                {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
            </span>
        }
    }]}
    {...props}>
    </Table>
}