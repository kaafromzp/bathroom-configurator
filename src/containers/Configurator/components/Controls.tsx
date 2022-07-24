import { PointerLockControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Raycaster, Vector3, Quaternion, Mesh, Material } from 'three';
import { ConfiguratorState } from '../../../redux';
import { useAppDispatch } from '../../../redux/hooks';
import { setLocked } from '../../../redux/configurator';

const raycaster = new Raycaster();
raycaster.layers.set( 2 );
raycaster.near = 0.01;
raycaster.far = 1000;

const raycasterCollision = new Raycaster();
raycaster.layers.set( 3 );
raycaster.near = 0.01;
raycaster.far = 1000;

const down = new Vector3( 0, -1, 0 );
const prevPosition = new Vector3();

const v3 = new Vector3();
const q = new Quaternion();

const movementSpeed = 3;


interface IOwnProps {};
interface IProps extends IReduxProps, IOwnProps {};

function Controls( { isLocked, selectedObject }: IProps ) {
  const ref = useRef( null );
  const [moveForward, setMoveForward] = useState( false );
  const [moveBack, setMoveBack] = useState( false );
  const [moveLeft, setMoveLeft] = useState( false );
  const [moveRight, setMoveRight] = useState( false );
  const { gl: { domElement }, camera, scene } = useThree();
  ( window as any ).camera = camera;
  const dispatch = useAppDispatch();

  const onKeyDown = useCallback( ( event: KeyboardEvent ) => {
    if ( !isLocked ) {
      return;
    }

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
  }, [isLocked] );
  const onKeyUp = useCallback( ( event: KeyboardEvent ) => {
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
  }, [isLocked] );

  useEffect( () => {
    window.addEventListener( 'keydown', onKeyDown );

    return () => window.removeEventListener( 'keydown', onKeyDown );
  }, [isLocked, onKeyDown] );

  useEffect( () => {
    window.addEventListener( 'keyup', onKeyUp );

    return () => window.removeEventListener( 'keyup', onKeyUp );
  }, [isLocked, onKeyUp] );

  useFrame( ( state, delta ) => {
    if ( !isLocked ) {
      return;
    }

    const actualMoveSpeed = delta * movementSpeed;

    v3.set( 0, 0, -actualMoveSpeed );
    q.set( 0, camera.quaternion.y, 0, camera.quaternion.w );
    prevPosition.copy( camera.position );
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

    if ( moveForward || moveBack || moveLeft || moveRight ) {
      raycasterCollision.set( camera.position.clone(), down );
      const intersections = raycasterCollision.intersectObject( scene, true );
      if ( !intersections.map( ( int ) => int.object )
        .filter( ( obj ) => ( ( obj as Mesh )?.material as Material )?.name === 'floor' ).length ) {
        camera.position.copy( prevPosition );
      }
    }
  } );

  return (
    <PointerLockControls
      ref= { ref }
      args={ [camera, domElement] }
      isLocked={ isLocked }
      lock= { () => {
        if ( !isLocked && !selectedObject ) {
          domElement.requestPointerLock();
          // dispatch( setLocked( true ) );
        }
      } }
      unlock={ () => {
        if ( isLocked && !selectedObject ) {
          document.exitPointerLock();
          // dispatch( setLocked( false ) );
        }
      } }
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
  const { configurator: { isLocked, selectedObject } } = state;

  return { isLocked, selectedObject };
}

const connector = connect( mapStateToProps );
type IReduxProps = ConnectedProps<typeof connector>
export default connector( Controls );

