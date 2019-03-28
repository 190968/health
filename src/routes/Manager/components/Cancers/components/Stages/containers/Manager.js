import Manager from '../components/Manager';
import {compose, withProps, withHandlers} from 'recompose';
import {injectIntl} from 'react-intl';
import { Form, message } from 'antd';
import moment from 'moment';
import { withCreateOrUpdateCancerStage } from '../mutations.js';
import DefaultI18nEn from '../../../../../../../i18n/en';
import { withDrawer } from '../../../../../../../components/Modal';
const createFormField = Form.createFormField;
const enhance = compose(
    injectIntl,
    withCreateOrUpdateCancerStage,
    Form.create({
        mapPropsToFields(props) {
            const {cancerStage} = props;
            if (!cancerStage) {
                return;
            }
            const {title, letters=[], rules=[]} = cancerStage || {};
            //console.log(stage);
    
            const rulesArr = [];
            rules.forEach((rule, i) => {
                const {stage, options} = rule;
                //console.log(stage);
                rulesArr[`rules[${i}]`] = createFormField({
                    value: {stage,
                        'options': options.map(option => option.name)
    
                    }
                });
            });
    
    
            const lettersArr = [];
            if (letters.length > 0) {
                letters.forEach((letter, i) => {
                    //console.log(stage);
                    lettersArr[`letters[${i}]`] = createFormField({
                        value: letter
                    });
                });
            } else {
                lettersArr[`letters`] = createFormField({
                    value: []
                });
            }
            //console.log(lettersArr);
    
            //console.log('mapPropsToFields', props);
            //console.log(lettersArr);
            //console.log(rulesArr);
            //console.log(typeof plan.schedule.limitStartDow);
            //const {type} =  plan.schedule;
            const obj = {
                title: createFormField({
                    value: title,
                }),
                keys: createFormField({
                    value:  Object.keys(letters)
                }),
                //letters:
                stage_keys: createFormField({
                    value:  Object.keys(rules)
                }),
                ...lettersArr,
                ...rulesArr
                /*'rules[0]': createFormField({
                    value: {stage:'11'}
                }),*/
            };
    
            //console.log(obj);
    
            return obj;
        },
    }),
    withHandlers({
        onSubmit: props => () => {
            const {form, cancerStage } = props;

            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareCancerStageInput(values, cancerStage);
                    let finish = null;
                    if (cancerStage) {
                        finish = props.updateCancerStage(input)
                    } else{
                        finish = props.createCancerStage(input);
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

        const {intl, cancerStage } = props;
        const {id} = cancerStage || {};
        const title = intl.formatMessage(DefaultI18nEn.createUpdateSomething, {isUpdate: (id && id !== ''), title: 'Cancer Stage'})
        return {
            modalTitle: title,
            modalFooter:false
        }
    }),
    withDrawer
);
export const CancerStageManager = enhance(Manager);

const prepareCancerStageInput = (values, stage) => {



    const {rules:initRules=[]} = stage || {};

    const {title, letters, rules} = values;


    return {title, letters, rules: rules.map((rule, i) => {
        const initRule = initRules[i] || {};
        const {id='', options:initOptions=[]} = initRule;
        const {options, stage} = rule;
        return {
            id:id,
            stage,
            options: options.map((item, i)=> {

                const initOption = initOptions[i] || {};
                const {id=''} = initOption;
                const letter = letters[i];
                return {
                    id,
                    letter,
                    name:item
                }
            })
        }
    })};
}