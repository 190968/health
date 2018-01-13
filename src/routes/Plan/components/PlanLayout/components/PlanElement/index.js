import React from 'react'
import PropTypes from 'prop-types'
import Measurement from '../Measurement';

import { Icon, Upload, Alert, Button, Card, Slider, Checkbox, Radio, Input, DatePicker, TimePicker, Select } from 'antd';
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const Option = Select.Option;

export class PlanElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         //   tab:''
        };
        this.onChange = this.onChange.bind(this);
    };
    static propTypes = {

    };

    onChange(value) {
        console.log(value);
    }

    render() {
       console.log(this.props);
       const {element} = this.props;
       const {item_type, item_info} = element;
       const item = item_info;

       let field = item_type;
       //field = item_type;
       let fieldTitle = '';
       switch(item_type) {
           case 'measurement_input':
               field = <Measurement item={item} />
               break;
           case 'choice_input':
           case 'checklist':
               //const vertically = item.is_vertically;
               fieldTitle = item.label;
               var options = item.opts_arr;
               let plainOptions = [];
               options.map((option) => {
                   const coid = option.coid;
                   const name = option.name;
                   const description = option.description;
                   plainOptions.push({ label: name, value: coid });
               });

               field = <CheckboxGroup options={plainOptions} defaultValue={['Apple']} onChange={this.onChange} />
               break;
           case 'radio_input':
               fieldTitle = item.label;
               var options = item.opts_arr;
               let radioStyle = {};
               if (item.is_vertically === '1') {
                   radioStyle = {
                       display: 'block',
                       height: '30px',
                       lineHeight: '30px',
                   };
               }


               field = <RadioGroup onChange={this.onChange} /*value={this.state.value}*/>
                   {options.map((option, i) => {
                       const coid = option.coid;
                       const name = option.name;
                       //const description = option.description;
                       return <Radio key={i} style={radioStyle} value={coid}>{name}</Radio>;
                   })}
               </RadioGroup>
               break;
           case 'text_input':
               fieldTitle = item.label;
               const isLinetext = item.is_linetext;
               const isDate = item.is_date;
               const isTime = item.is_time;
               if (isDate) {
                    field = <DatePicker />;
               } else if (isTime) {
                   field = <TimePicker />;
               } else if (isLinetext) {
                    field = <Input placeholder="Basic usage" />;
               } else {

                   field = <TextArea placeholder="Autosize height based on content lines" autosize={{ minRows: 2, maxRows: 6 }} />

               }
               break;
           case 'dropdown_input':
               fieldTitle = item.label;
               var options = item.opts_arr;
               field = <Select
                   showSearch
                   style={{ width: 200 }}
                   optionFilterProp="name"
                   /*onChange={handleChange}
                   onFocus={handleFocus}
                   onBlur={handleBlur}*/
                   filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
               >
                   {options.map((option, i) => {
                       const coid = option.coid;
                       const name = option.name;
                       //const description = option.description;
                       return <Option key={i} value={coid}>{name}</Option>;
                   })}
               </Select>
               break;
           case 'scale_input':
               fieldTitle = item.label;
               var options = item.opts_arr;
               let marks = {};


           {options.map((option, i) => {
               const coid = option.coid;
               const name = option.name;

               marks[i] = name;
               /*
               {
                       style: {
                           color: '#f50',
                       },
                       label: <strong>100°C</strong>,
                   },
                */
               //const description = option.description;
               //return <Option value={coid}>{name}</Option>;
           })}
//console.log(marks);
               field = <div style={{padding:'0 20px'}}><Slider marks={marks} max={options.length-1} /></div>;//<Slider marks={marks}    />
               break;
           case 'file_input':
               fieldTitle = item.label;
                field = <Upload>
                    <Button>
                        <Icon type="upload" /> Upload
                    </Button>
                </Upload>
               break;
           case 'exam_input':
               fieldTitle = item.label;
               field = <Button>{fieldTitle}</Button>;
               break;
           case 'instruction':
               fieldTitle = '';
               field = <div dangerouslySetInnerHTML={{__html: item.instruction}}></div>;
               break;
           case 'line':
               return ('');
               break;
           case 'instruction_tipbox':
               fieldTitle = '';
               field = <Alert message="Tipbox" description={<div dangerouslySetInnerHTML={{__html: item.instruction}}></div>} type="info" showIcon />;
               break;
           case 'link':
               field = <Card hoverable><a href={item.link_path}><Card.Meta
                   title={item.label}
                   description={item.description}
               /></a></Card>
               //link_path":"https://ya.ru","label":"Yandex","description":"search engine"
               break;
       }
        return (<div>{fieldTitle && <h4>{fieldTitle}</h4>}
           <div>{field}</div></div>)
    }
}



export default PlanElement
