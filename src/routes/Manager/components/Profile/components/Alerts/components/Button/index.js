import React from 'react';
import {Tooltip, Button, Badge, Icon, Popover} from 'antd';
import { withToggleModal } from '../../../../../../../../components/Modal';
import DefaultI18nEn from '../../../../../../../../i18n/en';
import { FormattedMessage } from 'react-intl';
import { ProfileAlerts } from '../../../../containers/Alerts';

const NotificationButton = props => {
    const { showModal, toggleModal, ...otherProps } = props;
    // const title = <FormattedMessage values={{ title: <FormattedMessage {...DefaultI18nEn.attachment} /> }} {...DefaultI18nEn.addSomething} />;
    return <React.Fragment>
        {/* {showModal && <ProfileAlerts {...otherProps} onHide={toggleModal} />} */}

        <Tooltip title={'Notifications'}>
            <Popover content={<ProfileAlerts {...otherProps} onHide={toggleModal} />} title="Notifications" trigger="click" placement="bottomRight">
                <Button className={'ant-btn-icon-only'} ><Badge dot><Icon type="notification" /></Badge></Button>
            </Popover>
        </Tooltip>
    </React.Fragment>
}


export default withToggleModal(NotificationButton);