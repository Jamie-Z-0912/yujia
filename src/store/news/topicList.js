import { observable } from 'mobx';
import { getQuery, channelId } from '../../libs/utils';
import Request from '../../service/baseAxios';

const TopicList =  observable({
	pageSize: 10,
	curPage: 1,
	list:[],
	pageCount: 0,
	totalPage: 0,
	totalCount: 0,
	// 获取话题列表
	async getTopicList(){
		//查看是否还有数据
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
		const data = !getQuery('columnId')?{curPage, pageSize}:{channel_id: channelId, column_id: getQuery('columnId'),curPage, pageSize};

		const res = await Request(!getQuery('columnId')?'/app/information/subscribeList':'/app/information/topicList',data);

		if(res.list && res.list.length){
			if(res.curPage===1){
				Object.assign(this, res);
			}else{
				const{list} = this;
				const newList = [...list, ...res.list];
				Object.assign(this, {...res, list:newList});
			}
		}
	},
	nextPage(){
		this.curPage += 1;
	},
});

export default TopicList;