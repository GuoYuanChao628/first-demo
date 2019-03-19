import React from 'react'
import css from './account.less'
// 引入antd组件
import { Tabs, Form, Icon, Input, Button, message } from 'antd'
import Register from '../../components/register/register.js'
const TabPane = Tabs.TabPane
import fetchHelper from './../../utils/fetch'
import {withRouter} from 'next/router'
import { setUser } from './../../utils/storage';
import Head from 'next/head'
class Login extends React.Component {
  constructor(props) {
      super(props)
      this.state = {}
  }
  // 组件挂载之前获取登录界面的背景图片
  componentWillMount(){

  }
  // 登录操作
  
  login = (e) => {
    e.preventDefault();
    // let _this = this
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 账号登录业务
        // console.log('Received values of form: ', values);
        fetchHelper.post('/nc/common/account/login', values).then(res => {
          console.log(res)
          if (res.status === 0) {
            // 登录成功
            // 记录登录状态
            setUser(res.message.user)
            message.success('登录成功', 1)
            window.location.href = '/'
            // console.log(_this);
            // _this.props.router.back()
          } else {
            message.error(res.message)
          }
        })
      }
    })
  }  
  render () {
    const { getFieldDecorator } = this.props.form
      return <div className={css.login}>
          {/* 登录和注册界面 */}
          <div className={css.account}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="账户登录" key="1">
                  {/* 登录 */}
                  <Form onSubmit={this.login} className="login-form">
                    <Form.Item>
                      {getFieldDecorator('user_name', {
                          rules: [{ required: true, message: '账号不能为空!' },{ pattern: /^[1][3,4,5,7,8][0-9]{9}/, message: '请输入正确的手机号!' }],
                      })(
                          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名/邮箱/手机号" />
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
                      <Button type="primary" htmlType="submit" className="login-form-button">
                          登录
                      </Button>
                    </Form.Item>
                  </Form>
              </TabPane>
              <TabPane tab="账户注册" key="2">
                <Register></Register>
              </TabPane>
            </Tabs>
          </div>
          <style>
            {
            `
            .ant-tabs-bar {
              border-bottom: 1px solid #ccc;
            }
            .ant-tabs-nav {
              margin-left: 30px;
            }
            .ant-tabs-nav .ant-tabs-tab-active {
              color: #fe5e73;
            }
            .ant-tabs-nav .ant-tabs-tab:hover {
              color: #fe5e73;
            }
            .ant-tabs-nav .ant-tabs-tab {
              font-weight: 700;
              padding: 12px 30px;
            }
            .ant-tabs-ink-bar {
              color: #fe5e73;
            }
            .ant-tabs-ink-bar {
              background: #fe5e73;
            }
            .ant-tabs-content-animated {
              padding: 0 30px;
            }
            .ant-tabs-tabpane:first-child {
              margin-right: 60px;
            }
            .ant-input {
              height: 40px;
              border: 1px solid #ccc;
            }
            .ant-input:hover {
              border-color: #ccc;
            }
            .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {
              border-color: #ccc;
              border-right-width: none;
            }
            .ant-btn {
              width: 100%;
              height: 40px;
              padding: 0;
            }
            .ant-btn:hover,.ant-btn-primary,.ant-btn-primary:active, .ant-btn-primary:hover, .ant-btn-primary:focus {
              background-color: #fe5e73;
              border-color: #fe5e73;
            }
            `
            }
          </style>
      </div>
  }
}
export default withRouter(Form.create({ name: 'login' })(Login))