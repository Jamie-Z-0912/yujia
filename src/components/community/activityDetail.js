import React, { PureComponent } from 'react';
import moment from 'moment';
import {Icon} from 'antd-mobile';
import './activityDetail.less';

const statusArr = ['未报名','审核中','审核通过'];
export default class Activity extends PureComponent {
	render() {
		const {
			activityUser,
			detail:{
				id,
				overplus_num,
				organizer,
				end_time,
				start_time,
				act_end_time,
				num,
				money,
				address,
				signStatus,
			}
		} = this.props;
		const activity_info = [
			{key: 'organizer', name: '主办方', value: organizer},
			{key: 'end_time', name: '报名截止', value: end_time},
			{key: 'start_time', name: '开始时间', value: start_time},
			{key: 'act_end_time', name: '结束时间', value: act_end_time},
			{key: 'num', name: '报名上限', value: num||'不限制人数'},
			{key: 'money', name: '报名费用', value: money},
			{key: 'address', name: '活动地址', value: address},
		];
		console.log('activityUser',activityUser);
		return(
			<div className="activity-wrap">
				{
					activityUser && activityUser.length ?
						<div className="users-card">
							<div className="title">
								<span>报名用户 {overplus_num}人</span>
								{
									overplus_num > 0 ? <a href={`./activityUsers.html?id=${id}`}>查看全部 <Icon type="right" size="small"/></a>:null
								}
							</div>
							{
								overplus_num > 0 ?
									<div className={['users_list', activityUser.length>7?'all':''].join(' ')}>
										{
											activityUser.slice(0,8).map(item=> <img src={item.head_url||'http://demo.jsqiaotuo.com/base//static/images/head.svg'} alt=""/>)
										}
									</div>:null
							}
						</div>:null
				}
				<div className="activity-info">
					{
						activity_info.map(item=>(
							<div key={item.key} className="activity_info_item">
								<span>{item.name}</span>
								<span>{item.key.indexOf('time')>=0?moment(item.value).format('YYYY/M/D H:mm'):item.value}</span>
								{
									item.key==='end_time'?<span>{statusArr[signStatus]}</span>:null
								}
							</div>
						))
					}
				</div>
			</div>
		)
	}
}