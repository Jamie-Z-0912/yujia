import axios from 'axios';
import { stringify } from 'qs';
import base64url from 'base64-url';
import _ from 'lodash';
import { getQuery, XQN_BASE, setChannel} from "../libs/utils";

/**
 *
 * 测试地址
 * */
// const isDev = false; // process.env.NODE_ENV==='development';
//
// const apiUrl = isDev ?'http://10.0.0.15:8080/xqn3/':'http://demo.jsqiaotuo.com/base/';
// const WEBURL = isDev ?'http://10.0.0.15:8080/xqn3/': 'http://demo.jsqiaotuo.com/base/';
// const APPID = isDev ?'wx00637b9c4e898a1a': 'wxce362bb78a65ff5b';
// const REDIRECTURL = isDev ?'http://xqn.njlime.com/lime/': 'http://demo.jsqiaotuo.com/base/';
if(!XQN_BASE.unit_id){
	Object.assign(XQN_BASE,{
		unit_id: getQueryStr('unit_id'),
		appId: getQueryStr('appId'),
		baseFile: location.pathname.split('/')[1],
	});
	window.localStorage.setItem('XQN_BASE', JSON.stringify(XQN_BASE));
}
const apiUrl = 'http://testxqn.jslime.com/xqnback';
// const APPID = XQN_BASE.appId;
// const REDIRECTURL = 'http://demo.jsqiaotuo.com/base/';

const timestamp = new Date().getTime();

// async function getToken(isUpdate) {
// 	const options = {
// 		headers: {
// 			'Content-Type': 'application/x-www-form-urlencoded'
// 		},
// 		baseURL: apiUrl,
// 		method: 'POST',
// 		transformRequest: [function (data) {
// 			let ret = '';
// 			for (let it in data) {
// 				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
// 			}
// 			return ret;
// 		}],
// 		withCredentials: false,
// 	};
// 	if(isUpdate){
// 		options.data = {
// 			"token": window.localStorage.getItem('XQN_TOKEN'),
// 			"refreshToken": window.localStorage.getItem('XQN_REFRESHTOKEN'),
// 		};
// 	}else{
// 		options.params = {
// 			code: getQuery('code'),
// 		};
// 	}
//
// 	await axios(isUpdate ? '/app/tokenRefresh':'/app/getToken', options).then(async (res) => {
// 		if (res.status === 200) {
// 			// 将获取到的token存到localstorage
// 			if(res.data.resCode===0){
// 				window.localStorage.setItem('XQN_TOKEN',res.data.resultList.token);
// 				if(isUpdate){
// 					location.reload();
// 				}else{
// 					window.localStorage.setItem('XQN_REFRESHTOKEN',res.data.resultList.refreshToken);
// 				}
// 			}else if(res.data.resCode===8){
// 				// token 过期， 请求微信登陆
// 				window.localStorage.removeItem('XQN_TOKEN');
// 				window.localStorage.removeItem('XQN_REFRESHTOKEN');
// 				const	uri = base64url.encode(window.location.href);
// 				// window.location.href = `${REDIRECTURL}app/wechat/getWxCode?appid=${APPID}&backUri=${apiUrl}app/token?backUrl=${uri}&state=${XQN_BASE.unit_id}`;
// 			}
// 		} else {
// 			console.log(res.status, res.statusText);
// 		}
// 	});
// }

