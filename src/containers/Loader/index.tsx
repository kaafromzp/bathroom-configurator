import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React from 'react';
import { Vector3 } from 'three';
import './index.css';

function Loader() {
  const { camera: { position, rotation } } = useThree();

  return <Html center position={ position.clone().add( new Vector3( 0, 0, -1 ).applyEuler( rotation ) ) }>
    <div className='spinner'>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
    </div>
  </Html>;
}

export default Loader;

