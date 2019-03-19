import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Button, Carousel, Icon } from 'antd'
import {connect} from 'react-redux'
// import testReducer from './../reducer/testReducer';
import fetchHeleper from '../utils/fetch'
import css from './index.less'

class Index extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      sliders: [],
      goods: []
    }
  }
  // 把数据请求放在组件的props中，服务器端渲染
  // static async getInitialProps(){
  //   let res = await fetchHeleper.get(url)
  //   return {
  //     courseDetial: res.message.CourseDetial
  //   }
  // }
  // 用声明周期函数获取数据
  componentWillMount(){
    // 本地数据模拟服务端请求
    const data = require('../static/staticData/slider.json')
    setTimeout(() => {
      this.setState({
        sliders: data.sliderlist
      })
    }, 500)
    // 获取数据库首页商品展示，这里用本地数据进行模拟
    const goodsData = require('../static/staticData/goods.json')
    setTimeout(() => {
      this.setState({
        goods: goodsData.categoris
      })
    }, 500)
  }
  render(){
    return <div>
    {/* <Head title="Home"/> */}
    <Head>
      <title>测试购物网站首页</title>
    </Head>
    {/* 轮播图区域 */}
    <Carousel effect="fade" autoplay="true" className={css.slider}>
      {this.state.sliders.map((item, index) => (
        <div key={item.id}><img className={css.slider_img} src={item.img_url} /></div>
      ))}
    </Carousel>
    {/* 商品列表区域 */}
    <div className={css.container}>
      { this.state.goods.map( (item, index) => (
      <div key={item.category_id}>
        <div className={css.goods_cat}>
          <span>{item.title}</span>
          { item.subclass.map((item1, id) =>(
            <a key={item1.subclass_id}>{item1.title}</a>
          )) }
        </div>
        <div className={css.goods}>
          <ul className="clearfix">
            { item.goods.map((item2, id) => (
              <li key={item2.good_id}>
                <Link href={'/goods/detail?good_id=' + item2.good_id}>
                  <a href="javascript:;">
                    <img src={item2.img_url} />
                    <p className={css.title}>{ item2.title }</p>
                    <div className={css.info}>
                      <span className={css.sell_price}>￥{item2.sell_price}</span>
                      <span className={css.old_price}>￥{item2.old_price}</span>
                      <span className={css.likes}><Icon className={css.icon_like} type="heart" />{ item2.like }</span>
                    </div>
                  </a>
                </Link>
              </li>
            )) } 
          </ul>
        </div>
      </div>
      ))}
      
    </div>
    <style jsx>{`
      
    `}</style>
  </div>
  }
}
// 高阶函数 用来获取_app.js组件对象中的store,第一个参数是属性，
// 第二个参数是action方法，这个页面只是用属性，第二个参数可不传
export default Index
