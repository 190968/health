import React from 'react';
import moment from 'moment';
import DescriptionList from '../../../Layout/DescriptionList/DescriptionList';
const BrahmView = props => {
    const brahm = props;
    const {id, title, createdOn} = brahm || {};

    let details = [
        ['Name', title],
        ['Created', createdOn && moment(createdOn).format('lll')],
    ]

    return <DescriptionList details={details}/>
}

export default BrahmView;