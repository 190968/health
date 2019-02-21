import React from 'react';
import { compose, withHandlers, withProps } from 'recompose';
import { withDrawer } from '../../../../components/Modal';
import { Form, message } from 'antd';
import { withHealthRecordQuery } from '../../queries';
import { withHealthItemMutation } from '../../mutations';
import { getHealthElementLabel } from '../../utils';
import { FormattedMessage } from 'react-intl';
import DefaultI18nEn from '../../../../i18n/en';

export const enhanceHealthRecordManagerStart = compose(
    withHealthRecordQuery,
    withHealthItemMutation,
    Form.create(),
    withHandlers({
        onHealthItemSubmit: props => (input) => {
            const hide = message.loading('Saving...');
            if (props.createHealthRecord) {
                props.createHealthRecord(input).then(({data}) => {
                    hide();
                    message.success('Added');
                    if (props.onHide) {
                        props.onHide();
                    }
                    if (props.refetch) {
                        props.refetch();
                    }
                })
            } else if (props.updateHealthRecord) {
                props.updateHealthRecord(input).then(({data}) => {
                    hide();
                    message.success('Updated')
                    if (props.onHide) {
                        props.onHide();
                    }
                    if (props.refetch) {
                        props.refetch();
                    }
                })
            }
        }
    }),
);

export const enhanceHealthRecordManagerEnd = compose(
    withProps(props => {
        const {type, healthRecord} = props;
        const {id, title} = healthRecord || {};
        const edit = id && id !== '';
        return {
            modalTitle: <FormattedMessage values={{edit, title: edit? title : getHealthElementLabel({type})}} {...DefaultI18nEn.addEditSomething} /> ,
            modalWidth: 800
        }
    }),
    withDrawer
);