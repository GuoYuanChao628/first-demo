import React from 'react'
// next/router 里的withRouter高阶函数可以获取页面的query传参
import { withRouter } from 'next/router'
import css from './detail.less'
import fetchHelper from './../../utils/fetch';
import { getUser } from '../../utils/storage.js'
import { Modal, Button, message } from 'antd'
import { connect } from 'react-redux'
import Head from 'next/head'
const confirm = Modal.confirm
const mapStateToProps = (state) =>{
    return {
        ...state
    }
  }
const mapDispatchToProps = (dispatch)=>{
    return {
        onChangeShopcartCount: (count) => {
            dispatch({ type: 'CHANGE_SHOPCART_COUNT', count: count })
        }
    }
}
class Detail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            shops: null,
            num: 1,
            color: '',
            size: '',
            img: '',
            isDisabled: true,
            visible: false
        }
    }
    // 用组件的生命周期函数去获取商品信息 
    componentWillMount(){
        // 点击商品对应的id通过 this.props.router.query.[cid]获取
        // fetchHelper.post(url,{}).then(res => {})
        // 在这里用本地数据进行模拟
        let gid = this.props.router.query.good_id
        const data = require('../../static/staticData/shop.json')
        if ( gid && gid == 10 ) {
            setTimeout(()=>{
                this.setState({
                    shops: data.shops[0],
                })
            },500)
        } else {
            setTimeout(()=>{
                this.setState({
                    shops: data.shops[1]
                })
            },500)
        }   
    }
    // 用户选择颜色和尺码的业务逻辑
    changColor(color, img_url) {
        // 颜色选择逻辑
        // 把当前点击颜色通过changColor传到props中，再通过和当前标签的title颜色对比，
        // 对比结果一样就添加一个active类样式，或者不添加 尺码选择逻辑一样
        console.log(color)
        this.setState({
            color: color,
            img: img_url
        })
    }
    changSize(size) {
        console.log(size)
        this.setState({
            size: size,
        })
    }
    // 用户选择数量的业务逻辑
    num_sub = () => {
        // 默认数量为1 小于等于1不能继续点击，同时-按钮禁用
        let temp = Number(this.state.num)
        if (temp <= 1) {
            return
        }
        temp = temp -1
        this.setState({
            num: temp
        })
        if (temp <= 1 ) {
            this.setState({
                isDisabled: true
            })
            return
        } 
    }
    num_add = () => {
        let temp = Number(this.state.num)
        // 这里不限制最大的数量
        temp = temp + 1
        this.setState({
            num: temp
        }) 
        if (temp >= 2) {
            this.setState({
                isDisabled: false
            })
        }
    }
    // 解决react中单向数据流
    numChange = (e) => {
        // console.log(e.target.value)
        this.setState({
            num: e.target.value
        })
    }
    // 立即购买商品
    buy_now = () => {
        // 获取当前的登录状态 如果没有登录弹出来一个对话框，让用户去登录
        const user = getUser()
        var _this = this
        if (!user.uid) {
            confirm({
                title: '亲，你还没有登录哦！',
                content: '请点击登录按钮前往登录界面哦',
                onOk(){
                    // 
                    _this.props.router.push('/account/login')
                    console.log(_this);
                },
                onCancel(){

                },
                okText: '登录',
                cancelText: '取消'
            })
        } else {
            this.setState({
                visible: true
            })
        }
    }
    // 把商品添加到购物车
    postToShopcart = () => {
        // 把state中选中商品的信息传递到后台，获取反馈参数，同时TOP购物车徽章会根据购物车中的数量进行变化
        // 这里用死数据进行展示，主要表现在 react - redux的全局数据流的管理
        // 获取存储的数据
        // 这里面做一个测试，点击一次让数据+商品的数量 徽章是99封顶
        // console.log(this.props.getShopcartCount.count);
        const user = getUser()
        if(!user.uid){
            message.error('你还没有登录')
        } else {
            if (this.state.color && this.state.size && Number(this.state.num)  >= 1) {
                let num = this.props.getShopcartCount.count + Number(this.state.num)
                this.props.onChangeShopcartCount(num)
                message.success('商品已经成功添加到购物车')
                window.location.href = '/shopcart/shopcart'
            } else {
                message.warn('选择商品信息')
            }
        }
    }
    // 确认购物信息 antd对话框组件
    confirmHandle = () => {
        // 当用户确认了购买商品的时候直接跳转到结算页面
        this.setState({
            visible: false
        })
    }
    cancelHandle = () => {
        this.setState({
            visible: false
        })
    }
    render() {
        return <div>
            <Head>
                <title>商品详情页面</title>
            </Head>
            <div className={css.detail}>
                <div className={css.bg}>
                    <img style={{width: "100%", height: "100%"}} src={this.state.shops && this.state.shops.shop_bg}></img>
                </div>
                <div className={css.shopInfo}>
                    <ul className="clearfix">
                        <li><a>首页</a></li>
                        { this.state.shops && this.state.shops.shop_categories.map((item, index) => (
                            <li key={item.cat_id}><a href="javascript:;">{item.cat_title}</a></li>
                        )) }
                    </ul>
                </div>
            {/* 商品详情 */}
                <div className={css.s_detail + ' clearfix'}>
                <div className={css.s_img + ' fl'}>
                    <img src={this.state.shops && this.state.shops.good_info.big_img[0].big_img_url} />
                </div> 
                <div className={css.s_info + ' fl'}>
                        <p className={css.s_title}>{ this.state.shops && this.state.shops.good_info.good_title }</p>
                        <div className={css.s_info_top}>
                            <div className={css.s_timeout}>距离秒杀结束还剩：</div>
                            <p>价格： <span className={css.old_price}>￥{this.state.shops && this.state.shops.good_info.good_old_price}</span></p>
                            <p>促销价： <span className={css.sell_price}>￥{this.state.shops && this.state.shops.good_info.good_sell_price}</span><span className="fr" style={{marginLeft: 10}}>累计销量：<b>117</b></span><span className="fr">评价：<b>2</b></span></p>
                            <p>魔豆折扣：该商品可使用魔豆抵扣 3% 价格</p>
                        </div>
                        <ul className={css.s_choose}>
                            <li>
                                <span>客服：</span>
                                <a href="javascript:;"><img src="/static/img/16x17.gif"></img></a>
                            </li>
                            <li className={css.s_color_choose}>
                                <span>颜色：</span>
                                { this.state.shops && this.state.shops.good_info.good_color.map( (item, id) => (
                                    <a  onClick={this.changColor.bind(this,item.good_color_type, item.good_color_url)} 
                                        className={item.good_color_type == this.state.color ? "active b_active" : ""} 
                                        href="javascript:;" key={ item.good_color_id }>
                                        <img src={item.good_color_url} title={item.good_color_type}></img>
                                    </a>
                                ) ) } 
                            </li>
                            <li className={css.s_size_choose}>
                                <span>尺码：</span>
                                { this.state.shops && this.state.shops.good_info.good_size.map((item, id) => (
                                    <a  onClick={this.changSize.bind(this, item.good_size_info)} 
                                        className={this.state.size == item.good_size_info ? "active b_active" : ""} 
                                        href="javascript:;" key={item.good_size_id}>{item.good_size_info}
                                    </a>
                                )) }
                            </li>
                            <li className={css.s_num_choose}>
                                <span>数量：</span>
                                <a onClick={ this.num_sub } href="javascript:;"  className={this.state.isDisabled ? "s_num_re_active s_num_re" : "s_num_re"}>&nbsp;</a>
                                <input type="text" onChange={this.numChange} className={css.s_num_input} value={this.state.num}/>
                                <a onClick={ this.num_add } href="javascript:;" className={css.s_num_add}>&nbsp;</a>
                            </li>
                        </ul>
                        <div className={css.s_buy}>
                            <a onClick={this.buy_now} className={css.s_buy_now} href="javascript:;">立即购买</a>
                            <a onClick={this.postToShopcart} className={css.s_into_cart} href="javascript:;">加入购车</a>
                        </div>
                        <div onClick={() => this.props.onChangeShopcartCount(0)} className={css.clearCount}>徽章清0</div>
                </div>
                </div>
            {/* 对话框 */}
            {/* 点击立即购买弹出来一个确认对话框 */}
                <div>
                    <Modal
                        title="确认你要购买的商品"
                        visible={this.state.visible}
                        onOk= {this.confirmHandle}
                        onCancel= {this.cancelHandle}
                        okText="确认"
                        cancelText="取消"
                        >
                        {  this.state.color && this.state.size && Number(this.state.num)  >= 1 ? 
                            <div>
                                <p><img src={this.state.img} style={{width: 100, height: 100}} /></p>
                                <p>{this.state.shops && this.state.shops.good_info.good_title}</p>
                                <p><span style={{fontWeight: 700, fontSize:14,marginRight: 15}}>颜色：</span><span>{this.state.color}</span></p>
                                <p><span style={{fontWeight: 700, fontSize:14,marginRight: 15}}>尺码：</span><span>{this.state.size}</span></p>
                                <p><span style={{fontWeight: 700, fontSize:14,marginRight: 15}}>数量：</span><span>{Number(this.state.num)}</span></p>
                                <p style={{color: "red"}}>点解确定按钮跳转到支付页面[未写]</p>
                            </div>
                        : <p>请选择颜色、尺码、数量</p> 
                        }
                        
                    </Modal>
                </div>
            </div>
        </div>
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Detail))
