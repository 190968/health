import React from 'react';
import { Tooltip, Icon, Card } from 'antd';
import Avatar from '../../../../routes/User/components/Avatar';
import moment from 'moment';
import DescriptionList from '../../../Layout/DescriptionList/DescriptionList';
import  './index.less';
import { PhoneFieldView } from '../../../FormCustomFields/components/Phone/view';

const GenderIcon = ({gender}) => {
    switch(gender) {
        case 'male':
            return <Tooltip title={'Male'}><Icon type="man" theme="outlined" /></Tooltip>;
        break;
        case 'female':
            return <Tooltip title={'Female'}><Icon type="woman" theme="outlined" /></Tooltip>;
        break;
    }
    return null;
}
const UserWidgetCard = props => {
    const {user, loading} = props;
    const { birthday, gender,genderText, age, lastLogin, phone } = user;
 

    let details = [
        ['Birthday', moment(birthday).format('L')],
        ['Age', age],
        ['Phone', <PhoneFieldView phone={phone} />],
        ['Last Login', lastLogin ? moment(lastLogin).format('lll') : null],
    ]

    return <Card type={'patientWidget clearfix'}>
        <div className={'patientWidget--image'}>
            <Avatar info={user} size="widget" />
            <div style={{ marginTop: 10 }}>
                {/* <ButtonGroup>
                    <Tooltip title={'Send Message'}><SendMessageButton user={user} icon /></Tooltip>
                    <Tooltip title={'View Full Profile'}><Button ><Link to={'/u/' + user.id}><Icon type="user" theme="outlined" /></Link></Button></Tooltip>
                </ButtonGroup> */}
            </div>
        </div>
        <div className={'patientWidget--details'}>
            <h1>{user.fullName} <GenderIcon gender={gender} /></h1>
            <DescriptionList details={details} col={1} />
        </div>
        </Card>
}

export default UserWidgetCard; 