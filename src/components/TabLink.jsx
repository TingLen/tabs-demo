import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../actions/tabLayout'

const TabLink = ({children, path, name, target='self'}) => {
  const dispatch = useDispatch()
  const selectData = useSelector(state => state.tabList)

  const changeLocation = () => {
    /**
     * 先检测是否存在相同path的tab
     * 若存在，则调用CHANGE_TAB
     * 不存在则调用UPDATE_TAB 或 ADD_TAB
     */
    const resultTab = selectData.tabs.filter(tab => tab.key === path)

    if(resultTab.length > 0) {
      dispatch(actions.changeTab(path))
    } else {
      if(target === 'self') {
        dispatch(actions.updateTab(path, name))
      } else if(target === 'blank') {
        dispatch(actions.addTab(path))
      }
    }
    
  }

  return <span onClick={changeLocation}>{children}</span>
}

export default TabLink