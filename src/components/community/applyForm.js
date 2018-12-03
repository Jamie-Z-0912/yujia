import React, { PureComponent } from 'react';
import { createForm } from 'rc-form';
import moment from 'moment';
import { Modal , List, Toast,Checkbox, Radio, DatePicker } from 'antd-mobile';
import './applyForm.less';
import Request from '../../service/baseAxios';
import { wechatPay } from '../../libs/wxPay';
import {isPhone} from "../../libs/utils";

const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;
let multiValue =[];
class Form extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			nameError:'',
			attr:[],
		};
	}

	async signUpFunc(data){
		const {attr} = this.state;
		const{topicId, triggerApplyModal, is_charge, callback} = this.props;
		const getPayId = is_charge ? await Request('/app/act/signUpOrderNew',{id:topicId}):{};

		if(is_charge){
			await wechatPay(getPayId.orderId,()=>{ Toast.success('付费成功！', 2)});
		}
		const res = await Request('/app/act/subSignUpNew',{...data, attr: JSON.stringify(attr), id:topicId, orderId: getPayId.orderId||''});
		if(!res.resCode){
			Toast.success('报名成功！', 2);
			callback();
		}else{
			Toast.fail(res.message, 2);
		}
		triggerApplyModal(false);

	}

	changeText(v,index,type){
		const temp = this.state.attr;
		if(type===5 && v.length===11 && !isPhone(v)){
			Toast.fail('请输入正确地手机号',2);
			return;
		}
		temp[index]=v;
		this.setState({
			attr:[...temp],
		});
	}
	getElements(item ,index){
		const { attr }=this.state;
		const data = [];
		for (let opt in item){
			if(opt.indexOf('option')===0){
				data.push({ value: item[opt], label: item[opt] })
			}
		}
		return(
			<div>
				{
					data.map(i => (
						item.type===3?
							<CheckboxItem key={i.value} onChange={e => {
								const vv = i.value;
								console.log(vv);
								if(e.target.checked){
									multiValue.push(vv);
								}else{
									const temp=[];
									for (let ii =0, len = multiValue.length;ii<len;ii++) {
										if(multiValue[ii]!==vv){temp.push(multiValue[ii])}
									}
									multiValue=temp;
								}
								this.changeText(multiValue.join(','), index, item.type);
							}}>
								{i.label}
							</CheckboxItem>
							:
							<RadioItem key={i.value} checked={attr[index] === i.value} onChange={() => {
								this.changeText(i.value, index, item.type);
							}}>
								{i.label}
							</RadioItem>
					))
				}
			</div>
		)
	}

	render() {
		const { nameError, attr } = this.state;
		const { form, visible, triggerApplyModal, modelList} = this.props;
		if(!attr.length && modelList&&modelList.length){
			for (let i=0; i < modelList.length; i++){
				this.state.attr.push('');
			}
		}
		const { getFieldProps } = form;
		return (
			<Modal
				visible={visible}
				closable={true}
				transparent
				maskClosable
				className="apply-modal"
				onClose={()=>{ triggerApplyModal(false) } }
				title="报名表"
			>
				<List renderHeader={() => <div>姓名 <span className="error">{nameError}</span></div>}>
					<input {...getFieldProps('name')} placeholder="请输入姓名" />
				</List>
				{
					modelList&&modelList.length?
						modelList.map((item, index)=>
							// item.type 1文本2单选3多选4时间5手机号
							<List key={item.title} renderHeader={() => <div>{item.title} </div>}>
								{
									item.type===1||item.type===5?<input onChange={(e)=>this.changeText(e.target.value, index, item.type)} />:null
								}
								{
									item.type===2||item.type===3? this.getElements(item, index):null
								}
								{
									item.type===4?
										<DatePicker
											mode="date"
											value={attr[index]?new Date(attr[index]):''}
											onChange={date => {
												this.changeText(moment(date).format('YYYY-MM-DD'), index, item.type)
											}}
										>
											<div style={{height:'.3rem',lineHeight:'.3rem'}}>{attr[index]? moment(attr[index]).format('YYYY年MM月DD日'):''}</div>
										</DatePicker>
										:null
								}
							</List>
						):null
				}
				<div className="bottom">
					<a 
						onClick={()=>{
							const {validateFields, resetFields} = form;
							validateFields((err, fieldsValue) => {
								if (err) return;
								if(!fieldsValue.name){
									this.setState({
										nameError: '不能为空'
									});
									return;
								}
								this.signUpFunc(fieldsValue);

								resetFields();
							});
						}} 
						className="btn_big btn_blue"
					>
						保存并报名
					</a>
					<div className="tips">
						提示：通过报名申请的，管理员将通过消息形式发送电子凭证，请在个人中心消息中查看哦~
					</div>
				</div>
			</Modal>
		);
	}
}

export default createForm()(Form);