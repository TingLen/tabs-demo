import Audit from './Audit'
import List from './List'
import Detail from './Detail'

export default [
  {name: '授信列表', path: '/manager/list', component: List},
  {name: '授信详情', path: '/manager/list/detail', component: Detail},
  {name: '授信审核', path: '/manager/audit', component: Audit},
]