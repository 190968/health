import React from 'react';
import { Radio } from 'antd';
import { withHandlers } from 'recompose';
import { CardExtraSplit as CardExtraSplitPure} from '../CardExtraSplit';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const CardQuickFilterPure = (props) => {
	const { value, filters = [], onChange, size = 'small' } = props;
	return (
		<div className={'cardFilters'}>
			<RadioGroup defaultValue={value} size={size} onChange={onChange}>
				{filters.map(({ label, value }, i) => (
					<RadioButton key={i} value={value}>
						{label}
					</RadioButton>
				))}
			</RadioGroup>
		</div>
	);
};

export const CardQuickFilter = withHandlers({
	onChange: (props) => (e) => {
		props.onChange(e.target.value);
	}
})(CardQuickFilterPure);

export const CardExtraSplit = CardExtraSplit;
