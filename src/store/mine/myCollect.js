import { observable } from 'mobx';
import temp from '../../static/img/03.png';
import Request from '../../service/baseAxios';

const data =  observable({
	articlesInfo: {
		pageSize: 10,
		curPage: 1,
		list:[],
		pageCount: 0,
		totalPage: 0,
		totalCount: 0
	},
	topicsInfo: {
		pageSize: 10,
		curPage: 1,
		list:[],
		pageCount: 0,
		totalPage: 0,
		totalCount: 0
	},
	goodsInfo: {
		pageSize: 10,
		curPage: 1,
		list:[
			{id:1, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'http://www.baidu.com/'},
			{id:2, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'http://www.baidu.com/'},
			{id:3, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'http://www.baidu.com/'},
		],
		pageCount: 0,
		totalPage: 0,
		totalCount: 0
	},
	// 获取收藏的文章
	async getArticle(){
		const{curPage, pageSize} = this.articlesInfo;
		if(curPage===1){
			Object.assign(this.articlesInfo,{
				pageSize: 10,
				curPage: 1,
				list:[],
				pageCount: 0,
				totalPage: 1,
				totalCount: 0,
			});
		}
		const res = await Request('/app/member/collectList',{ curPage, pageSize});
		if(res.list && res.list.length){
			if(res.curPage===1){
				Object.assign(this.articlesInfo, res);
			}else{
				const{list} = this.articlesInfo;
				const newList = [...list,...res.list];
				Object.assign(this.articlesInfo, {...res, list:newList});
			}
		}
	},
	// 获取收藏的话题
	async getTopic(){
		const{curPage, pageSize} = this.topicsInfo;
		if(curPage===1){
			Object.assign(this.topicsInfo,{
				pageSize: 10,
				curPage: 1,
				list:[],
				pageCount: 0,
				totalPage: 1,
				totalCount: 0,
			});
		}
		const res = await Request('/app/member/interCollectList',{ curPage, pageSize});
		if(res.list && res.list.length){
			if(res.curPage===1){
				Object.assign(this.topicsInfo, res);
			}else{
				const{list} = this.topicsInfo;
				const newList = [...list,...res.list];
				Object.assign(this.topicsInfo, {...res, list:newList});
			}
		}
	},
	nextPage(tab){
		switch (tab){
			case 0:
				this.articlesInfo.curPage += 1;
				break;
			case 1:
				this.topicsInfo.curPage += 1;
				break;
			case 2:
				this.goodsInfo.curPage += 1;
				break;
		}
	},
});

export default data;