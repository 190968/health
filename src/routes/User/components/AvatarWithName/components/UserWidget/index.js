import React from 'react';
import { Icon, Drawer, Tabs, Row, Col, Button, Radio, Divider, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import Avatar from '../../../Avatar'
import DescriptionList from '../../../../../../components/Layout/DescriptionList';
import moment from 'moment';
import { LoadingBox } from '../../../../../../components/Loading';
import { SendMessageButton } from '../../../../../../components/User/containers/SendMessageButton';
import { PhoneFieldView } from '../../../../../../components/FormCustomFields/components/Phone/view';
import { AddressFieldView } from '../../../../../../components/FormCustomFields/components/Address/view';
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;
const UserWidget = props => {
    const { onHide, loading, toggleModal, user, asButton = true, role, ...otherProps } = props;
    const { birthday, genderText, age,  lastLogin, phone, address } = user || {};
    let {  getPossibleRoles = [] } = user || {};

    if (role) {
        getPossibleRoles = [role];
    }
    let hasPatientRole = getPossibleRoles.includes('patient');
    getPossibleRoles = [];
    let details = [
        ['Name', user.fullName],
        ['Birthday', moment(birthday).format('L')],
        ['Age', age],
        ['Gender', genderText],
        ['Phone', phone && <PhoneFieldView phone={phone}/>],
        ['Address', address && <AddressFieldView address={address}/>],
        ['Last Login', lastLogin ? moment(lastLogin).format('lll') : null],
    ]

    return <Drawer
        title={user.fullName}
        placement="right"
        width={500}
        closable={true}
        onClose={onHide}
        visible={true}
    >
        <Row>
            <Col md={10} style={{ textAlign: 'center' }}>
                <Avatar info={user} size="huge" />
                <div style={{ marginTop: 10 }}>
                    <ButtonGroup>
                        <Tooltip title={'Send Message'}><SendMessageButton user={user} icon /></Tooltip>
                        {hasPatientRole && <Tooltip title={'View Full Profile'}><Link to={'/u/' + user.id}><Button icon="user" theme="outlined" /></Link></Tooltip>}
                    </ButtonGroup>
                </div>
            </Col>
            <Col md={14}><DescriptionList col={1} >
                {details.map((detail, i) => {
                    return <DescriptionList.Description term={detail[0]} key={i} excludeEmpty>{detail[1]}</DescriptionList.Description>;
                })}
            </DescriptionList>

            </Col>
        </Row>

        {loading ? <LoadingBox /> : <Divider>
            <Radio.Group defaultValue="a" buttonStyle="solid">
                {getPossibleRoles.map((role, i) => <Radio.Button key={i} value={role}>{role}</Radio.Button>)}
            </Radio.Group>
        </Divider>}

    </Drawer>
}

export default UserWidget;


