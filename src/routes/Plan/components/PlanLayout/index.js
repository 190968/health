import React from 'react';
import PropTypes from 'prop-types';

import PlanHeader from './containers/PlanHeader';
import PlanBody from './containers/PlanBody';
import { Card } from 'antd';
import moment from 'moment/moment';
import { PlanContextProvider } from '../../planContext';
import { PageHeaderLayout } from '../../../../components/Layout/PageHeaderLayout';

export class PlanLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: props.date,
			infoModal: false
		};
		this.setDate = this.setDate.bind(this);
		this.toggleIntro = this.toggleIntro.bind(this);
	}
	static propTypes = {
		plan: PropTypes.object
	};
	static defaultProps = {
		date: moment().format('YYYY-MM-DD')
	};
	setDate = (date) => {
		this.setState({ date: date });
	};
	toggleIntro() {
		this.setState({ infoModal: !this.state.infoModal });
	}

	render() {
		const { info, plan, user, loading } = this.props;
		if (loading) {
			//return (<div>Loading...</div>);
			return <Card loading>aaa</Card>;
		}
		return (
			<div>
				
				<PlanContextProvider value={{ plan, isBuilderMode: false, isPreviewMode: false }}>
					<PlanHeader
						plan={plan}
						user={user}
						info={info}
						toggleIntro={this.toggleIntro}
						setDate={this.setDate}
					/>
					<div className="pageContent">
					<Card>
						<PlanBody
							upid={info.id}
							plan={plan}
							user={user}
							userId={user.id}
							date={this.state.date}
							showIntro={this.state.infoModal}
							hideIntro={this.toggleIntro}
						/>
					</Card>
					</div>
				</PlanContextProvider>
			</div>
		);
	}
}

export default PlanLayout;
