import React, { PureComponent } from 'react';
import moment from 'moment';
import './index.less';

const status = {
	valid: '未使用',
	used: '已使用',
	overdue: '已过期',
	voucher: '立即领取',
};
export default class Voucher extends PureComponent {
	render(){
		const {
			type,
			data:{
				link,
				money,
				norm,
				start_time,
				end_time,
			}
		} = this.props;
		return(
			<div className={`voucher_item ${type==='valid'|| type==='voucher' ?'red':'gary'}`}>
				{type==='valid'? <a href={link} />:null}
				{type==='voucher'? <a onClick={()=>{alert('领取优惠券')}} />:null}
				<div className="voucher-left">
					<div className="con">
						<div className="money">￥<span>{money}</span>店铺优惠券</div>
						<div className="norm">满{norm}使用</div>
						<div className="time">有效期{moment(start_time).format('YYYY.MM.DD')}-{moment(end_time).format('YYYY.MM.DD')}</div>
					</div>
				</div>
				<div className="voucher-right">
					<div className="status">{status[type]}</div>
				</div>
			</div>
		)
	}
}