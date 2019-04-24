import React from 'react';
import PlanElementBox from './containers/PlanElementBox';
import PlanElementChildrenList from './containers/PlanElementChildrenList';
import { compose, withProps, branch, withHandlers, defaultProps, withState } from 'recompose';

// plan element with children
const PlanElementPure = (props) => {
	// if (props.showChildren)
	//  console.log(props, 'element-----props');
	const {
		element,
		isDraggable,
		onDrop,
		isBuilderMode,
		isPreviewMode,
		plan,
		mode,
		notClickable = false,
		updateSkippedElements,
		updateBrahmRules,
		brahmRules,
		user
	} = props;
	const { id } = element;
	return (
		<React.Fragment>
			<PlanElementBox {...props} showChildren={props.setShowChildren} />

			{props.showChildren && (
				<div
					style={{
						padding: 20,
						paddingRight: 0,
						background: '#fbfbfb',
						border: '1px solid #e8e8e8',
						borderTop: 'none'
					}}
				>
					<PlanElementChildrenList
						elementId={id}
						onDrop={onDrop}
						plan={plan}
						isDraggable={isDraggable}
						isPreviewMode={isPreviewMode}
						isBuilderMode={isBuilderMode}
						mode={mode}
						elementValue={props.elementValue}
						notClickable={notClickable}
						updateSkippedElements={updateSkippedElements}
						updateBrahmRules={updateBrahmRules}
						brahmRules={brahmRules}
						user={user}
					/>
				</div>
			)}
		</React.Fragment>
	);
};

const enhance = compose(
	defaultProps({
		isDraggable: false
	}),
	withState('showChildren', 'setShowChildren', false),
	withState('showAlias', 'setShowAlias', false),
	withState('elementValue', 'setElementValue', ''),
	withHandlers({
		setShowChildren: (props) => (value) => {
			props.setShowChildren(true);
			props.setElementValue(value);
		}
	})
);

export const PlanElement = enhance(PlanElementPure);
export default PlanElement;
