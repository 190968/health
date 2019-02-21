import React from 'react';
import PlanElement from '../components/PlanElement';
import { List } from 'antd';
import { PlanContext } from '../../../planContext';

export default PlanElement;

export const PlanElementListItem = (props) => {
	const {
		i,
		plan,
		user,
		date,
		item,
		isPreviewMode = false,
		isBuilderMode = false,
		isDraggable,
		mode,
		schedule = false,
		lessonId,
		sectionId,
		upid
	} = props;
	//console.log(props);
	return (
		<List.Item key={item.id}>
			<PlanContext.Consumer>
				{(props) => {
					return (
						<PlanElement
							i={i}
							plan={plan}
							user={user}
							isDraggable={isDraggable}
							element={item}
							mode={mode}
							isPreviewMode={isPreviewMode}
							isBuilderMode={isBuilderMode}
							schedule={schedule}
							lessonId={lessonId}
							sectionId={sectionId}
							date={date}
							upid={upid}
						/>
					);
				}}
			</PlanContext.Consumer>
		</List.Item>
	);
};
