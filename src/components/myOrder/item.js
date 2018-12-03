import React, { PureComponent } from 'react';
import './item.less';

export default class Index extends PureComponent {

	render() {
		const {data:{
			img,
			name,
			price,
			size,
			color,
			counter,
			link,
		}} = this.props;
		return(
			<div className="goods_item_box" onClick={()=>window.location=link}>
				<div className="goods_img"><img src={img} alt=""/></div>
				<div className="goods_info">
					<div className="name">{name}</div>
					<div className="choose"><span>规格:{size}</span><span>颜色:{color}</span></div>
					<div className="price"><i>￥</i>{price}</div>
				</div>
				<div className="goods_num">x{counter}</div>
			</div>
		)
	}
}