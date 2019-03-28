import React from 'react';
import moment from 'moment';
import DescriptionList from '../../../../../../components/Layout/DescriptionList/DescriptionList';
const ChemotherapyView = props => {
    const chemotherapy = props;
    const {id, title, createdOn} = chemotherapy || {};

    let details = [
        ['Name', title],
        ['Created', createdOn && moment(createdOn).format('lll')],
    ]

    return <DescriptionList details={details}/>
}

export default ChemotherapyView;