import _ from 'lodash';
const user_agent = navigator.userAgent.toLowerCase();

	/**
	 * 获取浏览器参数
	 * www.xxx.com?a=123&b=1234
	 * @returns
	 */
	export function getQuery(name){
		const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		const r = window.location.search.substr(1).match(reg);
		if (r !== null) {
			return unescape(r[2]);
		}
		return null;
	}

	/**
	 * 判断是否是手机号
	 * @param phoneNumber
	 * @returns {boolean}
	 */
	export function isPhone(phoneNumber){
		return /^(1+\d{10})$/.test(phoneNumber);
	}
	/**
	 * 判断是否在微信里
	 * @returns {boolean}
	 */
	export const isWechat = (/micromessenger/i).test(user_agent);

	function getCurChannel() {
		const channelArr = window.localStorage.getItem('ChannelArr');
		const tabList = channelArr ? JSON.parse(channelArr):[];
		const path = location.pathname;
		let curId = '';
		if(tabList.length){
			if(/\/news\//.test(path)){
				const temp = _.filter(tabList,o=>o.channel_type===1);
				curId = temp.length ? temp[0].id : '';
			}
			if(/\/community\//.test(path)){
				const temp = _.filter(tabList,o=>o.channel_type===2);
				curId = temp.length ? temp[0].id : '';
			}
			if(/\/living\//.test(path)){
				const temp = _.filter(tabList,o=>o.channel_type===3);
				curId = temp.length ? temp[0].id : '';
			}
			if(/\/mall\//.test(path)){
				const temp = _.filter(tabList,o=>o.channel_type===4);
				curId = temp.length ? temp[0].id : '';
			}
		}
		if(/\/mine\//.test(path)){
			curId = 99920180910;
		}
		window.localStorage.setItem('XQN_channelId',curId);
		return curId;
	}
	export const channelId = getCurChannel()||window.localStorage.getItem('XQN_channelId');

	const xiaoQingNing = window.localStorage.getItem('XQN_BASE');
	export const XQN_BASE =  xiaoQingNing ? JSON.parse(xiaoQingNing):{};

	//
const MINE_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAmCAMAAACIwYlVAAAAb1BMVEUAAADIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMj4m1dwAAAAJHRSTlMA+gtSE/bWJ9HBnJV4Re26qI1cLwXozLOhnzQa8t3KiW5rZiA4SiYAAAAA3UlEQVQ4y63S6w6CMAyGYQYyQI4CKohnv/u/RmM0TNa0TYzv7yfNljag9e2+AmzeBXoHi0/rULORwVy6km35sk6Ls1dbLMolnMOrEwYbHzc8vsLP8H+sQYpYfKR4wz4ZtD2HE9Cyv+AQtHXAZSluWbwhNg758xReQdt51iQCjshgqWxhK/n6k5gchlDL3IV2/+dA7T7jWseNW8ik0KmAa9cJ8lGkWGZvzLrLGqBVRU9pZMF0Kv1dZBC69IuxMcSa79dCq3A4VfHWYej9iI1qY4cHFY8Oh4M824zvpT8BQ1xpRJrYhLUAAAAASUVORK5CYII=";
const MINE_ACTIVE_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAmCAMAAACIwYlVAAAAbFBMVEUAAAAytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnoytnqmjnqeAAAAI3RSTlMA+gtSE/bWwCfRtpyVeEXtqI1cLwXozKGfNBry3cqJbmtmIPErSLcAAADcSURBVDjLrdLrDoIwDIZhBjIOchIQEM9+93+PxmicrLZNjO/vJ82WNqD1bV4DtugCvZ3Fq3Wo2cjgXbaSbfWwTouzV1ssKiRcwKsTBhsfNzw+w8/wf8xBili8p3jDPhm0nMMpaMlfcAjaOuCyFLcs3hAbh/x5Cq+gDZ41qXTNZLBUsrC1fP1pTA5DqGXuQrv/Y6B2JZsWatxCZoXOJVxDJ8hbmWGZvTDrrnJ8qS57SiMLpkPl7yKB0KlfjI0h1ny+Flqlw5mKtw5D70dsVBs7PKp4cjgc5dlmei79Dg3LZlVFT2TwAAAAAElFTkSuQmCC";
const mine = {
	id: 99920180910,
	channel_type: 5,
	channel_name: "我的",
	uncheck_channel_img_url: MINE_ICON,
	channel_img_url: MINE_ACTIVE_ICON,
	share_desc: "小清柠",
	share_title: "我的",
	is_banner: 0,
	is_label: 0,
	is_read: 0,
};

export function setChannel(channelRes) {
	const temp = [...channelRes, mine];
	window.localStorage.setItem('ChannelArr', JSON.stringify(temp));
}
