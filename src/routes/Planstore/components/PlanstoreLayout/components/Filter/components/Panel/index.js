/**
 * Created by Pavel on 14.12.2017.
 */
import React from 'react';
import {Collapse} from 'antd';
import CheckComponent from '../CheckBox';
import SliderComponent from '../Slider';
import ItemComponent from '../Item';
const Panel = Collapse.Panel;

export class PanelComponent extends React.Component {

    constructor(props){
        super(props);
    }

    render() {


        const{loading,field,key} = this.props;
        if(!loading) {
            var row = [];
            field.forEach(function (fields) {
                fields.fields.forEach(function (fields) {
                    if (fields.type == "checkbox") {
                        console.log("push--CheckComponent");
                        row.push(<CheckComponent key={fields.value} fields={field}/>);
                    }
                    if (fields.type == "slider") {
                        console.log("push--SliderComponent");
                        row.push(<SliderComponent key={fields.value} fields={field}/>);
                    }
                });
            });

            return (
                <Panel header="This is panel header 1" key={key} >
                    {row}
                </Panel>
            )

    }

    }
}

export default PanelComponent