import TimelineLayoutPure from '../components/TimelineLayout';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';


const enhance = compose(
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
            const elements = openElements.indexOf(element) === -1 ? [...openElements, element] : openElements;
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




// export default class Pathway extends React.Component {
//     state = {
//         showPathway: false,
//         showElement: false,
//         elementsDetails: [],
//         activeElement: false,
//         pathway: false
//     }

//     static defaultProps = {
//         userId: ''
//     }

//     togglePathway = () => {
//         this.setState({showPathway: !this.state.showPathway});
//     }

//     setPathway = (pathway) => {
//         this.setState({pathway});
//     }

//     toggleElementView = (element) => {
//         this.setState({showElement: true});
//         this.updateElements(element);

//     }

//     updateElements = (element) => {
//         let {elementsDetails = []} = this.state;
//         const elements = elementsDetails.indexOf(element) === -1 ? [...elementsDetails, element] : elementsDetails;
//         //console.log(elements);
//         this.setState({elementsDetails: elements, activeElement: element});
//     }

//     setElements = (elements, element) => {
//         if (elements.length === 0) {
//             this.setState({showElement: false});
//         }
//         this.setState({elementsDetails: elements, activeElement: element});
//     }

//     addText = (info) => {
//         console.log(info);

//         const newItems = [...this.state.items, info];
//         this.setState({
//             items: newItems
//         })
//     }

//     render() {

//     }
// }
