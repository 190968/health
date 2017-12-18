import React from 'react';
import {Collapse} from 'antd';
import PanelComponent from '../../Filter/components/Panel';

export class FormsComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {loading, filters, onSuccess, activeFilters} = this.props;

        if (loading) {
            return  '<div>Loading</div>';
        }

            var rows = [];
            var i =0;

        console.log(activeFilters);
        console.log(filters);

        filters.forEach(function(filter) {
                            i++;
                            rows.push(<PanelComponent key={i} onSuccess={onSuccess} filter={filter}/>);
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