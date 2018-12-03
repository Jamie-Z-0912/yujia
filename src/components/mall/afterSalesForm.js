import React, { PureComponent } from 'react';
// import { observer } from 'mobx-react';
import { createForm } from 'rc-form';
import { ImagePicker, TextareaItem, Toast, InputItem } from 'antd-mobile';
import './afterSalesForm.less';

const data = [{
	url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
	id: '2121',
}];

// @observer
class AfterSalesForm extends PureComponent{

	constructor(props){
		super(props);
		this.state = {
			files: data,
			multiple: true, // true 可以多选； false 单选
		};
	}
	onChange(files, type, index) {
		console.log(files, type, index);
		this.setState({
			files,
		});
	};

	// //自定义选择图片的方法
	// onAddImageClick(e){
	// 	e.preventDefault();
	// 	this.setState({
	// 		files: this.state.files.concat({
	// 			url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
	// 			id: '3',
	// 		}),
	// 	});
	// };

	submitForm(){
		const {validateFields, resetFields} = this.props.form;
		const {files} = this.state;
		validateFields((err, fieldsValue) => {
			if (err) return;
			if(!fieldsValue.content){
				Toast.fail('内容不能为空！');
				return;
			}
			console.log('图片', files);
			console.log('文字', fieldsValue.content);
			resetFields();
		});
	}

	render() {
		const {form:{getFieldProps}, type} = this.props;
		const { files } = this.state;
		return (
			<div className="form-wrap">
				<div className="form-label">问题描述</div>
				<div className="viewTextArea">
					<TextareaItem
						{...getFieldProps('content')}
						placeholder="这一刻的想法……"
						rows={4}
						// count={200}
						editable
						clear
					/>
				</div>
				<div className="form-label">上传凭证</div>
				<div>
					<ImagePicker
						length={4}
						files={files}
						onChange={this.onChange.bind(this)}
						onImageClick={(index, fs) => console.log(index, fs)}
						selectable={files.length < 9}
						multiple={this.state.multiple}
						// onAddImageClick={this.onAddImageClick}
					/>
				</div>
				{
					type==='exchange'?(
						<div className="form-more">
							<div className="form-label">换货收件地址</div>
							<div className="form-item">
								<label>收件人</label>
								<div className="value"><InputItem {...getFieldProps('name')} /></div>
							</div>
							<div className="form-item">
								<label>手机号</label>
								<div className="value"><InputItem {...getFieldProps('mobile')} /></div>
							</div>
							<div className="form-item">
								<label className="block">收货地址<span>（平台寄回给您的地址）</span>	</label>
								<div className="value"><InputItem {...getFieldProps('address')} /></div>
							</div>
						</div>
					):null
				}
				<div style={{marginLeft:'-.1rem'}}><div className="options">确认并提交</div></div>
			</div>
		);
	}
}

export default createForm()(AfterSalesForm);