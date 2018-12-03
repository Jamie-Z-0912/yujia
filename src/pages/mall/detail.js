document.title = '商城';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import detailStore from '../../store/mall/detail';
import {List, Icon, Modal} from 'antd-mobile';
import BannerNum from '../../components/BannerNum';
import Recommend from '../../components/mall/recommend';
import DiscussItem from '../../components/mall/discussItem';
import Voucher from '../../components/voucher';
import ChooseBuy from '../../components/mall/chooseBuy';
import BuyOption from '../../components/mall/buyOption';
import './detail.less';

const Item = List.Item;
@observer
class Detail extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			popMode: '',
		}
	}

	render(){
		const {
			product,
			recommend,
			discussion,
			voucher,
			service,
			hasChoose:{color, size, count}
		} = detailStore;
		const {popMode} = this.state;
		return(
			<div className="detail-wrap">
				{/* --- 商品的图片和价格 --- */}
				<div className="detail-hd">
					<BannerNum data={product.images} />
					<div className="title">{product.title}</div>
					<div className="price">
						<span className="cur"><i>￥</i>{product.price}</span>
						<span className="delete">￥{product.original_price}</span>
					</div>
				</div>

				{/* --- 商品的属性和服务 --- */}
				<div className="detail-card">
					<List  className="attr-list">
						{
							product.attr.map(item =>
								<Item
									arrow="horizontal"
									key={item.type}
									onClick={()=>{
										this.setState({popMode: item.type});
									}}
								>
									<div className="list_con">
										<span className="attr">{item.text}</span>
										<span className="value">{
											item.type==='choose' ?
												(
													color && size && count ?
														`${color} ${size} ${count+product.unit}` :
														`请选择 ${color||'颜色'} ${size||'规格'} ${color||size ? count+product.unit:'数量'}`
												)
												: item.content
										}</span>
									</div>
								</Item>
							)
						}
					</List>
				</div>

				{/* --- 用户评论 --- */}
				<div className="detail-card">
					<div className="detail-card-hd">
						<span>用户评论</span>
						<a href="./discussion.html"> 查看全部<Icon type="right" size="small" />	</a>
					</div>
					<div className="discussion_content">
						<DiscussItem key={discussion[0].id} data={discussion[0]} />
						{/*
							discussion.map(item=><DiscussItem key={item.id} data={item} />)
						*/}
					</div>
				</div>

				{/* --- 商品详情 --- */}
				<div className="detail-card">
					<div className="detail-card-hd">
						<span>商品详情</span>
					</div>
					<div className="detail-content">
						内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片
					</div>
				</div>

				{/* --- 商品推荐 --- */}
				<div className="detail-card">
					<div className="detail-card-hd">
						<span>为你推荐</span>
					</div>
					<div className="recommend-content">
						<Recommend list={recommend} />
					</div>
				</div>
				{/* --- 底部操作 ---*/}
				<div className="bottomOption">
					<ul>
						<li className="icon_item" onClick={detailStore.addCollect.bind(detailStore)}>
							<i className="iconImg" />
							<span>收藏</span>
						</li>
						<li className="icon_item cart" onClick={()=> window.location='./cart.html'}>
							<i className="iconImg" />
							<span>购物车</span>
						</li>
						<li>
							<BuyOption />
						</li>
					</ul>
				</div>

				{/* --- 弹出层 --- */}
				<Modal
					className="myPop"
					// wrapClassName='popWrap'
					popup
					visible={popMode}
					onClose={()=>{this.setState({popMode:''})}}
					animationType="slide-up"
				>
					<div className="close_modal" onClick={()=>{this.setState({popMode:''})}}><Icon type="cross" /></div>
					{
						popMode === 'voucher' ? (
							<div>
								<div className="pop_title">优惠券</div>
								<div className="pop_bd">
									{
										voucher.map(item => <Voucher key={item.id} type="voucher" data={item} />)
									}
								</div>
							</div>
						):null
					}
					{
						popMode === 'service' ? (
							<div>
								<div className="pop_title">基础服务</div>
								<div className="pop_bd">
									{
										service.map(item=>(
											<div className="service_item" key={item.id}>
												<div className="icon"><Icon type="check-circle-o" color="#f00" /></div>
												<div className="service_info">
													<div className="txt1">{item.title}</div>
													<div className="txt2">{item.desc}</div>
												</div>
											</div>
										))
									}
								</div>
							</div>
						):null
					}
					{
						popMode === 'choose' ? <ChooseBuy /> :null
					}

				</Modal>
			</div>
		)
	}
}

render(<Detail />,document.getElementById('root'));