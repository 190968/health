import React from 'react';
import { Row, Col, Button, Card, List, Input } from 'antd';
import { message, Modal, Divider, Tooltip, Affix } from 'antd';
import { PlanElementListItem } from '../../containers/PlanElement';
import PlanElementsSelectbox from '../../components/PlanElementsSelectbox';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { EmptyList } from '../../../../../../components/Loading/index';
import { CardFooter } from '../../../../../../components/Card/components/CardFooter';
import { SortableElement } from 'react-sortable-hoc';

import { branch, compose, withHandlers, withProps, withState, renderComponent } from 'recompose';
import { PlanLessonCompleteButton } from './containers/PlanLessonCompleteButton';
import { PlanElementManagerButton } from '../../../../../../components/Plan/components/Builder/components/Buttons/components/ElementManager';
import PlanBuilderElementSelect from '../../../../../../components/Plan/components/Builder/components/SelectElementType/inline';
import { PlanElementsList } from '../../../../../../components/Plan/components/Body/containers/ElementsList';

// const PlanElementEnhanced = compose(
//     branch(props => props.isBuilderMode, SortableElement)
// )(PlanElementListItem);

export class PlanLesson extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isClicked: false,
			loading: false
		};
		this.clearLoading = this.clearLoading.bind(this);
	}

	static propTypes = {};

	static defaultProps = {
		isBuilderMode: false
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
		//

		/*let lesson = client.readFragment({
            id: 'PlanBodyLesson:'+id, // `id` is any id that could be returned by `dataIdFromObject`.
            fragment: gql`
            fragment PlanBodyLessonInfo on PlanBodyLesson {
              title
            }
          `,
        });

        //lesson.title = value;

        console.log(lesson);*/

		client.writeFragment({
			id: 'PlanBodyLesson:' + id, // `id` is any id that could be returned by `dataIdFromObject`.
			fragment: gql`
				fragment PlanBodyLessonInfo on PlanBodyLesson {
					title
				}
			`,
			data: {
				title: value,
				__typename: 'PlanBodyLesson'
			}
		});

		clearTimeout(this.timer);

		const updateLessonMutation = gql`
			mutation updateLessonTitle($id: UID!, $planId: UID!, $title: String!) {
				updatePlanLesson(id: $id, planId: $planId, title: $title) {
					id
					title
				}
			}
		`;

		this.timer = setTimeout(
			function () {
				client.mutate({ mutation: updateLessonMutation, variables: { id: id, planId: plan.id, title: value } });
			}.bind(this),
			500
		);

		// save the info with some delay
		// save the element title in the DB

		/*


        /*const {plan} = client.readQuery({
            query: PLAN_BODY_QUERY,
            variables: {
                id: id,
                upid: upid,
                date: date
            }
        });




        // let element = store.readFragment({
            //     id: 'User:'+userId, // `id` is any id that could be returned by `dataIdFromObject`.
            //     fragment: LoginForm.fragments.user,
            //     fragmentName: 'UserInfo'
            // });


            //element.phoneConfirmed = verifyPhoneConfirm;

            store.writeFragment({
                id: 'User:'+userId,
                fragment: LoginForm.fragments.user,
                fragmentName: 'UserInfo',
                data: {
                    phoneConfirmed: verifyPhoneConfirm,
                    __typename:'User'
                },
            });/*

        */
	};

	render() {
		const { item, isLastLesson, showNextLesson, showFirstSection, ...otherProps } = this.props;
		const {
			upid,
			haveSections,
			isBuilderMode,
			isPreviewMode,
		} = otherProps;

		const { elements = [] } = item || {};

		const footer = (!isBuilderMode/* && (elements || isLastLesson)*/) && <PlanLessonCompleteButton upid={upid} lesson={item} isLastLesson={isLastLesson} showNextLesson={showNextLesson} showFirstSection={showFirstSection} haveSections={haveSections} label={isLastLesson ? haveSections > 0 ? 'Go to Activities' : 'Finish' : 'Next Lesson'} />;
		let title = item.title || '';
		const lessonId = item.id;
		if (isBuilderMode && !isPreviewMode) {
			title = <Input defaultValue={item.title} placeholder="Title" onKeyUp={this.updateLabel} />;
		}
		//console.log(loading);

		return (
			<Card title={title} type={'pure'}>
				<PlanElementsList {...otherProps} lesson={item} elements={elements} />
				{/* 			
			{(isBuilderMode && !isPreviewMode) && <Affix>
				<PlanBuilderElementSelect {...this.props} />
			</Affix>}
				 
				{elements ? (
					<List
						size="large"
						itemLayout="vertical"
						className="plan-elements"
						split={false}
						dataSource={elements}
						renderItem={(item, i) => {
							return (
								<PlanElementEnhanced
									key={'item' + item.id}
									index={i}
									item={item}
									i={i}
									isBuilderMode={isBuilderMode}
									mode="lesson"
									lessonId={lessonId}
									isPreviewMode={isPreviewMode}
									plan={plan}
									upid={upid}
									element={item}
									{...otherProps}
								/>
							);
						}}
					/>
				) : (
						<EmptyResults {...this.props} lessonId={lessonId} />
					)} */}
				<CardFooter>{footer}</CardFooter>
			</Card>
		);
	}
}

/**
 * Enhance Plan element
 */
// const PlanElementEnhanced = compose(branch((props) => props.isBuilderMode && !props.isPreviewMode, SortableElement))(PlanElementListItem);

// const EmptyResultsPure = (props) => {
// 	return <EmptyList>No elements have been added yet</EmptyList>;
// };

// const PlanElementAddLine = (props) => {
// 	return (
// 		<Divider className="element-actions">
// 			<PlanElementManagerButton mode="lesson" buttonType={'primary'} shape={'round'} lessonId={props.lessonId} plan={props.plan} />
// 		</Divider>
// 	);
// };


// const EmptyResults = compose(branch((props) => props.isBuilderMode === true, renderComponent(PlanElementAddLine)))(
// 	EmptyResultsPure
// );

export default withApollo(PlanLesson);
