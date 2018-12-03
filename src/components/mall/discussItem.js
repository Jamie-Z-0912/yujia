import React, { PureComponent } from 'react';
import moment from 'moment';
import './discussItem.less';

export default class Item extends PureComponent{

	render(){
		const {data:{
			avatar,
			nick,
			time,
			content,
			product,
		}} = this.props;
		return(
			<div className="discuss_item">
				<div className="discuss_hd">
					<div className="photo"><img src={avatar} alt=""/></div>
					<div className="info">
						<div className="name">{nick}</div>
						<div className="other">{moment(time).format('YYYY-MM-DD')} {product.color} {product.size}</div>
					</div>
				</div>
				<div className="discuss_con"> {content} </div>
			</div>
		)
	}
}