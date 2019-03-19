import React from 'react'
import { Table, Button, message } from 'antd'
import css from './shopcart.less'
import { getUser } from '../../utils/storage.js'
import Link from 'next/link'
import Head from 'next/head'
export default class Shopcart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            totalPrice: 0,
            num: 0,
            isDisabled: true,
            columns: [
            {
                title: '商品信息',
                dataIndex: 'goods_url',
                colSpan: 4,
                width: 140,
                render: (value, row, index) => {
                    const obj = {
                      children: value,
                      props: {},
                    };
                    if (index === 0) {
                      obj.props.rowSpan = 4;
                    }
                    // These two are merged into above cell
                    if (index === 1) {
                        obj.props.rowSpan = 0;
                      }
                    if (index === 2) {
                    obj.props.rowSpan = 0;
                    }
                    if (index === 3) {
                      obj.props.rowSpan = 0;
                    }
                    return <div><img src={value}/>
                        {/* <img src={value.split('_')}> */}
                    </div>
                    },
            },
            {
                title: '商品标题',
                colSpan: 0,
                dataIndex: 'goods_title',
                render: text => <a href="javascript:;">{text}</a>
            },
            {
                title: '商品颜色',
                colSpan: 0,
                dataIndex: 'goods_color',
                width: 80,
                render: text => <a href="javascript:;">{text}</a>
            },
            {
                title: '商品尺码',
                colSpan: 0,
                dataIndex: 'goods_size',
                width: 80,
                render: text => <a href="javascript:;">{text}</a>
            }, 
            {
                title: '单价',
                dataIndex: 'price',
                width: 80,
                render: text => <span style={{color: "#ff5777"}}>{text}</span>
            }, 
            {
                title: '数量',
                dataIndex: 'count',
                width: 80,
                render: (text) => <span style={{color: "#ff5777"}}>{text}</span>
            }, 
            {
                title: '小计',
                dataIndex: 'subtotal',
                width: 80,
                render: (text, row) => <span style={{color: "#ff5777"}}>{(row.count*row.price).toFixed(2)}</span>
            }, 
            {
                title: '操作',
                dataIndex: 'shops_id',
                width: 80,
                render: (text,row, index) => <a onClick={this.delGoods.bind(this, index)} href="javascript:;" style={{cursor: "pointer"}} >删除</a>
            }],
            data: []
        }
    }
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            if(selectedRows && selectedRows.length > 0) {
                let totalPrice = 0
                selectedRows.map(item => {
                totalPrice += item.price * item.count
                })
                this.setState({
                    num: selectedRows.length,
                    totalPrice: totalPrice.toFixed(2),
                    isDisabled: false
                })
            } else {
                this.setState({
                    num: 0,
                    totalPrice: 0,
                    isDisabled: true
                })
            }
            
        }
    }
    componentWillMount(){
        // 页面所需的数据由后台前请求回来的，这里用了本地数据模拟
        let data = require('../../static/staticData/cartlist.json')
        setTimeout(()=>{
            this.setState({
                data: data.shopcartlist
            })
        },500)
    }
    // 删除购物车的商品
    delGoods(index){
        message.warn('没开通， 索引' + index)
    }
    render(){
        const user = getUser()
        return <div className={css.shopcart}>
                <Head>
                <title>购物车</title>
                </Head>
            { user.uid ? 
            <div>
                <h1>全部商品</h1>
                <Table bordered pagination= {false} rowSelection={this.rowSelection} columns={this.state.columns} dataSource={this.state.data} />
                <div className={css.pay + " clearfix"}>
                    <Button className={css.pay_btn + " fr"} type="primary">去付款 ></Button>
                    <i className={css.pay_total + " fr"}>￥{this.state.totalPrice}</i>
                    <p className="fr">共有<i className={css.pay_count}>{this.state.num}</i>件商品，总计：</p>
                </div>
            </div>
            :
            <div style={{fontSize: "14px", lineHeight:"50px", paddingLeft:"30px"}}>
                <p>亲，你还没有登录哦！<Link href={{pathname: '/account/login'}}><a style={{color: "red"}} href="javascript:;">点我去登陆</a></Link></p>
            </div> }
            
        </div>
    }
}