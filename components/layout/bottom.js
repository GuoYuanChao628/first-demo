import React from 'react'
import { Button, Row, Col } from 'antd'
import css from './layout.less'
export default class Bottom extends React.Component{
    render(){
        return <footer className={css.footer + ' w'}>
            {/* friendship链接 */}
            <div className={css.friendship}>
                <ul className='clearfix'>
                    <li><a href="javascript:;">关于我们</a><span>|</span></li>
                    <li><a href="javascript:;">招聘信息</a><span>|</span></li>
                    <li><a href="javascript:;">联系我们</a><span>|</span></li>
                    <li><a href="javascript:;">商家入住</a><span>|</span></li>
                    <li><a href="javascript:;">商家后台</a><span>|</span></li>
                    <li><a href="javascript:;">蘑菇商学院</a><span>|</span></li>
                    <li><a href="javascript:;">商家社区</a><span>|</span></li>
                    <li><a href="javascript:;">规则中心</a><span>|</span></li>
                    <li><a href="javascript:;">规则众议院</a><span>|</span></li>
                    <li><a href="javascript:;">有害信息举报</a><span>|</span></li>
                    <li><a href="javascript:;">用户隐私中心</a><span>|</span></li>
                    <li><a href="javascript:;">意见反馈</a></li>
                </ul>
            </div>
            <div className={css.copyright}>
                <span>©2019 供开发者讨论不涉及任何商业用途</span>
            </div>
        </footer>
    }
}