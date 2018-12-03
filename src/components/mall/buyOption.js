import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import detailStore from '../../store/mall/detail';
import './buyOption.less';

@observer
export default class Item extends PureComponent{
	render(){
		return(
			<div className="buyOptions">
				<div className="add" onClick={ detailStore.addShoppingCart.bind(detailStore) }>加入购物车</div>
				<div className="buy" onClick={ detailStore.buyFunc.bind(detailStore) }>立即购买</div>
			</div>
		)
	}
}