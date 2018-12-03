import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroller';
import {
	Icon,
	ActivityIndicator,
	// Tabs,
	SwipeAction
} from 'antd-mobile';
import historyStore from "../../store/mine/history";
import NewsItem from '../../components/news/Item';
// import GoodsItem from '../../components/goodsItem';
import '../reset.less';

document.title = '浏览历史';

@observer
class History extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
			hasData: false,
			cur: 0,
		};
		this.delNewsHistory = this.delNewsHistory.bind(this);
	}

	componentDidMount(){
		historyStore.getNewsList().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange,
				hasData: true,
			})
		})
	}

	// 滑动加载
	triggerNextList(){
		historyStore.nextPage(this.state.cur);
		switch (this.state.cur){
			case 0:
				historyStore.getNewsList().then(()=> this.setState({dataChange: !this.state.dataChange}));
				break;
			case 1:
				// historyStore.getFriendsList().then(()=> this.setState({dataChange: !this.state.dataChange}));
				break;
		}
	}

	// 删除资讯的浏览历史
	async delNewsHistory(id, index){
		historyStore.delHistoryFunc(id).then(()=>{
			historyStore.newsList.list.splice(index, 1);
			this.setState({
				dataChange: !this.state.dataChange
			})
		});
	}

	render(){
		const {
			newsList:{list, curPage, totalPage},
			// goodsList,
		} = historyStore;
		return(
			this.state.hasData?
				<div style={{backgroundColor:'#fff', minHeight:innerHeight}}>
					{/*
					<Tabs
						tabs={[
							{ title: '资讯', sub: '1' },
							{ title: '商品', sub: '2' },
						]}
						swipeable={false}
						animate={false}
						tabBarUnderlineStyle={{width:'20%',borderColor:'#02c4cf',marginLeft:'15%'}}
						tabBarActiveTextColor='#02c4cf'
						page={this.state.cur}
						initialPage={this.state.cur}
						onChange={(tab, index) => { console.log('index',index); this.setState({cur: index}) }}
						// onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
					>
					</Tabs>
					*/}
						<div style={{minHeight:innerHeight-60}}>
							<InfiniteScroll
								style={{textAlign:'center'}}
								threshold={100}
								pageStart={1}
								loadMore={ this.triggerNextList.bind(this)}
								hasMore={ curPage < totalPage }
								loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
							>
								{
									list.length > 0 ?(
										list.map((item, index) => (
											<SwipeAction
												key={item.track_id}
												autoClose
												right={[
													{
														text: '删除记录',
														onPress: () => this.delNewsHistory(item.track_id, index),
														style: { backgroundColor: '#f54c43', color: 'white', paddingLeft: 10, paddingRight: 10 },
													},
												]}
												onOpen={() => console.log('global open')}
												onClose={() => console.log('global close')}
											>
												<NewsItem key={item.track_id} data={item} />
											</SwipeAction>
										))
									):<div className="empty"><p className="empty-info">还没有阅读记录哦~</p></div>
								}
							</InfiniteScroll>
						</div>
					{/*
						<div style={{minHeight:innerHeight-60}}>
							{
								goodsList.map( item => (
									<SwipeAction
										key={item.id}
										autoClose
										right={[
											{
												text: '删除记录',
												onPress: () => console.log('delete'),
												style: { backgroundColor: '#f54c43', color: 'white', paddingLeft: 10, paddingRight: 10 },
											},
										]}
										onOpen={() => console.log('global open')}
										onClose={() => console.log('global close')}
									>
										<GoodsItem data={item} />
									</SwipeAction>
								))
							}
						</div>
					*/}
				</div>:<div className="routerLoading"><Icon type="loading" size="lg" /></div>
		)
	}
}
render(<History />,document.getElementById('root'));

