import UserManager from '../components/UserManager';
import {compose, withProps, withHandlers} from 'recompose';
import {injectIntl} from 'react-intl';
import { Form } from 'antd';
import { withDrawer } from '../../../../../../../components/Modal';
import DefaultI18nEn from '../../../../../../../i18n/en';
import { withCreateScreeningUsersMutation } from '../../../mutations';

const enhance = compose(
    injectIntl,
    withCreateScreeningUsersMutation,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const {form, screening} = props;

            form.validateFields((err, values) => {
                console.log(err);
                if (!err) {
                    
                    
                    const usersId = prepareScreeningUsersInput(values);
                    console.log(usersId);
                    props.createScreeningUsers(usersId).then(() => {
                        if (props.onHide) {
                            props.onHide();
                        }
                        if (props.refetch) {
                            props.refetch();
                        }   
                    });
                    // const input = prepareScreeningInput(values);
                    // let finish = null;
                    // if (screening) {
                    //     finish = props.updateScreening(input)
                    // } else{
                    //     finish = props.createScreening(input);
                    // }
                    // finish.then(() => {
                    //     if (props.onHide) {
                    //         props.onHide();
                    //     }
                    //      if (props.refetch) {
                    //          props.refetch();
                    //      }   
                    // });
                    // const {userId, tagId, tagType} = props;
                    // const {message, attachments} = values;
                    // return props.sendMessage({userId, tagId, tagType, message, attachments}).then(() => {
                    //     messageModal.success('Sent');
                    //     // reset form
                    //     form.resetFields();
                    // });
                }
            });
        }
    }),
    withProps(props => {

        const {intl, screening} = props;
        const {id} = screening || {};
        const title = 'Add User';//intl.formatMessage(DefaultI18nEn.createUpdateSomething, {isUpdate: (id && id !== ''), title: 'Patient'})
        return {
            modalTitle: title
        }
    }),
    withDrawer
);

export const ScreeningPopulationUserManager = enhance(UserManager);

const prepareScreeningUsersInput = values => {
    const {patients=[]} = values;
    return patients.map(({id}) => id);
}