// 获取数据
const getResultData = function(url, data, method = 'GET',isFile){
	console.log(url,"获取数据");
	if(isFile){
		let param = new FormData();  // 创建form对象
		param.append('uploadFile', data);  // 通过append向form对象添加数据
		const optfile = {
			headers: {
				"Authorization": window.localStorage.getItem('XQN_TOKEN')||'',
				'Content-Type': 'multipart/form-data'
			},
			baseURL: apiUrl,
		};

		return axios.post(url, param, optfile).then(res => {
			if (res.status === 200) {
				// 如果token过期，则更新token，否则成功返回数据
				if(res.data.resCode === 0){
					return res.data.resultList||res.data;
				}else if(res.data.resCode === 8){
					console.log("token过期，重新获取");
					getToken(true);
				}else {
					return res.data;
				}
			} else {
				console.log(res.status, res.statusText);
			}
		}).catch((e) => {
			console.log(e.code);
		});
	}else{
		const opt = {
			headers: {
				"Authorization": window.localStorage.getItem('XQN_TOKEN')||'',
			},
			baseURL: apiUrl,
			method: method === 'POST'? 'POST':'GET',
		};
		if(method === 'POST'){
			opt.data = data || {};
			opt.transformRequest = [function (data) {
				let ret = '';
				for (let it in data) {
					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}]
		}else{ //默认GET
			opt.params = {...data,timestamp} || {timestamp};
		}

		return axios(url, opt).then(res => {
			if (res.status === 200) {
				// 如果token过期，则更新token，否则成功返回数据
				if(res.data.resCode === 0){
					return res.data.resultList||res.data;
				}else if(res.data.resCode === 8){
					console.log("token过期，重新获取");
					getToken(true);
				}else {
					return res.data;
				}
			} else {
				console.log(res.status, res.statusText);
			}
		}).catch((e) => {
			console.log(e.code);
		});
	}
};

const getChannelArrFunc = async ()=>{
	const channelArr = window.localStorage.getItem('ChannelArr');
	if(!channelArr){
		const channelRes = await getResultData('/app/channel/channelList', { unit_id: XQN_BASE.unit_id });
		await setChannel(channelRes);
	}

};

/**
 * 步骤:
 * 1. 判断localStorage是不是存在token，如果存在则2，如果不存在则4
 * 2. 存在token：将token带到header请求头中，如果token过期，返回resCode为8，则3，如果未过期，则继续向下执行。
 * 3. token过期：调用'/app/tokenRefresh'接口，重新获取token，如果tokenRefresh时token过期，调微信登陆。
 * 4. 获取Code：跳转授权链接，获取Code，然后5
 * 5. 获取token：根据Code，调用'/app/getToken'接口，获取对应的token，并放到localStorage.
 */

export default async function request(url, data, method = 'GET',isFile = 0) {
	// 第 1 步：判断是否存在token
	// let xqnToken = window.localStorage.getItem('XQN_TOKEN');
	// 第 4 步: 不存在token，获取Code !xqnToken：包括 xqnToken == undefined || xqnToken == null || xqnToken == ''
	// if(!xqnToken || xqnToken === 'undefined') {
	// 	console.log('不存在token，重新获取');
	// 	const code = getQuery('code');
	// 	const uri = base64url.encode(window.location.href);
	// 	// if (!code) {
	// 	// 	// 没有code，申请授权并将code返回当前页面;
	// 	// 	window.location.href = `${REDIRECTURL}app/wechat/getWxCode?appid=${APPID}&backUri=${apiUrl}app/token?backUrl=${uri}&state=${XQN_BASE.unit_id}`;
	// 	// 	return;
	// 	// } else {
	// 	// 	// 有code，根据code获取token;
	// 	// 	await getToken();
	// 	// }
	// }
	getChannelArrFunc().then(() =>{
		const channelArr = window.localStorage.getItem('ChannelArr');
		if(channelArr){
			const tabList = JSON.parse(channelArr);
			const path = location.pathname;
			let curId ;
			if(/\/news\//.test(path)){
				const temp = _.filter(tabList,o=>o.channel_type===1);
				curId = temp.length ? temp[0].id:'';
			}
			if(/\/community\//.test(path)){
				const temp = _.filter(tabList,o=>o.channel_type===2);
				curId = temp.length ? temp[0].id:'';
			}
			if(/\/living\//.test(path)){
				const temp = _.filter(tabList,o=>o.channel_type===3);
				curId = temp.length ? temp[0].id:'';
			}
			if(/\/mall\//.test(path)){
				const temp = _.filter(tabList,o=>o.channel_type===4);
				curId = temp.length ? temp[0].id:'';
			}
			if(/\/mine\//.test(path)){
				curId = 99920180910;
			}
			window.localStorage.setItem('XQN_channelId',curId);
		}
	});
	return await getResultData(url, data, method, isFile);
}