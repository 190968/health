import Manager from '../components/Manager';
import {compose, withProps, withHandlers} from 'recompose';
import {injectIntl} from 'react-intl';
import { Form, message } from 'antd';
import moment from 'moment';
import DefaultI18nEn from '../../../i18n/en';
import { withDrawer } from '../../Modal';
// import { withCreateOrUpdateBrahm } from '../mutations.js';

const enhance = compose(
    injectIntl,
    // withCreateOrUpdateBrahm,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const {form, brahm } = props;

            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareBrahmInput(values);
                    let finish = null;
                    if (brahm) {
                        finish = props.updateBrahm(input)
                    } else{
                        finish = props.createBrahm(input);
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

        const {intl, brahm } = props;
        const {id} = brahm || {};
        const title = intl.formatMessage(DefaultI18nEn.createUpdateSomething, {isUpdate: (id && id !== ''), title: 'Brahm'})
        return {
            modalTitle: title
        }
    }),
    withDrawer
);
export const BrahmManager = enhance(Manager);

const prepareBrahmInput = values => {
    return values;
}