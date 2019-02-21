import {withStateHandlers} from 'recompose';

 export const withLayoutToggle = withStateHandlers( props => {
     const {activeLayout} = props;
     return {activeLayout}
  }, {
    setActiveLayout: props => (activeLayout) => {
        return {activeLayout};
    }
 });