import React, { PureComponent } from 'react';
import _ from 'lodash';
import { render } from 'react-dom';
import { XQN_BASE, channelId} from "../../libs/utils";
import './index.less';
import {wxShare} from "../../libs/wxShare";

export default class TabBar extends PureComponent {
	pageDir(type){
		switch (type){
			case 1:
				return `/${XQN_BASE.baseFile}/news/index.html`;
			case 2:
				return `/${XQN_BASE.baseFile}/community/index.html`;
			case 3:
				return `/${XQN_BASE.baseFile}/map/index.html`;
			case 4:
				return `/${XQN_BASE.baseFile}/course/index.html`;
			case 5:
				return `/${XQN_BASE.baseFile}/mine/index.html`;
		}
	};
	
	getCurPage(){
		const curHref = window.location.href;
		if(/\/news\//.test(curHref)){ return 1; }
		if(/\/community\//.test(curHref)){ return 2; }
		if(/\/map\//.test(curHref)){ return 3; }
		if(/\/course\//.test(curHref)){ return 4; }
		if(/\/mine\//.test(curHref)){ return 5; }
	}
	
	render() {
		const curChannel = this.getCurPage();
		const tabBarList = window.localStorage.getItem('ChannelArr') ? JSON.parse(window.localStorage.getItem('ChannelArr')):[];

		if(tabBarList.length){
			const temp = _.filter(tabBarList,o=>o.id===channelId);
			if(temp.length){
				const stringSymbol = window.location.href.indexOf('?')<0?'?':'&';
				wxShare({
					img: temp[0].channel_img_url,
					title: temp[0].share_title,
					desc: temp[0].share_desc,
					url: `${window.location.href}${stringSymbol}unit_id=${XQN_BASE.unit_id}`,
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
											className={ curChannel === item.channel_type ? 'active':''}
										>
											<i className="bar_icon" style={{backgroundImage: 'url(' + ( curChannel === item.channel_type ? item.channel_img_url : item.uncheck_channel_img_url) + ')'}} />
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