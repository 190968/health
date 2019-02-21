import Manager from '../components/Manager';
import {compose, withProps, withHandlers} from 'recompose';
import {injectIntl} from 'react-intl';
import { Form, message } from 'antd';
import moment from 'moment';
import { withCreateOrUpdateProgram } from '../mutations.js';
import DefaultI18nEn from '../../../../../i18n/en';
import { withDrawer } from '../../../../../components/Modal';
import { prepareAddressInput } from '../../../../../components/FormCustomFields/components/Address';

const enhance = compose(
    injectIntl,
    withCreateOrUpdateProgram,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const {form, program } = props;

            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareProgramInput(values);
                    let finish = null;
                    if (program) {
                        finish = props.updateProgram(input)
                    } else{
                        finish = props.createProgram(input);
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

        const {intl, program } = props;
        const {id} = program || {};
        const title = intl.formatMessage(DefaultI18nEn.createUpdateSomething, {isUpdate: (id && id !== ''), title: 'Program'})
        return {
            modalTitle: title
        }
    }),
    withDrawer
);
export const ProgramManager = enhance(Manager);

const prepareProgramInput = values => {
    const {address, ...otherValues} = values;
    const addressInput = prepareAddressInput(address)
    return {...otherValues, address:addressInput};
}