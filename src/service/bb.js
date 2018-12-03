
	// 有code，根据code获取token;
	axios('/base/app/getToken', {
		baseURL: BACKENDURL,
		withCredentials: false,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		method: 'POST',

		params: {
			code: code
		},

		transformRequest: [function (data) {
			let ret = '';
			for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			}
			return ret
		}],
	}).then(async (res) => {
		if (res.status === 200) {
			// 将获取到的token存到localstorage
			if(res.data.resultList){
				window.localStorage.setItem('XQN_TOKEN',res.data.resultList.token);
				window.localStorage.setItem('XQN_REFRESHTOKEN',res.data.resultList.refreshToken);
			}else{
				Toast.fail(`${res.data.resCode}：${res.data.message}`);
			}
			// await getResultData(gurl, gdata, gmethod, gisFile);
			// return true;
		} else {
			console.log(res.status, res.statusText);
		}
	});