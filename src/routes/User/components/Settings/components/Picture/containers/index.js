
import Picture from '../components'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { withCurrentUser } from '../../../../../../../queries/user';
import { UserInfoFragment } from '../../../../../fragments';
const profilePictureQUERY = gql`
   query getProfilePicture {
    account {
      user {
          ...UserInfo
      }
    }
}
${UserInfoFragment}
`;
const profilePictureMutation = gql`
 mutation updateProfilePicture($original:String!,$medium:String!, $large:String!, $small:String!){
        updateProfilePicture(original:$original,large:$large, small:$small, medium:$medium) {
            ...UserInfo
        }
    }
    ${UserInfoFragment}
`;

const PictureWithQuery = graphql(profilePictureQUERY,
    {
        props: ({ data}) => {
            if (!data.loading) {
                return {
                    letter: data.account.user.firstName[0],
                    thumbs: data.account.user.thumbs,
                    loading: data.loading,
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
)(Picture);

const withMutation = graphql(profilePictureMutation, {
    props: ({ownProps, mutate}) => ({
        updatePicture: input => {
            return mutate({
                variables: input,
            }).then(({data}) => {
                const {updateProfilePicture} = data;
                console.log(updateProfilePicture);
                ownProps.updateCurrentUserInfo(updateProfilePicture);
            })
        },
    }),
});


export default withCurrentUser( withMutation(PictureWithQuery));