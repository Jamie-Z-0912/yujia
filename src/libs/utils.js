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
			if(/\/map\//.test(path)){
				const temp = _.filter(tabList,o=>o.channel_type===3);
				curId = temp.length ? temp[0].id : '';
			}
			if(/\/course\//.test(path)){
				const temp = _.filter(tabList,o=>o.channel_type===4);
				curId = temp.length ? temp[0].id : '';
			}
			if(/\/mine\//.test(path)){
				const temp = _.filter(tabList,o=>o.channel_type===5);
				curId = temp.length ? temp[0].id : '';
			}
		}
		window.localStorage.setItem('XQN_channelId',curId);
		return curId;
	}
	export const channelId = getCurChannel();
	const xiaoQingNing = window.localStorage.getItem('XQN_BASE');
	export const XQN_BASE =  xiaoQingNing ? JSON.parse(xiaoQingNing):{};
	
	export function setChannel(channelRes) {
		window.localStorage.setItem('ChannelArr', JSON.stringify(channelRes));
	}
