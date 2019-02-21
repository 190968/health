import React from 'react';
import TaskManagerPure from '../components/Manager';
import TaskManagerSimple from '../components/Manager/simple.js';
import {compose, withProps, withHandlers, renderComponent, branch, withState} from 'recompose';
import {Form, message} from 'antd';
import { withDrawer, withSpinnerWhileLoading } from '../../../../../components/Modal';
import { FormattedMessage } from 'react-intl';
import DefaultI18nEn from '../../../../../i18n/en';
import messages from '../i18n/en';
import moment from 'moment';
import { withTaskMutation } from '../mutations';
import { prepareTaskAssignInput } from '../components/Manager/containers/Forward';
import { prepareTaskAttachmentInput } from '../../../../../components/FormCustomFields/components/AttachmentsModules';
const createFormField = Form.createFormField;
 
 
const enhance = compose(
    Form.create({
        mapPropsToFields(props) {
            console.log(props);
            const {task} = props;
            let { attachments, patient, mode, assignMode} = props;

            //console.log(patient, 'patient');
            if (!task && !patient && !attachments) {
                return;
            }
            let {type, patient:taskPatient=patient, source, title, description, priority, guidelines, endDate, getAttachments:taskAttachments=[]} = task || {};

            if (!attachments && taskAttachments.length > 0) {
                attachments = taskAttachments;
            }
            if ( mode === 'simple') {
                type = 'assign';// type assign
            }
            //attachments = [];
            return {
                assignMode: createFormField({
                    value: assignMode,
                }),
                patient: createFormField({
                    value: taskPatient,
                }),
                type: createFormField({
                    value: type,
                }),
                source: createFormField({
                    value: source,
                }),
                title: createFormField({
                    value: title,
                }),
                description: createFormField({
                    value: description,
                }),
                priority: createFormField({
                    value: priority,
                }),
                endDate: createFormField({
                    value: endDate ? moment(endDate) : undefined,
                }),
                attachments: createFormField({
                    value: attachments,
                }),
                source: createFormField({
                    value: source,
                }),
                guidelines: createFormField({
                    value: guidelines,
                })
            };
        }
    }),
    withTaskMutation,
    withHandlers({
        onSubmit: props => () => {
            const {form} = props;
            form.validateFields((err, values) => {
                console.log(values);
                if (!err) {
                    const {task} = props;
                    const input = prepareInput(values);
                    const hide = message.loading('Saving...');
                    if (task) {
                        
                        return props.updateTask(input).then(() => {
                            hide();
                            message.success('Saved');
                            props.onHide();
                        });
                    } else {
                        return props.addTask(input).then(() => {
                            hide();
                            message.success('Saved');
                            props.onHide();
                        });
                    }
                    
                }
            });
        }
    }),
    withProps(props => {
        const {task} = props;
        const {id} = task || {};
        const title = <FormattedMessage {...DefaultI18nEn.addEditSomething} values={{edit: id , title: <FormattedMessage {...messages.task} />}}  />;
        return {modalTitle:title}
    }),
    withDrawer,
    withSpinnerWhileLoading,
    branch(props => {
        const {mode} = props;
        return mode === 'simple';
    }, renderComponent(TaskManagerSimple))
);


export const TaskManager = enhance(TaskManagerPure);








const prepareInput = (value) => {
    const {patient, endDate, assignMode:type, providerId, staffMembers:participants, familyMembers, teamMembersMode, attachments:valueAttachments=[], ...input} = value;
    const {id:patientId} = patient || {};

    // const {mode, users} = teamMembersMode || {};
    // let recipientInput = {type,providerId, participants/*, useAll:teamMembersMode===1*/};
    // if (type === 1) {
    //     if (mode === 2) {
    //         recipientInput.participants = users;
    //     } else {
    //         recipientInput.useAll = true;
    //     }
    // } else if (type == 2) {
    //     recipientInput.participants = familyMembers;
    // }

    const recipientInput = prepareTaskAssignInput(value);

    const attachments = prepareTaskAttachmentInput(valueAttachments);
    

   
    return {...input, patientId, recipientInput, attachments, endDate: moment(endDate).format('YYYY-MM-DD')}
}

