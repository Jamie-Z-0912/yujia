import { observable } from 'mobx';
import Request from '../../service/baseAxios';
import { getQuery } from '../../libs/utils';

const data =  observable({
	pageSize: 10,
	curPage: 1,
	list:[],
	pageCount: 0,
	totalPage: 0,
	totalCount: 0,
	async getUsersListApi(){
		const{curPage, pageSize} = this;
		if(curPage===1){
			Object.assign(this,{
				pageSize: 10,
				curPage: 1,
				list:[],
				pageCount: 0,
				totalPage: 0,
				totalCount: 0,
			});
		}
		const res = await Request('/app/act/signUserList',{
			id: getQuery('id'),
			curPage: curPage,
			pageSize: pageSize,
		});

		if(res.list && res.list.length){
			if(res.curPage===1){
				Object.assign(this, res);
			}else{
				const{list} = this;
				const newList = [...list,...res.list];
				Object.assign(this, {...res, list:newList});
			}
		}
	},
	nextPage(){
		this.curPage += 1;
	},
});

export default data;