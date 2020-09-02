import Home from '../../pages/home/home'
import routeConfig from '../../route/route.config'

const TAB_DATA = 'dtchain_tabData'

const getInitState = () => {
  const initState = {
    activeKey: '/home',
    tabs: [
      {
        name: '首页',
        key: '/home',
        closable: false,
        content: Home,
      },
    ],
  
  } 
  const storageData = JSON.parse(sessionStorage.getItem(TAB_DATA))
  storageData && storageData.tabs.forEach(item => {
    const route = routeConfig.find(routeItem => routeItem.path === item.key)
    item.content = route.component
  })
  return storageData || initState
}

const tabsReducer = (state = getInitState(), action={}) => {
  let newState
  switch (action.type) {
  case 'ADD_TAB':
    const route = routeConfig.find(item => item.path === action.key)
    if(!route) return state
    newState = {
      ...state,
      activeKey: action.key,
      tabs: [
        ...state.tabs,
        {
          name: route.name,
          key: action.key,
          closable: true,
          content: route.component,
        }
      ]
    }
    sessionStorage.setItem(TAB_DATA, JSON.stringify(newState))
    return newState
  
  case 'CLOSE_TAB':
    /**
     * 1. 关闭当前标签页，则按索引顺序激活下一标签页
     * 2. 若关闭的标签页为最后一页，则激活上一标签页
     * 3. 若关闭标签页不是当前页，则activeKey不变
     */
    const closeIndex = state.tabs.findIndex(item => item.key === action.key)
    const nextTab = state.tabs[closeIndex + 1]
    const prevTab = state.tabs[closeIndex - 1]
    const getNextActiveKey = () => {
      if(state.activeKey === action.key) {
        if(!nextTab) return prevTab.key
        return nextTab.key
      }
      return state.activeKey
    }

    newState = {
      ...state, 
      activeKey: getNextActiveKey(),
      tabs: [
        ...state.tabs.slice(0, closeIndex),
        ...state.tabs.slice(closeIndex + 1),
      ]
    }
    sessionStorage.setItem(TAB_DATA, JSON.stringify(newState))
    return newState
  
  case 'CHANGE_TAB':
    newState = {
      ...state,
      activeKey: action.key
    }
    sessionStorage.setItem(TAB_DATA, JSON.stringify(newState))
    return newState

  case 'UPDATE_TAB':
    /**
     * 标签页内跳转时，更新当前标签的name以及key
     */
    newState = {
      ...state,
      activeKey: action.key,
    }
    newState.tabs.forEach(item => {
      if(item.key === state.activeKey) {
        item.key = action.key
        item.name = action.name
      }
    })
    return newState
  default:
    return getInitState()
  }
}

export default tabsReducer