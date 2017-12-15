import React from 'react';
import {Collapse} from 'antd';
import PanelComponent from '../../Filter/components/Panel';

export class FormsComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var mass = [{code:"category",fields:[{type:"checkbox",text:"Family",value:"378"},
                                             {type:"checkbox",text:"Live Well",value:"525"},
                                             {type:"checkbox",text:"Medical Conditions",value:"1"},
                                             {type:"checkbox",text:"Prevention",value:"598"}]},
                    {code:"plans",fields:[{type:"slider",text:"Family",value:"378"},
                                             {type:"checkbox",text:"Only Free",value:"598"}]},
                    {code:"pasha",fields:[{type:"slider",text:"Family",value:"378"},
                                            {type:"slider",text:"Only Free",value:"598"}]}];

        const {loading, filters} = this.props;

        if (loading) {
            return  '<div>Loading</div>';
        }

            var rows = [];
            var i =0;

        //console.log(filters);

        filters.forEach(function(filter) {
                            i++;
                            rows.push(<PanelComponent key={i} filter={filter}/>);
                        });

               return (
                    <div >
                            {rows}
                    </div>

                )
// }


        }

}
export default FormsComponent