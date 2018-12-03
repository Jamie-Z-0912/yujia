import React, { PureComponent } from 'react';
import { createForm } from 'rc-form';
import {TextareaItem, Icon, InputItem, Toast} from 'antd-mobile';
import './disInput.less';
import Request from '../../service/baseAxios';
import { getQuery } from '../../libs/utils';

class Discuss extends PureComponent{
	constructor(props) {
		super(props);
		this.state = {
			showTextArea: false,
			dataChange: false
		};
		this.collectArticle = this.collectArticle.bind(this);
	}

	showActionSheet(){
		this.setState({
			showTextArea: !this.state.showTextArea,
		});
	}

	submitForm(){
		const {validateFields, resetFields} = this.props.form;
		validateFields((err, fieldsValue) => {
			if (err) return;
			if(!fieldsValue.content){
				Toast.fail('内容不能为空！');
				return;
			}
			// 提交评论内容
			this.submitCommit(fieldsValue.content).then(res=>{
				if(res.resCode){
					Toast.info(res.message, 2);
				}else{
					Toast.info('评论成功！',1);
					// 更新评论列表
					this.props.handleUpdate();
				}
			});

			this.showActionSheet();
			resetFields();
		});
	}

	// 提交评论内容
	async submitCommit(content){
		const origin = getQuery('origin');
		/**
		 * origin含义
		 * news: 资讯 -> 资讯详情 -> 评论
		 * live: 直播 -> 直播详情 -> 评论
		 * community: 社区 -> 帖子详情 -> 评论
		 * topicNews: 资讯 -> 热门专题 专题详情 ->评论（待定）
		 * interactive: 互动 -> 互动详情 -> 评论
		 */
		switch(origin){
			case 'news': 
				return await Request('/app/information/commentMake', {comment: content, information_id: getQuery('detail')});
			case 'live':
				return await Request('/app/live/commentMake',{comment: content, live_id: getQuery('detail')});
			case 'community':
				return await Request('/app/community/commentMake',{comment: content, community_id: getQuery('detail')});
			case 'interaction':
				return await Request('/app/act/commentMake',{comment: content, interaction_id: getQuery('detail')});
		}
	}
	// 收藏文章
	async collectArticle(status){
		if(status){
			Toast.info("您已收藏此信息", 1);
			return;
		}
		const origin = getQuery('origin');
		switch(origin){
			case 'news': 
				await Request('/app/member/collect', { business_id: getQuery('detail'), business_type: 1});
				break;
			case 'interaction':
				await Request('/app/act/collect', { id: getQuery('detail')});
				break;
		}		
		this.props.hasCollect.status = 1;
		this.setState({
			dataChange: !this.state.dataChange
		});
		Toast.info("已收藏", 1);
	}

	backPrePage(e){
		window.history.back(-1);
	}

	render(){
		const {detailId, form:{getFieldProps}, nextLink, hasCollect} = this.props;
		const {showTextArea} = this.state;
		return(
			<div>
				<div className="discuss_input">
					{
						showTextArea ?
							<div>
								<div className="maskOver" onClick={this.showActionSheet.bind(this)} />
								<div className="viewTextArea">
									<div className="options">
										<a onClick={this.showActionSheet.bind(this)}>取消</a>
										<a onClick={this.submitForm.bind(this)}>发送</a>
									</div>
									<TextareaItem
										ref={el => this.autoFocusInst = el}
										{...getFieldProps('content')}
										rows={5}
										count={100}
										placeholder="快来说两句吧！"
										editable
										clear
									/>
									<div style={{display:'none'}}><InputItem type="hidden" {...getFieldProps('id')} value={detailId} /></div>
								</div>
							</div>
							:
							<div className="view_box">
								<div className="viewInput">
									<span><Icon type="left" onClick={this.backPrePage} /></span>
									<span onClick={this.showActionSheet.bind(this)}>快来说两句吧！</span>
								</div>
								{
									nextLink ? <a href={nextLink} className="next_link" />:null
								}
								{
									hasCollect ? <div
										className={["icon_collect", hasCollect.status ? 'has' : ''].join(' ')}
										onClick={()=>{
											if(!hasCollect.status) this.collectArticle(hasCollect.status);
										}}
									/> : null
								}
							</div>
					}
				</div>
				<div style={{height: 46,backgroundColor:'#fff'}} />
			</div>
		)
	}
}

export default createForm()(Discuss);