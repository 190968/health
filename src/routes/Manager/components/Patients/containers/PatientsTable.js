import PatientsTable from '../components/PatientsTable';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {compose, withHandlers} from 'recompose';

export const GET_PATIENTS_TABLE_COLUMNS = gql`    
query GET_PATIENTS_TABLE_COLUMNS  {
    network {
        id
        tables {
          getPatientsTable {
            id
            fields {
              id
              field
              type
              label
              canSort
              canFilter
            }
          }
        }
      }
}
`;
const withPatientsTableColumnsQuery = graphql(GET_PATIENTS_TABLE_COLUMNS, {
    props: ({data}) => {       
         const {network={}} = data;
         const {tables={}} = network;
         const {getPatientsTable={}} = tables;
        //  console.log(getPatientsTable, 'getPatientsTable');
        return {getPatientsTable}
    },
});

const enhance = compose(
  withPatientsTableColumnsQuery,
  withHandlers({
    handleTableChange: props => (pagination, filters, sorter, other) => {
      // load more patients
      // console.log(other, 'other');
      // console.log(pagination);
      // console.log(filters);
      // console.log(sorter);
      const {field, order} = sorter;
      const {current, pageSize} = pagination;
      //prepare cursor
      var sort = {page:current, pageLimit:pageSize, sort:field, sortOrder: order === 'ascend' ? 'asc' : 'desc'};
      // console.log(pagination);
      // console.log(sort);
      props.loadMoreEntries({cursors: sort});
    }
  })
)
export default enhance(PatientsTable);