import React, { PureComponent } from 'react';
// import { observer } from 'mobx-react';
import { createForm } from 'rc-form';
import { Modal , List } from 'antd-mobile';
import './tagForm.less';
import Request from '../../service/baseAxios';

// @observer
class Form extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			nameError:'',
		}
	}

	render() {
		const { tagError } = this.state;
		const { form, visible, triggerApplyModal, userId} = this.props;
		const { getFieldProps } = form;
		return (
			<Modal
				visible={visible}
				closable={true}
				transparent
				maskClosable
				className="apply-modal"
				onClose={()=>{ triggerApplyModal(false) } }
				title="添加印象"
			>
				<List renderHeader={() => <div>标签 <span className="error">{tagError}</span></div>}>
					<input {...getFieldProps('tag')} placeholder="请输入标签" />
				</List>
				<div className="bottom">
					<a
						onClick={()=>{
							const {validateFields, resetFields} = form;
							validateFields(async (err, fieldsValue) => {
								if (err) return;
								if(!fieldsValue.tag){
									this.setState({
										tagError: '不能为空'
									});
									return;
								}
								await Request('/app/member/impressAdd',{member_id: userId, impress: fieldsValue.tag});
								this.props.handleChangeImpress();
								// fieldsValue 为要提交的数据
								// console.log('表单内容',fieldsValue);
								// console.log('userId',userId);
								resetFields();
								triggerApplyModal(false);
							});
						}}
						className="btn_big btn_blue"
					>
						提交
					</a>
				</div>
			</Modal>
		);
	}
}

export default createForm()(Form);