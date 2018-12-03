document.title = '搜索商品';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import SearchStore from '../../store/mall/search';
import {SearchBar} from 'antd-mobile';
import CategoryWrap from "../../components/mall/categoryWrap";
import GoodsList from '../../components/mall/goodsList';
import './searchPage.less';

@observer
class Index extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			layout: 'list',
			mode: '',
			value: '',
		}
	}
	handleLayout(){
		const {layout} = this.state;
		if(layout==='list'){
			this.setState({
				layout: 'block',
			})
		}else{
			this.setState({
				layout: 'list',
			})
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

	onChange(value) {
		this.setState({ value });
		SearchStore.changeKeywordFun(value);
	};

	render(){
		const {keyword, order, list, category} =  SearchStore;
		const {layout, mode} = this.state;
		return(
			<div className="mall-wrap">
				<div className="mall-hd">
					<div className="mall-hd-con">
						<div className="category" onClick={this.handleMode.bind(this)} />
						<div className="hd-search">
							<SearchBar
								value={keyword}
								placeholder="搜索商品"
								className="search_input"
								onChange={this.onChange.bind(this)}
								onSubmit={value => {
									console.log('submit', value);
									window.location=`./search.html?keyword=${encodeURIComponent(encodeURIComponent(keyword))}`;
								}}
							/>
						</div>
					</div>
				</div>
				<div style={{height:'.4rem'}} />
				<div className="mall-bd">
					{
						mode==='category'?
							<CategoryWrap category={category} />
							:(
								<div>
									<div className="orderNav">
										<ul>
											<li className={order===0?'active':''}>默认</li>
											<li className={order===1?'active':''}>销量</li>
											<li className={order===2?'active':''}>价格</li>
										</ul>
										<div className={['layout', layout].join(' ')} onClick={this.handleLayout.bind(this)} />
									</div>
									<div className="list-wrap" style={mode==='category'?{overflowY:'hidden'}:null}>
										<GoodsList list={list} className={layout} />
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
