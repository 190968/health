import ProvidersManager from '../components/Providers';
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {compose, branch, withStateHandlers, withState, withProps} from 'recompose';

export const GET_PROVIDERS_QUERY  = gql`
query GET_PROVIDERS ($search: String, $status: RoleStatusEnum = active) {
  network {
    id
    getProviders(search:$search, status: $status) {
      totalCount
      edges {
        id
        name
        typeText
        getTotalPatients
        getTotalCareGivers:getTotalStaff(role: cm)
        getTotalManagers:getTotalStaff(role: manager)
        getAdherence {
            level
        }
      }
    }
  }
}
 `;

const withQuery = graphql(GET_PROVIDERS_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                search:"",
                status:"active",  
            }
        }
    },
    props: ({ data }) => {
        if (!data.loading) {
            return {
                edges: data.network.getProviders.edges,
                totalCount: data.network.getProviders.totalCount,
                loading: data.loading,
                loadByStatus(status) {
                    return data.fetchMore({
                        // query: ... (you can specify a different query. FEED_QUERY is used by default)
                        variables: {
                            status:status.target.value
                        },
                        updateQuery: (previousResult, {fetchMoreResult}) => {
                            if (!fetchMoreResult) { return previousResult; }
                            return fetchMoreResult;
                        },
                    });
                },
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});

const enhance = compose(
    withQuery,
    withStateHandlers(
        (props) => ({
        showButton: false,
        selectedCount:0,
        searchText: '',
        }),
        {
            openShowButton: ({ counter }) => (value) => ({
                showButton: true,
                selectedCount:value
            }),
            hideShowButton: ({ counter }) => (value) => ({
                showButton: false
            }),
            onSearch: ({searchText},props) =>(value) => (
                console.log(props),
                {
                    searchText: value.target.value,
                    edges: props.edges.map((record) => {
                        const match = record.name.match(new RegExp(value.target.value, 'gi'));
                        if (!match) {
                            return null;
                        }                        
                        return {
                            ...record,
                            name: (
                                <span>
                      {record.name.split( new RegExp(value.target.value, 'gi')).map((text, i) => (
                      i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                      ))}
                    </span>
                            ),
                        };
                    }).filter(record => !!record),
            }),
            emitEmpty: ({searchText},props) =>(value) => (
                {
                    searchText: '',
                    edges:props.edges
                     })

        }
        )
);

export default enhance(ProvidersManager);