import { observable } from 'mobx';
import { getQuery } from '../../libs/utils';
import Request from '../../service/baseAxios';

const data =  observable({
	keyword: getQuery('keyword') ? decodeURIComponent(getQuery('keyword')):'',
	resultInfo: {
		pageSize: 10,
		curPage: 1,
		list:[],
		pageCount: 0,
		totalPage: 0,
		totalCount: 0
	},
	historyKeyword: [],
	// 如果没有keyword,获取历史搜索记录。如果有keyword,读取搜索结果
	async getSearchInfo(){
		console.log('搜索的词',this.keyword);
		if(getQuery('keyword')){
			await this.getSearchResult();
		}
		await this.getHistoryInfo();
	},
	// 获取历史搜索记录
	async getHistoryInfo(){
		this.historyKeyword.length = 0;
		// const historyRes = await Request('/app/member/searchList',{});
		const historyRes = [
			{id:1,content:'搜索内容'},
			{id:2,content:'搜索搜索'},
			{id:3,content:'搜索'},
		];
		if(historyRes){
			Object.assign(this.historyKeyword, [...historyRes]);
		}
	},
	// 获取keyword的搜索结果
	async getSearchResult(){
		const{curPage, pageSize} = this.resultInfo;
		if(curPage===1){
			Object.assign(this.resultInfo,{
				pageSize: 10,
				curPage: 1,
				list:[],
				pageCount: 0,
				totalPage: 0,
				totalCount: 0,
			});
		}
		//
		// const res = await Request('/app/information/search',{
		// 	title: decodeURIComponent(getQuery("keyword")),
		// 	curPage,
		// 	pageSize,
		// });
		const res = {
			list:[
				{id: 1, link: './detail.html', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png', name: '理疗瑜伽教练培训', desc:'瑜伽培训相关的课程、学费、老师及学习资讯',order: 3333, original_price: 900, price: 800},
				{id: 2, link: './detail.html', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png', name: '理疗瑜伽教练培训', desc:'瑜伽培训相关的课程、学费、老师及学习资讯',order: 3333, original_price: 900, price: 800},
				{id: 3, link: './detail.html', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png', name: '理疗瑜伽教练培训', desc:'瑜伽培训相关的课程、学费、老师及学习资讯',order: 3333, original_price: 900, price: 800},
				{id: 4, link: './detail.html', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png', name: '理疗瑜伽教练培训', desc:'瑜伽培训相关的课程、学费、老师及学习资讯',order: 3333, original_price: 900, price: 800},
			]
		};
		
		if(res.list && res.list.length){
			if(res.curPage===1){
				Object.assign(this.resultInfo, res);
			}else{
				const{list} = this.resultInfo;
				const newList = [...list,...res.list];
				Object.assign(this.resultInfo, {...res, list:newList});
			}
		}
	},
	nextPage(){
		this.resultInfo.curPage += 1;
	},
	changeKeywordFun(value){
		this.keyword = value;
	},
	// 清空搜索记录
	async clearKeyword(){
		alert('clearKeyword');
		// await Request('/app/member/clearSearch', {});
		// await this.getHistoryInfo();
	},
	// 删除搜索记录
	async deleteKeyword(id){
		console.log('deleteKeyword',id);
		// await Request('/app/member/delSearch', {id});
		// await this.getHistoryInfo();
	}
});

export default data;