import React, { PureComponent } from 'react';
import Item from './smallItem';
import './listCol3.less';

export default class Index extends PureComponent {
	render() {
		const {data} = this.props;
		return(
			<div className="list_col3">
				{
					data.map(item=> <Item data={item} key={item.id} />)
				}
			</div>
		)
	}
}