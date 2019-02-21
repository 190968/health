import React from 'react';
import moment from 'moment';
import DescriptionList from '../../../../../../components/Layout/DescriptionList';
import { AddressFieldView } from '../../../../../../components/FormCustomFields/components/Address/view';
import { PhoneFieldView } from '../../../../../../components/FormCustomFields/components/Phone/view';
import AvatarWithName from '../../../../../User/components/AvatarWithName';
import { Tag } from 'antd';
const ProgramView = props => {
    const {program} = props;
    const {title, description, categories, phone, fax, address, website, type, bussinessHours, createdOn, createdBy} = program || {};

    let details = [
        ['Name', title],
        ['Description', description],
        ['Categories', categories && categories.map(c => <Tag key={c.name}>{c.name}</Tag>)],
        ['Phone', phone && <PhoneFieldView phone={phone} />],
        ['Fax', fax && <PhoneFieldView phone={fax} />],
        ['Address', address && <AddressFieldView address={address} />],
        ['Website', website],
        ['Bussiness Hours', bussinessHours],
        ['Created', createdOn && moment(createdOn).format('lll')],
        ['Created By', createdBy && <AvatarWithName user={createdBy} />],
    ]

    return <DescriptionList details={details}/>
}

export default ProgramView;