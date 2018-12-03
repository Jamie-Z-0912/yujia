import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroller';
import {Icon, ActivityIndicator, Tabs} from 'antd-mobile';
import messageStore from "../../store/mine/message";
import './message.less';
import {XQN_BASE} from "../../libs/utils";

document.title = '消息';
@observer
class Message extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
			hasData: false,
			cur: 0,
		};
		if(window.localStorage.getItem('notice')) window.localStorage.removeItem('notice');
	}

	componentDidMount(){
		messageStore.getCommitList().then(()=>{
			this.setState({
				hasData: true,
			})
		});
		messageStore.getNoticeList().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange,
			})
		});
	}

	// 滑动加载
	triggerNextList(){
		messageStore.nextPage(this.state.cur);
		switch (this.state.cur){
			case 0:
				messageStore.getCommitList().then(()=> this.setState({dataChange: !this.state.dataChange}));
				break;
			case 1:
				messageStore.getNoticeList().then(()=> this.setState({dataChange: !this.state.dataChange}));
				break;
		}
	}

	render(){
		const {commentInfo, noticeInfo} = messageStore;
		return(
			this.state.hasData ?
				<div>
					<Tabs
						tabs={[
							{ title: '评论', sub: '1' },
							{ title: '通知', sub: '2' },
						]}
						animate={false}
						tabBarUnderlineStyle={{width:'20%',borderColor:'#02c4cf',marginLeft:'15%'}}
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
								hasMore={ commentInfo.curPage < commentInfo.totalPage }
								loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
							>
								{
									commentInfo.list.length > 0 ?
										commentInfo.list.map(item =>{
											const files = ['','news','community','living','community'];
											const orgArr = ['','news','community','live','interaction'];
												// 1资讯2直播3社区4互动
											return(
												<a className="message_item" href={`/${XQN_BASE.baseFile}/${files[item.business_type]}/discussion.html?origin=${orgArr[item.business_type]}&detail=${item.business_id}`}>
													<div className="title">{item.business_title}</div>
													<div className="time">{moment(item.create_time).format('YYYY-MM-DD')}</div>
												</a>
											)
										})
										: <div className="empty-data">暂无评论消息~</div>
								}
							</InfiniteScroll>
						</div>
						<div>
							<InfiniteScroll
								style={{textAlign:'center'}}
								threshold={100}
								pageStart={1}
								loadMore={ this.triggerNextList.bind(this)}
								hasMore={ noticeInfo.curPage < noticeInfo.totalPage }
								loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
							>
								{
									noticeInfo.list.length?
										noticeInfo.list.map(item =>
											<a
												className="message_item"
												onClick={()=>{
													const data = {
														title: item.title,
														content: item.content,
														time: item.create_time,
													};
													window.localStorage.setItem('notice',JSON.stringify(data));
												}}
												href={`/${XQN_BASE.baseFile}/mine/messagePage.html`}
											>
												<div className="title">{item.title}</div>
												<div className="time">{moment(item.create_time).format('YYYY-MM-DD')}</div>
											</a>
										)
										: <div className="empty-data">暂无通知~</div>
								}
							</InfiniteScroll>
						</div>
					</Tabs>
				</div>
				:<div className="routerLoading"><Icon type="loading" size="lg" /></div>
		)
	}
}
render(<Message />,document.getElementById('root'));

