import { observable } from 'mobx';

import temp1 from '../../static/img/08.png';
import temp from '../../static/img/03.png';

const data =  observable({
	shopping:[
		{
			shop_id: 1002,
			shop_name: '青柠课堂',
			shop_icon: temp1,
			freight: 15,
			list:[
				{
					id: 11,
					img: temp,
					name: '【青柠课堂】小清柠特别定制版双立人道具一套',
					price: 1290,
					link:'./detail.html',
					size: 's',
					color: '蓝色',
					counter: 3,
					selected: true,
					activity: '满1000减500',
				},
				{
					id: 21,
					img: temp,
					name: '【青柠课堂】小清柠特别定制版双立人道具一套',
					price: 1290,
					link:'./detail.html',
					size: 's',
					color: '蓝色',
					counter: 3,
					selected: false,
					activity: '满1000减500',
				},
			],
		}
	],
	recommend:[
		{id:1, img: temp, name: '小清柠特别定制版双立人道具一套', price: 1290, link:'./detail.html'},
		{id:2, img: temp, name: '戴森吹风机 进口家用 HD01 紫红色', price: 3230, link:'./detail.html'},
		{id:3, img: temp, name: 'Bose Companion5多媒体扬声器系统', price: 1120, link:'./detail.html'},
		{id:4, img: temp, name: '小清柠特别定制版双立人道具一套', price: 2320, link:'./detail.html'},
		{id:5, img: temp, name: '戴森吹风机 进口家用 HD01 紫红色', price: 1240, link:'./detail.html'},
		{id:6, img: temp, name: 'Bose Companion5多媒体扬声器系统', price: 8110, link:'./detail.html'},
	],
	changeGoodsNum(shopId, id, num){
		console.log(`修改 商铺ID：${shopId} 中得商品${id}数量为${num}`)
	},
	selectGoods(shopId,id){
		alert(`选择 商铺ID：${shopId} 中得商品${id}`);
	},
	selectShop(shopId){
		alert(`全选 商铺ID：${shopId} 的商品`);
	},
	deleteGoods(shopId, id){
		alert(`删除 商铺ID：${shopId} 中得商品${id}`);
	},
	selectedAll(){
		alert('选择所有店铺所有商品');
	}
});

export default data;