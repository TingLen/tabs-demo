import React from 'react'
import {Layout} from 'antd'
import UserInfo from './UserInfo'
import logo from '../styles/images/logo.png'
import {isLogin} from '../Page'

const Header = () => (
  <Layout.Header className='header'>
    <div className="logo-wrap">
      <img src={logo} className="logo" alt="logo"/>
      <span className="logo-title">xxxxxx管理后台</span>
    </div>
    {isLogin() && <UserInfo />}
  </Layout.Header>
)

export default Header