document.title = '订单';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import orderStore from '../../store/mall/afterSales';
import {List } from 'antd-mobile';
import {getQuery} from "../../libs/utils";
import AfterSalesForm from '../../components/mall/afterSalesForm';
import './afterSales.less';

const Item = List.Item;
@observer
class Order extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			popMode: '',
			cur: getQuery('tab'), //return 退货, exchange 换货, repair 维修
		}
	}

	render(){
		const{goods, progress, intro} = orderStore;
		const {cur} = this.state;
		return(
			<div className="after-sales-wrap">
				<div className="product-card" onClick={()=> window.location=goods.link}>
					<div className="goods_img"><img src={goods.img} alt=""/></div>
					<div className="goods_info">
						<div className="name">{goods.name}</div>
						<div className="choose"><span>规格:{goods.size}</span><span>颜色:{goods.color}</span></div>
						<div className="price">￥<i>{goods.price}</i>元</div>
					</div>
				</div>
				<div className="after-sales-bd">
					<ul className="nav">
						<li onClick={()=> this.setState({cur:'return'})} className={cur==='return'||!cur?"active":''}>退货</li>
						<li onClick={()=> this.setState({cur:'exchange'})} className={cur==='exchange'?"active":''}>换货</li>
						<li onClick={()=> this.setState({cur:'repair'})} className={cur==='repair'?"active":''}>维修</li>
					</ul>
					<div className="content">
						{
							progress.length===1 ?<AfterSalesForm type={cur} />:null
						}
					</div>
				</div>
				<div className="rule-wrap">
					<div className="title">退换规则</div>
					<div className="text">{intro}</div>
				</div>
				{
					progress.length===1 ?<div style={{height:48}} />:null
				}
			</div>
		)
	}
}

render(<Order />,document.getElementById('root'));
