import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { createForm } from 'rc-form';
import {TextareaItem, Toast} from 'antd-mobile';
import './feedback.less';
import Request from '../../service/baseAxios';

document.title = '意见反馈';
class Feedback extends PureComponent{

	submitForm(){
		const {validateFields, resetFields} = this.props.form;
		validateFields(async (err, fieldsValue) => {
			if (err) return;
			if(!fieldsValue.content){
				Toast.fail('内容不能为空！');
				return;
			}
			// console.log(fieldsValue.content);
			await Request('/app/member/opinion',{content: fieldsValue.content}).then(()=>{
				Toast.success('提交成功，感谢您的反馈！', 1);
				setTimeout(() => {
					window.history.back();
				}, 1500);
			})
			resetFields();
		});
	}

	render(){
		const {form:{getFieldProps}} = this.props;
		return(
			<div className="feedback-wrap">
				<div className="title">问题或意见</div>
				<div className="viewTextArea">
					<TextareaItem
						{...getFieldProps('content')}
						placeholder="请留下您的问题，我们会尽快与您联系"
						rows={8}
						count={200}
						editable
						clear
					/>
				</div>
				<div className="options">
					<a className="btn_blue btn_big" onClick={this.submitForm.bind(this)}>提 交</a>
				</div>
			</div>
		)
	}
}

const FeedbackWrap =  createForm()(Feedback);

render(<FeedbackWrap />,document.getElementById('root'));