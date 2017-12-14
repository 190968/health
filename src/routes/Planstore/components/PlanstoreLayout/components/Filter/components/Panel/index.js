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


        console.log(this.props);

        const{loading, filter, key} = this.props;
        if(loading) {
            return '<div>Loading</div>';
        }
            var row = [];
        filter.fields.map(function (field) {


                    if (field.type == "checkbox") {
                        console.log("push--CheckComponent");
                        row.push(<CheckComponent key={field.value} fields={field}/>);
                    }
                    if (field.type == "slider") {
                        console.log("push--SliderComponent");
                        row.push(<SliderComponent key={field.value} fields={field}/>);
                    }
                });
            return (
                <div >
                    <h1>{filter.name}</h1>
                    {row}
                </div>
            )

    }
}

export default PanelComponent