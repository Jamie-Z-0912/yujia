document.title = '我的';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import {XQN_BASE} from "../../libs/utils";
import userInfo from '../../libs/userInfo';
import { List } from 'antd-mobile';
import TabBar from '../../components/TabBar';
import './index.less';
import Request from '../../service/baseAxios';
import bg from '../../static/img/02.png';

const {Item} = List;

@observer
class Index extends PureComponent {

	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
			commCount: 0,
			collectCount: 0,
			focusCount: 0,
			historyCount: 0,
		}
	};

	componentDidMount(){
		this.getHeaderData();
	}

	// 获取头部数据
	async getHeaderData(){
		const headerData = await Request('/app/member/readingData',{});
		this.setState({
			commCount: headerData.commCount,
			collectCount: headerData.collectCount,
			focusCount: headerData.focusCount,
			historyCount: headerData.historyCount,
		});
	}

	render(){
		const { commCount, collectCount, focusCount, historyCount } = this.state;
		return(
			<div className="mine-wrap">
				<div className="mine-header">
					<div className="mine-hd-bg"><img src={bg} alt=""/></div>
					<div className="mine-info">
						<div className="photo"><a href="./setting.html"><img src={userInfo.head_url} alt=""/></a></div>
						<div className="name">{userInfo.nick_name}</div>
						<ul className="mine-attr">
							<li>
								<a href={`./invitation.html`}>
									<em>{commCount}</em>
									<span>帖子</span>
								</a>
							</li>
							<li>
								<a href={`./myCollect.html?userid=${userInfo.id}`}>
									<em>{collectCount}</em>
									<span>收藏</span>
								</a>
							</li>
							<li>
								<a href={`./myFocus.html?userid=${userInfo.id}`}>
									<em>{focusCount}</em>
									<span>关注</span>
								</a>
							</li>
							<li>
								<a href={`./history.html`}>
									<em>{historyCount}</em>
									<span>历史浏览</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="mine-card">
					<List className="mine-menu">
						<Item
							thumb={<i className="mine_menu_icon" style={{backgroundPosition:'0 0'}} />}
							arrow="horizontal"
							onClick={() => {window.location=`./message.html?userid=${userInfo.id}`}}
						>消息</Item>
						<Item
							thumb={<i className="mine_menu_icon" style={{backgroundPosition:'0 -.7rem'}} />}
							onClick={() => {window.location=`./myvip.html?userid=${userInfo.id}`}}
							arrow="horizontal"
						>
							我的专享
						</Item>
						{/*
						<Item
							thumb={<i className="mine_menu_icon" style={{backgroundPosition:'0 -1.4rem'}} />}
							onClick={() => window.location=`/${XQN_BASE.baseFile}/mall/cart.html`}
							arrow="horizontal"
						>
							购物车
						</Item>
						<Item
							thumb={<i className="mine_menu_icon" style={{backgroundPosition:'0 -2.1rem'}} />}
							onClick={() =>  window.location='./myorder.html'}
							arrow="horizontal"
						>
							我的订单
						</Item>
						*/}
					</List>
				</div>
				{/*
					<div className="mine-card">
						<List className="mine-menu">
							<Item
								thumb={<i className="mine_menu_icon" style={{backgroundPosition:'0 -2.8rem'}} />}
								onClick={() => {window.location='./myVoucher.html'}}
								arrow="horizontal"
							>
								优惠券
							</Item>
							<Item
								thumb={<i className="mine_menu_icon" style={{backgroundPosition:'0 -3.5rem'}} />}
								onClick={() => {window.location=`/${XQN_BASE.baseFile}/points/index.html`}}
								arrow="horizontal"
							>
								积分商城
							</Item>
							<Item
								thumb={<i className="mine_menu_icon" style={{backgroundPosition:'0 -4.2rem'}} />}
								onClick={() => {window.location='./invite.html'}}
								arrow="horizontal"
							>
								分享有礼
							</Item>
						</List>
					</div>
				*/}

				<div className="mine-card">
					<List className="mine-menu">
						<Item
							thumb={<i className="mine_menu_icon" style={{backgroundPosition:'0 -4.9rem'}} />}
							arrow="horizontal"
							onClick={() => {window.location='./friends.html'}}
						>通讯录</Item>
						<Item
							thumb={<i className="mine_menu_icon" style={{backgroundPosition:'0 -5.6rem'}} />}
							onClick={() => {window.location=`./userPage.html`}}
							arrow="horizontal"
						>
							个人主页
						</Item>
						<Item
							thumb={<i className="mine_menu_icon" style={{backgroundPosition:'0 -6.3rem'}} />}
							onClick={() => {window.location='./feedback.html'}}
							arrow="horizontal"
						>
							意见反馈
						</Item>
					</List>
				</div>
				<TabBar active={99920180910} hasMall />
			</div>
		)
	}
}

render(<Index />,document.getElementById('root'));
