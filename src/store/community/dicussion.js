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
	// 获取评论信息
	async getDiscussionList(){
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
		const id = getQuery('origin')==='interaction'? {interaction_id: getQuery('detail')}:{community_id: getQuery('detail')};
		const res = await Request( getQuery('origin')==='interaction'?'/app/act/commentList':'/app/community/commentList',{
			...id,
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
	// 评论后更新文章评论
	async updateDiscuss(){
		this.curPage = 1;
		await this.getDiscussionList();
	}
});

export default data;