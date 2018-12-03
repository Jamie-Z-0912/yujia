import React, { PureComponent } from 'react';
import { Carousel } from 'antd-mobile';
import './index.less';

const style =  {
	car_param: {
		autoplay: false,
		infinite: true,
		dotStyle:{width:'3px', height:'3px', borderRadius:'100%', backgroundColor:'#aaa', borderRadius:'1px'},
		dotActiveStyle:{backgroundColor:'#fff', borderRadius:'1px'}
	},
	car_item:{
		display: 'block',position: 'relative', width: '100%', height: '1.88rem',
	},
};

export default class BannerAllScreen extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			imgHeight: style.car_item.height
		}
	}

	render() {
		const { data, selectedIndex } =  this.props;
		const { imgHeight } = this.state;
		return(
			<div
				className="banner_allScreen_wrap"
				style={{width:innerWidth,height:innerHeight}}
			>
				<Carousel
					{...style.car_param}
					selectedIndex={selectedIndex}
				>
					{data.map( item => {
						return (
							<img
								key={item}
								src={item.pic}
								alt="轮播图"
								style={{width: '100%', verticalAlign: 'middle', imgHeight, maxHeight:innerHeight*.8}}
								onLoad={() => {
									window.dispatchEvent(new Event('resize'));
									this.setState({imgHeight});
								}}
							/>
						)
					})}
				</Carousel>
			</div>
		)
	}
}