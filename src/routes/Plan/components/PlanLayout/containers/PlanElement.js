import React from 'react';
import PlanElementPure from '../components/PlanElement';
import { List } from 'antd';
import { PlanContext } from '../../../planContext';

export default PlanElementPure;
export const PlanElement = PlanElementPure;

export const PlanElementListItem = (props) => {
	// const {
	// 	i,
	// 	plan,
	// 	user,
	// 	date,
	// 	item,
	// 	isPreviewMode = false,
	// 	isBuilderMode = false,
	// 	isDraggable,
	// 	mode,
	// 	schedule = false,
	// 	lessonId,
	// 	sectionId,
	// 	upid
	// } = props;
	//console.log(props);
	return (
		<List.Item >
			<PlanContext.Consumer>
				{(ownProps) => {
					return (
						<PlanElement
							{...props}
							// i={i}
							// plan={plan}
							// user={user}
							// isDraggable={isDraggable}
							// element={item}
							// mode={mode}
							// isPreviewMode={isPreviewMode}
							// isBuilderMode={isBuilderMode}
							// schedule={schedule}
							// lessonId={lessonId}
							// sectionId={sectionId}
							// date={date}
							// upid={upid}
						/>
					);
				}}
			</PlanContext.Consumer>
		</List.Item>
	);
};
