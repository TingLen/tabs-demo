const {override, fixBabelImports, addLessLoader} = require('customize-cra')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    }
  }),
  (config, env) => {
    config = rewireReactHotLoader(config, env)
    return config
  }
)