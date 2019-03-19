import Top from './top'
import Bottom from './bottom'
export default class layout extends React.Component {
    render(){
        // 接收_app.js传递过来的
        const {Component, ...pageProps} = this.props;
        return <div>
            <div className="_top"><Top></Top></div>
            <div className="_mid"><Component {...pageProps} /></div>
            <div className="_bottom"><Bottom></Bottom></div>
            <style>
                {
                    `
                    ._mid{
                        width: 1344px;
                        margin: 0 auto;
                    }
                    `
                }
            </style>
        </div>
    }
}