import Manager from '../components/Manager';
import {compose, withProps, withHandlers} from 'recompose';
import {injectIntl} from 'react-intl';
import { Form, message } from 'antd';
import moment from 'moment';
import { withCreateOrUpdate{{pascalCase $moduleName}} } from '../mutations.js';

const enhance = compose(
    injectIntl,
    withCreateOrUpdate{{pascalCase $moduleName}},
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const {form, {{camelCase $moduleName}} } = props;

            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepare{{pascalCase $moduleName}}Input(values);
                    let finish = null;
                    if ({{camelCase $moduleName}}) {
                        finish = props.update{{pascalCase $moduleName}}(input)
                    } else{
                        finish = props.create{{pascalCase $moduleName}}(input);
                    }
                    finish.then(() => {
                        messageModal.success('Saved');
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

        const {intl, {{camelCase $moduleName}} } = props;
        const {id} = {{camelCase $moduleName}} || {};
        const title = intl.formatMessage(DefaultI18nEn.createUpdateSomething, {isUpdate: (id && id !== ''), title: '{{pascalCase $moduleName}}'})
        return {
            modalTitle: title
        }
    }),
    withDrawer
);
export const {{pascalCase $moduleName}}Manager = enhance(Manager);

const prepare{{pascalCase $moduleName}}Input = values => {
    return values;
}