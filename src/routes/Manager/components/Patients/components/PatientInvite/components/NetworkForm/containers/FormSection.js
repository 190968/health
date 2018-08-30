import FormSection from '../components/FormSection';
import {graphql} from 'react-apollo';
import {compose,  withHandlers, withState, renderComponent} from 'recompose';
import moment from 'moment';
import {Form, message} from 'antd';
import gql from 'graphql-tag';
import { PatientInfoFragment } from '../../../../../../../../User/fragments';
// import { GET_NETWORK_MANAGERS_LIST } from '../../../containers/NetworkManager';


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
                console.log(props);
                console.log(values);
                if (!err) {

                    const {field={}, fieldCode={}, type_field={}} = values;
                    let valuesByFields = [];
                    let valuesByCode = [];
                    //console.log(field);
                    for(var k in field) {
                        if(field.hasOwnProperty(k)) {
                            var value = field[k];
                            const {type, useValueIdToReport=false} = type_field[k];
                            var isTypeString = typeof type === 'string';
                            let fieldInput = {
                                fieldId:k
                            }
                            if (!isTypeString) {
                                var values = value;
                                console.log(values);
                                for(var fieldCode in values) {
                                    console.log(fieldCode);
                                    if(values.hasOwnProperty(fieldCode)) {
                                        var val = values[fieldCode];

                                        const {useValueIdToReport:isCodeUid=false} = type_field[k][fieldCode];
                                        let fieldInputCode = {
                                            fieldId:k
                                        }
                                        fieldInputCode['fieldCode'] = fieldCode;
                                        if (isCodeUid) {
                                            fieldInputCode['valueId'] = val;
                                        } else {
                                            fieldInputCode['value'] = val;
                                        }
                                        valuesByFields.push(fieldInputCode);
                                    }
                                }
                            } else {
                                if (useValueIdToReport) {
                                    fieldInput['valueId'] = value;
                                } else {
                                    switch (type) {
                                        default:
                                        fieldInput['value'] = value;
                                        break;
                                        case 'birthday':
                                        fieldInput['value'] = moment(value).format('Y-M-D');
                                        break;
                                    }
                                }
                                valuesByFields.push(fieldInput);
                            }

                            

                        }
                    }
                    props.reportOnField({values:valuesByFields}).then(({data})=> {
                        const {createPatientIntakeForm} = data;
                        const {updatePatientIntakeForm=createPatientIntakeForm} = data;

                        props.setPatient(updatePatientIntakeForm);
                        // go to next section
                    });
                }
            });
        }
    })
);
export default enhance(FormSection);