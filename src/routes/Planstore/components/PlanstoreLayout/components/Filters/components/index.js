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

        filters.forEach(function(filter) {
                            i++;
                            const activeFilter = activeFilters[filter.code] || {};
                            rows.push(<PanelComponent key={filter.code} onSuccess={onSuccess} activeFilter={activeFilter} filter={filter}/>);
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