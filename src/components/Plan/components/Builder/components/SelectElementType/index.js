import PlanElementsSelect from "../../../../../../routes/Plan/components/PlanLayout/components/PlanElement/components/PlanElementSelect";
import { compose, withProps } from "recompose";
import { withDrawer } from "../../../../../Modal";

const PlanElementBuilderSelect = compose(
    withProps(props => {
        return {modalTitle: 'Select Element Type', onSelect:props.setType}
    }),
    withDrawer
)(PlanElementsSelect);


export default PlanElementBuilderSelect; 