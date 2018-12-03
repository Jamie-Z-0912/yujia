import React, { PureComponent } from 'react';
import _ from 'lodash';
import { render } from 'react-dom';
import { XQN_BASE, channelId} from "../../libs/utils";
import './index.less';
import {wxShare} from "../../libs/wxShare";

export default class TabBar extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			curChannel: channelId,
		}
	}

	pageDir(type){
		switch (type){
			case 1:
				return `/${XQN_BASE.baseFile}/news/index.html`;
			case 2:
				return `/${XQN_BASE.baseFile}/community/index.html`;
			case 3:
				return `/${XQN_BASE.baseFile}/living/index.html`;
			case 4:
				return `/${XQN_BASE.baseFile}/mall/index.html`;
			case 5:
				return `/${XQN_BASE.baseFile}/mine/index.html`;
		}
	};

	getCurChannel(){
		this.setState({
			curChannel: window.localStorage.getItem('XQN_channelId'),
		})
	}

	render() {
		const{curChannel} = this.state;
		if(!curChannel){
			this.getCurChannel();
			return null;
		}
		const tabBarList = window.localStorage.getItem('ChannelArr') ? JSON.parse(window.localStorage.getItem('ChannelArr')):[];

		if(tabBarList.length){
			const temp = _.filter(tabBarList,o=>o.id===channelId);
			if(temp.length){
				const stringSymbol = window.location.href.indexOf('?')<0?'?':'&';
				wxShare({
					img: temp[0].channel_img_url,
					title: temp[0].share_title,
					desc: temp[0].share_desc,
					url: `${window.location.href}${stringSymbol}unit_id=${XQN_BASE.unit_id}&appId=${XQN_BASE.appId}`,
				});
			}
		}
		return(
			<div>
				<div className="pageTabBar">
					<ul className="tab_body">
						{
							tabBarList.map(item => {
								return(
									<li key={item.id}>
										<a
											onClick={()=>{ window.localStorage.setItem('XQN_channelId',item.id)}}
											href={`${this.pageDir(item.channel_type)}`}
											className={ curChannel == item.id ? 'active':''}
										>
											<i className="bar_icon" style={{backgroundImage: 'url(' + ( curChannel == item.id ? item.channel_img_url : item.uncheck_channel_img_url) + ')'}} />
											<p className="tab_label">{item.channel_name}</p>
										</a>
									</li>
								)
							})
						}
					</ul>
				</div>
				<div style={{height:'.6rem'}} />
			</div>
		)
	}
}