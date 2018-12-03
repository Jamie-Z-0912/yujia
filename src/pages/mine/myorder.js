import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
// import { Tabs } from 'antd-mobile';
import myOrderStore from "../../store/mine/myOrder";
import Item from '../../components/myOrder/item';
import './myorder.less';

document.title = '我的订单';

const statusArr=['待付款','买家已付款','卖家已发货','交易成功'];
@observer
class MyOrder extends PureComponent{
	render(){
		const {orders} = myOrderStore;
		return(
			<div className="myOrder-wrap">
				<div className="myOrder-nav">
					<ul>
						<li className="active">全部</li>
						<li>待付款</li>
						<li>待发货</li>
						<li>待评价</li>
						<li>退款/售后</li>
					</ul>
				</div>
				<div className="myOrder-bd">
					{
						orders.map(item=>{
							const {list} = item;
							return(
								<div className="order-box">
									<div className="order-hd">
										<div className="name">{item.shop_name}</div>
										<div className="status">{statusArr[item.status]}</div>
									</div>
									<div className="order-list">
										{
											list.map(i => <Item key={i.id} data={i} /> )
										}
									</div>
									<div className="order-bd">
										<div className="total">
											<span>共计{item.counter}件商品</span>
											<span>合计：￥{item.total}(含运费￥{item.freight})</span>
										</div>
										{
											item.status===0 ? (
												<div className="options">
													<a className="btn_normal">取消订单</a>
													<a className="btn_normal btn_red">付款</a>
												</div>
											):null
										}
										{
											item.status===1 ? (
												<div className="options">
													<a className="btn_normal">退款</a>
													<a className="btn_normal">查看物流</a>
												</div>
											):null
										}
										{
											item.status===2 ? (
												<div className="options">
													<a className="btn_normal">退换</a>
													<a className="btn_normal">查看物流</a>
													<a className="btn_normal btn_red">确认收货</a>
												</div>
											):null
										}
										{
											item.status===3 ? (
												<div className="options">
													<a className="btn_normal">删除订单</a>
													<a className="btn_normal btn_red">评价</a>
												</div>
											):null
										}
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
}
render(<MyOrder />,document.getElementById('root'));

