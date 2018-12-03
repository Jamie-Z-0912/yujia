import { observable } from 'mobx';
import { channelId } from '../../libs/utils';
import Request from '../../service/baseAxios';

const TopicList =  observable({
	curPage: 1,
	totalPage: 0,
	list:[],
	pageCount: 0,
	pageSize: 10,
	totalCount: 0,
	// 获取话题列表
	// 获取互动话题列表
	async getActList(){
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
		const res = await Request('/app/act/list',{channel_id: channelId, curPage, pageSize});
		// console.log('topicList', res);
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

export default TopicList;