import React from 'react'
import {Layout} from 'antd'
import {Sider, Header, TabsLayout} from './components'

const {Content} = Layout

const App = () => {
  return (
    <Layout style={{height: "100%"}}>
      <Header />
      <Layout style={{flex: 1}}>
        <Sider/>
        <Content>
          <TabsLayout />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
