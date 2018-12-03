import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import userStore from "../../store/mine/userPage";
import Item from '../../components/community/Item';
import TagForm from '../../components/mine/tagForm';
import './userPage.less';
import BG_IMG from '../../static/img/02.png';
import InfiniteScroll from 'react-infinite-scroller';
import { Icon, ActivityIndicator, Toast } from 'antd-mobile';
import { getQuery } from '../../libs/utils';
import Request from '../../service/baseAxios';

document.title = '个人主页';

@observer
class UserPage extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			hasData: false,
			dataChange: false,
			// 印象弹窗
			visible: false,
			editTagMode: false,
		};
		this.resetImpress = this.resetImpress.bind(this);
	}

	triggerApplyModal(flag){
		this.setState({
			visible: !!flag,
		})
	}
	async componentDidMount(){
		await userStore.getUserInfo();
		userStore.getLatestComm().then(() => {
			this.setState({
				hasData: true,
				dataChange: !this.state.dataChange
			})
		});
		userStore.getUserImpress().then(()=>this.setState({dataChange:!this.state.dataChange}));
	}

	// 删除帖子
	handleDel(index){
		userStore.latestCommInfo.list.splice(index, 1);
		this.setState({
			dataChange: !this.state.dataChange
		})
	}

	// 重新加载impress
	resetImpress(){
		userStore.getUserImpress().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange
			})
		})
	}

	// 印象点赞
	async impressUp(id){
		const res = await Request('/app/member/impressUp',{id});
		if(!res.resCode){
			Toast.info(res.message, 1);
		}else{
			Toast.info("点赞成功", 1);
			this.resetImpress();
		}
	}

	// 申请加好友
	applyFriendFunc(){
		Request('/app/member/applyFriends', {member_id:getQuery('userid')}).then(res=>{
			// console.log(res);
			if(res.resCode===0){
				Toast.info('申请成功，等待用户同意', 2);
			}else{
				Toast.info(res.message, 2);
			}
		});
	}

	triggerNextList(){
		userStore.nextPage();
		userStore.getLatestComm().then(() => {
			this.setState({
				dataChange: !this.state.dataChange
			})
		});
	}

	render(){
		const {
			info:{
				head_url,
				name,
				com,
				job,
				remark,
				mobile,
				is_friend,
			},
			impress,
			latestCommInfo,
		} = userStore;
		const {visible, editTagMode, hasData} = this.state;
		const role = getQuery('userid')? is_friend:2; // role 0不是好友 1是好友 2是自己
		return(
			hasData ?
				<div className="userPage-wrap">
					<div className="userPage-hd" style={{backgroundImage:`url(${BG_IMG})`}}>
						<div className="userPage-hd-con">
							<img className="photo" src={head_url} alt=""/>
							<div className="userPage-name">{name}</div>
							<div className="userPage-company">{com?com:'无公司'}</div>
							<div className="userPage-post">{job?job:'职位'}</div>
							<div className="userPage-brief t-c">{remark?`简单介绍：${remark}`:'暂无介绍'}</div>
						</div>
					</div>
					<div className="userPage-bd">
						<div className="userPage-bd-box">
							<div className="title">联系方式</div>
							<div className="content">
								{
									role ?
										mobile ? <div className="tel">{mobile}</div>:<div className="nothing">暂无联系方式</div>
										: <div className="nothing">你们还不是好友，加为好友查看联系方式吧~</div>
								}
							</div>
						</div>
						<div className="userPage-bd-box">
							<div className="title">
								好友印象
								{
									role===2?
										<div className="editTag" onClick={()=> this.setState({editTagMode:!editTagMode})}>
											{editTagMode?<span className="wan">完成</span>:<span className="edit">编辑</span> }
										</div>:null
								}
							</div>
							<div className="content tags">
								{
									impress.length ?
										impress.map(item=>(
											editTagMode?
												<div
													key={item.text}
													className={['item','editMode',item.type==='Y'?'red':''].join(' ')}
													onClick={()=>{console.log('删除标签')}}
												>
													{item.id}<span>{item.up_num}</span>
												</div>:
												<div
													key={item.id}
													className={['item',item.type==='Y'?'red':''].join(' ')}
													onClick={ ()=>{ role===1?this.impressUp(item.id):null } }
												>
													{item.impress}<span>{item.up_num <= 0 ? null : item.up_num }</span>
												</div>
										))
										:(role===1?<div className="item">点击+号，为好友添加印象</div>:<div className="nothing">暂无好友添加印象~</div>)
								}
								{
									role===1?<div className="item addTag" onClick={()=> this.setState({visible:true})} />:null
								}
							</div>
						</div>
						<div className="userPage-bd-box">
							<div className="title">最新动态</div>
								<div className="content">
									{
										latestCommInfo.list.length ?
											role===0 ?
												<div>
													{ latestCommInfo.list.slice(0,3).map(item=> <Item key={item.id} data={item} />) }
													<div className="nothing">非好友最多只能查看三条动态~</div>
												</div>
												:
												<InfiniteScroll
													style={{textAlign:'center'}}
													threshold={100}
													pageStart={1}
													loadMore={ this.triggerNextList.bind(this)}
													hasMore={ latestCommInfo.curPage < latestCommInfo.totalPage }
													loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
												>
													{
														latestCommInfo.list.map((item, index) => <Item key={item.id} data={item} delSuccess={ ()=>{this.handleDel(index)} } />)
													}
												</InfiniteScroll>
											: <div className="nothing">暂无最新动态~</div>
									}
								</div>
						</div>
						{
							role<2?(
								role===1? (mobile?<a href={`tel:${mobile}`} className="userPage-bottom">拨打电话</a>:null):
									<div className="userPage-bottom" onClick={()=>this.applyFriendFunc()}>申请好友</div>
							):null
						}
					</div>
					<TagForm userId={getQuery('userid')} visible = {visible} triggerApplyModal = {this.triggerApplyModal.bind(this)} handleChangeImpress={this.resetImpress} />
				</div>
				:<div className="routerLoading"><Icon type="loading" size="lg" /></div>
		)
	}
}
render(<UserPage />,document.getElementById('root'));