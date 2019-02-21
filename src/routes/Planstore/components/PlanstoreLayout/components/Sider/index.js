import React from 'react';
import { Affix, Card, Button } from 'antd';
import Filters from '../Filters'
import PlanstoreSearch from '../PlanstoreSearch';
import './index.less';

const PlanstoreSider = props => {
    const { loading,  search, filters = [], activeFilters=[], updateFilters, resetFilters, handleSearch } = props;

    return (
        // <Affix offsetTop={20}>
        <Card loading={loading} bordered={false} type={'sider transparent planstore'}>
            <PlanstoreSearch handleSearch={handleSearch} search={search} />
            <Filters filters={filters} activeFilters={activeFilters} onSuccess={updateFilters} />
            <div className={'link'} onClick={resetFilters} style={{ marginTop: 12, color: '#ccc', textAlign:'right' }}>Reset</div>
        </Card>
        // </Affix>

    )

}
// export class PlanstoreLayout extends React.Component {



//     /**
//      * Updates filter by type (category, price, etc)
//      * @param filter
//      * @param values
//      */
//     updateFilters = (filter, values) => {


//         const activeFilters = this.props.activeFilters;
//         // get all current info of the type
//        // const activeFilter = activeFilters[filter] || {};

//         // update filter by type(category or smth)
//         const filter1 = {
//             ...activeFilters,
//             [filter]: values
//         }

//         // update the store
//         this.props.updateFilterStore(filter1)
//     }

//     updateZeroFilters = () => {
//         const activeFilters = {};
//         const filter2 = {
//             //...activeFilters,
//             //[filter]: values
//         }
//         this.props.updateZeroFilterStore(filter2);
//         this.props.updateFilterStore(filter2);
//     }

//     /**
//      * Updates filter by type (category, price, etc)
//      * @param filter
//      * @param values
//      */

//     render() {


//     }
// }

export default PlanstoreSider;