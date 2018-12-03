import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import mallIndex from "../../store/mallIndex";
import SearchStore from '../../store/mall/search';
import {Icon} from 'antd-mobile';
import Banner from '../../components/points/banner';
import CategoryWrap from "../../components/mall/categoryWrap";
import GoodsList from '../../components/mall/goodsList';
import './index.less';

@observer
class Index extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			mode: '',
		}
	}
	handleMode(){
		const {mode} = this.state;
		if(mode){
			this.setState({
				mode: ''
			})
		}else{
			this.setState({
				mode: 'category'
			})
		}
	}
	render() {
		const {
			banner,
			nav,
			list
		} = mallIndex;
		const { category} =  SearchStore;
		const {mode} = this.state;
		return(
			<div className="mall-wrap">
				<div className="mall-hd">
					<div className="mall-hd-con">
						<div className="category" onClick={this.handleMode.bind(this)} />
						<div className="hd-search" onClick={()=> window.location='./search.html'}>搜索商品</div>
					</div>
				</div>
				<div style={{height:'.4rem'}} />

				<div className="mall-bd">
					{
						mode==='category'?
							<CategoryWrap category={category} />
							:(
								<div>
									<Banner data={banner} />
									<div className="pageNav">
										{
											nav.map(item=> <div key={item.id} className="nav-box">
												<div className="nav-img"><img src={item.cover} alt=""/></div>
												<div className="nav-text">{item.text}</div>
												</div>)
										}
									</div>

									<div className="list-wrap">
										{
											list.map(item=>(
												<div className="list-card">
													<div className="list-card-hd">
														<span>{item.name}</span>
														<a href="./search.html"> 查看更多<Icon type="right" size="small" />	</a>
													</div>
													<GoodsList list={item.data} className="block" />
												</div>
											))
										}
									</div>
								</div>
							)
					}
				</div>
			</div>
		)
	}

}
render(<Index />,document.getElementById('root'));