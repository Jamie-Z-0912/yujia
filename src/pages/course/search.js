import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import searchStore from "../../store/course/search";
import {getQuery} from '../../libs/utils';
import InfiniteScroll from 'react-infinite-scroller';
import { Icon, SearchBar, ActivityIndicator } from 'antd-mobile';
import Item from '../../components/course/item';
import './searchPage.less';

@observer
class Index extends PureComponent {
	
	constructor(props){
		super(props);
		console.log(props);
		this.state = {
			dataChange: false,
			value: searchStore.keyword,
			hasData: false,
			historyHide: false
		};
	}
	
	componentDidMount(){
		searchStore.getSearchInfo().then(()=>{
			this.setState({
				hasData: true
			})
		});
		if(getQuery('keyword')){
			this.setState({
				historyHide: true
			})
		}
	}
	
	onChange(value) {
		this.setState({ value });
		searchStore.changeKeywordFun(value);
	};
	
	// 获取历史搜索记录
	getHistorySearch(keyword){
		window.location.replace(`./search.html?keyword=${encodeURIComponent(encodeURIComponent(keyword))}`);
	}
	
	// 滑动加载
	triggerNextList(){
		searchStore.nextPage();
		searchStore.getSearchInfo().then(()=> this.setState({dataChange: !this.state.dataChange}));
	}
	
	// 删除搜索记录
	delSearchRecord(id){
		searchStore.deleteKeyword(id).then(()=>{
			this.setState({
				dataChange: !this.state.dataChange
			})
		})
	}
	
	// 清空历史
	clearSearchRecord(id){
		searchStore.clearKeyword(id).then(()=>{
			this.setState({
				dataChange: !this.state.dataChange
			})
		})
	}
	
	render() {
		const {
			keyword,
			resultInfo:{list, curPage, totalPage},
			historyKeyword
		} = searchStore;
		const { historyHide } = this.state;
		return (
			<div className="search-wrap">
				<div className="search_head">
					<SearchBar
						value={keyword}
						placeholder="搜索一个关键词看看？"
						className="search_input"
						onChange={this.onChange.bind(this)}
						onCancel={()=> {
							searchStore.keyword='';
							this.setState({
								historyHide: false,
							})
						}}
						onSubmit={value => {
							console.log('submit', value);
							window.location.replace(`./search.html?keyword=${encodeURIComponent(encodeURIComponent(keyword))}`);
							// window.location=`./search.html?keyword=${encodeURIComponent(encodeURIComponent(keyword))}`;
						}}
					/>
				</div>
				{
					historyHide ? (
						list.length ?
							<div className="result_wrap">
								<InfiniteScroll
									style={{textAlign:'center'}}
									threshold={100}
									pageStart={1}
									loadMore={ this.triggerNextList.bind(this)}
									hasMore={ curPage < totalPage }
									loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
								>
									{
										list.map(item => <Item key={item.id} data={item} />)
									}
								</InfiniteScroll>
							</div>:
							<div className="empty">
								没有搜索结果
							</div>
					):(
						historyKeyword.length > 0 ?
							<div className="history_keyword_wrap">
								<div
									className="clear"
									onClick={()=> this.clearSearchRecord() }
								>清空历史</div>
								<h3>搜索历史</h3>
								<ul>
									{ historyKeyword.map( item => <li key={item.id}>
										<span onClick={this.getHistorySearch.bind(this,item.content)}>{item.content}</span>
										<i onClick={ ()=>{this.delSearchRecord(item.id)} } className="delete"><Icon type="cross" /></i>
									</li>)
									}
								</ul>
							</div>: null
					)
				}
			</div>
		);
	}
}
// const SearchForm =  createForm()(Index);
render(<Index />,document.getElementById('root'));