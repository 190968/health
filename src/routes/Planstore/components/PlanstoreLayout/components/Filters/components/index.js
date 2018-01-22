import React from 'react';
import PanelComponent from '../../Filter/components/Panel';

export class FormsComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {filters, onSuccess, activeFilters} = this.props;

        return (
            <div>
                {filters.map((filter) => {
                    return <PanelComponent key={filter.code} onSuccess={onSuccess} activeFilters={activeFilters}
                                           filter={filter}/>;
                })}
            </div>
        )

    }

}

export default FormsComponent