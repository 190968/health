import React from 'react';
import moment from 'moment';
import DescriptionList from '../../../../../../../../components/Layout/DescriptionList/DescriptionList';
const CancerStageView = props => {
    const cancerStage = props;
    const {id, title, createdOn} = cancerStage || {};

    let details = [
        ['Name', title],
        ['Created', createdOn && moment(createdOn).format('lll')],
    ]

    return <DescriptionList details={details}/>
}

export default CancerStageView;