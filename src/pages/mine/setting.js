import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import { createForm } from 'rc-form';
import userInfo from '../../libs/userInfo';
import {InputItem, Toast, Picker, List, DatePicker} from 'antd-mobile';
import { district, provinceLite } from 'antd-mobile-full-demo-data';
import './setting.less';
import Request from '../../service/baseAxios';

document.title = '个人设置';

const sexArr = [
	{
		label: '保密',
		value: 0,
	},
	{
		label: '男性',
		value: 1,
	},
	{
		label: '女性',
		value: 2,
	},
];
class Setting extends PureComponent{
	constructor(props){
		super(props);
			// head_url: userInfo.head_url,
			// nick_name: userInfo.nick_name,
			// mobile: userInfo.mobile,
			// sex: userInfo.sex,
			// email: userInfo.email,
			// address: userInfo.address,
			// com: userInfo.com,
			// job: userInfo.job,
			// area_id: userInfo.area_id,
			// area_name: userInfo.area_name,
			// city_id: userInfo.city_id,
			// city_name: userInfo.city_name,
			// province_id: userInfo.province_id,
			// province_name: userInfo.province_name,
			// remark: userInfo.remark,
		console.log(userInfo.head_url);
		this.state = {
			...userInfo,
			counter: 0,
			files: [{url:userInfo.head_url,id:11}],
			city: '',
			dataChange: false,
		}
	}

	componentDidMount(){
		const t = setInterval(() => {
			if (userInfo.head_url) {
				clearInterval(t);
				this.setState({
					...userInfo,
					...this.state,
					files: [{url:userInfo.head_url,id:11}],
				});
			}
		}, 100);
		console.log(userInfo.head_url);
	}

	submitForm(){
		const {birthday} = this.state;
		const {validateFields, resetFields} = this.props.form;
		validateFields(async (err, fieldsValue) => {
			if (err) return;
			if(!fieldsValue.nick_name){
				Toast.fail('昵称不能为空！');
				return;
			}
			console.log(fieldsValue);
			const res = await Request('/app/member/edit',{
				nick_name: fieldsValue.nick_name,
				mobile: fieldsValue.mobile,
				sex: fieldsValue.sex[0],
				email: fieldsValue.email,
				address: fieldsValue.address,
				birthday,
				com: fieldsValue.com,
				job: fieldsValue.job,
				remark: fieldsValue.remark,
				area_id: fieldsValue.city[0],
				city_id: fieldsValue.city[1],
				province_id: fieldsValue.city[2],
			});
			if(res.resCode){
				Toast.info(res.message, 1)
			}else{
				Toast.info('修改成功~', 1);
			}
			// resetFields();
		});
	}

	sendCode(){
		this.setState({ counter: 60});
		this.clock = setInterval(() => {
			const curCounter = this.state.counter;
			if (curCounter <= 0) {
				clearInterval(this.clock);
				return;
			}
			this.setState({
				counter: curCounter - 1,
			});
		}, 1000);
	}

	render(){
		const {form:{getFieldProps}} = this.props;
		const {
			head_url,
			nick_name,
			mobile,
			sex,
			email,
			address,
			com,
			job,
			remark,
			area_id,
			city_id,
			province_id,
			birthday,
			area_name,
			city_name,
			province_name,
		} = this.state;
		return(
			<div className="setting-wrap">
				<List className="setting_item no_arrow">
					<List.Item arrow="horizontal">头像</List.Item>
					<div className="photo">
						<img src={head_url} alt="" />
					</div>
				</List>
				<div className="setting_item">
					<InputItem {...getFieldProps('nick_name', {
							initialValue: nick_name,
					})} placeholder="请填写">昵称</InputItem>
				</div>
				<List className="setting_item">
					{/* <List.Item arrow="horizontal">手机号</List.Item>
					<div className={`phone_txt ${phone?'has':''}`}>{phone ? phone :'请绑定手机号（仅好友可见）'}</div> */}
					<InputItem {...getFieldProps('mobile', {
							initialValue: mobile,
					})} placeholder="请填写手机号（仅好友可见）">手机号</InputItem>
				</List>
				<List className="setting_item">
					<Picker
						data={sexArr}
						cols={1}
						{...getFieldProps('sex', {
							initialValue: [sex],
						})}
						// onChange={ (i, v) =>{
						// 	console.log(i);
						// 	console.log(v);
						// 	settingStore.changeValues.bind(settingStore,{sex:v})
						// } }
					>
						<List.Item arrow="horizontal">性别</List.Item>
					</Picker>
				</List>
				<List className="setting_item">
					<DatePicker
						mode="date"
						minDate={new Date(1900, 1, 1, 0, 0, 0)}
						value={birthday?new Date(birthday):''}
						onChange={date => this.setState({ birthday:moment(date).format('YYYY-MM-DD') })}
					>
						<List.Item arrow="horizontal">生日</List.Item>
					</DatePicker>
				</List>
				<div className="setting_item">
					<InputItem {...getFieldProps('email', {initialValue: email})} placeholder="请填写">邮箱</InputItem>
				</div>
				<List className="setting_item">
					<Picker
						extra="请选择"
						data={district}
						title="地址"
						{...getFieldProps('city', {
							initialValue: [area_id ? area_id.toString():'', city_id?city_id.toString():'', province_id?province_id.toString():''],
						})}
						onOk={e => console.log('ok', e)}
						onDismiss={e => console.log('dismiss', e)}
					>
						<List.Item arrow="horizontal">城市</List.Item>
					</Picker>
				</List>
				<div className="setting_item">
					<InputItem {...getFieldProps('address', {initialValue: address})} placeholder="请填写">地址</InputItem>
				</div>
				<div className="setting_item">
					<InputItem {...getFieldProps('com', {initialValue: com})} placeholder="请填写">公司</InputItem>
				</div>
				<div className="setting_item">
					<InputItem {...getFieldProps('job', {initialValue: job})} placeholder="请填写">职位</InputItem>
				</div>
				<div className="setting_item">
					<InputItem
						{...getFieldProps('remark', {
							initialValue: remark
						})}
						labelNumber={5}
						placeholder="请填写"
					>个人介绍</InputItem>
				</div>
				<div className="options">
					<a className="btn_blue btn_big" onClick={this.submitForm.bind(this)}>保 存</a>
				</div>
			</div>
		)
	}
}

const SettingWrap =  createForm()(Setting);

render(<SettingWrap />,document.getElementById('root'));