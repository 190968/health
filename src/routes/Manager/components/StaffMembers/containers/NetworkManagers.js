import NetworkManagers from '../components/NetworkManagers';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {compose,withStateHandlers} from 'recompose';
import React from 'react';
import { UserInfoFragment } from '../../../../User/fragments';
import { withActiveNetwork } from '../../../../../components/App/app-context';

export const GET_NETWORK_MANAGERS_LIST  = gql`
query GET_NETWORKSTAFF($search: String, $role: RoleEnum!, $cursors: CursorInput, $status: RoleStatusEnum, $isProviderLevel: Boolean!) {
  management {
    getNetworkStaff(search: $search, role: $role, cursors: $cursors, status: $status) @skip(if: $isProviderLevel) {
      totalCount
      edges {
        id
        role
        roleTitle
        startDate
        joinedDate
        lastLoginDate
        invitedDate
        accessLevel
        user {
          ...UserInfo
          phone {
            code
            number
          }
        }
        getTotalPatients
      }
    }
    getProviderStaff(search: $search, role: $role, cursors: $cursors, status: $status) @include(if: $isProviderLevel) {
        totalCount
        edges {
            id
            role
            roleTitle
            startDate
            joinedDate
            lastLoginDate
            invitedDate
            accessLevel
            user {
                ...UserInfo
                phone {
                    code
                    number
                }
            }
            getTotalPatients
        }
    }
  }
}
  ${UserInfoFragment}
 `;

const withQuery = graphql(GET_NETWORK_MANAGERS_LIST, {
    options: (ownProps) => {
        const {isProviderLevel} = ownProps;
        return{
            variables: {
                isProviderLevel,
                search:'',
                role:'manager',
                status:'active',  
            }
        }
    },
    props: ({ownProps, data }) => {
        if (!data.loading) {
            const {isProviderLevel} = ownProps;

            const {management} = data || {};
            const {getNetworkStaff} = management;
            const {getProviderStaff} = management;
            const edges = isProviderLevel ? getProviderStaff.edges : getNetworkStaff.edges;
            const totalCount = isProviderLevel ? getProviderStaff.totalCount : getNetworkStaff.totalCount;
            return {
                management: edges,
                totalCount: totalCount,
                loadByStatus(status) {
                    return data.refetch({status});
                },
                loading: data.loading,
            }
        }
        else {
            return {loading: data.loading}
        }
    },
   
});

const enhance = compose(
    withActiveNetwork,
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

export default enhance(NetworkManagers);