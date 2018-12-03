document.title = '点赞';
import React, { PureComponent } from 'react';
import moment from 'moment';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import likeUsers from '../../store/community/likeUsers';
import './likeUsers.less';
import InfiniteScroll from 'react-infinite-scroller';
import { Icon, ActivityIndicator } from 'antd-mobile';

@observer
class LikeUsers extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			hasData: false,
			dataChange: false,
		};
	}

	componentDidMount(){
		likeUsers.getLikeUser().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange,
				hasData: true,
			})
		})
	}

	// 上拉加载更多点赞用户列表
	triggerNextList(){
		likeUsers.nextPage();
		likeUsers.getLikeUser().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange,
			})
		})
	}

	render() {
		const {curPage, totalPage, list} = likeUsers;
		return(
			this.state.hasData ?
				<div style={{backgroundColor: '#fff'}}>
					<InfiniteScroll
						style={{textAlign:'center'}}
						threshold={100}
						pageStart={1}
						loadMore={ this.triggerNextList.bind(this)}
						hasMore={ curPage < totalPage }
						loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
					>
						{
							list.map(item => <div className="like_user_item">
								<div className="photo"><img src={item.head_url} alt=""/></div>
								<div className="nick_name">{item.user_name}</div>
								<div className="time">{moment(item.create_time).format('YYYY.MM.DD HH:mm')}</div>
							</div>)
						}
					</InfiniteScroll>
				</div>:(<div className="routerLoading"><Icon type="loading" size="lg" /></div>)
		)
	}
}

render(<LikeUsers />,document.getElementById('root'));