import React, {useEffect} from 'react'
import {Tabs} from 'antd'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router'
import {CacheRoute} from 'react-router-cache-route'
import * as actions from '../actions/tabLayout'

const TabsLayout = () => {

  const selectedData = useSelector(state => state.tabList)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    history.push(selectedData.activeKey)
  }, [history, selectedData.activeKey])

  const onEdit = (key, action) => {
    if(action === 'remove') {
      dispatch(actions.closeTab(key))
    }
  }

  const changeTab = key => {
    dispatch(actions.changeTab(key))
  }

  return (
    <Tabs hideAdd={true} type='editable-card' activeKey={selectedData.activeKey} onEdit={onEdit} onTabClick={changeTab}>
      {
        selectedData.tabs.map(tab => {
          return (
            <Tabs.TabPane
              key={tab.key}
              tab={tab.name}
              closable={tab.closable}
            >
              <CacheRoute path={tab.key} component={tab.content} exact/>
            </Tabs.TabPane>
          )
        })
      }
    </Tabs>
  )
}

export default TabsLayout