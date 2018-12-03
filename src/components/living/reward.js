import React, { PureComponent } from 'react';
import { Modal, Icon, Toast } from 'antd-mobile';
import './reward.less';
import Request from '../../service/baseAxios';
import { wechatPay } from '../../libs/wxPay';
import gift1 from '../../static/img/gift1.png';
import gift2 from '../../static/img/gift2.png';
import gift3 from '../../static/img/gift3.png';
import gift4 from '../../static/img/gift4.png';
import gift5 from '../../static/img/gift5.png';
import gift6 from '../../static/img/gift6.png';
import gift7 from '../../static/img/gift7.png';
import gift8 from '../../static/img/gift8.png';

const list=[
	{id:1, img: gift1, name: '幽兰', price: 1,},
	{id:2, img: gift2, name: '牡丹', price: 2,},
	{id:3, img: gift3, name: '卷轴', price: 5,},
	{id:4, img: gift4, name: '书桌', price: 10,},
	{id:5, img: gift5, name: '手串', price: 18,},
	{id:6, img: gift6, name: '玉佩', price: 28,},
	{id:7, img: gift7, name: '金锁', price: 58,},
	{id:8, img: gift8, name: '如意', price: 88,},
];
class Reward extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			active: '',
			price: null
		}
	}

	async handleOk(){
		const {id, triggerRewardModal} = this.props;
		const {price} = this.state;
		const getPayId = await Request('/app/live/orderNew',{id: id, amount: price});
		wechatPay(getPayId, function(){
			Toast.success('打赏成功！', 1);
			triggerRewardModal();
		})
		// console.log(getPayId);
		// console.log('视频id', id);
		// console.log('打赏物品ID', active);
		// console.log('打赏物品价格', price);
	}

	render() {
		const { visible, triggerRewardModal} = this.props;
		const {active} = this.state;
		return (
			<Modal
				visible={visible}
				closable={true}
				transparent
				maskClosable
				className="reward-modal"
				onClose={()=>{ triggerRewardModal() } }
				title="选择打赏物品"
			>
				<ul className="gift_list">
					{
						list.map( item=>(
							active===item.id ?
								<li className="active" key={item.id}>
									<div className="box">
										<img src={item.img} alt=""/>
										<div className="name">{item.name}</div>
										<div className="price">￥{item.price}</div>
										<Icon type="check-circle" size="xxs" />
									</div>
								</li>:
								<li key={item.id} onClick={()=>{this.setState({active:item.id,price:item.price})}}>
									<div className="box">
										<img src={item.img} alt=""/>
										<div className="name">{item.name}</div>
										<div className="price">￥{item.price}</div>
									</div>
								</li>
						))
					}
				</ul>
				<div className="options">
					<div className="btn_big btn_blue" onClick={this.handleOk.bind(this)}>立即打赏</div>
				</div>
			</Modal>
		);
	}
}

export default Reward;