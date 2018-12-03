import { observable } from 'mobx';
import Request from '../../service/baseAxios';

const message =  observable({
	commentInfo:{
		pageSize: 10,
		curPage: 1,
		list:[],
		pageCount: 0,
		totalPage: 0,
		totalCount: 0
	},
	noticeInfo:{
		pageSize: 10,
		curPage: 1,
		list:[],
		pageCount: 0,
		totalPage: 0,
		totalCount: 0
	},
	// 获取评论
	async getCommitList(){
		const{curPage, pageSize} = this.commentInfo;
		if(curPage===1){
			Object.assign(this.commentInfo,{
				pageSize: 10,
				curPage: 1,
				list:[],
				pageCount: 0,
				totalPage: 1,
				totalCount: 0,
			});
		}
		const res = await Request('/app/member/commentList',{ curPage, pageSize});
		if(res.list && res.list.length){
			if(res.curPage===1){
				Object.assign(this.commentInfo, res);
			}else{
				const{list} = this.commentInfo;
				const newList = [...list,...res.list];
				Object.assign(this.commentInfo, {...res, list:newList});
			}
		}
	},
	// 获取通知
	async getNoticeList(){
		const{curPage, pageSize} = this.noticeInfo;
		if(curPage===1){
			Object.assign(this.noticeInfo,{
				pageSize: 10,
				curPage: 1,
				list:[],
				pageCount: 0,
				totalPage: 1,
				totalCount: 0,
			});
		}
		const res = await Request('/app/member/notices',{ curPage, pageSize});
		if(res.list && res.list.length){
			if(res.curPage===1){
				Object.assign(this.noticeInfo, res);
			}else{
				const{list} = this.noticeInfo;
				const newList = [...list,...res.list];
				Object.assign(this.noticeInfo, {...res, list:newList});
			}
		}
	},
	nextPage(tab){
		if(tab===0){
			this.commentInfo.curPage += 1;
		}
		if(tab===1){
			this.noticeInfo.curPage += 1;
		}
	},
});

export default message;