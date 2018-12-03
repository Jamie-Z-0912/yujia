import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import { Tabs } from 'antd-mobile';
import myVoucherStore from "../../store/mine/myVoucher";
import Voucher from '../../components/voucher';
import '../reset.less';

document.title = '收藏';

@observer
class MyVoucher extends PureComponent{
	render(){
		const {valid, used, overdue} = myVoucherStore;
		return(
			<div>
				<Tabs
					tabs={[
						{ title: `未使用(${valid.length})`, sub: '1' },
						{ title: `已使用(${used.length})`, sub: '2' },
						{ title: `已过期(${overdue.length})`, sub: '3' },
					]}
					swipeable={false}
					animate={false}
					tabBarUnderlineStyle={{width:'18%',borderColor:'#02c4cf',marginLeft:'7.6%'}}
					tabBarActiveTextColor='#02c4cf'
					initialPage={0}
					// onChange={(tab, index) => { console.log('onChange', index, tab); }}
					// onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
				>
					<div>
						{
							valid.length ?
								valid.map(item => <Voucher key={item.id} type="valid" data={item} />)
								:<div className="empty">
									<p className="empty-info">还没有优惠券哦~</p>
								</div>
						}
					</div>
					<div>
						{
							used.length ?
								used.map(item => <Voucher key={item.id} type="used" data={item} />)
								:<div className="empty">
									<p className="empty-info">还没有优惠券哦~</p>
								</div>
						}
					</div>
					<div>
						{
							overdue.length ?
								overdue.map(item => <Voucher key={item.id} type="overdue" data={item} />)
								:<div className="empty">
									<p className="empty-info">还没有优惠券哦~</p>
								</div>
						}
					</div>
				</Tabs>
			</div>
		)
	}
}
render(<MyVoucher />,document.getElementById('root'));

