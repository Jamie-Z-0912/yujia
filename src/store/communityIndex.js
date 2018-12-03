import { observable } from 'mobx';
import Request from '../service/baseAxios';
import {channelId} from '../libs/utils';

const communityIndex = observable({
	tempBanner: [],
	is_valid: false,
	comList: {
		pageSize: 10,
		curPage: 1,
		list:[],
		pageCount: 0,
		totalPage: 1,
		totalCount: 0,
	},
	async getUserValid(){
		const res = await Request('/app/member/checkLevelPermission',{permission:'publish_community'});
		if(res) this.is_valid = res.is_valid;
	},
	// 获取帖子列表
	async getListFunc(){
		const{ comList:{curPage,pageSize}} = this;
		if(curPage===1){
			Object.assign(this.comList,{
				pageSize: 10,
				curPage: 1,
				list:[],
				pageCount: 0,
				totalPage: 1,
				totalCount: 0,
			});
		}
		const res = await Request('/app/community/list',{
			channel_id: channelId,
			curPage: curPage,
			pageSize: pageSize,
		});

		if(res.list && res.list.length){
			if(res.curPage===1){
				Object.assign(this.comList, res);
			}else{
				const{list} = this.comList;
				const newList = [...list, ...res.list];
				Object.assign(this.comList, {...res, list:newList});
			}
		}
	},
	nextPage(){
		const{comList:{curPage}} = this;
		Object.assign(this.comList, {...this.comList, curPage:curPage+1});
	},
	// 获取互动话题列表
	async getActList(){
		const actRes = await Request('/app/act/list',{channel_id: channelId});
		if(actRes.list && actRes.list.length){
			this.tempBanner = actRes.list.map(item => {return {...item,link: `./topicDetail.html?origin=interaction&acttype=${item.interaction_type}&detail=${item.id}`}});
		}
	}
});

export default communityIndex;