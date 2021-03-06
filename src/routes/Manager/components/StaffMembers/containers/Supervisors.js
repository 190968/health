import SupervisorsManager from '../components/Supervisors';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {compose, branch, withHandlers, withStateHandlers,withState, withProps} from 'recompose';
import React from 'react';
import { UserInfoFragment } from '../../../../User/fragments';
const GET_PROFILE  = gql`
query GET_NETWORKSTAFF($search: String, $role: RoleEnum!, $cursors: CursorInput,$status: RoleStatusEnum) {
    management {
      getNetworkStaff(search: $search, role: $role, cursors: $cursors,status: $status) {
        totalCount
        edges {
          id
          role
          roleTitle
          startDate
          joinedDate
          lastLoginDate
          accessLevel
          user {
            ...UserInfo
            phone{
              code
              number
            }
          }
          getTotalPatients
          getTotalCareManagers
        }
      }
    }
  } 
  ${UserInfoFragment}
 `;

const withQuery = graphql(GET_PROFILE, {
    options: (ownProps) => {
        return{
            variables: {
                search:'',
                role:'supervisor',
                status:'active'
            }
        }
    },
    props: ({ data }) => {
        if (!data.loading) {
            console.log(data);
            const {variables} = data;
            const {status} = variables || {};
            return {
                management: data.management.getNetworkStaff.edges,
                totalCount: data.management.getNetworkStaff.totalCount,
                loading: data.loading,
                status,
                loadByStatus(status) {
                    return data.refetch({status});
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
        selectedObj:''
        }),
        {
            openShowButton: ({ counter }) => (value) => ({
                showButton: true,
                selectedCount:value.length,
                selectedObj:value
            }),
            hideShowButton: ({ counter }) => (value) => ({
                showButton: false
            }),
            onSearch: ({searchText},props) =>(value) => (
                {
                    searchText: value.target.value,
                    management: props.management.map((record) => {
                        console.log(record);
                        const match = record.user.fullName.match(new RegExp(value.target.value, 'gi'));
                        if (!match) {
                            return null;
                        }                        
                        return {
                            ...record,
                            fullName: (
                                <span>
                      {record.user.fullName.split( new RegExp(value.target.value, 'gi')).map((text, i) => (
                      i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                      ))}
                    </span>
                            ),
                        };
                    }).filter(record => !!record),
            }),
            emitEmpty:({searchText},props) =>(value) => (
                {
                    searchText: '',
                    management:props.management
                     })
        }
        )
);

export default enhance(SupervisorsManager);