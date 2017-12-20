import React from 'react';
import {Collapse} from 'antd';
import PanelComponent from '../../Filter/components/Panel';

export class FormsComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {loading, filters, onSuccess, activeFilters} = this.props;
 console.log(filters,"filters1");
        if (loading) {
            console.log(filters,"filters2");
            return  '<div>Loading</div>';
        }
        console.log(filters,"filters3");
            var rows = [];
            var i =0;

        filters.forEach(function(filter) {
                            i++;
                            rows.push(<PanelComponent key={filter.code} onSuccess={onSuccess} activeFilters={activeFilters} filter={filter}/>);
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