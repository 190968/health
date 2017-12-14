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
        if (!loading) {
            var rows = [];
            var i =0;
            var lastCode = null;
            mass.forEach(function(fields) {
                i++;

                if (fields.code !== lastCode) {
                    console.log("push--PanelComponent");
                        rows.push(<PanelComponent key={i} field={mass}/>);
                        lastCode = fields.code;
                    }

            });
               return (
                    <Collapse >
                            {rows}
                    </Collapse>

                )
// }
            }


        }

}
export default FormsComponent