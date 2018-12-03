import Request from "../../service/baseAxios";

document.title = '资讯';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import newsIndexStore from "../../store/newsIndex";
import InfiniteScroll from 'react-infinite-scroller';
import { Icon, ActivityIndicator } from 'antd-mobile';
import TabBar from '../../components/TabBar';
import Banner from '../../components/Banner';
import Item from '../../components/news/Item';
import BannerSmall from '../../components/BannerSmall';
import AD from '../../components/news/Ad';
import './index.less';
import {setChannel, XQN_BASE} from "../../libs/utils";

@observer
class Index extends PureComponent {

	constructor(props){
		super(props);
		this.state = {
			mode: '',
			render_num: 0,
			channelId: null,
			changeMenuData: false,
			curCat: 0,
			hasData: false,
			tabList:[],
		};
	}

	async componentDidMount(){
		const tabList = await Request('/app/channel/channelList', { unit_id: XQN_BASE.unit_id });
		await setChannel(tabList);
		if(!tabList.length) return;
		window.localStorage.setItem('XQN_channelId',tabList[0].id);
		newsIndexStore.getMenuData(tabList[0].id).then(() => {
			const {menuData} = newsIndexStore;
			if(menuData.length){
				this.changeCatId(menuData[0].id);
				this.setState({
					tabList,
					curCat: menuData[0].id,
					changeMenuData: !this.state.changeMenuData,
					hasData: true,
				})
			}
		});
	};

	// 点击栏目，切换内容
	changeCatId(catId){
		newsIndexStore.curCat = catId;
		// 获取数据
		newsIndexStore.newsList.curPage=1;
		newsIndexStore.getNewsList().then(()=> this.setState({changeMenuData: !this.state.changeMenuData}));
		newsIndexStore.getBannerInfo().then(()=> this.setState({changeMenuData: !this.state.changeMenuData}));
		newsIndexStore.getTopicList().then(()=> this.setState({changeMenuData: !this.state.changeMenuData}));
		newsIndexStore.getAdvertise().then(()=> this.setState({changeMenuData: !this.state.changeMenuData}));

		this.setState({render_num:catId,mode: ''});
	}

	// 滑动加载
	triggerNextList(){
		newsIndexStore.nextPage();
		newsIndexStore.getNewsList().then(()=> this.setState({changeMenuData: !this.state.changeMenuData}));
	}

	// 进入广告
	handleIntoAdsLink(url,id){
		newsIndexStore.toAdsLink(url,id);
	}

	render(){
		const { banner, menuData, tempBanner, dy, newsList, news_top3, ads, curCat} = newsIndexStore;
		const {changeMenuData, mode, hasData, tabList} = this.state;
		const {list, curPage, totalPage} = newsList;

		if(mode==='channel'){
			return <div className="channel-wrap">
				<div className="channel-hd"><span>切换频道</span> <div className="cancel" onClick={()=> this.setState({mode: ''})}><Icon type="cross" /></div></div>
				<ul>
					{
						menuData.map(item => (
							<li
								className={item.id === curCat ? 'active' : ''}
								key={item.id}
								onClick={this.changeCatId.bind(this,item.id)}
							>
								<span className='text'>{item.column_name}</span>
							</li>
						))
					}
				</ul>
			</div>
		}

		return(
			hasData ? (
				<div className="news-wrap" style={{minHeight:innerHeight}}>
					<div className="menu_wrap">
						<ul>
							{ menuData.length ?
								menuData.map( item => (
									<li
										className={item.id === curCat ? 'active' : ''}
										key={item.id}
										onClick={this.changeCatId.bind(this,item.id)}
									>
										<span className='text'>{item.column_name}</span>
									</li>
								))
								:null
							}
						</ul>
						<a href="./search.html" className="menu_search" />
						<div className="menu_more" onClick={()=> this.setState({mode: 'channel'})} />
					</div>
					{
						banner.length?<Banner changeMenuData={changeMenuData} data={banner} />:null
					}
					<div className="white_card">
						{
							news_top3 && news_top3.length ? news_top3.map(item=> <Item key={item.id} data={item} /> ):null
						}
					</div>
					{
						tempBanner.length?
							<div className="white_card hot_topic">
								<div className="card_hd"><span>热门专题</span> <a href={`./topicList.html?columnId=${curCat}`} >查看全部 <Icon type="right" size="xs" className="right_arrow" />	</a></div>
								<div>
									<BannerSmall data={[dy,...tempBanner]} />
								</div>
							</div>:null
					}
					{
						ads.id ?
							<div className="white_card" onClick={()=>{this.handleIntoAdsLink(ads.url, ads.id)}}>
								<AD data={ads} />
							</div>
							: null
					}
					<div className="white_card">
						<InfiniteScroll
							style={{textAlign:'center'}}
							threshold={100}
							pageStart={1}
							loadMore={ this.triggerNextList.bind(this)}
							hasMore={ curPage < totalPage }
							loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
						>
							{list.map( item => <Item key={item.id} data={item} /> )}
						</InfiniteScroll>
					</div>
					<TabBar tabList={tabList} />
				</div>
			):<div className="routerLoading"><Icon type="loading" size="lg" /></div>
		)
	}
}

render(<Index />,document.getElementById('root'));
