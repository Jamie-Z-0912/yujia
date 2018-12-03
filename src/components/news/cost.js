import React, { PureComponent } from 'react';
import {Modal, Toast} from 'antd-mobile';
import Request from '../../service/baseAxios';
import { wechatPay } from '../../libs/wxPay';
import './cost.less';

export default class Cost extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			visible: props.need_pay,
		}
	}

	componentDidMount(){
		const that = this;
		document.addEventListener('scroll', ()=>{
			that.setState({
				visible: that.props.need_pay,
			});
			that.props.need_pay ?document.scrollingElement.scrollTop=0:null;
		});
	}

	componentWillUpdate(props){
		if(props!==this.props){
			this.setState({
				visible: props.need_pay,
			})
		}
	}

	closeModal(){
		this.setState({
			visible: false,
		})
	}

	async payMoney(payType){
		const that = this;
		const{id} = this.props;
		const getPayId = await Request('/app/information/orderNew',{id, payType});
		wechatPay(getPayId.orderId, function(){
			Toast.success('付费成功！', 1);
			that.closeModal();
			window.location.reload();
		})
	}
	
	render(){
		const{ money, month_charge, hasClose, is_charge} = this.props;
		const{visible} = this.state;
		return(
			<Modal
				visible={visible}
				closable={hasClose}
				className="cost_model"
				transparent
				maskClosable={false}
				onClose={this.closeModal.bind(this)}
				footer={
					is_charge?
						[
							{
								text: <div className="footer-btn">包月畅读<span style={{color:'red'}}>{month_charge?month_charge/100:0}<i>元/月</i></span></div>,
								onPress: () => this.payMoney('2'),
							},
							{
								text: <div className="footer-btn">单篇购买<span style={{color:'#dc8c05'}}>{money/100}<i>元/篇</i></span></div>,
								onPress: () => this.payMoney('1'),
							},
						]:[
							{
								text: <div className="footer-btn">单篇购买<span style={{color:'#dc8c05'}}>{money/100}<i>元/篇</i></span></div>,
								onPress: () => this.payMoney('1'),
							},
						]
				}
			>
				<div className="cost_title">专属文章</div>
				<div className="cost_text">本文章为会员专享付费文章，您可通过包月或单篇购买的方式获得浏览授权。新用户可享受20篇试读</div>
			</Modal>
		)
	}
}