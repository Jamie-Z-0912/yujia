document.title = '我的地址';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import addressStore from '../../store/mall/address';
import Address from '../../components/mall/address';
import './address.less';

@observer
class Index extends PureComponent {
	render(){
		const {list} = addressStore;
		return(
			<div className="address-wrap">
				{
					list.map(item=> <Address key={item.id} address={item} canEdit />)
				}
				<div className="addAddress" onClick={()=> window.location='./editAddress.html'}> 新增地址 </div>
			</div>
		)
	}
}


render(<Index />,document.getElementById('root'));