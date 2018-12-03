import React, { PureComponent } from 'react';
import GoodsItem from '../goodsItem';
import './goodsList.less';

export default class Index extends PureComponent {

	render() {
		const {list, className} = this.props;
		return(
			<div className={['goods_list', className].join(' ')}>
				{
					list.map(item=><GoodsItem key={item.id} data={item} />)
				}
			</div>
		)
	}
}