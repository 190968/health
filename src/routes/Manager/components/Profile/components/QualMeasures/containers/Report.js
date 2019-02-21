import Report from '../components/Report';
import {Form, message} from 'antd';
import moment from 'moment';
import { compose, withHandlers } from 'recompose';
import { withDrawer, showLoadingMessage } from '../../../../../../../components/Modal';
import { withQualityMeasureWithReportsQuery } from '../queries';
import { withReportQualityMeasuresMutation } from '../mutations';

const enhance = compose(
    withQualityMeasureWithReportsQuery,
    withReportQualityMeasuresMutation,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const {form, qm}  = props;
           
            form.validateFields((err, values) => {
                console.log(values);
                console.log(err);
                if (!err) {
                    //const {field:reportedField} = values;
                    const {getFields}  = qm || {};

                    const fields = prepareQalityMeasurementReportInput(getFields, values);
                    console.log(fields);
                    const hide = showLoadingMessage();
                    props.reportQM(fields).then(() => {
                        hide();
                        message.success('Saved');
                    });
                }
            });
        }
    }),
    withDrawer
);
export const QualityMeasureReport = enhance(Report);

const prepareQalityMeasurementReportInput = (getFields, values) => {
    // console.log(values);
    // console.log(getFields);
    const {field:reportedField} = values || {};
    const fields = getFields.map(field => {
        const {id:fieldId, type} = field;
        let valueAsString, valueAsDate, valueAsBoolean;
        switch(type) {
            case 'date':
                const date = reportedField[fieldId];
                valueAsDate = date || moment(date).format('YYYY-MM-DD');
                break;
            case 'posneg':
            case 'yesno':
                valueAsBoolean = reportedField[fieldId];
                break;
            default:
                valueAsString = reportedField[fieldId];
                break;
        }
        
        return {fieldId, valueAsString, valueAsDate, valueAsBoolean};
    });

    return fields;
}