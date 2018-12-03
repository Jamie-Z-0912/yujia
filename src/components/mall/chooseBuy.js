import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import detailStore from '../../store/mall/detail';
import {Stepper} from 'antd-mobile';
import BuyOption from './buyOption';
import './chooseBuy.less';

@observer
export default class Item extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			size: '',
			color: '',
			count: 1,
		}
	}

	handleSize(size){
		this.setState({ size });
		detailStore.changeChoose({size});
	}

	handleColor(color){
		console.log(color);
		this.setState({ color });
		detailStore.changeChoose({color});
	}
	changeCount(count){
		this.setState({ count });
		detailStore.changeChoose({count});
	}

	render(){
		const {
			product: {
				images,
				sizeArr,
				colorArr,
				unit,
			},
			hasChoose:{
				size,
				color,
				count,
			}
		} = detailStore;
		// const { size, color, count} = this.state;
		return(
			<div className="chooseBuyWrap">
				<div className="chooseBuyHd">
					<div className="cover"><img src={images[0]} alt=""/></div>
					<div className="info">
						<dl>
							<dt className="gray">已选</dt>
							{size ? <dd>{size}，</dd>: null}
							{color ? <dd>{color}，</dd>:null}
							<dd>{count}{unit}</dd>
						</dl>
					</div>
				</div>
				<div className="chooseBuyBd">
					<div className="bd_title">规格</div>
					<ul className="bd_tags">
						{
							sizeArr.map( item =>
								item===size ?
									<li key={item} className="selected">{item}</li>
									: <li key={item} onClick={this.handleSize.bind(this, item)}>{item}</li>
							)
						}
					</ul>
					<div className="bd_title">颜色</div>
					<ul className="bd_tags">
						{
							colorArr.map( item=>
								item===color ?
									<li key={item} className="selected">{item}</li>
									: <li key={item} onClick={this.handleColor.bind(this, item)}>{item}</li>
							)
						}
					</ul>
					<div className="bd_num">
						<div className="bd_title">数量</div>
						<div className="bd_value">
							<Stepper
								style={{ width: '100%', minWidth: '100px' }}
								className="stepper"
								showNumber
								max={100}
								min={1}
								value={count}
								onChange={this.changeCount.bind(this)}
							/>
						</div>
					</div>
				</div>
				<BuyOption />
			</div>
		)
	}
}