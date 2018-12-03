document.title = '社区';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import communityStore from '../../store/communityIndex';
import InfiniteScroll from 'react-infinite-scroller';
import { Icon, ActivityIndicator } from 'antd-mobile';
import TabBar from '../../components/TabBar';
import BannerSmall from '../../components/BannerSmall';
import Item from '../../components/community/Item';
import './index.less';
import userInfo from '../../libs/userInfo';

@observer
class Index extends PureComponent {

	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
			hasData: false,
		};
		this.handleDel = this.handleDel.bind(this);
	}

	async componentDidMount(){
		communityStore.getUserValid().then(()=> this.setState({dataChange: !this.state.dataChange}));
		communityStore.getActList().then(()=> this.setState({dataChange: !this.state.dataChange}));
		communityStore.getListFunc().then(()=> this.setState({hasData: true}));
	}

	// 滑动加载
	triggerNextList(){
		communityStore.nextPage();
		communityStore.getListFunc().then(()=> this.setState({dataChange: !this.state.dataChange}));
	}

	// 删除帖子
	handleDel(index){
		communityStore.comList.list.splice(index, 1);
		this.setState({
			dataChange: !this.state.dataChange
		})
	}

	render(){
		const {tempBanner, comList:{ curPage, totalPage, list}, is_valid} = communityStore;
		const {hasData,dataChange} = this.state;
		return(
			hasData?(
				<div className="community-wrap">
					<div className="white_card topic">
						<div className="card_hd"><span>话题</span> <a href={`./topicList.html`}>查看全部 <Icon type="right" size="xs" className="right_arrow" />	</a></div>
						<div>
							<BannerSmall data={tempBanner} dataChange={dataChange}  />
						</div>
					</div>
					<div className="white_card">
						{
							console.log('userInfoId',userInfo.id)
						}
						{
							list&&list.length?(
								<InfiniteScroll
									style={{textAlign:'center'}}
									threshold={100}
									pageStart={1}
									loadMore={ this.triggerNextList.bind(this)}
									hasMore={ curPage < totalPage }
									loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
								>
									{
										list.map((item,index)=> <Item key={item.id} data={item} delSuccess={ ()=>{this.handleDel(index)} } />)
									}
								</InfiniteScroll>
							):null
						}
					</div>
					{is_valid ?<a href="./post.html" className="postBtn" />:null}
					<TabBar />
				</div>
			):(<div className="routerLoading"><Icon type="loading" size="lg" /></div>)
		)
	}
}

render(<Index />,document.getElementById('root'));
