document.title = '我的关注';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import myFocusStore from '../../store/mine/myFocus';
import InfiniteScroll from 'react-infinite-scroller';
import { Icon, ActivityIndicator, Modal } from 'antd-mobile';
import './myFocus.less';
import Request from '../../service/baseAxios';

@observer
class MyFocus extends PureComponent{

	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
			hasData: false,
		};
	}

	componentDidMount(){
		myFocusStore.getMyFocus().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange,
				hasData: true,
			})
		})
	}

	// 滑动加载
	triggerNextList(){
		myFocusStore.nextPage();
		myFocusStore.getMyFocus().then(()=> this.setState({dataChange: !this.state.dataChange}));
	}
	// 取消关注
	async cancelFocus(id){
		await Request('/app/member/focus',{unit_id: id}).then(()=>{
			myFocusStore.curPage = 1;
			myFocusStore.getMyFocus().then(()=>{
				this.setState({
					dataChange: !this.state.dataChange
				})
			})
		})
	}

	render() {
		const { list, curPage, totalPage } = myFocusStore;
		return(
			this.state.hasData ?
				<div className="myFocus-wrap">
					<InfiniteScroll
						style={{textAlign:'center',padding: '0 .1rem'}}
						threshold={100}
						pageStart={1}
						loadMore={ this.triggerNextList.bind(this)}
						hasMore={ curPage < totalPage }
						loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
					>
						{
							list.length > 0 ?
							list.map(item =>
								<div key={item.id} className="list_item">
									<a href={`./company.html?unitId=${item.id}`}>
										<div className="photo"><img src={item.head_url} alt=""/></div>
										<div className="name">{item.unit_name}</div>
									</a>
									<div className="item_right">
										<div
											className="btn_normal btn_white"
											onClick={()=>{
												Modal.alert('', `确定不要再关注 ${item.unit_name}`,[
													{ text: '取消', onPress: () => {  } },
													{ text: <span style={{ color: '#02c4cf' }}>确定</span>, onPress: () => { this.cancelFocus(item.id) } },
												]);
											}}
										>取消关注</div>
									</div>
								</div>
							)
							: <div className="no-more-data">暂无关注~</div>
						}
						</InfiniteScroll>
				</div>
				:<div className="routerLoading"><Icon type="loading" size="lg" /></div>
		)
	}
}

render( <MyFocus />, document.getElementById('root'));