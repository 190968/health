import AssessmentSectionManagerPure from '../components/Section';
import {Form, message} from 'antd';
import {compose, withProps, withHandlers} from 'recompose';
import {injectIntl} from 'react-intl';
import { withDrawer } from '../../../../Modal';
import { withCreateOrUpdateAssessmentSection } from '../../../mutations';
import DefaultI18nEn from '../../../../../i18n/en';

const enhance = compose(
    injectIntl,
    Form.create(),
    withCreateOrUpdateAssessmentSection,
    withHandlers({
        onSubmit: props => () => {
            const {form, section} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    // submit the section
                    let finish =  section ? props.updateAssessmentSection(values) : props.createAssessmentSection(values);
                    
                    finish.then(() => {
                        message.success(props.intl.formatMessage(DefaultI18nEn.saved));
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

        const { intl, section } = props;
        const { id } = section || {};
        const title = intl.formatMessage(DefaultI18nEn.createUpdateSomething, { isUpdate: (id && id !== ''), title: 'Section' })
        return {
            modalTitle: title
        }
    }),
    withDrawer
);
export const AssessmentSectionManager = enhance(AssessmentSectionManagerPure);