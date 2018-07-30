import Tables from '../components/Tables';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import {compose,withStateHandlers} from 'recompose';
export const GET_PATIENTS_TABLE_COLUMNS = gql`    
query GET_PATIENTS_TABLE_COLUMNS  {
    network {
      tables {
      getPatients {
        id
        fields {
          id
          field
          label
        }
      }
      }
    }
}
`;

const withQuery = graphql(
    GET_PATIENTS_TABLE_COLUMNS,
    {
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                console.log(data);
                return {
                    getPatients: data.network.tables.getPatients,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);

const enhance = compose(
    withQuery,
    withStateHandlers(
        (props) => (
            {
        })       

))
export default enhance(Tables);