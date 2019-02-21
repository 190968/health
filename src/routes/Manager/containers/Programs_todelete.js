import Programs from '../components/Programs';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import {compose,withStateHandlers} from 'recompose';
export const GET_PROGRAMS_QUERY = gql`    
query GET_PROGRAMS {
    management {
      getPrograms {
        totalCount
        edges {
          id
          name
          typeText
          categories{
            id
            name
          }
          getReviews
          getReferrals
        }
      }
    }
  }
`;

const withQuery = graphql(
    GET_PROGRAMS_QUERY,
    {
        options: (ownProps) => {
            return {
                //skip: !ownProps.ready,
                /*variables: {
                    user_id: ownProps.user_id,
                    status: 'active'
                    //date:ownProps.date
                },*/
                fetchPolicy: 'network-only'
            }
        },
        props: ({ ownProps, data }) => {

            const {getPrograms} = data.management || {};
            const {edges=[], totalCount=0} = getPrograms || {};
            if (!data.loading) {
                return {
                    programs: edges,
                    total: totalCount,
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
                {
                    searchText: value.target.value,
                    programs: props.programs.map((record) => {
                       
                        const match = record.name.match(new RegExp(value.target.value, 'gi'));
                        if (!match) {
                            return null;
                        }                      
                        return {
                            ...record,
                            fullName: (
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
                    programs:props.programs
                     }),
                    
            })        

);
export default enhance(Programs);