import { observable } from 'mobx';
import Request from '../../service/baseAxios';
import { getQuery } from '../../libs/utils';

const detail =  observable({
	detail:{},
	tempBanner: [],
	discussionInfo:[],
	// 获取直播详情
	async getLivingInfo(){
		this.detail = await Request('/app/live/detail', {id: getQuery('detail')});
	},
	// 获取评论列表
	async getCommInfo(){
		const res = await Request('/app/live/commentList',{live_id: getQuery('detail'), curPage: 1, pageSize: 10});
		if(res.list && res.list.length){
			Object.assign(this.discussionInfo, res.list);
		}
	},
});

export default detail;