import { message, Form } from 'antd';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {withRouter} from 'react-router-dom';
import { compose, withHandlers } from 'recompose';
import { CurrentUserQUERY } from '../../../queries/user';
import RegisterOrganizationPure from '../components/RegisterOrganization';
import { CurrentUserInfoFragment } from '../fragments';
import { withLoadingButton } from '../../../components/Loading';

const RegisterOrganizationQuick_QUERY = gql`
   mutation registerOrganizationQuick( $email: Email!, $name: String!, $apCode: String!){
        registerOrganizationQuick(email:$email, name: $name, apCode:$apCode) {
            account {
                ...CurrentUserInfo
            }
            callback {
                callbackType
                objectId
            }
        }
    }
     ${CurrentUserInfoFragment}
`;
const withMutation = graphql(RegisterOrganizationQuick_QUERY, {
    props: ({ mutate, ownProps }) => ({
        registerUser: input => {
            return mutate({
                variables: input,
                update: (store, { data: { registerOrganizationQuick } }) => {

                    // Read the data from our cache for this query.
                    const data = store.readQuery({
                        query: CurrentUserQUERY,
                    });

                    const {account} = registerOrganizationQuick;
                    const { currentToken = {} } = account;
                    let { token = '', isExpired } = currentToken;
                    if (isExpired) {
                        token = '';
                    }

                    localStorage.setItem('token', token);


                    const newData = { ...data, ...{ account: { ...data.account, ...account } } };
                    //console.log(newData, 'New data upon register');

                    ownProps.setLoadingButton(false);

                    store.writeQuery({
                        query: CurrentUserQUERY,
                        data: newData
                    });
                }
            })
        },
    }),
});

const enhance = compose(
    withLoadingButton,
    withMutation,
    Form.create(),
    withRouter,
    withHandlers({
        onSubmit: props => (e) => {
            e.preventDefault();
            props.form.validateFields((err, values) => {
                if (!err) {

                    // set loading button as loading
                    props.setLoadingButton(true);

                    props.registerUser(values).then(({data}) => {

                            const {registerOrganizationQuick} = data;
                            const {callback} = registerOrganizationQuick || {};
                            const {callbackType, objectId} = callback || {};
                            props.setLoadingButton(false);
                            message.success('Welcome!');
                            const {history} = props;
                            if (callbackType && objectId) {
                                switch(callbackType) {
                                    case 'up':
                                        history.push('/plan/'+objectId+'/?tour=1');
                                    break;
                                }
                            } else {
                                history.push('/?tour=1');
                            }
                        }).catch((error) => {
                            props.setLoadingButton(false);
                    });
                }
            });
        }
    })
);
export const RegisterOrganization = enhance(RegisterOrganizationPure);