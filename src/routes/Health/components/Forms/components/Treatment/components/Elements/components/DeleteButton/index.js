import React from 'react';
import {Popconfirm, Icon} from 'antd';
import { FormattedMessage } from 'react-intl';
import DefaultI18nEn from '../../../../../../../../../../i18n/en';

const TreatmentElementDeleteButton = props => {
    return <Popconfirm title={<FormattedMessage {...DefaultI18nEn.confirmSomething} values={{title: 'Treatment'}} />} onConfirm={props.handleDelete} okText="Yes" cancelText="No">
        <Icon type="close-circle" theme="outlined" />
  </Popconfirm>
}

export default TreatmentElementDeleteButton;