import React from 'react';
import moment from 'moment';
const ActionplansView = props => {
    const actionplans = props;
    const {id, title, createdOn} = actionplans || {};

    let details = [
        ['Name', title],
        ['Created', createdOn && moment(createdOn).format('lll')],
    ]

    return <DescriptionList details={details}/>
}

export default ActionplansView;