import React from 'react';
import {Link} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button } from 'antd';
import DefaultI18nEn from '../../../../../../../../i18n/en';

const ManagerButtonPure = props => {
    const { showModal, toggleModal, icon, label, button=true, title='Actionplans', ...otherProps } = props;
    const { plan } = otherProps || {};
    const {id} = plan || {};

    if (id) {
        return <Link to={'/pb/'+id}>Edit</Link>;
    }
    //  console.log(props);
    const textValues = { title, edit: id && id !== '' };
    const titleButton = <FormattedMessage values={textValues} {...DefaultI18nEn.addEditSomething} />;
    return <React.Fragment>
        <Link to={'/pb'+(id ? '/'+id : '')}><Button icon={'plus'} type={'primary'} /></Link>
    </React.Fragment>
}

export const ActionplanManagerButton = (ManagerButtonPure);
export default ActionplanManagerButton;