document.title = '购物车';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import cartStore from '../../store/mall/cart';
import {Stepper } from 'antd-mobile';
import Recommend from '../../components/mall/recommend';
import './cart.less';


@observer
class Cart extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
			hasLogin: false,
		}
	}

	changeCount(shopId, id, count){
		this.setState({ dataChange: !this.state.dataChange});

		cartStore.changeGoodsNum(shopId, id, count)
	}

	render(){
		const {
			recommend,
			shopping,
		} = cartStore;
		const {hasLogin} = this.state;
		return(
			<div className="cart-wrap">
				{
					hasLogin ?
						<div className="cart-hd">
							{
								shopping.map(item=>(
									<dl className="shop-box" key={item.shop_id}>
										<dt>
											<i className="checkbox" onClick={()=> cartStore.selectShop(item.shop_id)} />
											<div className="img_box"><img src={item.shop_icon} alt=""/></div>
											<div className="name">{item.shop_name}</div>
											<div className="freight">运费：￥{item.freight}</div>
										</dt>
										{
											item.list.map(goods=>(
												<dd key={goods.id} className={goods.selected?'selected':''}>
													<i className="checkbox" onClick={()=> cartStore.selectGoods(item.shop_id, goods.id)} />
													<div className="delete" onClick={()=> cartStore.deleteGoods(item.shop_id, goods.id)} />
													<div className="goods_img"><img src={goods.img} alt=""/></div>
													<div className="goods_info">
														<div className="name">{goods.name}</div>
														<div className="choose"><span>规格:{goods.size}</span><span>颜色:{goods.color}</span></div>
														{goods.activity?<div className="activity">{goods.activity}</div>:null}
														<div className="price"><i>￥</i>{goods.price}</div>
													</div>
													<div className="goods_num">
														<Stepper
															style={{ width: '100%', minWidth: '100px' }}
															className="stepper"
															showNumber
															max={100}
															min={1}
															value={goods.counter}
															onChange={(v)=>this.changeCount(item.shop_id, goods.id, v)}
														/>
													</div>
												</dd>
											))
										}
									</dl>
								))
							}
						</div>
						:
						<div className="noLogin-hd">
							<div className="info">
								<p>购物车中什么都没有<br />登录后同步购物车中得商品</p>
								<div className="btn_normal" onClick={()=>this.setState({hasLogin:true})}>立即登录</div>
							</div>
						</div>
				}
				{/* --- 商品推荐 --- */}
				<div className="cart-card">
					<div className="cart-card-hd">
						<span>猜你喜欢</span>
					</div>
					<div className="recommend-content">
						<Recommend list={recommend} />
					</div>
				</div>
				{/* --- 底部结算 --- */}
				<div className="page-bottom">
					<ul>
						<li className="check_box" onClick={()=>cartStore.selectedAll()}>全选</li>
						<li className="total">
							<div className="total_money">总计:<i>￥</i><span>1200.00</span></div>
							<div className="total_other">
								<span>总额:￥1900.00</span>
								<span>立减:￥700.00</span>
							</div>
						</li>
						<li className="total_num" onClick={()=> window.location='./order.html'}>结算(2)</li>
					</ul>
				</div>
			</div>
		)
	}
}

render(<Cart />,document.getElementById('root'));