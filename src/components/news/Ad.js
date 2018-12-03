import React, { PureComponent } from 'react';
import moment from 'moment';
import './ad.less';


export default class Item extends PureComponent {
	render() {
		const {data:{
			img_url,
			name,
			start_time,
			reading,
		}} = this.props;
		return(
			<div className="news_ad_box">
				<div className="tit">{name}</div>
				<div className="img_box"><img src={img_url} alt=""/></div>
				<div className="other">
					<span className="ad_tag">广告</span>
					<span>{moment(start_time).format('YYYY/MM/DD')}</span>
					<span className='view'>{reading}</span>
				</div>
			</div>
		)
	}
}