import AcceptPlanPure from '../components/AcceptPlan';
import { compose, withProps, withHandlers, branch } from 'recompose';
import { Form, message } from 'antd';
import { withDrawer } from '../../../components/Modal';
import { withLoadingState } from '../../../components/Loading';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

 
const GET_PLAN_MUTATION = gql`
    mutation getPlan($id: UID, $upid: UID, $input:UserPlanInput!){
        getUserPlan(id:$id, upid:$upid, input:$input) {
            id
        }
    }
`;



const withGetUserPlanMutation = graphql(GET_PLAN_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        getPlan: (input) => {
            return mutate({
                variables: { upid: ownProps.userPlan.id, input: input}
            })
        },

    }),
});

const withGetPlanMutation = graphql(GET_PLAN_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        getPlan: (input) => {
            return mutate({
                variables: { id: ownProps.plan.id, input: input}
            })
        },

    }),
});


const withMutation = branch(props => props.userPlan, withGetUserPlanMutation, withGetPlanMutation);


const enhance = compose(
    withProps(props => {
        let {userPlan, plan} = props;
        if (!plan) {
            plan = userPlan.plan || {};
        }
        return {plan};
    }),
    Form.create(),
    withLoadingState,
    withMutation,
    withHandlers({
        onSubmit: props => (e) => {
            e.preventDefault();
            const { form, history, plan } = props;
            form.validateFields((err, values) => {
                if (!err) {
                    
                    const {startDate, endDate, privacy, end_date_set} = values;
                    let input = {};
                    if (!plan.isFixedDated) {
                        const startDateYMD = startDate.format("YYYY-MM-DD");
                        const endDateYMD = end_date_set ? endDate.format("YYYY-MM-DD") : '';
                        input = {startDate: startDateYMD, privacy:privacy, endDate:endDateYMD};
                    } else {
                        input = {privacy:privacy, startDate: plan.start_date};
                    }
    
                    props.setLoadingState(true);
                    const hide = message.loading('Saving...');
                    return props.getPlan(input).then(({data}) => {
                        props.setLoadingState(false);
                        hide();
                        const upid = data.getPlan.id;
                        console.log(upid, 'new UPID');
                        // this.setState({
                        //     loading: false
                        // });
                        //history.push('/plan/'+upid)
                    }).catch(() => {
    
                    });
                }
            });
        }
    }),
    //withProps(),
    withDrawer
    
);
export const AcceptPlan = enhance(AcceptPlanPure);
export default AcceptPlan; 