import { ElTag } from 'element-plus'
export const columns: Array<AppTableType.ColumnsType> = [
  {
    key: 'nickName',
    label: '昵称',
    width: 150,
    render: (row: any) => {
      return (
        <ElTag disable-transitions type="danger">
          {row.nickName}
        </ElTag>
      )
    },
  },
  {
    key: 'deptName',
    label: '部门',
  },
]
