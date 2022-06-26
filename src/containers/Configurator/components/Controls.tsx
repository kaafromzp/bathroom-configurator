import { PointerLockControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useState, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Raycaster, Vector3, Quaternion } from 'three';
import { ConfiguratorState } from '../../../redux';
import { useAppDispatch } from '../../../redux/hooks';
import { setSelectedObject, setLocked } from '../../../redux/configurator';
import Icons from './Icons';


const raycaster = new Raycaster();
raycaster.layers.set( 2 );
raycaster.near = 0.01;
raycaster.far = 1000;

// let mouseCoords = { x: 0, y: 0 };
const v3 = new Vector3();
const q = new Quaternion();

const movementSpeed = 3;


interface IOwnProps {};
interface IProps extends IReduxProps, IOwnProps {};

function Controls( { isLocked }: IProps ) {
  const ref = useRef( null );
  // const [isLocked, setLocked] = useState( false );
  const [moveForward, setMoveForward] = useState( false );
  const [moveBack, setMoveBack] = useState( false );
  const [moveLeft, setMoveLeft] = useState( false );
  const [moveRight, setMoveRight] = useState( false );
  const { gl, camera } = useThree();
  ( window as any ).camera = camera;
  const dispatch = useAppDispatch();
  // const onPointerUp = ( event: PointerEvent ) => {
  //   console.log( mouseCoords );
  //   if (
  //     ( Math.pow( mouseCoords.y - event.clientY, 2 ) +
  //       Math.pow( mouseCoords.x - event.clientX, 2 ) ) < 2
  //   ) {
  //     const ndcX = event.clientX / gl.domElement.offsetWidth * 2 - 1;
  //     const ndcY = -( event.clientY / gl.domElement.offsetHeight ) * 2 + 1;
  //     raycaster.setFromCamera( { x: 0 * ndcX, y: 0 * ndcY }, camera );
  //     const intersections = raycaster.intersectObjects( scene.children, true );
  //     console.log( scene, intersections, scene.children, raycaster.ray.direction, raycaster.ray.origin );

  //     if ( intersections[ 0 ] ) {
  //       console.log( intersections[ 0 ].object.uuid );
  //       dispatch( setSelectedObject( intersections[ 0 ].object.uuid ) );
  //     } else {
  //       dispatch( setSelectedObject( null ) );
  //     }
  //   }
  // };

  // const onPointerDown = ( event: PointerEvent ) => {
  //   mouseCoords = { x: event.clientX, y: event.clientY };
  // };

  const onKeyDown = ( event: KeyboardEvent ) => {
    if ( !isLocked ) {
      return;
    }

    console.log( 'key', isLocked );
    switch ( event.code ) {

      case 'ArrowUp':
      case 'KeyW': setMoveForward( true );
        break;
      case 'ArrowLeft':
      case 'KeyA': setMoveLeft( true );
        break;
      case 'ArrowDown':
      case 'KeyS': setMoveBack( true );
        break;
      case 'ArrowRight':
      case 'KeyD': setMoveRight( true );
        break;
      default: break;
    }
  };
  const onKeyUp = ( event: KeyboardEvent ) => {
    if ( !isLocked ) {
      return;
    }

    switch ( event.code ) {

      case 'ArrowUp':
      case 'KeyW': setMoveForward( false );
        break;
      case 'ArrowLeft':
      case 'KeyA': setMoveLeft( false );
        break;
      case 'ArrowDown':
      case 'KeyS': setMoveBack( false );
        break;
      case 'ArrowRight':
      case 'KeyD': setMoveRight( false );
        break;
      default: break;
    }
  };

  // useEffect( () => {
  //   window.addEventListener( 'pointerdown', onPointerDown );

  //   return () => window.removeEventListener( 'pointerdown', onPointerDown );
  // }, [] );
  // useEffect( () => {
  //   window.addEventListener( 'pointerup', onPointerUp );

  //   return () => window.removeEventListener( 'pointerup', onPointerUp );
  // }, [scene, camera] );

  useEffect( () => {
    window.addEventListener( 'keydown', onKeyDown );

    return () => window.removeEventListener( 'keydown', onKeyDown );
  }, [isLocked] );

  useEffect( () => {
    window.addEventListener( 'keyup', onKeyUp );

    return () => window.removeEventListener( 'keyup', onKeyUp );
  }, [isLocked] );

  useFrame( ( state, delta ) => {
    if ( !isLocked ) {
      return;
    }

    const actualMoveSpeed = delta * movementSpeed;

    v3.set( 0, 0, -actualMoveSpeed );
    q.set( 0, camera.quaternion.y, 0, camera.quaternion.w );
    if ( moveForward ) {
      camera.position.add( v3.clone().applyQuaternion( q ) );
    }
    if ( moveBack ) {
      camera.position.add( v3.clone().multiplyScalar( -1 )
        .applyQuaternion( q ) );
    }

    if ( moveLeft ) {
      camera.translateX( -actualMoveSpeed );
    }
    if ( moveRight ) {
      camera.translateX( actualMoveSpeed );
    }
  } );

  return (
    <PointerLockControls
      ref= { ref }
      args={ [camera, gl.domElement] }
      onLock={ () => {
        if ( !isLocked ) {
          dispatch( setLocked( true ) );
        }
      } }
      onUnlock={ () => {
        if ( isLocked ) {
          dispatch( setLocked( false ) );
        }
      } }
    />
  );
}

function mapStateToProps( state: { configurator : ConfiguratorState} ) {
  const { configurator: { isLocked } } = state;

  return { isLocked };
}

const connector = connect( mapStateToProps );
type IReduxProps = ConnectedProps<typeof connector>
export default connector( Controls );

