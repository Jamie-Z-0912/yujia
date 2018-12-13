document.title = '地图';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import mapIndex from "../../store/mapIndex";
import {Icon} from 'antd-mobile';
import Banner from '../../components/Banner';
import Item from '../../components/map/item';
import MapList from '../../components/map/mapList';
import './index.less';

@observer
class Index extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataChange: false,
			modal: 'list',
			cur: 0,
		};
	}
	
	render(){
		const {hasData, banner, venue, teacher} = mapIndex;
		const {cur, modal} = this.state;
		return(
			hasData ? (
				<div className="map-wrap" >
					<div className="search-btn" onClick={()=>window.location='./search.html'}>
						<span>南京</span>
					</div>
					{
						modal === 'map'?
							<MapList />:
							<div>
								{
									banner.length?<Banner data={banner} />:null
								}
								<div className="page-tab">
									<ul className="page-tab-nav">
										<li className={cur===0?'active':''} onClick={()=> this.setState({cur:0})}>YOGA名师</li>
										<li className={cur===1?'active':''} onClick={()=> this.setState({cur:1})}>YOGA场馆</li>
									</ul>
									<div className="page-tab-content">
										<div className="teacher-body" style={{display:cur===0?'block':'none'}}>
											{
												teacher.list.map(item=><Item data={item} key={item.id} />	)
											}
										</div>
										<div className="venue-body" style={{display:cur===1?'block':'none'}}>
											{
												venue.list.map(item=><Item data={item} key={item.id} />	)
											}
										</div>
									</div>
								</div>
							</div>
					}
					<div className="page-bottom">
						{
							modal==='map'?
								<a className="change-modal" onClick={()=>this.setState({modal:'list'})}>切换列表模式</a>:
								<a className="change-modal map" onClick={()=>this.setState({modal:'map'})}>切换地图模式</a>
						}
					</div>
				</div>
			):<div className="routerLoading"><Icon type="loading" size="lg" /></div>
		)
	}
}

render(<Index />,document.getElementById('root'));
