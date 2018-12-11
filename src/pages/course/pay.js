document.title = '订单购买';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import payStore from "../../store/course/pay";
import {Icon} from 'antd-mobile';
import './pay.less';
import cardBg from '../../static/img/cardBg.png';

@observer
class Index extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataChange: false,
		};
	}
	
	render(){
		const {
			hasData,
			name,
			orderId,
			original_price,
			coupon,
			payPrice,
			couponList,
		} = payStore;
		return(
			hasData ? (
				<div className="course-pay-wrap">
					<div className="pay-card">
						<img src={cardBg} alt=""/>
						<div className="card-text">
							<div className="card-title">支付信息</div>
							<p>商品名称：{name}</p>
							<p>订单号：{orderId}</p>
						</div>
					</div>
					<div className="coupon">
						<select>
							{
								couponList.length? couponList.map(item=><option value={item.num}>{item.text}</option>):<option>暂无可使用的优惠券</option>
							}
						</select>
					</div>
					<div className="price-area">
						<div>原价总额：{original_price}元</div>
						<div>优惠金额：{coupon}元</div>
						<div>支付金额：{payPrice}元</div>
					</div>
					<div className="pay-rule">
						<h2>规则说明</h2>
						<ol>
							<li>订单确认后请15分钟内完成支付，否则将自动取消；</li>
							<li>订单支付后，将无法退款。</li>
							<li>最终解释权归主办方所有。</li>
						</ol>
					</div>
					<div className="option">
						<a>立即支付</a>
					</div>
				</div>
			):<div className="routerLoading"><Icon type="loading" size="lg" /></div>
		)
	}
}

render(<Index />,document.getElementById('root'));
