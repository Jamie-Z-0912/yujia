document.title = '帖子';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import invitationStore from '../../store/mine/invitation';
import Item from '../../components/community/Item';
import '../reset.less';
import InfiniteScroll from 'react-infinite-scroller';
import { Icon, ActivityIndicator } from 'antd-mobile';
import './invitation.less';

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
		invitationStore.getMyInvitation().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange,
				hasData: true,
			})
		})
	}

	// 删除帖子
	handleDel(index){
		invitationStore.list.splice(index, 1);
		this.setState({
			dataChange: !this.state.dataChange,
		});
	}

	// 滑动加载
	triggerNextList(){
		invitationStore.nextPage();
		invitationStore.getMyInvitation().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange,
			})
		})
	}

	render(){
		const { curPage, totalPage, list } = invitationStore;
		return(
			<div style={{backgroundColor:'#fff'}}>
				{this.state.hasData ? (
					<div className="discussion-wrap">
						<InfiniteScroll
							style={{textAlign: 'center', padding: '0 .1rem'}}
							threshold={100}
							pageStart={1}
							loadMore={this.triggerNextList.bind(this)}
							hasMore={curPage < totalPage}
							loader={<div style={{display: 'inline-block', paddingTop: '.15rem'}}><ActivityIndicator text="加载中……"/>
							</div>}
						>
							{
								list.length > 0 ?
									list.map((item, index) => <Item
										key={item.id}
										data={item}
										delSuccess={()=>this.handleDel(index)}
									/>) :
									<div className="nomoredata">这里是空的~</div>
							}
						</InfiniteScroll>
					</div>
				) : (<div className="routerLoading"><Icon type="loading" size="lg"/></div>)
				}
			</div>
		)
	}
}

render(<Index />,document.getElementById('root'));
