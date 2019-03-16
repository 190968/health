import { compose, withProps, mapProps, withHandlers , defaultProps, withState} from 'recompose';
import PlanElementBuilder from '../components/PlanElementBuilder';

// const debug = withProps(console.log);
// add graphql HOC
const enhance = compose(
    // // debug,
    // defaultProps({
    //     id:''
    // }),
    // withProps(
    //     props => {
    //         let {parentId, parentValue} = props;
    //         const {plan, lessonId, sectionId, id, type, mode, onHide, order=null } = props;
    //         // if (element) {
    //         //     parentId = element.id;
    //         // }
    //         return {
    //             plan,
    //             lessonId,
    //             sectionId,
    //             id,
    //             type,
    //             isBuilderMode:true,
    //             mode,
    //             onHide,
    //             parentId,
    //             parentValue,
    //             order
    //         }
    //     }
    // ),

    // // toggle type of the element
    // withState('id', 'setId', ({id}) => id),
    // withState('loading', 'setLoading', false),
);

export default enhance(PlanElementBuilder);