import Request from "../service/baseAxios";

const user =  {
	info:{},
	async getInfo(){
		const curUserInfo = window.localStorage.getItem('XQN_USERINFO');
		if(curUserInfo && typeof curUserInfo ==='object'){
			Object.assign(this.info,JSON.parse(curUserInfo));
		}else{
			const res = await Request('/app/member/info',{});
			window.localStorage.setItem('XQN_USERINFO', JSON.stringify(res));
			Object.assign(this.info,res);
		}
	},
};
user.getInfo();
export default user.info;