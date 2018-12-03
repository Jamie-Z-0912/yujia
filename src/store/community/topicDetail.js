import { observable } from 'mobx';
import { getQuery } from '../../libs/utils';
import Request from '../../service/baseAxios';

const TopDetail =  observable({
	type: getQuery('acttype'),
	detail:{},
	activityUser:[],
	list:[],
	// 获取互动详情
	async getActInfo(){
		let actInfoRes;
		// _actType类型：1报名 2答题 3投票 4抽奖 5众筹 6话题
		switch(this.type){
			case '6':
				actInfoRes = await Request('/app/act/detail',{id: getQuery('detail')});
				break;
			case '3':
				actInfoRes = await Request('/app/act/voteDetail',{id: getQuery('detail')});
				break;
			case '1':
				actInfoRes = await Request('/app/act/signDetail',{id: getQuery('detail')});
				const userRes = await Request('/app/act/signUserList',{id: getQuery('detail'), curPage: 1, pageSize:10});
				this.activityUser = userRes.list||[];
				break;
		}
		this.detail = actInfoRes;
		
	},

	async getActDiscuss(){
		const res = await Request('/app/act/commentList',{
			interaction_id: getQuery('detail'),
			curPage: 1,
			pageSize: 10,
		});

		if(res.list && res.list.length){
			Object.assign(this.list, res.list);
		}
	},
	//投票并更新状态
	async topicVote(ids){
		return await Request('/app/act/voteNew',{interaction_id: getQuery('detail'),ids: ids});
	},

});

export default TopDetail;