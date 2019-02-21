import React from 'react';
import moment from 'moment';
import AvatarWithName from '../../../User/components/AvatarWithName';

export const defaultHealthRecordDetails = healthRecord => {
    const {date, notes, createdDate, createdBy} = healthRecord || {};

    let details = [
        ['Date on Set', date ? moment(date).format('l') : null],
        ['Notes', notes],
        ['Added on', createdDate ? moment(createdDate).format('lll') : null],
        ['Added by', createdBy ? <AvatarWithName user={createdBy} /> : null],
    ];
    return details;
}