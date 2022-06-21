// import ReactModal from 'react-modal';
import { connect, ConnectedProps } from 'react-redux';
// import { useAppDispatch } from '../../redux/hooks';
import {
  ConfiguratorState
  //  setColorById, setSelectedObject
} from '../../redux/configurator';
// import { ChromePicker, RGBColor } from 'react-color';
// import { useCallback } from 'react';
import { EditModal } from './components';

interface IOwnProps {};
interface IProps extends IReduxProps, IOwnProps {};

const ObjectModal = ( { selectedObject, color }: IProps ) => {
  // const dispatch = useAppDispatch();
  // const handleChangeColor = useCallback(
  //   ( { rgb: color }: { rgb: RGBColor } ) => {
  //     dispatch( setColorById( {
  //       uuid: selectedObject as string,
  //       color
  //     } ) );
  //   },
  //   [dispatch, selectedObject]
  // );

  return (
    <EditModal />
    // <ReactModal
    //   ariaHideApp={ false }
    //   onRequestClose={ () => {
    //     dispatch( setSelectedObject( null ) );
    //   } }
    //   style={ {
    //     content: {
    //       top: '50%',
    //       left: '10%',
    //       right: 'right',
    //       bottom: 'auto',
    //       marginRight: '-50%',
    //       transform: 'translate(0%, -50%)'
    //     },
    //     overlay: {
    //       position: 'fixed',
    //       top: 0,
    //       left: 0,
    //       right: 0,
    //       bottom: 0,
    //       background: 'none'
    //     }
    //   } }
    //   isOpen={ Boolean( selectedObject ) }
    // >
    //   <ChromePicker
    //     disableAlpha={ true }
    //     color={ color }
    //     onChange={ handleChangeColor }
    //   />
    // </ReactModal >
  );
};

function mapStateToProps( state: { configurator : ConfiguratorState} ) {
  const { configurator: { selectedObject } } = state;
  const color = state.configurator.colors[ selectedObject || '' ] || { r: 255, g: 255, b: 255 };

  return { selectedObject, color };
}

const connector = connect( mapStateToProps );
type IReduxProps = ConnectedProps<typeof connector>
export default connector( ObjectModal );
