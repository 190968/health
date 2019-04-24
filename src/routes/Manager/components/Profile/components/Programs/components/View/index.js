import React from 'react';
import { Card, Tag, Button, Tabs, Avatar, Alert, Divider } from 'antd';
import { DrawerFooter } from '../../../../../../../../components/Modal';
import DescriptionList from '../../../../../../../../components/Layout/DescriptionList/DescriptionList';
import { AddressFieldView } from '../../../../../../../../components/FormCustomFields/components/Address/view';
import UserWidgetCard from '../../../../../../../../components/User/components/WidgetCard';
import CalendarAppointmentButton from '../../../../../../../Calendar/components/Calendar/containers/CalendarAppointmentButton';
import { Comments } from '../../../../../../../../components/Comments';
import { ProgramJoinButton } from '../Buttons/containers/JoinButton';
import moment from 'moment';
import AvatarWithName from '../../../../../../../User/components/AvatarWithName';

const TabPane = Tabs.TabPane;

const ProgramView = props => {

    const {userProgram, program, patient} = props;
    //console.log(program);
    const {name, description, typeText, logo, categories=[], phone, fax, website,address,businessHours, email,icon,communities=[],languages=[],genders=[],locations=[], getPatientReferral} = program || {}
    const hasReferral = getPatientReferral;
    const {isApproved=false} = getPatientReferral || {};

    const {joinedDate,
        invitedDate,
        invitedBy,
        archivedDate,
        archivedBy} = userProgram || {};
    let dtls = [
        ['Name', name],
        ['Description', description],
        ['Type', typeText],
        ['Logo', logo && <Avatar src={logo} />],
        ['Categories', categories.length > 0 && categories.map(category => <Tag key={category.id} color="blue">{category.name}</Tag>)],
        ['Phone', phone],
        ['Fax', fax],
        ['Website', website],
        ['Email', email],
        ['Address', address && <AddressFieldView address={address} />],
        ['Bussiness Hours', businessHours],
        ['Communities', communities && communities.map(item => item.label)],
        ['Language', languages && languages.map(item => item.label)],
        ['Gender', genders && genders.map(item => item.label)],
        ['Location', locations && locations.map(item => item.label)],
        [<Divider />],
        ['Invited on ', invitedDate &&  moment(invitedDate).format('lll')],
        ['Invited by ', invitedBy &&  <AvatarWithName user={invitedBy} />],
        ['Joined on ', joinedDate &&  moment(joinedDate).format('lll')],
    ]
    
    return <React.Fragment>
        {patient && <UserWidgetCard user={patient} />}
        {hasReferral && !isApproved && <Alert
      message="Pending"
      description={patient.fullName+' needs to approve the request'}
      type="warning"
      showIcon
    />}
        <Card>
            <DescriptionList details={dtls} col={2} />
        </Card>
       
        {(hasReferral && isApproved) && <Tabs defaultActiveKey="referral" type="card">
    <TabPane tab="Note to patient" key="referral"><Comments id={getPatientReferral.id} type="referral"  /></TabPane>
    <TabPane tab={'Note to '+name} key="program"><Comments  id={program.id} type={'program'}/></TabPane>
  </Tabs>}
        <DrawerFooter>
            {(!hasReferral) ? <ProgramJoinButton program={program} patient={patient} /> : isApproved && <ProgramJoinButton program={program} patient={patient} unjoin />}
            <CalendarAppointmentButton patient={patient} isPatient size={'default'}  mode={'upcoming'} label={'Set Appointment'} />
            <Button size={'default'} disabled>Print</Button>
        </DrawerFooter>
        </React.Fragment>
}
export default ProgramView;