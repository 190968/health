import CalculatorReport from '../components/CalculatorReport';
import {compose, withHandlers, withProps, withState} from 'recompose';
import {Form} from 'antd';
import { withModal } from '../../../../../../../components/Modal';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { EvidencioCalculatorReportFragment } from '../fragments';
  
const CALCULATOR_REPORT_MUTATION = gql`
    mutation CalculatorReport($id: UID!, $fields:[IdValueInput]!){
        evidencioReport(id:$id, fields:$fields) {
            ...EvidencioCalculatorReportInfo
        }
    }
    ${EvidencioCalculatorReportFragment}
`;


const withMutation = graphql(CALCULATOR_REPORT_MUTATION, {
    props: ({ownProps:{calculator}, mutate }) => ({
        onSubmit: (input) => {
            return mutate({
                variables: { id: calculator.id, fields: input},
            });
        },
    }),
});


const enhance = compose(
    Form.create(),
    withState('report', 'setReport'),
    withMutation,
    withHandlers({
        handleSubmit: props => () => {
            //console.log(props.form.getFieldsValue());
            props.form.validateFields((err, values) => {
                if (!err) {
                    console.log(values);
                    const {fields=[]} = values;
                    let params = [];
                    console.log(fields);

                    for (var key in fields) {

                        params.push({'id': key, 'value': fields[key].toString()});
                       // console.log("key " + key + " has value " + myArray[key]);
                      }

                    // const values = fields.map(field => ({
                    //     id:field.
                    // }))
                    props.onSubmit(params).then(({data})=> {
                        const {evidencioReport} = data;
                        props.setReport(evidencioReport);
                        //props.onHide();
                    });
                }
            });
        }
    }),
    withProps(props => {
        const {calculator} = props;
        return {
            modalTitle: calculator.title,
            modalFooter: false
        }
    }),
    withModal
);
export default enhance(CalculatorReport);