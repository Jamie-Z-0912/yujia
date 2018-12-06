import React, { PureComponent } from 'react';
import './item.less';

export default class Index extends PureComponent {
	render() {
		const {data:{
			img,
			name,
			desc,
			original_price,
			price,
			order,
			link,
		}} = this.props;
		return(
			<div className="course_item_box">
				<a href={link}>
					<div className="img_box"><img src={img} alt=""/></div>
					<div className="text_box">
						<div className="text-left">
							<div className="text-name">{name}</div>
							<div className="text-order">{order}人订阅</div>
						</div>
						<div className="text-right">
							<div className="price"><span>￥{price}</span></div>
							<div className="ori-price">原价￥{original_price}</div>
						</div>
						<div className="text-desc">{desc}</div>
					</div>
				</a>
			</div>
		)
	}
}