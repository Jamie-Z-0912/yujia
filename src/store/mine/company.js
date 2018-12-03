import { observable } from 'mobx';
import Request from '../../service/baseAxios';
import { getQuery } from '../../libs/utils';

const company =  observable({
	info:{
		id: 1,
		avatar: '',
		cover: '',
		name: '',
		fans_num: 0,
		article_num: 0,
		has_focus: false,
	},
	articlesInfo: {
		pageSize: 10,
		curPage: 1,
		list: [],
		pageCount: 0,
		totalPage: 0,
		totalCount: 0
	},
	// 获取单位信息
	async getUnitInfo(){
		this.info  = await Request('/app/information/author',{unit_id: getQuery("unitId")});
	},
	// 获取单位文章列表
	async getUnitArticle(){
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

		const res = await Request('/app/information/authorList',{unit_id: getQuery('unitId'), curPage, pageSize});

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
	nextPage(){
		this.articlesInfo.curPage += 1;
	},
});

export default company;