import React, { PureComponent } from 'react';
import {Icon} from 'antd-mobile';
import './address.less';

@observer
export default class Address extends PureComponent{
	render(){
		const {address, canEdit} = this.props;
		const link = canEdit ? '/mall/editAddress.html':'/mall/address.html';
		console.log(link);
		return(
			<div className="address-card" onClick={()=> window.location = link+`?id=${address.id}`}>
				<div className="address-hd">
					<span>{address.name}</span>
					<span className="mobile">{address.mobile}</span>
				</div>
				<div className="address">
					{address.isDefault ? <i>默认</i>:null}
					{address.address}
				</div>
				{
					canEdit ?
						<div className="iconEdit" />
						:<Icon type="right" />
				}
			</div>
		)
	}
}
