import { observable } from 'mobx';
// import temp from '../static/img/03.png';
// import photo from '../static/img/02.png';
import Request from '../service/baseAxios';
import { getQuery } from '../libs/utils';

const LivingIndex =  observable({
	pageSize: 10,
	curPage: 1,
	list:[],
	pageCount: 0,
	totalPage: 1,
	totalCount: 0,
	// 获取直播列表
	async getLiving(){
		const{curPage, pageSize} = this;
		if(curPage===1){
			Object.assign(this,{
				pageSize: 10,
				curPage: 1,
				list:[],
				pageCount: 0,
				totalPage: 1,
				totalCount: 0,
			});
		}

		const res = await Request('/app/live/list',{
			channel_id: getQuery("channelId"),
			curPage: curPage,
			pageSize: pageSize,
		});

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

export default LivingIndex;