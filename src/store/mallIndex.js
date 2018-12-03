import { observable } from 'mobx';

import temp from '../static/img/03.png';
import temp2 from '../static/img/06.png';
const data={
	banner: [
		{id:1, link:'./detail.html', cover:temp},
		{id:2, link:'./detail.html', cover:temp},
		{id:3, link:'./detail.html', cover:temp},
	],
	nav:[
		{id:1, link:'http://www.baidu.com', cover: temp2, text: '数码产品'},
		{id:2, link:'http://www.baidu.com', cover: temp2, text: '数码产品'},
		{id:3, link:'http://www.baidu.com', cover: temp2, text: '数码产品'},
		{id:4, link:'http://www.baidu.com', cover: temp2, text: '数码产品'},
	],
	list:[
		{
			name: '今日推荐',
			id: 1,
			link: 'http://www.baidu.com',
			data:[
				{id:11, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
				{id:12, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
				{id:13, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
				{id:13, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
			],
		},
		{
			name: '热门好物',
			id: 2,
			link: 'http://www.baidu.com',
			img: temp,
			data:[
				{id:21, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
				{id:22, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
				{id:23, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
				{id:23, img: temp, name: '小清柠特别定制版-四件套专业FS系列（FS-7）', price: 3200, link:'./detail.html'},
			],
		},
	]
};

export default data;