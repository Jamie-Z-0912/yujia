import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import disStore from "../../store/news/dicussion";
import InfiniteScroll from 'react-infinite-scroller';
import { Icon, ActivityIndicator } from 'antd-mobile';
import DisItem from '../../components/Discuss/item';
import DisInput from '../../components/Discuss/disInput';
import './discussion.less';

@observer
class Index extends PureComponent {

	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
			hasData: false,
		};
		this.handleUpdateDiscuss = this.handleUpdateDiscuss.bind(this);
	}

	componentDidMount(){
		disStore.getDiscussionList().then(()=> this.setState({dataChange: !this.state.dataChange, hasData:true}));
	}

	// 评论完成后更新评论
	handleUpdateDiscuss(){
		disStore.updateDiscuss().then(()=> this.setState({dataChange: !this.state.dataChange}));
	}

	// 滑动加载
	triggerNextList(){
		disStore.nextPage();
		disStore.getDiscussionList().then(()=> this.setState({dataChange: !this.state.dataChange}));
	}

	render() {
		const { list, curPage, totalPage } = disStore;
		const{dataChange, hasData} = this.state;
		return(
			hasData?(
				<div className="news-discussion-wrap">
					<InfiniteScroll
						style={{textAlign:'center'}}
						threshold={100}
						pageStart={1}
						loadMore={ this.triggerNextList.bind(this)}
						hasMore={ curPage < totalPage }
						loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
					>
						{
							list.length > 0 ?
								list.map(item => <DisItem key={item.id} dataChange={dataChange} data={item} />) :
								<div className="no_comment">快来抢第一条评论吧~</div>
						}
					</InfiniteScroll>
					<DisInput handleUpdate={ this.handleUpdateDiscuss } />
				</div>
			):(<div className="routerLoading"><Icon type="loading" size="lg" /></div>)
		)
	}
}

render(<Index />,document.getElementById('root'));