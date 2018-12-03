import React, { PureComponent } from 'react';
import GoodsItem from '../goodsItem';
import './recommend.less';

export default class Index extends PureComponent {

	render() {
		const {list} = this.props;
		return(
			<div className='goods_list'>
				{
					list.map(item=><GoodsItem key={item.id} data={item} />)
				}
			</div>
		)
	}
}