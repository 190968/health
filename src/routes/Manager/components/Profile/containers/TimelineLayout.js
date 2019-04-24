import TimelineLayoutPure from '../components/TimelineLayout';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import { withTimelineQuery } from '../components/TimelineLayout/queries';


const enhance = compose(
    withTimelineQuery,
    withStateHandlers(props => {
        return {
            openElements: [],
            activeElement: null,
            showPathway:false,
        }
    }, {
        updateElements: (state, props) => (elements, activeElement) => {
            // let {openElements = []} = state;
            // const elements = openElements.indexOf(activeElement) === -1 ? [...openElements, activeElement] : openElements;
            return {
                openElements:elements,
                activeElement
            }
        },
        showElement: (state, props) => (element) => {
            let {openElements = []} = state;
            const foundElement = openElements.find(el => el.id === element.id);
            const elements = !foundElement ? [...openElements, element] : openElements;
            console.log(element);
            console.log(elements);
            return {
                openElements:elements,
                activeElement:element
            }
        },
        togglePathway: (state, props) => () => {
            let {activeElement, openElements} = state;
            if (state.showPathway && openElements.length > 0) {
                activeElement = openElements[0];
            }
            return {
                showPathway: !state.showPathway,
                activeElement
            }
        }
    }),
);
const TimelineLayout = enhance(TimelineLayoutPure);
export default TimelineLayout;