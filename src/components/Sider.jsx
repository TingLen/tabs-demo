import React, {useState} from 'react'
import {Layout} from 'antd'
import {MenuUnfoldOutlined, MenuFoldOutlined, ProfileOutlined} from '@ant-design/icons'
import {SideBar} from 'dtchain-fe'

const menuData = [
  {name: '首页', icon: <ProfileOutlined />, path: '/'},
  {name: '额度管理', icon: <ProfileOutlined />, path: '/manager',
    children: [
      {name: '授信列表', icon: <ProfileOutlined />, path: '/manager/list'},
      {name: '审核授信', icon: <ProfileOutlined />, path: '/manager/audit'},
    ]
  },
]

const Sider = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout.Sider
      theme="light"
      collapsible
      trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      breakpoint="xl"
      collapsed={collapsed}
      onCollapse={ collapse => setCollapsed(collapse) }
      className="sider"
    >
      <SideBar menuData={menuData} permissionCode={[]} isTab={true}/>
    </Layout.Sider>
  )
}

export default Sider