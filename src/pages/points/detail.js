import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import detailStore from "../../store/points/detail";
import  BannerNum from '../../components/BannerNum';
import './detail.less';

document.title = '积分商品';

@observer
class Detail extends PureComponent{
	render(){
		const { product } = detailStore;

		return(
			<div className="detail-wrap" style={{minHeight: innerHeight}}>
				<div className="detail-hd">
					<BannerNum data={product.images} />
					<div className="title">{product.title}</div>
					<div className="price">
						<span className="cur">{product.points}<i>积分</i></span>
						<span className="delete">（原价：{product.original_price}元）</span>
					</div>
				</div>
				{/* --- 商品详情 --- */}
				<div className="detail-card">
					<div className="detail-card-hd">
						<span>商品详情</span>
					</div>
					<div className="detail-content">
						内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片
					</div>
				</div>
				<div className="option">立即兑换</div>
			</div>
		)
	}
}

render(<Detail />,document.getElementById('root'));
