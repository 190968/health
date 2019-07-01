import React from 'react';
import moment from 'moment';
import DescriptionList from '../../../../../../components/Layout/DescriptionList/DescriptionList';
const PersonalNoteView = props => {
    const {personalNote} = props;
    const {title, note, createdOn} = personalNote || {};
    
    let details = [
        ['Title', title],
        ['Note', note],
        ['Created', createdOn && moment(createdOn).format('lll')],
    ]
    // console.log(details);
    return <DescriptionList details={details} col={1} />
}

export default PersonalNoteView;