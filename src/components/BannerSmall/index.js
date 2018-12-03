import React, { PureComponent } from 'react';
import { Carousel } from 'antd-mobile';
import './index.less';

const style =  {
	car_param: {
		frameOverflow: 'visible',
		cellSpacing: 10,
		slideWidth: .4,
		infinite: false,
		autoplay: false,
		dots: false,
	},
	car_item:{
		display: 'block',
		width: '100%',
		height:'1.05rem',
	},
};


export default class Banner extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			imgHeight: style.car_item.height
		}
	}

	render() {
		const { data } =  this.props;
		const { imgHeight } = this.state;
		return(
			<div className="bannerSmall_wrap">
				<Carousel {...style.car_param}>
					{data.map( item => {
						return <a
							key={item.id}
							href={item.link}
							style={style.car_item}
						>
							<img
								src={item.theme_img1||item.theme_pic}
								alt="轮播图"
								style={{width: '100%', verticalAlign: 'top', minHeight: '1.05rem'}}
								onLoad={() => {
									window.dispatchEvent(new Event('resize'));
									this.setState({imgHeight});
								}}
							/>
							<span className='text'>{item.title||item.name}</span>
						</a>
					})}
				</Carousel>
			</div>
		)
	}

}