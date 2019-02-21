import React from 'react';
import { Card, Divider , Form} from 'antd';
import DescriptionList from '../../../../../../../../components/Layout/DescriptionList';
import QualityMeasuresField from './components/Field';
import moment from 'moment';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const QualityMeasureReport = props => {
    const {qm, form} = props;

    const {getFieldDecorator} = form;
    const {title, startDate, rules, getScreeningTests, getFields=[], getLastUserReport} = qm || {};
    const {reportedOn} = getLastUserReport || {};
    //if ()
 
    return <Card>
        <FormItem
            {...formItemLayout}
            label={'Title'}
        >
           {title}
        </FormItem>
        {startDate &&  <FormItem
            {...formItemLayout}
            label={'Start date'}
        >
           {moment(startDate).format('l')}
        </FormItem>}
        {rules && <FormItem
            {...formItemLayout}
            label={'Workflow Rules'}
        >
            {rules}
        </FormItem>}

        {getScreeningTests.length > 0 && <FormItem
            {...formItemLayout}
            label={'Screening Tests'}
        >
           {getScreeningTests.map(getTest => <div key={getTest.id}>{getTest.title}</div>)}
        </FormItem>}
        

        <Divider />


        {getFields.map(field => {
            return <FormItem
            key={field.id}
            {...formItemLayout}
            label={field.title}
        >
           
            <QualityMeasuresField field={field} getFieldDecorator={getFieldDecorator} />
        </FormItem>
    })}
        
    </Card>
}

export default QualityMeasureReport;