import React, { PureComponent } from 'react';
import {XQN_BASE} from "../../libs/utils";
import {Icon, Toast} from 'antd-mobile';
import './index.less';
import Request from '../../service/baseAxios';

export default class UserItem extends PureComponent {

	constructor(props){
		super(props);
		this.state = {
			dataChange: false
		}
	}

	// 拒绝申请
	async refusedApply(id){
		const refusedRes = await Request('/app/member/refuseFriends',{id});
		if(refusedRes){
			Toast.info(refusedRes.message, 1);
		}else{
			this.props.handleApply(1);
		}
	}

	// 同意申请
	async agredApply(id){
		const res = await Request('/app/member/agreeFriends',{id});
		if(!res.resCode){
			this.props.handleApply(2);
		}else{
			Toast.info(agreeRes.message, 1);
		}
	}

	render(){
		const {
			style,
			inAll,
			isApply,
			data:{
				id,
				member_id,
				head_url,
				member_name,
				com,
				job,
				remark,
			}
		} = this.props;
		return(
			<div className="user_item" style={{...style}}>
				<a href={`/${XQN_BASE.baseFile}/mine/userPage.html?userid=${member_id}`}>
					<div className="user_item_hd">
						<div className="photo"><img src={head_url} alt=""/></div>
						<div className="user_hd_info">
							<div className="name">{member_name}</div>
							<div className="other">
								<span>{com}</span>
								<span>{job}</span>
							</div>
						</div>
						<div className="user_hd_right">
							<Icon type="right" />
						</div>
					</div>
					<div className={inAll ? "user_brief": 'user_brief_1'}>
						简单介绍：{remark}
					</div>
				</a>
				{
					isApply ? (
						<div className="options">
							<div className="div_btn" onClick={ () => this.refusedApply(id) }>拒绝</div>
							<div className="div_btn c_blue" onClick={ () => this.agredApply(id) }>同意</div>
						</div>
					):null
				}
			</div>
		)
	}
}