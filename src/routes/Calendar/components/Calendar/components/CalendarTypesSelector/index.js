import React from 'react';
import {Icon} from 'antd';
import { SelectableTags } from '../../../../../../components/FormCustomFields/components/SelectableTags';

const CalendarTypesSelector = (props) => {
    const {eventTypes=[],  ...otheProps} = props;
    const {loading} = otheProps;
    if (loading) {
        return <Icon type="loading" theme="outlined" />;
    }

    const tags = eventTypes && eventTypes.map(({description, name}) => ({value:name, label:description}));
    return <SelectableTags {...otheProps} tags={tags} useAll />
}

export default CalendarTypesSelector;