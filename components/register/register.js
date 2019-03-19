import React from 'react'
import { Tabs, Form, Icon, Input, Button, Row, Col, message } from 'antd'
import css from './register.less'
import fetchHelper from '../../utils/fetch';
class Register extends React.Component{
    constructor(props){
        super(props)
        this.state ={
          isDisabled: false,
          btnTxt: '获取验证码'
        }
    }
    // 账号注册事件
    register = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values)
            // 注册之前对用户的手机号先验证
            this.checkUser(() => {
              // 注册业务
              values.role = 0
              fetchHelper.post('/nc/common/account/register', values)
              .then(res => {
                if (res.status === 0) {
                  // 注册成功，跳转到登录页面
                  message.success('恭喜您，账号注册成功', 1)
                  window.location.href = '/account/login'
                } else {
                  // 注册失败
                  message.error('账号注册失败！' + res.message, 2)
                  // console.log(res)
                }
              })
            })
          }
        })
      }  
    // 校验手机号是否被注册
    checkUser = (callback) => {
      // 获取手机号码
      let tel = this.props.form.getFieldValue('user_name')
      if (tel) {
        fetchHelper.post('/nc/common/account/checkuser', {'username': tel})
        .then(res => {
          // console.log(res)
          if (res.status == 0) {
            if (res.message.isRegister) {
              // 已经被注册
              this.props.form.setFields({
                ['user_name']: {value: tel, errors: [new Error('手机号码已经被注册，请直接登录')]}
              })
            } else {
              // 没有被注册
              if (typeof callback === 'function') {
                callback()
              }
            }
          } else {
            message.error('服务器异常,稍后再试')
          }
        })
      }
    }
    // 验证手机验证码
    checkSMScode = () => {
      // 发送验证码 按钮禁用 5S后可以重新点击
      let time = 5
      let tel = this.props.form.getFieldValue('user_name')
      if (tel && tel.length > 0) {
        // 号码存在
        fetchHelper.post('/nc/common/account/snscode', {username: tel})
        .then(res => {
          if (res.status === 0) {
            message.success(res.message, 1)
          } else {
            message.error(res.message, 1)
          }
        })
        // 禁用按钮
        this.setState({
          isDisabled: true
        })
        // 按钮倒计时
        let timerDown = null
        timerDown = setInterval(()=>{
          time--
          if(time <= 0){
            // 清楚定时器
            clearInterval(timerDown)
            this.setState({
              isDisabled: false,
              btnTxt: '获取验证码'
            })
            return
          }
          // 按钮上的文字
          this.setState({
            btnTxt: time + '后重新获取'
          })
        }, 1000)
      } 
    }
    // 检验两次输入的密码是否一致
    confirmPassword = (rule, value, callback) => {
      // 获取第一次的密码
      let pw = this.props.form.getFieldValue('password')
      // 当前密码 value
      if (value && value != pw) {
        callback('两次输入的密码不一样')
      } else {
        callback()
      }
    }
    render(){
        const { getFieldDecorator } = this.props.form
        return <Form onSubmit={this.register} className="login-form">
            <Form.Item>
              {getFieldDecorator('user_name', {
                  rules: [{ required: true, message: '账号不能为空!' },{ pattern: /^[1][3,4,5,7,8][0-9]{9}/, message: '请输入正确的手机号!' }],
              })(
                  <Row>
                    <Col span={16}>
                      <Input onBlur = { this.checkUser } prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名/邮箱/手机号" />
                    </Col>
                    <Col span={6} offset={2}>
                      <Button onClick = {this.checkSMScode} type='primary' disabled={this.state.isDisabled} className={css.getSns}>{this.state.btnTxt}</Button>
                    </Col>
                  </Row>   
              )}
            </Form.Item>
            {/* 验证码 */}
            <Form.Item>
              {getFieldDecorator('sns_code', {
                  rules: [{ required: true, message: '验证码不能为空!' }],
              })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="验证码" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                  rules: [{ required: true, message: '密码不能为空!' }],
              })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('confirm_password', {
                  rules: [{ required: true, message: '密码不能为空!' },
                  { validator: this.confirmPassword }],
              })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="再次输入密码" />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                  注册
              </Button>
            </Form.Item>
          </Form>
    }
}
export default Form.create({ name: 'register' })(Register)