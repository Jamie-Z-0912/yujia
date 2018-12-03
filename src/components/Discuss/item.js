import React, { PureComponent } from 'react';
import moment from 'moment';
import './item.less';
import { getQuery } from '../../libs/utils';
import Request from '../../service/baseAxios';

export default class Item extends PureComponent{

	constructor(props){
		super(props);
		this.state = {
			dataChange: false
		};
		this.goodBtnClick = this.goodBtnClick.bind(this);
	}

	async goodBtnClick(id, is_up){
		const{data:{fabulous_num, up_num}} = this.props;
		const origin = getQuery('origin');
		switch(origin){
			case 'news': 
				await Request('/app/information/upAdd',{comment_id: id, information_id: getQuery('detail')});
				break;
			case 'live':
				await Request('app/live/upAdd',{comment_id: id, live_id: getQuery('detail')});
				break;
			case 'community':
				await Request('/app/community/commentUpAdd',{comment_id: id, community_id: getQuery('detail')});
				break;
			case 'interaction':
				await Request('/app/act/upAdd',{comment_id: id, interaction_id: getQuery('detail')});
				break;
		}
		if(is_up){
			this.props.data.is_up = 0;
			fabulous_num ? this.props.data.fabulous_num -= 1:null;
			up_num ? this.props.data.up_num -= 1:null;
		}else{
			this.props.data.is_up = 1;
			fabulous_num ? this.props.data.fabulous_num += 1:null;
			up_num ? this.props.data.up_num += 1:null;
		}
		
		this.setState({
			dataChange: !this.state.dataChange
		});
	}

	render(){
		const {data:{
			head_url,
			user_name,
			id,
			comment,
			create_time,
			fabulous_num,
			up_num,
			is_up,
		}} = this.props;
		return(
			<div className="discuss_item">
				<div className="photo"><img src={head_url} alt=""/></div>
				<div className="dis_con">
					<div className="dis_user">{user_name}</div>
					<div className="dis_text">{comment}</div>
					<div className="dis_time">
						<span>{moment(create_time).format('YYYY/MM/DD')}</span>
						<span>{moment(create_time).format('HH:mm')}</span>
					</div>
					<div className={['dis_like', is_up ? 'liked':''].join(' ')}
						onClick={()=>{
							this.goodBtnClick(id, is_up)
						}}
					>
						<span>{fabulous_num||up_num}</span>
					</div>
				</div>
			</div>
		)
	}
}