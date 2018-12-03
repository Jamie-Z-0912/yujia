import React, { PureComponent } from 'react';
import moment from 'moment';
import './Item.less';

export default class Item extends PureComponent {
	render() {
		const {data:{
			surface_plot,
			head_url,
			title,
			actor,
			live_start_time,
			live_end_time,
			ctime,
			source_url,
			reading,
			create_time,
			id,
		}} = this.props;
		const statusOpt = (sTime, eTime, ctime, sourceUrl) => {
			if (ctime < sTime){
				return <div className="icon_stop">未开始</div>;
			}
			if (ctime > sTime && ctime < eTime){
				return <div className="icon_living">直播中</div>;
			}
			if (!sourceUrl) {
				return <div className="icon_stop">已结束</div>;
			}else{
				return <div className="icon_replay">可回看</div>;
			}
		};
		return(
			<div className="living_item_box">
				<a href={`./detail.html?origin=live&detail=${id}`} className="img_box">
					<img src={surface_plot} alt=""/>
					<div className="other">
						<span>{reading}人参与</span>
						<span className="status">
							{statusOpt(live_start_time, live_end_time, ctime, source_url)}
						</span>
					</div>
				</a>
				<div className="item-bd">
					<div className="photo"><img src={head_url} alt=""/></div>
					<div className="item_con">
						<div className="item_con_title">{title}</div>
						<div className="item_con_info">
							<span>主讲人：{actor}</span>
							<span>{moment(create_time).format('YYYY/MM/DD')}</span>
							<span>{moment(create_time).format('HH:mm')}</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}