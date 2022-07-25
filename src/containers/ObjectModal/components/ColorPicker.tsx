/* eslint-disable global-require */
import { ChangeEvent, useCallback, useState, useEffect, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
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
import { Html } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { setLocked } from '../../../redux/configurator';
import './index.css';
import './input.css';


interface IOwnProps {
  uuid: string;
  position: { x: number; y: number; z: number; };
};
interface IProps extends IReduxProps, IOwnProps { };

const pen = require( '../../../icons/pen.svg' ) as string;
const dice = require( '../../../icons/dice.svg' ) as string;
const rotate = require( '../../../icons/rotate-left.svg' ) as string;
const closeIcon = require( '../../../icons/circle-xmark.svg' ) as string;

const ColorPicker = ( { isLocked, position, selectedObject, color, uuid }: IProps ) => {
  const ref = useRef( null );
  const [toggling, setToggling] = useState( false );
  const [highlighted, setHighlighted] = useState( false );
  const dispatch = useAppDispatch();
  const { gl: { domElement } } = useThree();

  const changeIcon = () => {
    setToggling( true );
    setTimeout( () => {
      // setShowSettings( value );
      setToggling( false );
      setHighlighted( false );
    }, 700 );
  };

  useFrame( () => {
    if ( isLocked ) {
      const bodyRect = document.body.getBoundingClientRect();
      // @ts-ignore
      const elemRect = ref?.current?.getBoundingClientRect();
      const offsetY = elemRect?.top || 0 - bodyRect?.top || 0;
      const offsetX = elemRect?.left || 0 - bodyRect?.left || 0;
      if ( Math.abs( offsetX / window.innerWidth - 0.5 ) < 0.05 &&
        Math.abs( offsetY / window.innerHeight - 0.5 ) < 0.05
      ) {
        setHighlighted( true );
        // highlight svg icon color
      } else if ( Boolean( highlighted ) ) {
        setHighlighted( false );
      }
    }
  } );

  const onCanvasClick = useCallback( () => {
    if ( isLocked ) {
      const bodyRect = document.body.getBoundingClientRect();
      // @ts-ignore
      const elemRect = ref?.current?.getBoundingClientRect();
      const offsetY = elemRect?.top || 0 - bodyRect?.top || 0;
      const offsetX = elemRect?.left || 0 - bodyRect?.left || 0;
      if ( Math.abs( offsetX / window.innerWidth - 0.5 ) < 0.05 &&
        Math.abs( offsetY / window.innerHeight - 0.5 ) < 0.05
      ) {
        changeIcon();
        dispatch( setSelectedObject( uuid ) );
        document.exitPointerLock();
        dispatch( setLocked( false ) );
      }
    }
  }, [
    dispatch,
    isLocked,
    uuid
  ] );

  useEffect( () => {
    window.addEventListener( 'mousedown', onCanvasClick );

    return () => window.removeEventListener( 'mousedown', onCanvasClick );
  }, [onCanvasClick] );

  const onClick = useCallback( () => {
    changeIcon();
    if ( uuid === selectedObject ) {
      dispatch( setSelectedObject( null ) );
      domElement.requestPointerLock();
      dispatch( setLocked( true ) );
    }
  }, [
    dispatch,
    uuid,
    selectedObject,
    domElement
  ] );

  const handleClickRandom = useCallback( () => {
    dispatch( setColorById( {
      uuid,
      color: {
        r: getRandomInt( 0, 255 ),
        g: getRandomInt( 0, 255 ),
        b: getRandomInt( 0, 255 )
      }
    } ) );
  }, [dispatch, uuid] );

  const handleClearColor = useCallback( () => {
    dispatch( deleteColorById( { uuid } ) );
  }, [dispatch, uuid] );
  const handleChangeColor = useCallback(
    ( letter: keyof RGBColor ) => ( e: ChangeEvent<HTMLInputElement> ) => {
      dispatch( setColorById( {
        uuid,
        color: { ...color, [ letter ]: Number( e.target.value ) }
      } ) );
    }, [
      dispatch,
      uuid,
      color
    ]
  );

  const [hidden, set] = useState( false );
  const [occludeArray, setOccludeArray] = useState( [] as any[] );
  const { scene } = useThree();

  useEffect( () => {
    const arr = [] as any[];
    scene.traverse( ( n ) => {
      if ( ( n as Mesh ).isMesh ) {
        arr.push( { current: n } );
      }

      ;
    } );
    setOccludeArray( arr );
  }, [scene] );

  return (
    <Html ref={ ref } position={ [
      position.x,
      position.y,
      position.z
    ] }
    style={ {
      display: 'flex',
      transition: 'all 0.25s',
      opacity: hidden ? 1 : 1
    } }
    occlude={ occludeArray }
    // @ts-ignore
    onOcclude={ set }
    >
      <div className={ `${ toggling ? 'toggling' : '' }` }>
        <SvgRender
          src={ uuid === selectedObject ? closeIcon : pen }
          onClick={ onClick }
          wrapperClassName={ `
          svgRender swing ${ uuid === selectedObject ? 'close' : 'edit' } ${ highlighted ? 'highlighted' : '' }
          ` }
          style={ { width: '50px' } }
        />
      </div>

      {( uuid === selectedObject ) && (
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
            onClick={ handleClickRandom }
            wrapperClassName='svgRender random'
            style={ { width: '50px' } }
          />
          <SvgRender
            src={ rotate }
            onClick={ handleClearColor }
            wrapperClassName='svgRender cancel'
            style={ { width: '50px' } }
          />
        </div>
      )}

    </Html>
  );
};

function mapStateToProps( state: { configurator: ConfiguratorState }, props: IOwnProps ) {
  const { uuid } = props;
  const { configurator: { isLocked, selectedObject } } = state;
  const color = state.configurator.colors[ uuid || '' ] || { r: 255, g: 255, b: 255 };

  return { isLocked, selectedObject, color };
}

const connector = connect( mapStateToProps );
type IReduxProps = ConnectedProps<typeof connector>
export default connector( ColorPicker );
