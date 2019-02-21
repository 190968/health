import React from 'react';
import {Form, Input, Tooltip, Icon, Radio, Button, Slider, Alert} from 'antd';
import DescriptionList from '../../../../../../../../components/Layout/DescriptionList';
import Description from '../../../../../../../../components/Layout/DescriptionList/Description';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      //sm: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      //sm: { span: 24 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

const CalculationReport = props => {
    const {calculator={}, form, report} = props;
    const {description='', variables=[] } = calculator;
    const {getFieldDecorator} = form;
    if (report) {
        return <CalculationReportResult calculator={calculator}report={report} />
    }
    console.log(props);
    return <React.Fragment>
    <Form layout={'vertical'} >
        {variables.map((variable, i) => {
            console.log(variable);
            const {id, title, type, options=[]} = variable;



            let field = '';
            switch(type){
                case 'categorical':
                field = <RadioGroup>
                    {options.map((option, im) => {
                        console.log(option);
                        const {value, label} = option;
                        return <Radio value={value} key={im}>{label}</Radio>;
                    })}
                </RadioGroup>;
                break;
                case 'continuous':
                    const option = options[0];
                    const {min, max, step, unit} = option || {};
                    field = <Slider min={parseFloat(min)} max={parseFloat(max)}  step={step} tipFormatter={v => `${v} ${unit}`}/>
                    // options.map((option, im) => {
                    //     const {min, max, step} = option;
                    //     return <Slider /*min={parseFloat(min)} max={parseFloat(max)}  step={step}*/ key={im} />;
                    // });
                break;
            }
          

            return <FormItem
                key={i}
                label={<span>{title} <Tooltip title={description}>
                <Icon type="question-circle-o" />
              </Tooltip></span>}
            >
          {getFieldDecorator('fields['+id+']', {
             //rules: [{
            //   type: 'email', message: 'The input is not valid E-mail!',
            // }, {
             // required: true, message: 'Please enter your E-mail!',
            //}],
          })(

            field
            // <Input />
          )}
          
          </FormItem>

        })}

    </Form>
    <div style={{textAlign:'right'}}>
        <Button type={'primary'} onClick={props.handleSubmit}>Submit</Button>
    </div>
    </React.Fragment>;
}

export default CalculationReport;


const CalculationReportResult = props => {
    const {report} =props;
    const {result} = report;
    return <Alert message={'Results'}
    description={'Your score is '+result}
    type="success"
    showIcon />
}