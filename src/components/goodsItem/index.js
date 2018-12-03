import React, { PureComponent } from 'react';
import './index.less';

export default class Index extends PureComponent {

	render() {
		const {data:{
			img,
			name,
			price,
			link,
		}} = this.props;
		return(
			<div className="goods_item_box">
				<a href={link}>
					<div className="img_box"><img src={img} alt=""/></div>
					<div className="text_box">
						<div className="name">{name}</div>
						<div className="price">￥{price}</div>
					</div>
				</a>
			</div>
		)
	}
}