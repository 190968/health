import ChecklistElementBuilderPure  from '../components/ChecklistElementBuilder';

export const ChecklistElementBuilder = ChecklistElementBuilderPure;
 
export default (ChecklistElementBuilderPure);



export const preparePlanElementChecklistInput = (values) => {
    const {title, options=[], footnote} = values;
    
    return {
        title,
        options,
        footnote
    };
}