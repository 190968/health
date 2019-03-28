import React from 'react';
import { Row, Col, Button, Card, List, Input } from 'antd';
import { message, Modal, Divider, Tooltip, Icon } from 'antd';
import { PlanElementListItem } from '../../containers/PlanElement';
import PlanElementsSelectbox from '../../components/PlanElementsSelectbox';
import { SortableElement } from 'react-sortable-hoc';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

import { EmptyList } from '../../../../../../components/Loading/index';
import { branch, compose, withHandlers, withProps, withState, renderComponent } from 'recompose';
import { PlanElementManagerButton } from '../../../../../../components/Plan/components/Builder/components/Buttons/components/ElementManager';

const updateSectionMutation = gql`
			mutation updateActivityTitle($id: UID!, $planId: UID!, $title: String!) {
				updatePlanActivity(id: $id, planId: $planId, title: $title) {
					id
					title
				}
			}
        `;
        
export class PlanSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isClicked: false,
			loading: false
		};
		this.saveSection = this.saveSection.bind(this);
		this.clearLoading = this.clearLoading.bind(this);
	}

	static propTypes = {};

	static defaultProps = {
		isBuilderMode: false,
	};

	saveSection = (e, sectionId, isLastSection) => {
		const { date, item, history } = this.props;
		this.setState({
			loading: true
		});
		this.props
			.sectionReport(sectionId)
			.then(({ data }) => {
				if (isLastSection) {
					message.success('Congrats!');
					history.push('/'); // redirect to the dashboard
				} else {
					message.success(item.title + ' is now completed for ' + moment(date).format('L'));
					this.props.showNextSection();
				}

				this.clearLoading();
			})
			.catch((error) => {
				message.error(error.message);
				this.clearLoading();
			});
	};

	clearLoading() {
		this.setState({
			loading: false
		});
	}

	updateLabel = (e) => {
		const value = e.target.value;

		const { client, item, plan } = this.props;
		const { id } = item;

		client.writeFragment({
			id: 'PlanBodyActivity:' + id, // `id` is any id that could be returned by `dataIdFromObject`.
			fragment: gql`
				fragment PlanBodyActivityInfo on PlanBodyActivity {
					title
				}
			`,
			data: {
				title: value,
				__typename: 'PlanBodyActivity'
			}
		});

		clearTimeout(this.timer);


		this.timer = setTimeout(
			function() {
				client.mutate({ mutation: updateSectionMutation, variables: { id: id, planId: plan.id, title: value } });
			}.bind(this),
			500
		);
	};

	render() {
		const { upid, date, user, item, isLastSection, isBuilderMode, isPreviewMode, plan, elements = [], ...otherProps } = this.props;
		const footer =
			!isBuilderMode && (elements !== null && (item.elements.length > 0 || isLastSection))
				? [
						<Button
							type="primary"
							loading={this.state.loading}
							onClick={(e) => this.saveSection(e, item.id, isLastSection)}
						>
							{isLastSection ? 'Finish' : 'Next Activity'}
						</Button>
					]
				: [];

		const sectionId = item.id || '';
		let title = item.title || '';
		if (isBuilderMode) {
			title = <Input defaultValue={item.title} placeholder="Title" onKeyUp={this.updateLabel} />;
		}

		return (
			<Card title={title}  actions={footer}>
				{/* {1 === 5 &&
				isBuilderMode &&
				!isPreviewMode && (
					<PlanElementsSelectbox mode="section" sectionId={sectionId} plan={plan} schedule={true} />
				)} */}
				{elements && elements.length > 0 ? (
					<List
						size="large"
						itemLayout="vertical"
						split={false}
						dataSource={elements}
						renderItem={(item, i) => {
							return (
								<PlanElementEnhanced
									key={'item' + item.id}
									index={i}
									i={i}
									item={item}
                                    isBuilderMode={isBuilderMode}
                                    isPreviewMode={isPreviewMode}
									mode="section"
									sectionId={sectionId}
									plan={plan}
									user={user}
									upid={upid}
									date={date}
									element={item}
									schedule
									{...otherProps}
								/>
							);
						}}
					/>
				) : (
					<EmptyResults {...this.props} />
				)}
			</Card>
		);
	}
}

/**
 * Enhance Plan element
 */
const PlanElementEnhanced = compose(branch((props) => props.isBuilderMode && !props.isPreviewMode, SortableElement))(PlanElementListItem);

const EmptyResultsPure = (props) => {
	return <EmptyList>No elements have been added yet</EmptyList>;
};

const PlanElementAddLine = (props) => {
	return (
		<Divider className="element-actions">
			{/* {props.modalAdd && (
				<Modal title="Select Element" visible={true} footer={false} onCancel={props.openHideElement}>
					<PlanElementsSelectbox mode="section" sectionId={props.item.id} plan={props.plan} plan={props.plan} />
				</Modal>
			)} */}

			<PlanElementManagerButton mode="section" buttonType={'primary'} label={'Add First Element'} shape={'round'} sectionId={props.item.id} plan={props.plan} />
			{/* <Tooltip title="Add Element" onClick={props.openAddElement}>
				<Icon type="plus-circle-o" style={{ cursor: 'pointer' }} /> Add First Element
			</Tooltip> */}
		</Divider>
	);
};

// const PlanElementAddLine = compose(
// 	withState('modalAdd', 'setModal', false),
// 	withHandlers({
// 		openAddElement: (props) => () => {
// 			props.setModal(true);
// 		},
// 		openHideElement: (props) => () => {
// 			props.setModal(false);
// 		}
// 	})
// )(PlanElementAddLinePure);

const EmptyResults = compose(branch((props) => props.isBuilderMode === true, renderComponent(PlanElementAddLine)))(
	EmptyResultsPure
);

export default withRouter(withApollo(PlanSection));
