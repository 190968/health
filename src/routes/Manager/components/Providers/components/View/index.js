import React from 'react';
import moment from 'moment';
import DescriptionList from '../../../../../../components/Layout/DescriptionList/DescriptionList';
import AvatarWithName from '../../../../../User/components/AvatarWithName';
import { AddressFieldView } from '../../../../../../components/FormCustomFields/components/Address/view';
import { PhoneFieldView } from '../../../../../../components/FormCustomFields/components/Phone/view';
const ProviderView = props => {
    const {networkProvider} = props;
    const {provider, createdOn, createdBy} = networkProvider || {};
    const {id, title, phone, description, npi, taxId, address} = provider || {};

    let details = [
        ['Name', title],
        ['Description', description],
        ['NPI', npi],
        ['Tax ID', taxId],
        ['Phone', phone && <PhoneFieldView phone={phone} />],
        ['Address', address && <AddressFieldView address={address} />],
        ['Created', createdOn && moment(createdOn).format('lll')],
        ['Created By', createdBy && <AvatarWithName user={createdBy} />],
    ]

    return <DescriptionList details={details}/>
}

export default ProviderView;