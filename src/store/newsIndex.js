import { observable } from 'mobx';
import myLike from '../static/img/my_favorite.png';
import Request from '../service/baseAxios';
// import { Toast } from 'antd-mobile';
// import temp from '../static/img/03.png';

const newsIndex = observable({
	channelId:'',
	curCat: 0,
	menuData : [],
	banner: [],
	tempBanner: [],
	dy: { id:99920180925, name: '我的订阅', link:'./topicList.html', theme_img1: myLike },
	news_top3:[],
	newsList: {
		pageSize: 10,
		curPage: 1,
		list:[],
		pageCount: 0,
		totalPage: 1,
		totalCount: 0,
	},
	ads: {},
	hasData: false,

	// 获取栏目列表
	async getMenuData(){
		this.channelId = window.localStorage.getItem('XQN_channelId');
		const _menuData = await Request('/app/channel/columnList', {channelId:this.channelId});
		Object.assign(this.menuData, _menuData);
	},
	// 获取banner轮播图
	async getBannerInfo(){
		const res = await Request('/app/information/infoList',{channel_id: this.channelId, column_id: this.curCat, type: 2});
		console.log('banner', res);
		if(res.length){
			const temp = res.map(item => {return {...item,link: `./detail.html?origin=news&detail=${item.id}`}});
			this.banner = temp;
		}else{
			this.banner=[];
		}
	},
	// 获取热门专题list
	async getTopicList(){
		const topicRes = await Request('/app/information/topicList',{channel_id: this.channelId, column_id: this.curCat, curPage: 1, pageSize: 15});
		console.log('topic', topicRes);
		if(topicRes.list && topicRes.list.length){
			const temp = topicRes.list.map(item => {return {...item,link: `./topicDetail.html?origin=news&detail=${item.id}&columnId=${this.curCat}`}});
			this.tempBanner = temp;
		}else{
			this.tempBanner=[];
		}
	},
	// 获取广告list
	async getAdvertise(){
		const adsRes = await Request('/app/adv/list',{channel_id: this.channelId, column_id: this.curCat, curPage: 1, pageSize: 20});
		console.log('adv', adsRes);

		if(adsRes.list && adsRes.list.length){
			const index = Math.floor(Math.random() * adsRes.list.length);
			this.ads = adsRes.list[index];
		}else{
			this.ads ={};
		}
	},
	// 获取新闻list
	async getNewsList(){
		const{channelId, curCat, newsList:{curPage,pageSize}} = this;
		if(curPage===1){
			Object.assign(this.newsList,{
				pageSize: 10,
				curPage: 1,
				list:[],
				pageCount: 0,
				totalPage: 1,
				totalCount: 0,
			});
			this.news_top3=[];
		}
		const res = await Request('/app/information/infoList',{
			channel_id: channelId,
			column_id: curCat,
			type: 3, 
			curPage: curPage,
			pageSize: pageSize,
		});

		if(res.list && res.list.length){
			if(res.curPage===1){
				Object.assign(this.news_top3, res.list.slice(0,3));
				Object.assign(this.newsList, {...res,list:res.list.slice(3)});
			}else{
				const{list} = this.newsList;
				const newList = [...list,...res.list];
				Object.assign(this.newsList, {...res, list:newList});
			}
		}
	},

	nextPage(){
		const{newsList:{curPage}} = this;
		Object.assign(this.newsList, {...this.newsList, curPage:curPage+1});
	},
	// 进入广告链接
	async toAdsLink(url,id){
		await Request('/app/adv/click',{id: id});
		window.location.href = url;
	}
});

export default newsIndex;