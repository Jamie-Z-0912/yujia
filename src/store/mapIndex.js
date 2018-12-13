import { observable } from 'mobx';
// import myLike from '../static/img/my_favorite.png';
// import Request from '../service/baseAxios';
// import { Toast } from 'antd-mobile';
const icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAMAAAArteDzAAAAflBMVEUAAAD/wtL/wtL/wtL/wtL/wtL/wtL/wtL/wtL/wtL/wtL/wtL/wtL/wtL/wtL/wtL/wtL/wtL/wtL/wtL/wtL/wtL/wtL/g6P/f53+epj+dpL+bIb+cY39Zn7/h6f9Ynn/rcH/tMf/n7b/u8z/mrL/kq//pLv+lKn+jaP/jaz15OLnAAAAFnRSTlMA9aLCDwYxJBrpybRs261dkn1R0WRzVeczbQAAAotJREFUWMOs0stygkAQheHuGZCbiJd4Rq0UxT3x/V8wurBUeiAD+LGbxU9XV9O/gv1O6TRiMKcHrXb7gJYJM5VCSFUW0kzeWmOQXns03UoxRrFaTU0mcJBMyYYKjpTrcv0jwxkffXIQxJgkdjixjDERZzTO32KGrT/a3GCWzUjV05hJe4PNA2Y7eAPNGAvE1qqfYJHEJ2mLhbYkZFhM3GvAWIyD3kJjfED8vtY1PmJNL0LGR3BITwofop7NFazqomqvbdOVeFUWze21KmrYrOghgU2XP7TlM9nkD5Utm4wOWl7zF5X40V0xMqqCVOTvWtw1vdducKseQyhN371aiVc5K3uDN5oboUNppHrgVjWEyljUVyO16NN0E0IyNnJ6+6ghEX1BKIw5yc/+WKHvi4g2ENqTuxx9GyKKIOQTogZ9EVEA6TQFhID2kMzZnSW6px2kfELUQNiRgvSzLKpIQyrPF+evgaAphcXp4qyGkFIEi865+QspIsaiUWtITLCqL99OGtj8FWfGugkDQRDdw8j4CiNBrGmIFXCimP//wpAS7Xq8gEa8s1y+ws15Zqwg5JxyzgixiuetV4QU67FkPa0xI6baB5atn/RcsUBvDYiVsOxEYxtw6xg+zImNHcCt/wb3pk4c7AhuHcMzg3C0Hbh1jKBO7MwqKJeHndVdfJ5zwukuvgGr1q87fsAZ3M9E/AWck9HZjSZjzTsbFiJi65QME9uSsWadZctjhLdO+SjRIsH3zfmLdVoXJBiX05TJ0j7yvE6rCGeSGKkIvJJorigRFHWHopiRVEiKsktRyykKREXVqShlBfWxouhWVPKC8UAwc7x/kHltOuJ0w77CUfdDZ5T8HIdS+9wc9wfnEu/nfM6gUwAAAABJRU5ErkJggg==';
const data = observable({
	hasData: true,
	banner:[
		{id: 1, link: './list.html', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png'},
		{id: 2, link: './list.html', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png'},
		{id: 3, link: './list.html', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png'},
	],
	venue:{
		filter:{},
		list:[
			{
				id: 1,
				img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png',
				certified: true,
				name:'KOUJAR场馆',
				desc: '小朋友都爱的常州恐龙园，新开张啦！我园增添了很多设施，一定是安全第一！',
				star: 4,
				book: 233,
				view: 432,
				distance: 800,
				coupon: {
					num: 200,
					text:'第四届国际瑜伽日，特别开放课程体验',
				},
			},
			{
				id: 1,
				img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png',
				certified: false,
				name:'红公馆',
				desc: '小朋友都爱的常州恐龙园，新开张啦！我园增添了很多设施，一定是安全第一！',
				star: 3,
				book: 233,
				view: 432,
				distance: 800,
			},
			{
				id: 1,
				img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png',
				certified: false,
				name:'May场馆',
				desc: '小朋友都爱的常州恐龙园，新开张啦！我园增添了很多设施，一定是安全第一！',
				star: 2,
				book: 233,
				view: 432,
				distance: 800,
			},
		],
	},
	teacher:{
		filter:{},
		list:[
			{
				id: 1,
				img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png',
				certified: true,
				name:'KOUJAR.May',
				desc: '小朋友都爱的常州恐龙园，新开张啦！我园增添了很多设施，一定是安全第一！',
				internal: false,
				book: 233,
				view: 432,
				distance: 800,
				coupon: {
					num: 200,
					text:'第四届国际瑜伽日，特别开放课程体验',
				},
			},
			{
				id: 1,
				img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png',
				certified: false,
				name:'KOUJAR.May',
				desc: '小朋友都爱的常州恐龙园，新开张啦！我园增添了很多设施，一定是安全第一！',
				internal: true,
				book: 233,
				view: 432,
				distance: 800,
			},
			{
				id: 1,
				img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png',
				certified: false,
				name:'KOUJAR.May',
				desc: '小朋友都爱的常州恐龙园，新开张啦！我园增添了很多设施，一定是安全第一！',
				internal: true,
				book: 233,
				view: 432,
				distance: 800,
			},
		],
	},
});

export default data;