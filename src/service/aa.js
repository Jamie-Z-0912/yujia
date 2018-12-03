
	axios('base/app/tokenRefresh', {
		baseURL: BACKENDURL,
		withCredentials: false,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		method: 'POST',

		data: {
			"token": window.localStorage.getItem('XQN_TOKEN'),
			"refreshToken": window.localStorage.getItem('XQN_REFRESHTOKEN')
		},

		transformRequest: [function (data) {
			let ret = '';
			for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			}
			return ret
		}],
	}).then((res) => {
		if (res.status === 200) {
			// 将获取到的token存到localstorage
			window.localStorage.setItem('XQN_TOKEN',res.data.resultList.token);
			return true;
		} else {
			console.log(res.status, res.statusText);
		}
	});