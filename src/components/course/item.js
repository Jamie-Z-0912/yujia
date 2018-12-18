import React, { PureComponent } from 'react';
import './item.less';

export default class Index extends PureComponent {
	render() {
		const {data:{
			id,
			img_url,
			name,
			introduce,
			original_price,
			current_price,
			buy_num,
		}} = this.props;
		return(
			<div className="course_item_box">
				<a href={`./detail.html?detail=${id}`}>
					<div className="img_box"><img src={img_url||'http://static.etouch.cn/imgs/upload/1544105125.1216.png'} alt=""/></div>
					<div className="text_box">
						<div className="text-left">
							<div className="text-name">{name}</div>
							<div className="text-order">{buy_num||0}人订阅</div>
						</div>
						<div className="text-right">
							<div className="price"><span>￥{current_price}</span></div>
							<div className="ori-price">原价￥{original_price}</div>
						</div>
						<div className="text-desc">{introduce}</div>
					</div>
				</a>
			</div>
		)
	}
}