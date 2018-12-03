document.title = '社区';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { createForm } from 'rc-form';
import {TextareaItem, Toast, ImagePicker} from 'antd-mobile';
import './post.less';
import Request from '../../service/baseAxios';
import { channelId } from '../../libs/utils';

const data = [];
class Post extends PureComponent{

	constructor(props){
		super(props);
		this.state = {
			files: data,
			multiple: true, // true 可以多选； false 单选
			fileUrl: [],
		};
		this.submitForm = this.submitForm.bind(this);
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

	async submitForm(){
		const {validateFields, resetFields} = this.props.form;
		const {files} = this.state;
		if(!files.length){
			Toast.fail('至少上传一张图片！');
			return;
		}
		validateFields(async (err, fieldsValue) => {
			if (err) return;
			if(!fieldsValue.content){
				Toast.fail('内容不能为空！');
				return;
			}

			this.setState({
				fileUrl: []
			});
			//上传
			for(let i = 0; i < files.length; i++){
				// await this.upLoadSingleImg(files[i].file);
				let fileData = await Request('/app/uploadPic', files[i].file, 'POST', 1);
				this.setState({
					fileUrl: this.state.fileUrl.concat({'pic': fileData})
				})
			}

			// 发送后台
			await Request('/app/community/publish',{
				content: fieldsValue.content,
				pic: JSON.stringify(this.state.fileUrl),
				channel_id: channelId,
			},'POST',0).then(()=>{
				Toast.success('发送成功！',1);
				setTimeout(() => {
					window.history.back();
				}, 1500);
			});

			resetFields();
		});
	}

	render() {
		const {form:{getFieldProps}} = this.props;
		const { files } = this.state;
		return (
			<div className="post-wrap" style={{minHeight: innerHeight}}>
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
				<div>
					<ImagePicker
						length={3}
						files={files}
						onChange={this.onChange.bind(this)}
						onImageClick={(index, fs) => console.log(index, fs)}
						selectable={files.length < 9}
						multiple={this.state.multiple}
						// onAddImageClick={this.onAddImageClick}
					/>
				</div>
				<div className="options">
					<a className="btn_blue btn_big" onClick={this.submitForm.bind(this)}>提 交</a>
					<a className="btn_big btn_gray" onClick={()=>{window.history.back();}}>取 消</a>
				</div>
			</div>
		);
	}
}

const PostWrap =  createForm()(Post);

render(<PostWrap />,document.getElementById('root'));