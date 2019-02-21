import React from 'react';
import { Card } from 'antd';
import {ProfileSectionField} from './containers/ProfileSectionField';
import DescriptionList from '../../../../../../../../../../components/Layout/DescriptionList';
import PatientManagerButton from '../../../../../../../Patients/components/PatientEditButton';

const ProfileSection = props => {
    const {section, user} = props;
    const {id,label, fields=[]} = section || {};

    const extra = <PatientManagerButton patient={user} activeStep={id} />
    return <Card title={label} extra={extra}>
        <DescriptionList>
            {fields.map(field => {
                return <ProfileSectionField field={field} user={user} key={field.id} />;
            })}
         </DescriptionList>
    </Card>
}

export default ProfileSection;