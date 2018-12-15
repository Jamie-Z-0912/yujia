import axios from 'axios';
import { stringify } from 'qs';
import { getQuery, XQN_BASE, setChannel} from "../libs/utils";

if(!XQN_BASE.unit_id){
	Object.assign(XQN_BASE,{
		unit_id: getQuery('unit_id'),
		baseFile: location.pathname.split('/')[1],
	});
	window.localStorage.setItem('XQN_BASE', JSON.stringify(XQN_BASE));
}
const apiUrl = 'http://xqn.jslime.com/xqnback/';
const timestamp = new Date().getTime();

/**
 * 步骤:
 * 1. 判断localStorage是不是存在token，如果存在则2，如果不存在则4
 * 2. 存在token：将token带到header请求头中，如果token过期，返回resCode为8，则3，如果未过期，则继续向下执行。
 * 3. token过期：调用'/app/tokenRefresh'接口，重新获取token，如果tokenRefresh时token过期，调微信登陆。
 * 4. 获取Code：跳转授权链接，获取Code，然后5
 * 5. 获取token：根据Code，调用'/app/getToken'接口，获取对应的token，并放到localStorage.
 */

export default async function request(url, data, method = 'GET',isFile = 0) {
	console.log(url,"获取数据");
	if(url.indexOf('channel/channelList')<0){
		const channelArr = window.localStorage.getItem('ChannelArr');
		if(!channelArr){
			const channelRes = await getResultData('/app/channel/channelList');
			setChannel(channelRes);
		}
	}
	if(isFile){
		let param = new FormData();  // 创建form对象
		param.append('uploadFile', data);  // 通过append向form对象添加数据
		param.append('unit_id', XQN_BASE.unit_id);
		const optfile = {
			headers: {
				"Authorization": window.localStorage.getItem('XQN_TOKEN')||'',
				'Content-Type': 'multipart/form-data'
			},
			baseURL: apiUrl,
		};
		
		return axios.post(url, param, optfile).then(res => {
			if (res.status === 200) {
				if(res.data.resCode === 200){
					if(res.data.resObject && res.data.resObject.token){
						window.localStorage.setItem('XQN_TOKEN',res.data.resObject.token);
					}
					return res.data.resObject||res.data;
				}else if(res.data.resCode === 444){
					window.location.href = res.data.resObject.backurl;
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
		const dataCur = data ? {...data, unit_id: XQN_BASE.unit_id}:{unit_id: XQN_BASE.unit_id};
		const opt = {
			headers: {
				"Authorization": window.localStorage.getItem('XQN_TOKEN')||'',
			},
			baseURL: apiUrl,
			method: method === 'POST'? 'POST':'GET',
		};
		if(method === 'POST'){
			opt.data = dataCur;
			opt.transformRequest = [function (data) {
				let ret = '';
				for (let it in data) {
					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}]
		}else{ //默认GET
			opt.params = {...dataCur,stamp: timestamp};
		}
		
		return axios(url, opt).then(res => {
			if (res.status === 200) {
				if(res.data.resCode === 200){
					if(res.data.resObject && res.data.resObject.token){
						window.localStorage.setItem('XQN_TOKEN',res.data.resObject.token);
					}
					return res.data.resObject||res.data;
				}else if(res.data.resCode === 444){
					window.location.href = res.data.resObject.backurl;
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
	
}