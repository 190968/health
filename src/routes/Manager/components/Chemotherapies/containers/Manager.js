import Manager from '../components/Manager';
import {compose, withProps, withHandlers} from 'recompose';
import {injectIntl} from 'react-intl';
import { Form, message } from 'antd';
import moment from 'moment';
import { withCreateOrUpdateChemotherapy } from '../mutations.js';
import { withDrawer } from '../../../../../components/Modal';
import DefaultI18nEn from '../../../../../i18n/en';

const enhance = compose(
    injectIntl,
    withCreateOrUpdateChemotherapy,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const {form, chemotherapy } = props;

            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareChemotherapyInput(values);
                    let finish = null;
                    if (chemotherapy) {
                        finish = props.updateChemotherapy(input)
                    } else{
                        finish = props.createChemotherapy(input);
                    }
                    finish.then(() => {
                        message.success('Saved');
                        if (props.onHide) {
                            props.onHide();
                        }
                         if (props.refetch) {
                             props.refetch();
                         }   
                    });
                }
            });
        },
    }),
    withProps(props => {

        const {intl, chemotherapy } = props;
        const {id} = chemotherapy || {};
        const title = intl.formatMessage(DefaultI18nEn.createUpdateSomething, {isUpdate: (id && id !== ''), title: 'Chemotherapy'})
        return {
            modalTitle: title
        }
    }),
    withDrawer
);
export const ChemotherapyManager = enhance(Manager);

const prepareChemotherapyInput = values => {
    return values;
}