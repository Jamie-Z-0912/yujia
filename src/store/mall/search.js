import { observable } from 'mobx';
import { getQuery } from '../../libs/utils';

import temp from '../../static/img/03.png';

const data = observable({
	keyword: getQuery('keyword') ? decodeURIComponent(getQuery('keyword')):'',
	order: 0, //  排序方式
	list:[
		{id:1, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
		{id:2, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
		{id:3, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
	],
	category:[
		{
			cate_name: '热门推荐',
			cate_id: 1,
			data:[
				{id:11, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
				{id:12, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
				{id:13, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
			],
		},
		{
			cate_name: '生鲜水果',
			cate_id: 2,
			data:[
				{id:21, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
				{id:22, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
				{id:23, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
			],
		},
		{
			cate_name: '进口食品',
			cate_id: 3,
			data:[
				{id:31, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
				{id:32, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
				{id:33, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
			],
		},
		{
			cate_name: '休闲零食',
			cate_id: 4,
			data:[
				{id:41, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
				{id:42, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
				{id:43, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
			],
		},
		{
			cate_name: '酒水饮料',
			cate_id: 5,
			data:[
				{id:51, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
				{id:52, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
				{id:53, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
			],
		},
	],

	changeKeywordFun(value){
		this.keyword = value;
		console.log(value);
	},
});

export default data;