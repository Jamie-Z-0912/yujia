import { observable } from 'mobx';
import {getCurChannel, getQuery} from "../../libs/utils";
import Request from "../../service/baseAxios";
// import myLike from '../static/img/my_favorite.png';
// import Request from '../service/baseAxios';
// import { Toast } from 'antd-mobile';
const temp = 'http://static.etouch.cn/imgs/upload/1544105125.1216.png';
const data = observable({
	hasData: true,
	detail:{},
	content:{
		text:'杭州静园瑜伽健身有限公司是浙江省瑜伽业的领航者。十余年的专业瑜伽营，静园瑜伽以其独树一帜的教学，专业强大的师资和响誉业内的口碑成就了静园瑜伽当今在国内的品牌影响力，致力于以中国人自己的语言阐述瑜伽，并在全国十几个省、市、地区成立了自己的连锁加盟店。杭州静园瑜伽秉承古典瑜伽风格，结合哈塔瑜伽与王瑜伽精髓，注重身体和心灵的双重提升，以“健康”和“美学”为主旨，全方位系统、专业、唯美的传播瑜伽。并着重教练的选拔、培养，成功的为瑜伽市场输送了首批优秀的瑜伽教练，较早的奠定了专业瑜伽市场和培训平台。杭州静园瑜伽主营会员瑜伽养生、教练培训进修、企业联盟合作、门店',
		img: temp,
	},
	courseMenu: [],
	discussion:[
		{id:1, head_url: temp, user_name: 'PUI', time: 1543852800148, up_num: 33, text: '太棒了！支持！', is_up: true},
		{
			id:2,
			head_url: temp,
			user_name: 'PUI',
			time: 1543852800148,
			up_num: 33,
			text: '太棒了！支持！',
			is_up: false,
			imgs:[temp,temp,temp],
			children:[
				{
					sub_id:21,
					sub_name: 'PIU',
					sub_time: 1543852800148,
					sub_text: '太棒了！支持！',
				},
				{
					sub_id:22,
					sub_name: 'PIU',
					sub_time: 1543852800148,
					sub_text: '太棒了！支持！',
				},
			]
		},
	],
	
	// 获取文章详细信息
	async getDetailInfo(){
		const detailRes = await Request('/app/course/info',{id: getQuery('detail')});
		Object.assign(this.detail, detailRes);
	},
	async getClassList(){
		const res = await Request('/app/course/getClassList',{id: getQuery('detail')});
		Object.assign(this.courseMenu, res);
	}
	// async getClassList(){
	// 	const{curPage, pageSize} = this.courseMenu;
	// 	if(curPage===1){
	// 		Object.assign(this.courseMenu,{
	// 			pageSize: 10,
	// 			curPage: 1,
	// 			list:[],
	// 			pageCount: 0,
	// 			totalPage: 1,
	// 			totalCount: 0,
	// 		});
	// 	}
	//
	// 	const res = await Request('/app/course/getClassList',{
	// 		id: getQuery('detail'),
	// 		curPage: curPage,
	// 		pageSize: pageSize,
	// 	});
	//
	// 	if(res.list && res.list.length){
	// 		if(res.curPage===1){
	// 			Object.assign(this.courseMenu, res);
	// 		}else{
	// 			const{list} = this.courseMenu;
	// 			const newList = [...list, ...res.list];
	// 			Object.assign(this.courseMenu, {...res, list:newList});
	// 		}
	// 	}
	//
	// },
	// nextPage(){
	// 	this.courseMenu.curPage += 1;
	// }
	
});

export default data;