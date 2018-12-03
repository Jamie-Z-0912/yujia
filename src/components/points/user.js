import React, { PureComponent } from 'react';
import {Icon} from 'antd-mobile';
import './user.less';

export default class User extends PureComponent {
	render(){
		const { userInfo, level, hasLink, next_level} = this.props;
		return(
			<div className="user_wrap" onClick={()=> { if(hasLink) window.location='./user.html'}}>
				<div className="user_con">
					<div className="photo"><img src={userInfo.photo} alt=""/></div>
					<div className="info">
						<div className="name">{userInfo.name}</div>
						<div className={`level level_${level.num}`}>{level.text}</div>
					</div>
					<div className="points_num">
						{userInfo.points}积分{ hasLink ? <Icon type="right" />:null}
					</div>
				</div>
				{
					next_level?
						<div className={`next_level level_${next_level.num}`}>
							<div className="level_slider"><div className="cur_level" style={{width: (userInfo.points/next_level.points)*100+'%'}} /></div>
							<div className="level_text">再过去{next_level.points-userInfo.points}积分升级为黄金会员</div>
						</div>
						:null
				}
			</div>
		)
	}
}