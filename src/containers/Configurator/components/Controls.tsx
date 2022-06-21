import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { Raycaster } from 'three';
import { useAppDispatch } from '../../../redux/hooks';
import { setSelectedObject } from '../../../redux/configurator';

const raycaster = new Raycaster();
raycaster.layers.set( 2 );
raycaster.near = 0.01;
raycaster.far = 1000;

let mouseCoords = { x: 0, y: 0 };

function Controls() {
  const { gl, camera, scene } = useThree();
  const dispatch = useAppDispatch();
  ( window as any ).camera = camera;
  const onPointerUp = ( event: PointerEvent ) => {
    if (
      ( Math.pow( mouseCoords.y - event.clientY, 2 ) +
       Math.pow( mouseCoords.x - event.clientX, 2 ) ) < 2
    ) {
      const ndcX = event.clientX / gl.domElement.offsetWidth * 2 - 1;
      const ndcY = -( event.clientY / gl.domElement.offsetHeight ) * 2 + 1;
      raycaster.setFromCamera( { x: ndcX, y: ndcY }, camera );
      const intersections = raycaster.intersectObjects( scene.children, true );
      if ( intersections[ 0 ] ) {
        dispatch( setSelectedObject( intersections[ 0 ].object.uuid ) );
      } else {
        dispatch( setSelectedObject( null ) );
      }
    }
  };

  const onPointerDown = ( event: PointerEvent ) => {
    mouseCoords = { x: event.clientX, y: event.clientY };
  };

  useEffect( () => {
    gl.domElement.addEventListener( 'pointerdown', onPointerDown );

    return window.removeEventListener( 'pointerdown', onPointerDown );
  } );

  useEffect( () => {
    gl.domElement.addEventListener( 'pointerup', onPointerUp );

    return window.removeEventListener( 'pointerup', onPointerUp );
  } );

  return (
    <OrbitControls
      enablePan={ true }
      enableDamping={ false }
      enableZoom={ true }
      enableRotate
      target={ [
        0,
        0,
        0
      ] }
    />
  );
}

export default Controls;

