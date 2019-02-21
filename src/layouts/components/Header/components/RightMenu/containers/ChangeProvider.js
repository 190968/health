import ChangeProvider from '../components/ChangeProvider';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {message} from 'antd';
//import { GET_CURRENT_ROLE_QUERY } from '../../../../../../routes/Dash/containers/DashLayout';
import { CurrentUserInfoFragment } from '../../../../../../routes/User/fragments';
import {compose, branch} from 'recompose';
import { withActiveUser, withActiveNetwork } from '../../../../../../components/App/app-context';
import { CurrentUserQUERY } from '../../../../../../queries/user';
import { CurrentNetworkInfoFragment } from '../../../../../../queries/network';

const CHANGE_PROVIDER_MUTATION = gql`
 mutation ChangeProvider($id: UID, $role: RoleEnum) {
        updateCurrentProvider(id: $id, role: $role) {
            currentProvider {
                id
                name
                logo
            }
        }
    }
`;

const CURRENT_NETWORK_QUERY = gql`
query GET_CURRENT_NETWORK  {
    account   {
        ...CurrentNetworkInfo
    }
}
${CurrentNetworkInfoFragment}
`;


const withMutation = graphql(CHANGE_PROVIDER_MUTATION, {
    props: ({ownProps, mutate}) => ({
        changeProvider: (id) => {
            const hide = message.loading('Switching in progress..', 0);
            return mutate({
                variables: {id},
                update: (client, { data: { updateCurrentProvider: {currentProvider} } }) => {
                    const data = client.readQuery({
                        query: CURRENT_NETWORK_QUERY,
                    });

                    const newData = {...data, ...{account: {...data.account, currentProvider: currentProvider}}};
                    client.writeQuery({
                        query: CURRENT_NETWORK_QUERY,
                        data: newData
                    });
                },
            }).then(({data}) => {
                hide();
                const {currentNetwork} = ownProps;
                const {name:networkName} = currentNetwork || {};
               
                const {updateCurrentProvider} = data;
                const {currentProvider} = updateCurrentProvider || {};
                const {id, name} = currentProvider || {};
                const text = id &&id !== '' ? 'Switched to '+name+' provider' : 'Switched to '+networkName;
                message.success(text);
            })
        },
    }),
});




const enhance = compose(
    branch(props => !props.currentUser, withActiveUser),
    withActiveNetwork,
    withMutation
);

export default enhance(ChangeProvider);