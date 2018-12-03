import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import {Toast} from 'antd-mobile';
import moment from 'moment';
import topicDetail from '../../store/community/topicDetail';
import './voteView.less';

@observer
export default class VoteView extends PureComponent{
	constructor(props){
		super(props);
		this.state={
			active: [],
			dataChange: false,
		};
		this.handleVote = this.handleVote.bind(this);
	}

	// 投票
	async handleVote(){
		const {active} = this.state;
		if(active.length <= 0){
			Toast.fail('请先选择再投票');
			return;
		}else{
			topicDetail.topicVote(active.join(',')).then(res=>{
				console.log('res',res);
				Toast.success('投票成功');
				setTimeout(()=> location.reload(),1500);
			});
		}
	}

	// 选择或反选
	handleChoose(num,id){
		//单选
		if(num == 1){
			this.setState({
				active:[id]
			})
		}else{	// 多选
			let temp = this.state.active;
			// 如果已经选中，则反选
			if(temp.indexOf(id) > -1){
				temp.splice(temp.indexOf(id), 1);
				this.setState({
					active: temp,
					dataChange: !this.state.dataChange
				})
			}else{
				//如果未选中，看选中数量
				if(temp.length >= 3){
					Toast.info(`最多只能选择${num}项！`, 1);
					return;
				}
				// 选中
				this.setState({
					active:temp.concat(id),
				})
			}
		}
	}

	render(){
		const {data:{voteList, end_time, num, total_vote_num, is_vote}} = this.props;
		const { active } = this.state;
		const endCheck = (etime) => {
			var now = new Date().getTime();

			if (now > etime){  //已结束
				return 1;
			}
			return 0;
		}

		return(
			<div className="vote_wrap">
				<ul className="vote_list">
					{
						voteList.map(item =>{
							if(is_vote){
								return(
									<li className="result" key={item.id}>
										<div className="col_img"><img src={item.pic_url} alt=""/></div>
										<div className="col_txt">
											<p>{item.title}</p>
											<div className="result_con">
												<div className="slide">
													<i style={{width:`${item.vote_num/total_vote_num*60}%`}} />
													<span>{item.vote_num}票 {(item.vote_num/total_vote_num*100).toFixed(2)}% </span>
												</div>
											</div>
										</div>
									</li>
								)
							}
							// if(active.indexOf(item.id) > -1){
							// 	return(
							// 		<li key={item.id}>
							// 			<div className="col_img"><img src={item.pic_url} alt=""/></div>
							// 			<div className="col_txt"><p>{item.title}</p></div>
							// 			<div className="col_right"><span className='radio selected' /></div>
							// 		</li>
							// 		)
							// }else{
							return(
								<li key={item.id} onClick={this.handleChoose.bind(this, num, item.id)}>
									<div className="col_img"><img src={item.pic_url} alt=""/></div>
									<div className="col_txt"><p>{item.title}</p></div>
									<div className="col_right"><span className={`radio ${active.indexOf(item.id) > -1 ? ' selected' : ''}`} /></div>
								</li>
							)
							// }
						})
					}
				</ul>
				<div className="vote_option">
					{
						endCheck(end_time) || is_vote ?
							<div className="btn_big btn_disabled">{endCheck(end_time) ? '已结束' : '已投票'}</div>
							: <div className="btn_big btn_blue" onClick={this.handleVote.bind(this)}>投 票</div>
					}
					<div className="vote_time">{moment(end_time).format('YYYY年MM月DD日HH:mm')}截止</div>
				</div>
			</div>
		)
	}
}