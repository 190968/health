import React from 'react';
import { Card, Button, Checkbox } from 'antd';
import { DrawerFooter } from '../../../../../../../../../../components/Modal';

const CheckboxGroup = Checkbox.Group;

const TimelineFilter = (props) => {
	console.log(props);
	const { selectedTags, handleChange, resetTags, selectAllTags, tags = [] } = props;

	const plainOptions = tags.map((tag) => {
		return { label: tag.name, value: tag.type };
	});
	const content = (
		<CheckboxGroup
			options={plainOptions}
			className="checkbox-vertical"
			value={selectedTags}
			onChange={handleChange}
		/>
	);
	// tags.map(tag => (
	//     <CheckableTag
	//         key={tag.type}
	//         checked={selectedTags.indexOf(tag.type) > -1}
	//         onChange={checked => handleChange(tag.type, checked)}
	//     >
	//         {tag.name}
	//     </CheckableTag>
	// ));

	const allChecked = selectedTags && selectedTags.length === tags.length;
	const indeterminate = !allChecked && selectedTags && selectedTags.length > 0;
	return (
		<React.Fragment>
			<div style={{ borderBottom: '1px solid #E9E9E9', paddingBottom: 5, marginBottom: 5 }}>
				<Checkbox
					indeterminate={indeterminate}
					onChange={allChecked ? resetTags : selectAllTags}
					checked={allChecked}
				>
					Select all
				</Checkbox>
			</div>
            {content}
            
            <DrawerFooter>
				<Button
					style={{
						marginRight: 8
					}}
					onClick={props.onHide}
				>
					Cancel
				</Button>
				<Button onClick={props.handleSave} type="primary">
					Save
				</Button>
            </DrawerFooter>
		</React.Fragment>
	);
};

export default TimelineFilter;
