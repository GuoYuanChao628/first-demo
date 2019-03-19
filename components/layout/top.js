// import React from 'react'
import css from './layout.less'
import { Icon, Badge } from 'antd'
import {connect} from 'react-redux'
import { getUser, removeUser } from '../../utils/storage';
import fetchHelper from '../../utils/fetch';
import Link from 'next/link'
// 获取本地仓储数据
const mapStateToProps = (state) =>{
    return {
        ...state
    }
  }
class Top extends React.Component{
    logout = () => {
        // 退出登录
        fetchHelper.get('/nc/common/account/logout').then(res => {
            if (res.status === 0) {
                // 清楚sessionStorange
                removeUser()
                window.location.href = '/account/login'
            }
        })
    }
    render(){
        const user = getUser()
        return <header className="w">
            <div className={css.top}>
                <ul>
                    <li>
                        <Icon type='home' theme= "outlined" style={{fontSize: 12, color: "#ff4466" }} />
                        <Link href={{pathname: '/'}}><a href="javascript:;">首页</a></Link>
                    </li>
                    <li>
                        <Icon type="shop" theme= "outlined" style={{fontSize: 12, color: "#ff4466" }} />
                        <a href="javascript:;">商城</a>
                    </li>
                    <li><span></span><a href="javascript:;">我的订单</a></li>
                    <li><span></span><a href="javascript:;">关于我们</a></li>
                </ul>
            </div>
            <div className={css.nav}>
                <div className='fl'>
                    <Link href={{pathname: '/'}}>
                        <img className={css.logo} src="/static/img/logo.png" alt="" />
                    </Link>
                    <a className={css.tabs} href="javascript:;"><Icon type="bars" style={{fontSize: 14, color: "#333"}} />目录</a>
                </div>
                {/* 搜索 */}
                <div className={css.input + ' fl'}>
                    <input className={css.search} type="text" placeholder="输入您要购买的商品" />
                    <button className={css.searchBtn}><Icon type='search' style={{fontSize: 22, color: "#fff" }} /></button>
                </div>
                {/* 用户中心 */}
                <div className={css.user_center + ' fl'}>
                    <ul className='clearfix'>
                        <li>
                            <a href="javascript:;"><Icon type="message" style={{fontSize: 24, color: "#333"}} /></a>
                            <span className={css.m5}>消息</span>
                        </li>
                        <li>
                            <a href="javascript:;"><Icon type="heart" style={{fontSize: 24, color: "#333"}} /></a>
                            <span className={css.m5}>收藏</span>
                        </li>
                        <li>
                            <Link href={{pathname: '/shopcart/shopcart'}}>
                                <a href="javascript:;">
                                    <Badge overflowCount={9} count= {this.props.getShopcartCount.count}>
                                        <Icon type="shopping-cart" style={{fontSize: 24, color: "#333"}} />
                                    </Badge>
                                </a>
                            </Link>
                           
                            <span className={css.m5}>购物车</span>
                        </li>
                        <li>
                            <a href="javascript:;"><Icon type="appstore" style={{fontSize: 24, color: "#333"}} /></a>
                            <span className={css.m5}>下载APP</span>
                        </li>
                    </ul>
                </div>
                {/* 用户登录中心 */}
                <div className={css.login + ' fr'}>
                    {
                        !user.uid ? 
                        <Link href={{pathname: '/account/login'}}>
                            <a href='javascript:;'><img src='/static/img/login_logo.png' />登录</a>
                        </Link>
                        :
                        <span>
                            <a href='javascript:;'><img className={css.u_img} src='/static/img/user_img.png' /></a>
                            <a className={css.uname} href='javascript:;'>{user.nick_name}</a>
                            <a onClick={this.logout} className={css.logout} href='javascript:;'>退出</a>
                        </span>
                    }  
                </div>
            </div>
        </header>
    }
}
// 高阶函数 用来获取_app.js组件对象中的store,第一个参数是属性，
// 第二个参数是action方法，这个页面只是用属性，第二个参数可不传
export default connect(mapStateToProps,null)(Top)