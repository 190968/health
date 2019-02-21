import Manager from '../components/Manager';
import {compose, withProps, withHandlers} from 'recompose';
import {injectIntl} from 'react-intl';
import { Form, message } from 'antd';
import moment from 'moment';
import { withCreateOrUpdateProvider } from '../mutations.js';
import DefaultI18nEn from '../../../../../i18n/en';
import { withDrawer } from '../../../../../components/Modal';
import { prepareAddressInput } from '../../../../../components/FormCustomFields/components/Address';

const enhance = compose(
    injectIntl,
    withCreateOrUpdateProvider,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const {form, provider } = props;

            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareProviderInput(values);
                    let finish = null;
                    if (provider) {
                        finish = props.updateProvider(input)
                    } else{
                        finish = props.createProvider(input);
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

        const {intl, provider } = props;
        const {id} = provider || {};
        const title = intl.formatMessage(DefaultI18nEn.createUpdateSomething, {isUpdate: (id && id !== ''), title: 'Provider'})
        return {
            modalTitle: title
        }
    }),
    withDrawer
);
export const ProviderManager = enhance(Manager);

const prepareProviderInput = values => {
    const {address, ...otherValues} = values;
    const addressInput = prepareAddressInput(address)
    return {...otherValues, address:addressInput};
}