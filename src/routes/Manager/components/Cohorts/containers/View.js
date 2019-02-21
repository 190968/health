import ViewPure from '../components/View';
import { withCohortQuery } from '../queries';
import {compose, withHandlers} from 'recompose';

const enhance = compose(
    withCohortQuery,
    withHandlers({
        handleTabChange :  props=>(key)=> {
            const {cohort} = props;
            const {id} = cohort || {};
            //console.log(props,key);
            //console.log(this.props);\
            const {tab = 'population', subtab = ''} = props.match.params;
            //console.log(tab, subtab);
            let mainUrl = '/cohorts/view/'+id;
        
            props.history.push(mainUrl+'/'+key);
        }
    })
);
export const CohortView = enhance(ViewPure);
export default CohortView;