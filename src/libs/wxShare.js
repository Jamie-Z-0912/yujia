import Request from '../service/baseAxios';

export async function wxShare(opt) {
	const data = await Request('/app/wechat/getWechatData',{
			url: window.location.href
		},'POST');

	if (data.nonceStr != null && data.nonceStr !== "") {
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: data.appId, // 必填，公众号的唯一标识
			timestamp: data.timestamp, // 必填，生成签名的时间戳
			nonceStr: data.nonceStr, // 必填，生成签名的随机串
			signature: data.signature,// 必填，签名，见附录1
			jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideAllNonBaseMenuItem', 'showMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		//分享链接的缩略图
		const imgUrl = opt.img;
		//分享链接的链接地址
		const lineLink = opt.url;
		//分享链接的描述信息
		const descContent = opt.desc;
		//分享链接的标题
		const shareTitle = opt.title;

		wx.ready(function () {
			wx.onMenuShareTimeline({
				title: shareTitle, // 分享标题
				link: lineLink, // 分享链接
				imgUrl: imgUrl, // 分享图标
			});
			wx.onMenuShareAppMessage({
				title: shareTitle, // 分享标题
				desc: descContent, // 分享描述
				link: lineLink, // 分享链接
				imgUrl: imgUrl, // 分享图标
			});
			wx.hideAllNonBaseMenuItem();
			wx.showMenuItems({
				menuList: ['menuItem:share:appMessage','menuItem:share:timeline'] // 要显示的菜单项，所有menu项见附录3
			});
		});

		wx.error(function (res) {
			//alert("验证不通过");
			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		});
	}
}