import React from 'react'
import {PageContent} from 'dtchain-fe'
import {TabLink} from '../../components/'

const List = () => {
  return (
    <PageContent title='授信列表'>
      <div>授信列表</div>
      <TabLink target='blank' path='/manager/list/detail' name='详情'>点击跳转详情页</TabLink>
    </PageContent>
  )
}

export default List