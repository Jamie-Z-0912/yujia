import { observable } from 'mobx';
import {getQuery, getCurChannel} from "../../libs/utils";
import Request from "../../service/baseAxios";
// import myLike from '../static/img/my_favorite.png';
// import { Toast } from 'antd-mobile';
const data = observable({
	hasData: true,
	line:[
		{id: 1, link: './detail.html', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png', name: '理疗瑜伽教练培训', desc:'瑜伽培训相关的课程、学费、老师及学习资讯',order: 3333, original_price: 900, price: 800},
	],
	pageSize: 10,
	curPage: 1,
	list:[],
	pageCount: 0,
	totalPage: 1,
	totalCount: 0,
	
	async getList(){
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
		
		const res = await Request('/app/course/list',{
			channel_id: getCurChannel(),
			column_id: getQuery('columnId'),
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

export default data;