import React, { PureComponent } from 'react';
import { render } from 'react-dom';
// import {getQuery} from '../../libs/utils';
import { createForm } from 'rc-form';
import {InputItem, Toast, Picker, List} from 'antd-mobile';
import './invoice.less';

document.title = '申请发票';
const typeArr = [
	{
		label: '企业',
		value: 'Q',
	},
	{
		label: '个人',
		value: 'P',
	},
];
const conArr=[
	{
		label: '商品明细',
		value: 'details',
	},
	{
		label: '商品类型',
		value: 'type',
	},
];
// @observer
class Edit extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			type: 'Q',
			title: '',
			number: '',
			content: 'details',
		}
	}

	componentDidMount(){
		const res = this.getInvoice();
		this.setState({
			...res,
		});
	}

	getInvoice(){
		const res = {
			type: 'Q',
			title: '',
			number: '',
			content: 'details',
		};
		return res;
	}

	changeType(v){
		this.setState({
			type: v,
		})
	}
	onChangeContent(v){
		this.setState({
			content: v,
		})
	}

	submitForm(){
		const {validateFields, resetFields} = this.props.form;
		validateFields((err, fieldsValue) => {
			if (err) return;
			if(!fieldsValue.title){
				Toast.fail('发票抬头不能为空！');
				return;
			}
			console.log(fieldsValue);
			resetFields();
		});
	}

	render(){
		const {form:{getFieldProps}} = this.props;
		const {
			type,
			title,
			number,
			content,
		} = this.state;
		return(
			<div className="edit-wrap" style={{minHeight:innerHeight}}>
				<List className="edit_item">
					<Picker
						data={typeArr}
						value={type}
						cols={1}
						onOk={v => this.changeType(v)}
					>
						<List.Item arrow="horizontal">发票类型</List.Item>
					</Picker>
				</List>
				<List className="edit_item">
					<InputItem {...getFieldProps('title', {
						initialValue: title,
					})} placeholder="请填写">发票抬头</InputItem>
				</List>
				<List className="edit_item">
					<InputItem {...getFieldProps('number', {
						initialValue: number,
					})} placeholder="请填写">企业税号</InputItem>
				</List>
				<List className="edit_item">
					<div className="value">
						{conArr.map(i => (
							<span
								key={i.value}
								className={`checkbox ${i.value===content?'selected':''}`}
								onClick={ this.onChangeContent.bind(this, i.value)}
							>{i.label}</span>
						))}
					</div>
					<List.Item arrow="horizontal">发票内容</List.Item>
				</List>

				<div className="options">
					<div className="tips">提示：发票将显示详细商品名称和价格信息；优惠券不计入发票金额</div>
					<a className="btn_blue btn_big" onClick={this.submitForm.bind(this)}>提交</a>
				</div>
			</div>
		)
	}
}

const EditWrap = createForm()(Edit);

render(<EditWrap />,document.getElementById('root'));