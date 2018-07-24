import React from 'react';
import {compose, withState, withHandlers, lifecycle} from 'recompose';

//import  '../../vendors/redactor/redactor';
//import   '../../vendors/redactor/redactor.min.css';

//import AlloyEditor from 'alloyeditor/dist/alloy-editor/alloy-editor-all';
//import 'alloyeditor/dist/alloy-editor/assets/alloy-editor-atlas-min.css';


const Wysiwyg = ({editorState, onEditorStateChange, value=''})=> {

    //return  <div id='wysiwyg' dangerouslySetInnerHTML={{__html: value}}></div>;

    return <React.Fragment>sdfsfsdfsdfsdfsf
         {/*<textarea
    //         disabled
    //         value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
    //     />*/}
     </React.Fragment>

}


const enhance = compose(
    // withState('_editor', 'setEditor'),
    withState('text', 'setText', ({value}) => value),
    withState('editorState', 'setEditorState', props => {
        return EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(props.value)))

    }),

    //withState('editorState', 'setEditorState', props => EditorState.createEmpty()),
    withHandlers({
        onEditorStateChange: props => (editorState) => {
            props.setEditorState(editorState);
            //console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
            props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        }
    }),
    lifecycle({
            componentDidMount() {
                
                //$R('#wysiwyg');
                //this.props.setEditor(AlloyEditor.editable('wysiwyg', alloyEditorConfig));
            },
            componentWillUnmount() {
                //this.props._editor.destroy();
            }
        }
    )
);

export default enhance(Wysiwyg);