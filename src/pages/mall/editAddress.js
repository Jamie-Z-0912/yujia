import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import {getQuery} from '../../libs/utils';
import { createForm } from 'rc-form';
import {InputItem, Toast, Picker, List, Switch} from 'antd-mobile';
import { district, provinceLite } from 'antd-mobile-demo-data';
import './editAddress.less';

document.title = '收货地址';

// @observer
class Edit extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			id: '',
			name: '',
			mobile: '',
			province: '',
			city: '',
			area: '',
			street: '',
			isDefault: false,
		}
	}

	componentDidMount(){
		if(getQuery('id')){
			const res = this.getAddress();
			this.setState({
				...res,
			})
		}
	}

	getAddress(){
		const res = {
			id: 2,
			name: '大名',
			mobile: '190999999',
			province: '340000',
			city: '341500',
			area: '341502',
			street: '大马路188号街心花园40栋808',
			isDefault: true,
		};
		return res;
	}

	submitForm(){
		const {validateFields, resetFields} = this.props.form;
		validateFields((err, fieldsValue) => {
			if (err) return;
			if(!fieldsValue.name){
				Toast.fail('收货人不能为空！');
				return;
			}
			console.log(fieldsValue);
			resetFields();
		});
	}

	deleteAddress(){
		const {id} = this.state;
		alert(`删除：${id}地址`);
	}

	render(){
		const {form:{getFieldProps}} = this.props;
		const {
			name,
			mobile,
			province,
			city,
			area,
			street,
			isDefault,
		} = this.state;
		return(
			<div className="edit-wrap">
				<div className="edit_item">
					<InputItem {...getFieldProps('name', {
						initialValue: name,
					})} placeholder="请填写">收货人</InputItem>
				</div>
				<List className="edit_item">
					<InputItem {...getFieldProps('mobile', {
						initialValue: mobile,
					})} placeholder="请填写">手机号</InputItem>
				</List>
				<List className="edit_item">
					<Picker
						extra="请选择"
						data={district}
						title="Areas"
						{...getFieldProps('district', {
							initialValue: [province, city, area]
						})}
						onOk={e => console.log('ok', e)}
						onDismiss={e => console.log('dismiss', e)}
					>
						<List.Item arrow="horizontal">所在地区</List.Item>
					</Picker>
				</List>
				<div className="edit_item">
					<InputItem {...getFieldProps('street', {
						initialValue: street,
					})} placeholder="如道路、门牌号、小区、楼栋号、单元室等">详细地址</InputItem>
				</div>
				<div className="options">
					<div className="label">设为默认地址</div>
					<div className="value">
						<Switch
							{...getFieldProps('isDefault', {
								initialValue: isDefault,
								valuePropName: 'checked',
							})}
							onClick={(checked) => { console.log(checked); }}
						/>
					</div>
				</div>
				<div className="options"  onClick={this.deleteAddress.bind(this)}>
					<div className="label c_red">删除收货地址</div>
				</div>
				<div className="options" onClick={this.submitForm.bind(this)}>
					<div className="label c_blue">保存收货地址</div>
				</div>
			</div>
		)
	}
}

const EditWrap =  createForm()(Edit);

render(<EditWrap />,document.getElementById('root'));