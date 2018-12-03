import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import dateStore from "../../store/community/activityUsers";
import InfiniteScroll from 'react-infinite-scroller';
import { Icon, ActivityIndicator } from 'antd-mobile';
import moment from 'moment';
import './activityUsers.less';

document.title="报名用户";

@observer
class Index extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
			hasData: false,
		};
	}
	componentDidMount(){
		dateStore.getUsersListApi().then(()=>this.setState({hasData:true}));
	}

	// 滑动加载
	triggerNextList(){
		dateStore.nextPage();
		dateStore.getUsersListApi().then(()=> this.setState({dataChange: !this.state.dataChange}));
	}

	render() {
		const { list, curPage, totalPage } = dateStore;
		return(
			this.state.hasData ?
				<div className="activityUsers-wrap">
					<InfiniteScroll
						style={{textAlign:'center',padding: '0 .1rem'}}
						threshold={100}
						pageStart={1}
						loadMore={ this.triggerNextList.bind(this)}
						hasMore={ curPage < totalPage }
						loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
					>
						{
							list.map((item, index)=>(
								<div key={item.name} className="activityUsers-item">
									<span className="order">{index+1}</span>
									<span className="img_box"><img src={item.head_url} alt=""/></span>
									<span className="name">{item.user_name}</span>
									<span>{item.notice_title? '审核通过':'审核中'}</span>
									<span>{moment(item.create_time).format('YYYY/MM/DD HH:mm')}</span>
								</div>
							))
						}
					</InfiniteScroll>
				</div>
				:<div className="routerLoading"><Icon type="loading" size="lg" /></div>
		)
	}
}

render(<Index />,document.getElementById('root'));