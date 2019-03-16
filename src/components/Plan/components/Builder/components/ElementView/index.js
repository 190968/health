import React from 'react';
import { List } from 'antd';
import { PlanElement } from '../../../../../../routes/Plan/components/PlanLayout/containers/PlanElement';

const PlanElementBuilderListItem = (props) => {
 
	return (
		<List.Item >
			<PlanElement {...props} />
		</List.Item>
	);
};

export default PlanElementBuilderListItem;