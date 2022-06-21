/* eslint-disable global-require */
import { ChangeEvent, useCallback, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import ReactModal from 'react-modal';
import { useAppDispatch, ConfiguratorState, setColorById, setSelectedObject } from '../../../redux';
// import { ChromePicker, RGBColor } from 'react-color';
import { SvgRender } from '../../SvgRender';
// import pen from './pen.svg';
import './index.css';
import './input.css';

export interface RGBColor {
  a?: number | undefined;
  b: number;
  g: number;
  r: number;
}

interface IOwnProps {};
interface IProps extends IReduxProps, IOwnProps {};

// const pen = 'src/icons/pen.svg';
const pen = require( '../../../icons/pen.svg' ) as string;
const dice = require( '../../../icons/dice.svg' ) as string;
const rotate = require( '../../../icons/rotate-left.svg' ) as string;
const closeIcon = require( '../../../icons/circle-xmark.svg' ) as string;
// const pen = ( require( '../../../icons/pen.svg' ) ).ReactComponent;
// const closeIcon = 'src/icons/circle-xmark.svg';
// const closeIcon = ( require( '../../../icons/circle-xmark.svg' ) ).ReactComponent;

const ObjectModal = ( { selectedObject, color }: IProps ) => {
  const [showSettings, setShowSettings] = useState( false );

  const dispatch = useAppDispatch();

  const handleClick = () => {
    // console.log( '%c handleClick', 'color:red', showSettings );
    setShowSettings( ( v ) => !v );
  };

  const handleClickRandom = () => {
    console.log( '%c handleClickRandom', 'color:red' );
  };
  const handleCancel = () => {
    console.log( '%c handleCancel', 'color:green' );
  };

  const handleChangeColor = useCallback(
    ( e: ChangeEvent<HTMLInputElement> ) => {
    // ( { rgb: color }: { rgb: RGBColor } ) => {
      console.log( '%c e', 'color:red', e );
      console.log( '%c e.target', 'color:red', e.target );
      console.log( '%c e.target.value', 'color:green', e.target.value );
      dispatch( setColorById( {
        uuid: selectedObject as string,
        color
      } ) );
    },
    [dispatch, selectedObject]
  );

  return (
    <ReactModal
      ariaHideApp={ false }
      onRequestClose={ () => {
        dispatch( setSelectedObject( null ) );
      } }
      overlayClassName={ 'myOverlay' }
      className={ 'myModal' }
      isOpen={ Boolean( selectedObject ) }
      closeTimeoutMS={ 2000 }
    >
      {/* <div className='editModalContent'> */}
      <SvgRender
        src={ showSettings ? closeIcon : pen }
        onClick ={ handleClick }
        wrapperClassName={ `svgRender ${ showSettings ? 'close' : 'edit' }` }
        style={ { width: '50px' } }
      />
      {/* <Component
          width='100%'
          onClick ={ handleClick }
          color={ 'red' }
          // src={ pen }
        /> */}
      {showSettings && (
        <div className='editModalContent'>

          <div className='color-inputs'>
            <div className='flex'>
              <input type='range' onChange={ handleChangeColor } />
              <span className='letter'>R</span>
            </div>
            <div className='flex'>
              <input type='range'/>
              <span className='letter'>G</span>
            </div>
            <div className='flex'>
              <input type='range'/>
              <span className='letter'>B</span>
            </div>
          </div>

          <SvgRender
            src={ dice }
            onClick ={ handleClickRandom }
            wrapperClassName='svgRender random'
            style={ { width: '50px' } }
          />
          <SvgRender
            src={ rotate }
            onClick ={ handleCancel }
            wrapperClassName='svgRender cancel'
            style={ { width: '50px' } }
          />
        </div>

      )}
      {/* </div> */}
    </ReactModal >
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
