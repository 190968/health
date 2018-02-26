import React from 'react'
import Measurement from '../../containers/PlanMeasurement';
import { Divider, Icon, Upload, Alert, Button, Card } from 'antd';
import PlanChecklist from "../../../Plan/components/Checklist";
import PlanRadio from "../../../Plan/components/Radio";
import PlanInputText from "../../../Plan/components/PlanInputText";
import PlanScale from "../../../Plan/components/PlanScale";
import PlanDropdown from "../../../Plan/components/PlanDropdown";
import PlanMedia from "../../../Plan/components/PlanMedia";




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

        const {upid, element, date} = this.props;
        this.props.makeReport(upid, element.id, date, value);
    }

    render() {


        let {element, date} = this.props;

        /*element = client.readFragment({
            id: `PlanBodyElement:${element.id}`,
            fragment: Plan.fragments.element,
            variables: {
                date: date
            }
        });*/



       const {itemType, itemInfo, reports} = element;
       const item = itemInfo;

       let field = itemType;
       //field = item_type;
       let fieldTitle = '';
       let reportValues = [];
       switch(itemType) {
           case 'measurement_input':
               field = <Measurement item={item} date={date} onChange={this.onChange} />
               break;
           case 'choice_input':
           case 'checklist':
               reportValues = reports && reports.map((report) => (report.value));
               reportValues = reportValues && reportValues[0];
               field = <PlanChecklist item={item} reports={reportValues} onChange={this.onChange} />
               //const vertically = item.is_vertically;
               fieldTitle = item.label;
               break;
           case 'radio_input':
               reportValues = reports && reports.map((report) => (report.value));
               reportValues = reportValues && reportValues[0];
               reportValues = reportValues && reportValues[0];
               field = <PlanRadio item={item} reports={reportValues} onChange={this.onChange} />
               fieldTitle = item.label;

               break;
           case 'text_input':

               reportValues = reports && reports.map((report) => (report.value));
               reportValues = reportValues && reportValues[0];

               fieldTitle = item.label;
               field = <PlanInputText item={item} reports={reportValues} onChange={this.onChange} />

               break;
           case 'dropdown_input':
               reportValues = reports && reports.map((report) => (report.value));
               reportValues = reportValues && reportValues[0];
               reportValues = reportValues && reportValues[0];
               fieldTitle = item.label;
               field = <PlanDropdown item={item}  reports={reportValues} onChange={this.onChange} />

               break;
           case 'scale_input':
               reportValues = reports && reports.map((report) => (report.value));
               reportValues = reportValues && reportValues[0];
               reportValues = reportValues && reportValues[0];

               fieldTitle = item.label;

               field = <PlanScale item={item} reports={reportValues} onChange={this.onChange} />

               break;
           case 'file_input':
               fieldTitle = item.label;
                field = <Upload>
                    <Button disabled>
                        <Icon type="upload" /> Upload
                    </Button>
                </Upload>
               break;
           case 'exam_input':
               fieldTitle = item.label;

               field = <Button disabled>{fieldTitle}</Button>;
               break;
           case 'instruction':
               fieldTitle = '';
               field = <div dangerouslySetInnerHTML={{__html: item.text}}></div>;
               break;
           case 'line':
               const {height, color} = item;
               let opts = {height:height};
               if (color) {
                   opts.backgroundColor = '#'+color;
               }
               return <Divider style={opts}  />;
               break;
           case 'instruction_tipbox':
               fieldTitle = '';
               field = <Alert message="Tipbox" description={<div dangerouslySetInnerHTML={{__html: item.text}}></div>} type="info" showIcon />;
               break;
           case 'link':
               field = <Card hoverable><a href={item.url}><Card.Meta
                   title={item.label}
                   description={item.description}
               /></a></Card>
               //link_path":"https://ya.ru","label":"Yandex","description":"search engine"
               break;
           case 'media':
               //fieldTitle = item.label;
               field = <PlanMedia item={item} />
               break;
       }
        return (<div>{fieldTitle && <h4>{fieldTitle}</h4>}
           <div>{field}</div></div>)
    }
}



export default PlanElement
