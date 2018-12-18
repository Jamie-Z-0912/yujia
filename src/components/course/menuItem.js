import React, { PureComponent } from 'react';
import moment from 'moment';
import './menuItem.less';

export default class Item extends PureComponent {
	render() {
		const {
			detailId,
			data:{
				id,
				theme_img1,
				link,
				class_name,
				vip,
				// name,
				create_time,
				read_num,
			}
		} = this.props;
		return(
			<div
				className="course_menu_item"
				onClick={()=> window.location=`./classroom.html?detail=${detailId}&room=${id}`}
			>
				<div className="img_box"><img src={theme_img1||'http://static.etouch.cn/imgs/upload/1544105125.1216.png'} alt=""/></div>
				<div className="text_box">
					<div className="tit">{class_name}</div>
					<div className={['other','vip'].join(' ')}>
						<span>{class_name}</span>
						<span>{moment(create_time).format('MM-DD')}</span>
						<span className='view'>{read_num}</span>
					</div>
				</div>
			</div>
		)
	}
}