import React, { PureComponent } from 'react';
import './smallItem.less';

export default class Index extends PureComponent {
	render() {
		const {data:{
			img,
			name,
			original_price,
			price,
			buyStatus,
			link,
		}} = this.props;
		return(
			<div className="course_small_item_box">
				<a href={link}>
					<div className="img_box">
						<img src={img} alt=""/>
						{buyStatus?<span>卖光啦</span>:null}
					</div>
					<div className="text_box">
						<div className="name">{name}</div>
						<div className="price">{price}元 | 原价{original_price}元</div>
					</div>
				</a>
			</div>
		)
	}
}