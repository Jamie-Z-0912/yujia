import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroller';
import {Icon, ActivityIndicator, Tabs, Toast, SwipeAction} from 'antd-mobile';
import myCollectStore from "../../store/mine/myCollect";
import NewsItem from '../../components/news/Item';
import TopicItemRT from '../../components/community/topicItemRightTu';
import GoodsItem from '../../components/goodsItem';
import './myCollect.less';
import Request from '../../service/baseAxios';
import historyStore from "../../store/mine/history";

document.title = '收藏';

@observer
class MyCollect extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
			hasData: false,
			cur: 0,
		};
	}

	componentDidMount(){
		myCollectStore.getArticle().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange,
				hasData: true,
			})
		});
		myCollectStore.getTopic().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange,
			})
		})
	}

	// 滑动加载
	triggerNextList(){
		historyStore.nextPage(this.state.cur);
		switch (this.state.cur){
			case 0:
				myCollectStore.getArticle().then(()=> this.setState({dataChange: !this.state.dataChange}));
				break;
			case 1:
				myCollectStore.getTopic().then(()=> this.setState({dataChange: !this.state.dataChange}));
				break;
			case 2:
				// myCollectStore.getTopic().then(()=> this.setState({dataChange: !this.state.dataChange}));
				break;
		}
	}

	// 取消收藏
	async	cancelCollect(id, index){
		const{cur} = this.state;
		await Request('/app/member/cancel', {id});
		Toast.success('成功取消收藏',2);
		switch (cur){
			case 0:
				myCollectStore.articlesInfo.list.splice(index, 1);
				break;
			case 1:
				myCollectStore.topicsInfo.list.splice(index, 1);
				break;
			case 2:
				myCollectStore.goodsInfo.list.splice(index, 1);
				break;
		}
		this.setState({
			dataChange: !this.state.dataChange
		});
	}

	render(){
		const {articlesInfo, topicsInfo, goodsInfo} = myCollectStore;
		return(
			this.state.hasData ?
				<div style={{backgroundColor:'#fff', minHeight:innerHeight}}>
					<Tabs
						tabs={[
							{ title: '文章', sub: '1' },
							{ title: '话题', sub: '2' },
							// { title: '商品', sub: '3' },
						]}
						swipeable={false}
						animate={false}
						// tabBarUnderlineStyle={{width:'18%',borderColor:'#02c4cf',marginLeft:'7.6%'}}
						tabBarUnderlineStyle={{width:'20%',borderColor:'#02c4cf',marginLeft:'15%'}}
						tabBarActiveTextColor='#02c4cf'
						page={this.state.cur}
						initialPage={this.state.cur}
						onChange={(tab, index) => { console.log('index',index); this.setState({cur: index}) }}
					>
						<div style={{minHeight:innerHeight-60}}>
							<InfiniteScroll
								style={{textAlign:'center'}}
								threshold={100}
								pageStart={1}
								loadMore={ this.triggerNextList.bind(this)}
								hasMore={ articlesInfo.curPage < articlesInfo.totalPage }
								loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
							>
								{
									articlesInfo.list.length > 0 ?
										articlesInfo.list.map((item,index) => (
											<SwipeAction
												key={item.id}
												autoClose
												right={[
													{
														text: '取消收藏',
														onPress: () => this.cancelCollect(item.collect_id, index),
														style: { backgroundColor: '#f54c43', color: 'white', paddingLeft: 10, paddingRight: 10 },
													},
												]}
												onOpen={() => console.log('global open')}
												onClose={() => console.log('global close')}
											>
												<NewsItem data={item} />
											</SwipeAction>
										))
										: <div className="no-more-data">还没有收藏文章哦~</div>
								}
							</InfiniteScroll>
						</div>
						<div style={{minHeight:innerHeight-60}}>
							<InfiniteScroll
								style={{textAlign:'center'}}
								threshold={100}
								pageStart={1}
								loadMore={ this.triggerNextList.bind(this)}
								hasMore={ topicsInfo.curPage < topicsInfo.totalPage }
								loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
							>
							{
								topicsInfo.list.length > 0 ?
									topicsInfo.list.map( (item, index) => (
										<SwipeAction
											key={item.id}
											autoClose
											right={[
												{
													text: '取消收藏',
													onPress: () => this.cancelCollect(item.collect_id, index),
													style: { backgroundColor: '#f54c43', color: 'white', paddingLeft: 10, paddingRight: 10 },
												},
											]}
											onOpen={() => console.log('global open')}
											onClose={() => console.log('global close')}
										>
											<TopicItemRT data={item} />
										</SwipeAction>
									))
									: <div className="no-more-data">还没有收藏话题哦~</div>
							}
							</InfiniteScroll>
						</div>
						{/*
						<div style={{minHeight:innerHeight-60}}>
							<InfiniteScroll
								style={{textAlign:'center'}}
								threshold={100}
								pageStart={1}
								loadMore={ this.triggerNextList.bind(this)}
								hasMore={ goodsInfo.curPage < goodsInfo.totalPage }
								loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
							>
							{
								goodsInfo.list.length ?
									goodsInfo.list.map( (item, index)=> (
										<SwipeAction
											key={item.id}
											autoClose
											right={[
												{
													text: '取消收藏',
													onPress: () =>{ console.log('取消商品收藏')}, //this.cancelCollect(item.collect_id, index),
													style: { backgroundColor: '#f54c43', color: 'white', paddingLeft: 10, paddingRight: 10 },
												},
											]}
											onOpen={() => console.log('global open')}
											onClose={() => console.log('global close')}
										>
											<GoodsItem data={item} />
										</SwipeAction>
									)): <div className="no-more-data">这里是空的~</div>
							}
							</InfiniteScroll>
						</div>
						*/}
					</Tabs>
				</div>
				:<div className="routerLoading"><Icon type="loading" size="lg" /></div>
		)
	}
}
render(<MyCollect />,document.getElementById('root'));

