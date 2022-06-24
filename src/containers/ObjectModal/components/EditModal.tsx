/* eslint-disable global-require */
import { ChangeEvent, useCallback, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import ReactModal from 'react-modal';
import {
  useAppDispatch,
  ConfiguratorState,
  setColorById,
  deleteColorById,
  setSelectedObject
} from '../../../redux';
import { SvgRender } from '../../SvgRender';
import { getRandomInt } from '../../../helpers';
import { RGBColor } from '../../../decl';

import './index.css';
import './input.css';

interface IOwnProps {};
interface IProps extends IReduxProps, IOwnProps {};

const pen = require( '../../../icons/pen.svg' ) as string;
const dice = require( '../../../icons/dice.svg' ) as string;
const rotate = require( '../../../icons/rotate-left.svg' ) as string;
const closeIcon = require( '../../../icons/circle-xmark.svg' ) as string;

const ObjectModal = ( { selectedObject, color }: IProps ) => {
  const [showSettings, setShowSettings] = useState( false );
  const [toggling, setToggling] = useState( false );

  const dispatch = useAppDispatch();

  const toggleIcon = () => {
    setToggling( true );
    setTimeout( () => {
      setShowSettings( ( v ) => !v );
      setToggling( false );
    }, 700 );
  };

  const handleClickRandom = useCallback( () => {
    dispatch( setColorById( {
      uuid: selectedObject as string,
      color: {
        r: getRandomInt( 0, 255 ),
        g: getRandomInt( 0, 255 ),
        b: getRandomInt( 0, 255 )
      }
    } ) );
  }, [dispatch, selectedObject] );

  const handleClearColor = useCallback( () => {
    dispatch( deleteColorById( { uuid: selectedObject as string } ) );
  }, [dispatch, selectedObject] );

  const handleChangeColor = useCallback(
    ( letter: keyof RGBColor ) => ( e: ChangeEvent<HTMLInputElement> ) => {
      dispatch( setColorById( {
        uuid: selectedObject as string,
        color: { ...color, [ letter ]: e.target.value }
      } ) );
    }, [
      dispatch,
      selectedObject,
      color
    ]
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
      closeTimeoutMS={ 10 }
    >
      <div className={ `${ toggling ? 'toggling' : '' }` }>
        <SvgRender
          src={ showSettings ? closeIcon : pen }
          onClick ={ toggleIcon }
          wrapperClassName={ `svgRender swing ${ showSettings ? 'close' : 'edit' }` }
          style={ { width: '50px' } }
        />
      </div>

      {showSettings && (
        <div className='editModalContent'>
          <div className='color-inputs'>
            <div className='flex'>
              <input
                min={ 0 }
                max={ 255 }
                type='range'
                value={ color.r || 0 }
                onChange={ handleChangeColor( 'r' ) }
              />
              <span className='letter'>R</span>
            </div>
            <div className='flex'>
              <input
                min={ 0 }
                max={ 255 }
                type='range'
                value={ color.g || 0 }
                onChange={ handleChangeColor( 'g' ) }
              />
              <span className='letter'>G</span>
            </div>
            <div className='flex'>
              <input
                min={ 0 }
                max={ 255 }
                type='range'
                value={ color.b || 0 }
                onChange={ handleChangeColor( 'b' ) }
              />
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
            onClick ={ handleClearColor }
            wrapperClassName='svgRender cancel'
            style={ { width: '50px' } }
          />
        </div>
      )}
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
