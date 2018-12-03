import { observable } from 'mobx';
import Request from '../../service/baseAxios';
import { getQuery } from '../../libs/utils';

const detail =  observable({
	info:{
		id:'',
		comment:{
			list:[],
		},
	},
	// 评论后更新文章评论
	async updateDiscuss(){
		const discussRes = await Request('/app/community/commentList',{
			community_id: getQuery('detail'),
			curPage: 1,
			pageSize: 10
		});
		Object.assign(this.info.comment, {
			list:discussRes.list
		});
	},
	// 获取文章详细信息
	async getDetailInfo(){
		const detailRes = await Request('/app/community/detail',{id: getQuery('detail')});
		Object.assign(this.info, {
			id:'',
			comment:{ list:[] },
			...detailRes,
		});
	}
});

export default detail;