import TimeZoneField from '../components/index';
import { compose, withHandlers, withProps } from 'recompose';
import { Form } from 'antd';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
const GET_TIMEZONE = gql`
query getTimeZone {
    staticContent {
      timezones {
        id
        name
        offset
      }
    }
  }
  
   `;
// const withQuery = graphql(GET_TIMEZONE, {
//     props: ({ ownProps, data }) => {
//         console.log("containers",ownProps, data);
//         const { staticContent = {} } = data;
//         const { timezones = {} } = staticContent;
//         return { loading: data.loading, timezones: timezones };
//     },
// });

const withQuery = graphql(GET_TIMEZONE,
    {
        props: ({ data}) => {
            if (!data.loading) {
                console.log(data);
                return {
                    timezones: data.staticContent.timezones
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
);

const enhance = compose(
    withQuery,
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
export default enhance(TimeZoneField);