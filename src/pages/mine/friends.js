document.title = '通讯录';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import friendStore from '../../store/mine/friends';
import InfiniteScroll from 'react-infinite-scroller';
import {Icon, ActivityIndicator, Tabs, Toast, SwipeAction} from 'antd-mobile';
import UserItem from '../../components/UserItem';
import '../reset.less';
import Request from '../../service/baseAxios';

@observer
class Friends extends PureComponent{

	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
			hasData: false,
			cur: 1,
		};
		this.handleDelFriend = this.handleDelFriend.bind(this);
	}

	componentDidMount(){
		friendStore.getFriendsList().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange,
				hasData: true,
			})
		});
		friendStore.getAllList().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange
			})
		});
		friendStore.getApplyList().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange
			})
		});
	}

	// 滑动加载
	triggerNextList(){
		friendStore.nextPage(this.state.cur);
		switch (this.state.cur){
			case 0:
				friendStore.getNewsList().then(()=> this.setState({dataChange: !this.state.dataChange}));
				break;
			case 1:
				friendStore.getFriendsList().then(()=> this.setState({dataChange: !this.state.dataChange}));
				break;
			case 2:
				friendStore.getApplyList().then(()=> this.setState({dataChange: !this.state.dataChange}));
				break;
		}
	}

	// 删除好友
	async handleDelFriend(id, index){
		// console.log(id);
		const res = await Request('/app/member/cancelFriends', {id});
		if(res.resCode){
			Toast.info(res.message, 1);
		}else{
			Toast.info("删除完成~", 1);
			friendStore.friendsInfo.list.splice(index, 1);
			this.setState({
				dataChange: !this.state.dataChange
			})
		}
	}

	// 操作申请后,重置申请和好友列表
	async applyReset(status, index){
		//status 1拒绝 2同意
		if(status === 2){
			friendStore.friendsInfo.curPage=1;
			friendStore.getFriendsList().then(()=>{
				this.setState({
					dataChange: !this.state.dataChange
				})
			})
		}
		friendStore.applyInfo.list.splice(index, 1);
	}

	render() {
		const {allUsers, friendsInfo, applyInfo} = friendStore;
		return(
			this.state.hasData ?
				<div style={{minHeight: innerHeight, backgroundColor:'#f5f5f5'}}>
					<Tabs
						tabs={[
							{ title: '全部', sub: '1' },
							{ title: '好友', sub: '2' },
							{ title: '申请', sub: '3' },
						]}
						swipeable={false}
						animate={false}
						tabBarUnderlineStyle={{width:'18%',borderColor:'#02c4cf',marginLeft:'7.6%'}}
						tabBarActiveTextColor='#02c4cf'
						page={this.state.cur}
						initialPage={this.state.cur}
						onChange={(tab, index) => { console.log('index',index); this.setState({cur: index}) }}
					>
						<div>
							<InfiniteScroll
								style={{textAlign:'center'}}
								threshold={100}
								pageStart={1}
								loadMore={ this.triggerNextList.bind(this)}
								hasMore={ allUsers.curPage < allUsers.totalPage }
								loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
							>
								{
									allUsers.list.length?
										allUsers.list.map(item=><UserItem style={{marginTop:'.1rem'}} key={item.id} data={item} inAll />)
										:<div className="empty-data">这里是空的~</div>
								}
							</InfiniteScroll>
						</div>
						<div>
							<InfiniteScroll
								style={{textAlign:'center'}}
								threshold={100}
								pageStart={1}
								loadMore={ this.triggerNextList.bind(this)}
								hasMore={ friendsInfo.curPage < friendsInfo.totalPage }
								loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
							>
								{
									friendsInfo.list.length?
										friendsInfo.list.map((item,index)=>
											<SwipeAction
												key={item.id}
												autoClose
												right={[
													{
														text: '删除好友',
														onPress: () => this.handleDelFriend(item.id, index),
														style: { backgroundColor: '#f54c43', color: 'white', paddingLeft: 10, paddingRight: 10 },
													},
												]}
												onOpen={() => console.log('global open')}
												onClose={() => console.log('global close')}
											>
												<UserItem data={item} />
											</SwipeAction>

										):<div className="empty-data">暂时没有好友哦~</div>
								}
							</InfiniteScroll>
						</div>
						<div>
							<InfiniteScroll
								style={{textAlign:'center'}}
								threshold={100}
								pageStart={1}
								loadMore={ this.triggerNextList.bind(this)}
								hasMore={ applyInfo.curPage < applyInfo.totalPage }
								loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
							>
								{
									applyInfo.list.length?
										applyInfo.list.map((item, index)=>
											<UserItem
												style={{marginTop:'.1rem'}}
												key={item.id}
												data={item}
												isApply
												handleApply={status=>this.applyReset(status,index) } />
										):<div className="empty-data">暂时没有好友申请~</div>
								}
							</InfiniteScroll>
						</div>
					</Tabs>
					{
						friendsInfo.list.length?
							<div>
								<div style={{position:'fixed', textAlign:'center', lineHeight:'.4rem', fontSize:'.15rem',width:'100%', bottom:0}}>左滑可解除好友</div>
								<div style={{height:'.4rem'}} />
							</div>:null
					}
				</div>
				:<div className="routerLoading"><Icon type="loading" size="lg" /></div>
		)
	}
}

render(<Friends />,document.getElementById('root'));