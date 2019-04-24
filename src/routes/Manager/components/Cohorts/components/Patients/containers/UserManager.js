import UserManager from '../components/UserManager';
import {compose, withProps, withHandlers} from 'recompose';
import {injectIntl} from 'react-intl';
import { Form } from 'antd';
import { withDrawer } from '../../../../../../../components/Modal';
import DefaultI18nEn from '../../../../../../../i18n/en';
import { withCreateCohortUsersMutation } from '../../../mutations';

const enhance = compose(
    injectIntl,
    withCreateCohortUsersMutation,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const {form, screening} = props;

            form.validateFields((err, values) => {
                if (!err) {
                    const usersId = prepareCohortUsersInput(values);
                    props.createCohortUsers(usersId).then(() => {
                        if (props.onHide) {
                            props.onHide();
                        }
                        if (props.refetch) {
                            props.refetch();
                        }   
                    });
                }
            });
        }
    }),
    withProps(props => {

        const {intl, cohort, role} = props;
        const {id} = cohort || {};
        const title = role == 'member' ? 'Add Team Member' : 'Add User';//intl.formatMessage(DefaultI18nEn.createUpdateSomething, {isUpdate: (id && id !== ''), title: 'Patient'})
        return {
            modalTitle: title
        }
    }),
    withDrawer
);

export const CohortUserManager = enhance(UserManager);

const prepareCohortUsersInput = values => {
    const {patients=[]} = values;
    return patients.map(({id}) => id);
}