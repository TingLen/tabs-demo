import React from 'react'
import {Menu, Dropdown} from 'antd'
import {DownOutlined} from '@ant-design/icons'

const MyMenu = ({logout = () => {}}) => (
  <Menu>
    <Menu.Item>
      <div className='user-info-menu' onClick={logout}>退出登录</div>
    </Menu.Item>
  </Menu>
)

const UserInfo = ({userName, logout}) => {
  
  return (
    <div className='user-info'>
      <Dropdown overlay={<MyMenu logout={logout}/>}>
        <div className='user-info-name'>
          {userName || 'admin'}
          <DownOutlined />
        </div>
      </Dropdown>
    </div>
  )
}

export default UserInfo