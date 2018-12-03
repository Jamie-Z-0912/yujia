import React, { PureComponent } from 'react';
import timestampToDate from 'timestamp-to-date';
import {XQN_BASE} from "../../libs/utils";
import './Item.less';

export default class Item extends PureComponent {
	render() {
		const {data:{
			id,
			theme_img1,
			title,
			is_charge,
			name,
			create_time,
			reading
		}} = this.props;

		return(
			<div className="news_item_box">
				<a href={`/${XQN_BASE.baseFile}/news/detail.html?origin=news&detail=${id}`}>
					<div className="img_box"><img src={theme_img1} alt=""/></div>
					<div className="text_box">
						<div className="tit">{title}</div>
						<div className={['other',is_charge?'vip':''].join(' ')}>
							<span>{name}</span>
							<span>{timestampToDate(create_time,'yyyy/MM/dd')}</span>
							<span className='view'>{reading}</span>
						</div>
					</div>
				</a>
			</div>
		)
	}
}