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

    mapStateToProps = (state) => {


};

    render() {
        const{loading, filter, key, onSuccess} = this.props;
        if(loading) {
            return '<div>Loading</div>';
        }
        //console.log(filter);
            var row = [];
        filter.fields.map(function (field) {
                    if (field.type == "checkbox") {
                        row.push(<CheckComponent key={field.value} code={filter.code} fields={field} onSuccess={onSuccess} />);
                    }
                    if (field.type == "range") {
                        row.push(<SliderComponent key={field.value} code={filter.code} fields={field}/>);
                    }
                });
            return (
                //<div>
               //<Panel header="This is panel header 1"  >
                <div >

                    <h1>{filter.name}</h1>
                    {row}
                </div>

                 )
    }
}

export default PanelComponent