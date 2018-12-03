import React, { PureComponent } from 'react';
import './item.less';

export default class Item extends PureComponent {
	render(){
		const {
			data:{
				cover,
				title,
				points,
				link,
			}
		} = this.props;
		return(
			<div className="points_item">
				<a href={link}>
					<div className="cover"><img src={cover} alt=""/></div>
					<div className="title">{title}</div>
					<div className="points"><span>{points}</span>积分</div>
				</a>
			</div>
		)
	}
}