import React, { PureComponent } from 'react';
import './detailHd.less';

export default class Index extends PureComponent {
	constructor(props){
		super(props);
		this.state={certified:false}
	}

	render(){
		const {type} = this.props;
		const {certified} = this.state;
		return (
			<div className="map-detail-hd">
				<div className="img_box"><img src="http://static.etouch.cn/imgs/upload/1544105125.1216.png" alt=""/></div>
				<div
					className={["certified",certified?'red':'blue'].join(' ')}
					onClick={()=>
						this.setState({certified:true})
					}
				>{certified?'已认证':'我要认证'}</div>
				{
					type === 'venue'?
						<div className="text_box">
							<div className="name">NAGA 那迦瑜伽</div>
							<address>珠江路203号 国际大厦 2F 2011室</address>
							<div className="others">
								<span>粉丝数:10000</span>
								<span>浏览数:100000</span>
							</div>
							<div className="share-tips">分享特权，分享越多，关注排名越靠前</div>
							<div className="optZan liked" />
						</div>
						:
						<div className="text_box">
							<div className="name">JOHN</div>
							<div className="teacher-level">南京一级大师</div>
							<div>用一句话介绍自己，我们的公司专注于做什么样的，或者我可以为群友们提供什么样的独特的资源</div>
							<div className="others">
								<span>粉丝数:10000</span>
								<span>浏览数:100000</span>
							</div>
							<div className="optZan" />
						</div>
				}
			</div>
		)
	}
}