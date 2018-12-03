import { observable } from 'mobx';
import temp from '../../static/img/03.png';
import Request from '../../service/baseAxios';

const history =  observable({
	newsList:{
		pageSize: 10,
		curPage: 1,
		pageCount: 0,
		totalPage: 1,
		totalCount: 0,
		list:[],
	},
	goodsList:[
		{id:1, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'http://www.baidu.com/'},
		{id:2, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'http://www.baidu.com/'},
		{id:3, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'http://www.baidu.com/'},
	],
	// 获取资讯浏览历史
	async getNewsList(){
		const{curPage, pageSize} = this.newsList;
		if(curPage===1){
			Object.assign(this.newsList,{
				pageSize: 10,
				curPage: 1,
				list:[],
				pageCount: 0,
				totalPage: 1,
				totalCount: 0,
			});
		}

		const res = await Request('/app/member/historyList',{ curPage, pageSize});

		if(res.list && res.list.length){
			if(res.curPage===1){
				Object.assign(this.newsList, res);
			}else{
				const{list} = this.newsList;
				const newList = [...list,...res.list];
				Object.assign(this.newsList, {...res, list:newList});
			}
		}
	},

	nextPage(tab){
		if(tab===0){
			this.newsList.curPage += 1;
		}
		if(tab===1){
			// this.newsList.curPage += 1;
		}
	},

	async delHistoryFunc(id){
		return await Request('/app/member/historyDel',{id});
	}
});

export default history;