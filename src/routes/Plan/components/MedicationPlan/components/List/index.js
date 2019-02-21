import React from 'react';
import { Divider, List} from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from '../../i18n/en';
import { MedicationCard } from '../../containers/MedicationCard';
import { ListWithMessage } from '../../../../../../components/UI/List';

Array.prototype.groupBy = function(prop) {
	return this.reduce(function(groups, item) {
	  const val = item[prop]
	  groups[val] = groups[val] || []
	  groups[val].push(item)
	  return groups
	}, {})
  }

  const types = [{ value: 'at_times', label: <FormattedMessage  {...messages.atTimes} /> },
		{ value: 'along_day', label: <FormattedMessage  {...messages.alongDay} /> },
        { value: 'as_needed', label: <FormattedMessage  {...messages.asNeeded} /> }];
        
const MedicationsList = (props) => {
	const { medicationPlan, loading, medicationType, ...otherProps } = props;
	let { medications = [] } = medicationPlan || {};
	 
	const groupedMedications = medications.groupBy('type')
 

	 
	return types.map(({value:type, label}, i) => {
        const medications = groupedMedications[type] || [];
        if (medications.length === 0) {
            return null;
        }
        return <React.Fragment key={i}>
        <Divider>{label}</Divider>
        <ListWithMessage
            emptyMessage={<FormattedMessage  {...messages.noMeds} />}
            grid={{ gutter: 16, xs: 1, sm: 2, lg: 3 }}
            dataSource={medications}
            renderItem={(medication, i) => {
                return (
                    <List.Item key={i}>
                        <MedicationCard medication={medication} medicationPlan={medicationPlan} {...otherProps} i={i} />
                    </List.Item>
                );
            }}
        />
        </React.Fragment>;
    })
};

export default MedicationsList;
