import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import './messagePage.less';

class Index extends PureComponent {

	render() {
		const notice = window.localStorage.getItem('notice');
		if(!notice) window.location = './message.html';
		const {title, content, time} = JSON.parse(notice);
		return(
			<div className="detail-wrap">
				<div className="detail-box">
					<h1 className="title">{title}</h1>
					<div className="time">{moment(time).format('YYYY-MM-DD')}</div>
					<div className="detail_content">
						<div dangerouslySetInnerHTML={{ __html: content }}/>
					</div>
				</div>
			</div>
		)
	}
}

render(<Index />,document.getElementById('root'));