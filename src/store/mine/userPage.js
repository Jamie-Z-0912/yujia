import { observable } from 'mobx';
import { getQuery } from '../../libs/utils';
import Request from '../../service/baseAxios';
import userInfo from '../../libs/userInfo';
import { Toast } from 'antd-mobile';

const data =  observable({
	info: {
		head_url: '',
		name: '',
		com: '',
		job: '',
		remark: '',
		mobile: '',
		is_friend: '',
	},
	impress: [],
	latestCommInfo: {
		pageSize: 10,
		curPage: 1,
		list:[],
		pageCount: 0,
		totalPage: 0,
		totalCount: 0
	},
	// 获取用户信息
	async getUserInfo(){
		this.info = getQuery('userid') ?
			await Request('/app/member/commMemberInfo',{member_id: getQuery('userid')})
			:userInfo;
	},
	// 获取用户印象
	async getUserImpress(){
		const res = await Request('/app/member/impressList',{member_id: getQuery('userid')||userInfo.id, pageSize: 999});
		if(res.list && res.list.length){
			Object.assign(this.impress, res.list);
		}
	},
	// 获取最新动态
	async getLatestComm(){
		const{curPage, pageSize} = this.latestCommInfo;
		if(curPage===1){
			Object.assign(this.latestCommInfo,{
				pageSize: 10,
				curPage: 1,
				list:[],
				pageCount: 0,
				totalPage: 0,
				totalCount: 0,
			});
		}
		const res = await Request('/app/member/userCommList',{ 
			member_id: getQuery('userid')||userInfo.id,
			curPage,
			pageSize
		});
		if(res.list && res.list.length){
			if(res.curPage===1){
				Object.assign(this.latestCommInfo, res);
			}else{
				const{list} = this.latestCommInfo;
				const newList = [...list,...res.list];
				Object.assign(this.latestCommInfo, {...res, list:newList});
			}
		}
	},
	nextPage(){
		this.latestCommInfo.curPage += 1;
	},
});

export default data;