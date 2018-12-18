import React, { PureComponent } from 'react';
import './buyBottom.less';


export default class Index extends PureComponent{
	constructor(props){
		super(props);
	}
	
	render(){
		const {id, current_price} = this.props;
		console.log('detailId',id);
		return(
			<div className="page-bottom">
				<ul>
					<li onClick={()=>window.location='./index.html'} />
					<li />
					<li>
						<a href='./pay.html' className="pay_btn">付费订阅 ￥{current_price}</a>
					</li>
				</ul>
			</div>
		)
	}
}