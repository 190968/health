import FormSection from '../components/FormSection';
import {graphql} from 'react-apollo';
import {compose,  withHandlers} from 'recompose';
import moment from 'moment';
import {Form, message} from 'antd';
import gql from 'graphql-tag';
import { PatientInfoFragment } from '../../../../../../User/fragments';
import { preparePhoneInput } from '../../../../../../../components/FormCustomFields/components/Phone';
import { prepareAddressInput } from '../../../../../../../components/FormCustomFields/components/Address';

const REPORT_NETWORK_FORM_MUTATION = gql`
    mutation ReportNetworkIntakeForm($userId: UID!, $values:[FormFieldReportInput], $isUpdate: Boolean!){
        updatePatientIntakeForm(userId:$userId,values:$values)  @include(if: $isUpdate) {
            ...PatientInfo
        }
        createPatientIntakeForm(values:$values) @skip(if: $isUpdate) {
            ...PatientInfo
        }
    }
    ${PatientInfoFragment}
`;
 

const withMutation = graphql(REPORT_NETWORK_FORM_MUTATION, {
    props: ({mutate, ownProps}) => {
        const {patient={}} = ownProps;
        const {id=''} = patient;
        return {
            reportOnField: (values) => {
                //let  refetchQueries = [];

                // if (id === '') {
                //     refetchQueries.push({
                //         //query: QUERY_EXECUTE,
                //         //variables: {role}
                //     });
                // }
                return mutate({
                    variables: {userId:id, isUpdate:id !== '', ...values},
                    //refetchQueries
                });
            },
        }
    }
});


const enhance = compose(
    withMutation,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            props.form.validateFields((err, values) => {
                //console.log(err);
                // console.log(props);
                console.log(values, 'values');
                if (!err) {
                    const {section, isLastSection=false} = props || {};
                    const {fields=[]} = section || {};
                    // console.log(fields);
                    const {field={}/*, type_field={}*/} = values;
                    let valuesByFields = [];
                    //console.log(field);
                    for(var k in field) {
                        if(field.hasOwnProperty(k)) {
                            var value = field[k];

                            // console.log(k);
                            // console.log(fieldCode);
                            
                            const fieldPure = fields.find(field => field.id === k);//[k] || {};
                            const {type, fieldCode, getChildren=[], useValueIdToReport=false} = fieldPure || {};
                            //  console.log(fieldPure);
                            // console.log(fieldCode1);
                            //const {type, useValueIdToReport=false} = type_field[k];
                            var isTypeString = typeof value === 'string';
                            let fieldInput = {
                                fieldId:k
                            }

                            
                            
                            let skipValuesByFields = false;
                            switch(type) {
                                 case 'full_name':
                                 case 'first_last_name':
                                    skipValuesByFields = true;
                                    for(var fCode in value) {
                                        if(value.hasOwnProperty(fCode)) {
                                            var val = value[fCode];

                                            // console.log(fCode);
                                            // console.log(val);
                                            // get children INFO
                                            const child = getChildren.find(f => f.fieldCode === fCode);
                                            const {useValueIdToReport:childUseValueIdToReport} = child || {};

                                            let fieldInputCode = {
                                                fieldId:k
                                            }
                                            fieldInputCode['fieldCode'] = fCode;

                                            //if (isCodeUid) {
                                            if (childUseValueIdToReport) {
                                                fieldInputCode['valueId'] = val;
                                            } else {
                                                fieldInputCode['value'] = val;
                                            }
                                            //console.log(fieldInputCode);
                                            valuesByFields.push(fieldInputCode);
                                        }
                                    }
                                    break;
                                // case 'first_last_name':
                                //     console.log(value);
                                //     break;
                                case 'birthday':
                                case 'date':
                                    fieldInput['date'] = moment(value).format('YYYY-MM-DD');
                                    break;
                                case 'address':
                                    //console.log(value);
                                    fieldInput['address'] = prepareAddressInput(value);
                                    break;
                                case 'phone':
                                    value = value[fieldCode] || {};
                                    
                                    fieldInput['phone'] = preparePhoneInput(value)
                                    break;
                                case 'diagnosis':
                                case 'medications':
                                case 'allergies':
                                    skipValuesByFields = true;
                                    //field = <Input disabled />
                                    //noFieldDecorator = true;
                                    break;
                                default:
                                    console.log(fieldCode, 'fieldCode');
                                    console.log(value, 'fieldCodevalue');
                                    if (fieldCode) {
                                        fieldInput['fieldCode'] = fieldCode;
                                        value = value[fieldCode];
                                    }
                                    // console.log(value);
                                    // console.log(useValueIdToReport);
                                    if (useValueIdToReport) {
                                        fieldInput['valueId'] = value;
                                    } else {
                                        fieldInput['value'] = value;
                                    }
                                    break;
                            }

                            if (!skipValuesByFields) {
                                valuesByFields.push(fieldInput);
                            }

                        }
                    }
                    // console.log(fields, 'fields');
                    // console.log(valuesByFields, 'valuesByFields');
                    // return;
                    const hide = message.loading('Saving...');
                    props.reportOnField({values:valuesByFields}).then(({data})=> {
                        hide();
                        const {createPatientIntakeForm} = data;

                        if (createPatientIntakeForm) {
                            // if we create - then update patient
                            props.setPatient(createPatientIntakeForm);
                        } else {
                           // const {updatePatientIntakeForm=createPatientIntakeForm} = data;
                        }
                       
                        if (isLastSection) {
                            message.success('Saved');
                            props.onHide();
                        } else {
                            props.goNextStep();
                        }
                        
                        // go to next section
                    });
                }
            });
        }
    })
);
export default enhance(FormSection);