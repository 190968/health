import Manager from '../components/Manager';
import {compose, withProps, withHandlers} from 'recompose';
import {injectIntl} from 'react-intl';
import { Form, message } from 'antd';
import moment from 'moment';
import { withCreateOrUpdateCancer } from '../mutations.js';
import DefaultI18nEn from '../../../../../i18n/en';
import { withDrawer } from '../../../../../components/Modal';

const enhance = compose(
    injectIntl,
    withCreateOrUpdateCancer,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const {form, cancer } = props;

            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareCancerInput(values);
                    let finish = null;
                    if (cancer) {
                        finish = props.updateCancer(input)
                    } else{
                        finish = props.createCancer(input);
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

        const {intl, cancer } = props;
        const {id} = cancer || {};
        const title = intl.formatMessage(DefaultI18nEn.createUpdateSomething, {isUpdate: (id && id !== ''), title: 'Cancer'})
        return {
            modalTitle: title
        }
    }),
    withDrawer
);
export const CancerManager = enhance(Manager);

const prepareCancerInput = values => {
    const {chemotherapies, stage, ...otherProps} = values;
    const {id:stageId} = stage || {};
    return {...otherProps, stageId, chemotherapyIds:chemotherapies.map(i=>i.id) };
}