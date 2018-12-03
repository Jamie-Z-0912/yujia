document.title = '订单';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import orderStore from '../../store/mall/order';
import Address from '../../components/mall/address';
import {List } from 'antd-mobile';
import './order.less';

const Item = List.Item;
@observer
class Order extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			popMode: '',
		}
	}

	render(){
		const{address, list} = orderStore;
		return(
			<div className="order-wrap">
				<Address address={address} />
				<div className="order-card product-card">
					<div className="product-hd">自营商品</div>
					<ul>
						{
							list.map(goods=>(
								<li key={goods.id} onClick={()=> window.location=goods.link}>
									<div className="goods_img"><img src={goods.img} alt=""/></div>
									<div className="goods_info">
										<div className="name">{goods.name}</div>
										<div className="choose"><span>规格:{goods.size}</span><span>颜色:{goods.color}</span></div>
										<div className="price"><i>￥</i>{goods.price}</div>
									</div>
									<div className="goods_num">x{goods.counter}</div>
								</li>
							))
						}
					</ul>
				</div>

				<div className="order-card">
					<List  className="attr-list">
						<Item>
							<div className="list_con">
								<span className="attr">配送方式</span>
								<span className="value">快递</span>
							</div>
						</Item>
						<Item
							arrow="horizontal"
							onClick={()=>{
								// this.setState({popMode: item.type});
							}}
						>
							<div className="list_con" onClick={()=>window.location='./invoice.html'}>
								<span className="attr">发票信息</span>
								<span className="value">不开发票</span>
							</div>
						</Item>
						<Item
							arrow="horizontal"
							onClick={()=>{
								// this.setState({popMode: item.type});
							}}
						>
							<div className="list_con">
								<span className="attr">使用积分</span>
								<span className="value">可用0积分，抵扣￥0.00元</span>
							</div>
						</Item>
						<Item
							arrow="horizontal"
							onClick={()=>{
								// this.setState({popMode: item.type});
							}}
						>
							<div className="list_con">
								<span className="attr">优惠券</span>
								<span className="value">满500减100</span>
							</div>
						</Item>
					</List>
				</div>
				<div className="order-card">
					<List  className="attr-list">
						<Item>
							<div className="list_con">
								<span className="attr">配送费用</span>
								<span className="redValue"><i>￥</i>15.00</span>
							</div>
						</Item>
						<Item>
							<div className="list_con">
								<span className="attr">优惠金额</span>
								<span className="redValue"><i>￥</i>0.00</span>
							</div>
						</Item>
						<Item>
							<div className="list_con">
								<span className="attr">总计</span>
								<span className="redValue"><i>￥</i>3209.00</span>
							</div>
						</Item>
					</List>
				</div>
				{/* --- 结算 --- */}
				<div className="page-bottom">
					<ul>
						<li><i>￥</i>3209.00</li>
						<li>支付</li>
					</ul>
				</div>
				<div style={{height:48}} />
			</div>
		)
	}
}

render(<Order />,document.getElementById('root'));
