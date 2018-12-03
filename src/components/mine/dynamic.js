import React, { PureComponent } from 'react';
import moment from 'moment';
import './dynamic.less';

export default class Item extends PureComponent {
	render() {
		const {data:{
			content,
			user_name,
			create_time,
			cover,
			link,
		}} = this.props;
		return(
			<div className="item_box">
				<div className="item_hd">
					<div className="item_hd_con">
						<div className="item_hd_author">{user_name}</div>
						<div className="item_hd_time">
							<span>{moment(create_time).format('YYYY/MM/DD')}</span>
							<span>{moment(create_time).format('HH:mm')}</span>
						</div>
					</div>
				</div>
				<div className="item_text">{content}</div>
				<div className="img_box"><a href={link}><img src={cover} alt=""/></a></div>
			</div>
		)
	}
}