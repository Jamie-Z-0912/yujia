import { observable } from 'mobx';
import Request from '../../service/baseAxios';

const myFocus =  observable({
	pageSize: 10,
	curPage: 1,
	list:[],
	pageCount: 0,
	totalPage: 0,
	totalCount: 0,
	// 获取我的关注列表
	async getMyFocus(){
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
		const res = await Request('/app/member/focusList',{ curPage, pageSize});
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

export default myFocus;