import { observable } from 'mobx';
import Request from '../../service/baseAxios';

const friends =  observable({
	allUsers:{
		pageSize: 10,
		curPage: 1,
		list:[],
		pageCount: 0,
		totalPage: 0,
		totalCount: 0
	},
	friendsInfo:{
		pageSize: 10,
		curPage: 1,
		list:[],
		pageCount: 0,
		totalPage: 0,
		totalCount: 0
	},
	applyInfo:{
		pageSize: 10,
		curPage: 1,
		list:[],
		pageCount: 0,
		totalPage: 0,
		totalCount: 0
	},
	// 获取全部
	async getAllList(){
		const{curPage, pageSize} = this.allUsers;
		if(curPage===1){
			Object.assign(this.allUsers,{
				pageSize: 10,
				curPage: 1,
				list:[],
				pageCount: 0,
				totalPage: 1,
				totalCount: 0,
			});
		}
		const res = await Request('/app/member/allCommMember',{ curPage, pageSize});
		if(res.list && res.list.length){
			if(res.curPage===1){
				Object.assign(this.allUsers, res);
			}else{
				const{list} = this.allUsers;
				const newList = [...list,...res.list];
				Object.assign(this.allUsers, {...res, list:newList});
			}
		}
	},
	// 获取好友
	async getFriendsList(){
		const{curPage, pageSize} = this.friendsInfo;
		if(curPage===1){
			Object.assign(this.friendsInfo,{
				pageSize: 10,
				curPage: 1,
				list:[],
				pageCount: 0,
				totalPage: 1,
				totalCount: 0,
			});
		}
		const res = await Request('/app/member/myFriends',{ curPage, pageSize});
		if(res.list && res.list.length){
			if(res.curPage===1){
				Object.assign(this.friendsInfo, res);
			}else{
				const{list} = this.friendsInfo;
				const newList = [...list,...res.list];
				Object.assign(this.friendsInfo, {...res, list:newList});
			}
		}
	},
	// 获取申请
	async getApplyList(){
		const{curPage, pageSize} = this.applyInfo;
		if(curPage===1){
			Object.assign(this.applyInfo,{
				pageSize: 10,
				curPage: 1,
				list:[],
				pageCount: 0,
				totalPage: 1,
				totalCount: 0,
			});
		}
		const res = await Request('/app/member/myApply',{ curPage, pageSize});
		if(res.list && res.list.length){
			if(res.curPage===1){
				Object.assign(this.applyInfo, res);
			}else{
				const{list} = this.applyInfo;
				const newList = [...list,...res.list];
				Object.assign(this.applyInfo, {...res, list:newList});
			}
		}
	},
	nextPage(tab){
		switch (tab){
			case 0:
				this.allUsers.curPage += 1;
				break;
			case 1:
				this.friendsInfo.curPage += 1;
				break;
			case 2:
				this.applyInfo.curPage += 1;
				break;
		}
	},
});

export default friends;