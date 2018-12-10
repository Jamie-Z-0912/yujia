import React, { PureComponent } from 'react';
import moment from 'moment';
import './menuItem.less';

export default class Item extends PureComponent {
	render() {
		const {data:{
			id,
			theme_img1,
			link,
			title,
			vip,
			name,
			create_time,
			reading
		}} = this.props;
		
		return(
			<div className="course_menu_item">
				<a href={link ||'#'}>
					<div className="img_box"><img src={theme_img1} alt=""/></div>
					<div className="text_box">
						<div className="tit">{title}</div>
						<div className={['other',vip?'vip':''].join(' ')}>
							<span>{name}</span>
							<span>{moment(create_time).format('MM-DD')}</span>
							<span className='view'>{reading}</span>
						</div>
					</div>
				</a>
			</div>
		)
	}
}