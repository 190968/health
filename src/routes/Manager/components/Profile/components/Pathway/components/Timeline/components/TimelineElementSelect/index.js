import React from 'react';
import {Select, Tag} from 'antd';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
const Option = Select.Option;


export const getTimelineElementsConst = (includeViewOnly=false) => {
    let items = [
        {name:'Treatment', type:'treatment'},
        {name:'Diagnosis', type:'diagnosis'},
        {name:'Stage', type:'cancer_stage'},
        //{name:'Regimen', type:'regimen'},
        {name:'To Do', type:'checklist'},
        {name:'Link', type:'link'},
        {name:'Clinical Note', type:'clinical_note'},
        //{name:'Procedure order', type:'procedureOrder'},
        {name:'ActionPlan', type:'ap'},
        //{name:'Care Plan', type:'discharge'},
    ];
    if (includeViewOnly) {
        items.push( {name:'Tumorboard', type:'tumorboard'});

    }

    return items;
}

export const getTimelineElementTitle = (type) => {
    let elements = getTimelineElementsConst();

    elements = elements.filter(element => {
        return element.type == type;
    })
    if (elements.length > 0 ) {
        return elements[0]['name'];
    }
    return '';
}

class TimelineElementSelect extends React.PureComponent {


    setType = (type) => {
        this.props.onSelect(type);
    };

    render() {

        const elements = getTimelineElementsConst();
        return (
            elements.map(info => <Tag key={info.type} onClick={() => this.setType(info.type)}>{info.name}</Tag>)
        );
    }
}
export default injectIntl(TimelineElementSelect);

