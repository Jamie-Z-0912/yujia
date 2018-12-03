document.title = '直播';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import LivingIndex from '../../store/livingIndex';
import InfiniteScroll from 'react-infinite-scroller';
import { Icon, ActivityIndicator } from 'antd-mobile';
import TabBar from '../../components/TabBar';
import Item from '../../components/living/Item';
import './index.less';

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
		LivingIndex.getLiving().then(()=> this.setState({dataChange: !this.state.dataChange, hasData:true}));
	}

	// 滑动加载
	triggerNextList() {
		LivingIndex.nextPage();
		LivingIndex.getLiving().then(()=> this.setState({dataChange: !this.state.dataChange, hasData:true}));
	}

	render(){
		const { list, curPage, totalPage } = LivingIndex;
		const{dataChange, hasData} = this.state;
		return(
			hasData?(
				<div className="living-wrap">
					<InfiniteScroll
						style={{textAlign:'center'}}
						threshold={100}
						pageStart={1}
						loadMore={ this.triggerNextList.bind(this)}
						hasMore={ curPage < totalPage }
						loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
					>
						{
							list.map(item=> <Item key={item.id} data={item} />)
						}
					</InfiniteScroll>
					<TabBar active={2} />
				</div>
			):(<div className="routerLoading"><Icon type="loading" size="lg" /></div>)
		)
	}
}

render(<Index />,document.getElementById('root'));
