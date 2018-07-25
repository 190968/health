import FullNameField from '../components/index';
import { compose, withHandlers, withProps } from 'recompose';
import { Form } from 'antd';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
// const GET_TITLE_USER = gql`
// // query getTitleUser {
// //     account {
// //       user {
// //         id
// //         possibleTitles
// //         title
// //       }
// //     }
// //   }
  
// // `;
// const withQuery = graphql(GET_TITLE_USER, {
//     props: ({ ownProps, data }) => {
//         console.log(ownProps, data);
//         const { account = {} } = data;
//         const { user = {} } = account;
//         return { loading: data.loading, user: user };
//     },
// });

const enhance = compose(
   // withQuery,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            console.log(props, 'Props before input');
        },
    }),
    withProps(props => {
        return { label: props.label }
    }),
);
export default enhance(FullNameField);