import React, {Component, useState, useRef, useEffect} from "react"
import {Form, Input, Modal, Button} from "antd"
import cookies from 'react-cookies'
/**
 * params list:
 * postVerifyCode(verify_code, resolve): 将表单中输入的验证码作为参数传回
 * getVerifyCode(cb): 传入的获取验证码方法中要有一个callback，
 *                    获取验证码成功后要在方法中调用，不然无法倒计时
 * visible： 显示
 * modalHandleCancel：取消按钮的回调
 */

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
}

const CodeInput = ({onChange, visible, getVerifyCode, value=''}) => {
  const [code] = useState('')
  
  const onCodeChange = e => {
    const newCode = e.target.value || ''
    
    triggerChange(newCode)

  }

  const triggerChange = changedValue => {
    if (onChange) {
      onChange(changedValue)
    }
  }

  return (
    <span>
      <Input
        style={{width: 148}} 
        placeholder="请输入验证码"
        value={value || code}
        onChange={onCodeChange}
      />
      <span style={{marginLeft: 20}}>
        {visible && <VerifyCode buttonOnClick={getVerifyCode}/>}
      </span>
    </span>
  )
}


const VerifyCodeModal = ({postVerifyCode, getVerifyCode, visible=false, modalHandleCancel=() => {}}) => {
  const [form] = Form.useForm()
  const t = useRef(null)
  const [loading, setLoading] = useState(false)

  const cellphone = cookies.load('cf-guarantor-cellphone') || ''

  useEffect(() => {
    return t && window.clearTimeout(t)
  }, [])

  
  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      postVerifyCode(values['code'], () => {
        setLoading(false)
        form.resetFields()
      })
      t.current = setTimeout(() => setLoading(false), 10000)
    } catch (error) {
      
    }
  }

  const resetForm = () => {
    form.resetFields()
    modalHandleCancel()
  }

  return (
    <Modal
      visible={visible}
      title='安全验证'
      okText="确定"
      cancelText="取消"
      onCancel={resetForm}
      onOk={handleOk}
      confirmLoading={loading}
      maskClosable={false}
    >
      <div className="bank-card-modal">
        <Form {...formItemLayout} form={form}>
          <Form.Item label="发送短信验证码至">
            <span style={{marginLeft: 10}}>{`${cellphone}`}</span>
          </Form.Item>
          <Form.Item
            label="验证码" 
            name='code'
            rules={[
              {required: true, message: '请输入验证码'},
              {pattern:/^[0-9]\d*$/, message: '请输入正确验证码'},
            ]}>
            <CodeInput visible={visible} getVerifyCode={getVerifyCode}/>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default VerifyCodeModal

class VerifyCode extends Component{
  constructor(props) {
    super(props)
    this.state = {
      countNum: 0
    }
    this.onClick = this.onClick.bind(this)
    this.countDown = this.countDown.bind(this)
  }
  onClick() {
    this.setState({loading: true})
    const {buttonOnClick} = this.props
    buttonOnClick(() => {
      this.countDown()
      this.setState({loading: false})
    }, () => {
      this.setState({loading: false})
    })
    this._t = setTimeout(() => this.setState({loading: false}), 10000)
  }

  countDown() {
    this.setState({countNum: 60}, () => {
      this.num = this.state.countNum === 60 ? 60 : this.state.countNum
      this.t = window.setInterval(() => {
        this.setState({countNum: this.num -= 1})
        if (this.num === 0) {
          window.clearInterval(this.t)
        }
      }, 1000)
    })
  }

  componentWillUnmount(){
    window.clearInterval(this.t)
    window.clearTimeout(this._t)
  }

  render() {
    const {buttonDisabled, style} = this.props
    const {countNum, loading} = this.state
    return <Button type="primary" style={style} ghost className="verify-button" onClick={this.onClick} disabled={buttonDisabled || !!countNum} loading={loading}>
      {countNum ? `还剩${countNum}秒` : '获取验证码'}
    </Button>
  }
}
