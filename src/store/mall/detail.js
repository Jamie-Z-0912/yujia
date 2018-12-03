import { observable } from 'mobx';

import temp from '../../static/img/03.png';

const detail =  observable({
	product:{
		id: 11,
		images:[temp, temp, temp],
		title: '小清柠特别定制版-双立人Z 专业S系列Friodur牛排刀（4件套）',
		price: 2399,
		original_price: 4900,
		attr:[
			{type: 'voucher', text: '领券', content: '满1000减100'},
			{type: 'service', text: '服务', content: '15天退货·订单险·运费险'},
			{type: 'choose', text: '已选', content: ''},
		],
		detail:'',
		unit: '件',
		sizeArr: ['S', 'M', 'L', 'XL','XXL'],
		colorArr: ['黑色', '黑白条纹', '黄色', '深蓝色'],
	},
	recommend:[
		{id:1, img: temp, name: '小清柠特别定制版双立人道具一套', price: 1290, link:'./detail.html'},
		{id:2, img: temp, name: '戴森吹风机 进口家用 HD01 紫红色', price: 3230, link:'./detail.html'},
		{id:3, img: temp, name: 'Bose Companion5多媒体扬声器系统', price: 1120, link:'./detail.html'},
		{id:4, img: temp, name: '小清柠特别定制版双立人道具一套', price: 2320, link:'./detail.html'},
		{id:5, img: temp, name: '戴森吹风机 进口家用 HD01 紫红色', price: 1240, link:'./detail.html'},
		{id:6, img: temp, name: 'Bose Companion5多媒体扬声器系统', price: 8110, link:'./detail.html'},
	],
	discussion: [
		{
			id: 1,
			avatar: temp,
			nick: '魏无羡',
			time: 1536318827815,
			content:'天天开心,当我走进大公园的时候，我看见美丽的花。艾尔凯乐科技大时空裂缝好。',
			product:{
				color:'黑色',
				size: 'XL'
			}
		},
		{
			id: 2,
			avatar: temp,
			nick: '魏无羡',
			time: 1536318827815,
			content:'天天开心,当我走进大公园的时候，我看见美丽的花。艾尔凯乐科技大时空裂缝好。',
			product:{
				color:'黑色',
				size: 'XL'
			}
		},
	],
	voucher:[
		{id: 1, money: 100, norm: 2000, link: 'http://www.baidu.com', start_time: 1535731200000, end_time: 1538236800000},
		{id: 2, money: 50, norm: 1000, link: 'http://www.baidu.com', start_time: 1535731200000, end_time: 1538236800000},
		{id: 3, money: 50, norm: 1000, link: 'http://www.baidu.com', start_time: 1535731200000, end_time: 1538236800000},
	],
	service:[
		{id: 1, title: '正品保证', desc: '该商品由中国人保承保正品保证险'},
		{id: 2, title: '七天无理由退换货', desc: '消费者在满足7天无理由退换货的前提下，可以提出"7天无理由退换货"的申请'},
		{id: 3, title: '运费险', desc: '消费者在满足7天无理由退换货的前提下，可以提出"7天无理由退换货"的申请，可以提出'},
	],
	hasChoose:{
		size: '',
		color: '',
		count: 1,
	},

	changeChoose(opt){
		this.hasChoose = Object.assign(this.hasChoose,opt);
		console.log(this.hasChoose);
	},
	addShoppingCart(){
		const {size, color, count} = this.hasChoose;
		alert(`将 ${size} ${color} ${count} 加入购物车`);
	},
	buyFunc(){
		const {size, color, count} = this.hasChoose;
		alert(`购买 ${size} ${color} ${count} `);
	},

	addCollect(){
		const {size, color, count} = this.hasChoose;
		alert(`将 ${size} ${color} ${count} 收藏`);
	},

});

export default detail;