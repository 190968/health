import TimelineFilter from '../components/TimelineFilter';
import {message} from 'antd';
import {compose, withState, withHandlers, withProps} from 'recompose';
import {getTimelineElementsConst} from "../components/TimelineElementSelect/index";


const enhance = compose(
    withProps(props => {
        const tags = getTimelineElementsConst(true);

        return {
            tags:tags,
            selected: tags.map(tag => tag.type)
        }
    }),
    withState('filters', 'setFilters', []),
    withState('selectedTags', 'setSelected', props => props.selected),
    withHandlers({
        handleChangeOld: (props) => (tag, checked) => {
            const {selectedTags} = props;
            if (!checked && selectedTags.length < 2) {
                message.error('At least one type should be selected');
                return false;
            }
            //console.log(tag);
            //console.log(checked);
            const nextSelectedTags = checked ?
                [...selectedTags, tag] :
                selectedTags.filter(t => t !== tag);
            //console.log('You are interested in: ', nextSelectedTags);
            //console.log(nextSelectedTags);
            props.setSelected(nextSelectedTags);
            props.loadFiltered(nextSelectedTags);
            props.updateFilters(nextSelectedTags);
        },
        handleChange: (props) => (nextSelectedTags) => {
            const {selectedTags} = props;
            // if (!checked && selectedTags.length < 2) {
            //     message.error('At least one type should be selected');
            //     return false;
            // }

            props.setSelected(nextSelectedTags);
            props.loadFiltered(nextSelectedTags);
            props.updateFilters(nextSelectedTags);
        },
        resetTags: props => () => {
            props.setSelected([]);
            props.updateFilters([]);
            //props.loadFiltered([]);
        },
        selectAllTags: props => () => {
            console.log(props);
            const tags = props.tags.map(tag => {
                return tag.type;
            });

            props.setSelected(tags);
            props.updateFilters(tags);
            props.loadFiltered(tags);
            //props.loadFiltered([]);
        },
    })
);
export default enhance(TimelineFilter);