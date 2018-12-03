import React, { PureComponent } from 'react';
import './topicItem.less';
import Request from '../../service/baseAxios';

export default class TopicItem extends PureComponent {

	constructor(props){
		super(props);
		this.state = {
			dataChange: false
		};
	}

	// 订阅或取消订阅
	async handleSub(){
		const {data:{id}} = this.props;
		await Request('/app/information/subscribeInfo', {id});
		this.props.data.is_sub = !this.props.data.is_sub;
		this.setState({
			dataChange: !this.state.dataChange
		});
	}

	render() {
		const {data:{
			theme_img1,
			title,
			abstract_info,
			is_sub,
			link,
		}} = this.props;
		return(
			<div className="topic_item_box">
				{link ? <a className="block_link" href={link} />:null}
				<div className="img_box"><img src={theme_img1} alt=""/></div>
				<div className="topic_title">
					<h2>{title}</h2>
					{
						is_sub ? <span className="has_taken" onClick={ ()=>{this.handleSub()} }>已订阅</span> : <span onClick={ ()=>{this.handleSub()} } >订阅</span>
					}
				</div>
				<div className="topic_desc">{abstract_info}</div>
			</div>
		)
	}
}