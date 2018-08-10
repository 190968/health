import ChangeRole from '../components/ChangeRole';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_CURRENT_ROLE_QUERY } from '../../../../../../routes/Dash/containers/DashLayout';
import { withCurrentUser } from '../../../../../../queries/user';

const ChangeRole_Mutation = gql`
 mutation ChangeRole($role: RoleEnum!) {
       
        changeRole(role: $role) {
                currentRole
        }
    }
`;


const withMutation = graphql(ChangeRole_Mutation, {
    props: ({ownProps, mutate}) => ({
        changeRole: (role) => {
            return mutate({
                variables: {role:role},

                update: (store, { data: { changeRole: {currentRole} } }) => {

                    // Read the data from our cache for this query.
                    const data = store.readQuery({
                        query: GET_CURRENT_ROLE_QUERY,
                    });


                    const newData = {...data, ...{account: {...data.account, ...{currentRole:currentRole}}}};

                    store.writeQuery({
                        query: GET_CURRENT_ROLE_QUERY,
                        data: newData
                    });
                    //console.log(ownProps);
                    ownProps.updateCurrentUserInfo({currentRole});
 
                },
            })
        },
    }),
});


export default withCurrentUser(withMutation(ChangeRole));