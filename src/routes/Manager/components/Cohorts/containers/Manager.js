import Manager from '../components/Manager';
import {compose, withProps, withHandlers} from 'recompose';
import { withDrawer } from '../../../../../components/Modal';
import {injectIntl} from 'react-intl';
import DefaultI18nEn from '../../../../../i18n/en';
import { Form, message } from 'antd';
import { withCreateOrUpdateCohort, withDeleteCohortMutation } from '../mutations';
import { preparePatientFiltersInput } from '../../../../../components/Tables/FilterFields';

const enhance = compose(
    injectIntl,
    withCreateOrUpdateCohort,
    withDeleteCohortMutation,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const {form, cohort, activeFilters} = props;
            console.log(props);
            form.validateFields((err, values) => {
                console.log(activeFilters);
                const inputFilters = preparePatientFiltersInput(activeFilters);
                if (!err) {
                    // const {} = props
                    let input = prepareCohortInput(values);
                    input = {...input, cohortFilters:inputFilters};
                    const {patients=[]} = props;
                    if (patients.length > 0) {
                        input = {...input, patientsId:patients.map(p=>p.id)};
                    }
                    if (cohort) {
                        props.updateCohort(input).then(() => {
                            if (props.onHide) {
                                props.onHide();
                            }
                        });
                    } else {
                        props.createCohort(input).then(() => {
                            if (props.onHide) {
                                props.onHide();
                            }
                        });
                    }
                    // const {userId, tagId, tagType} = props;
                    // const {message, attachments} = values;
                    // return props.sendMessage({userId, tagId, tagType, message, attachments}).then(() => {
                    //     messageModal.success('Sent');
                    //     // reset form
                    //     form.resetFields();
                    // });
                }
            });
        },
        onDelete: props => () => {
            // const {cohort} = props;
            if (props.deleteCohort) {
                props.deleteCohort().then(() => {
                    if (props.onHide) {
                        props.onHide();
                    }
                    if (props.refetch) {
                        props.refetch();
                    }
                    message.success('Archived');
                });
            }
        }
    }),
    withProps(props => {
        // console.log(props);
        const {intl, cohort} = props;
        const {id} = cohort || {};
        const title = intl.formatMessage(DefaultI18nEn.createUpdateSomething, {isUpdate: (id && id !== ''), title: 'Cohort'})
        // console.log(id && id !== '', 'isUPDATE')
        return {
            modalTitle: title
        }
    }),
    withDrawer
);
export const CohortManager = enhance(Manager);

const prepareCohortInput = values => {
    const {managers, ...otherProps} = values;

    return {...otherProps, managerIds:managers.map(m=>m.id)};
}