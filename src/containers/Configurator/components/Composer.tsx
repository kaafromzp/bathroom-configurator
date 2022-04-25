
import { extend, ReactThreeFiber, useFrame, useThree } from '@react-three/fiber';
import React, { ReactNode, useEffect, useMemo, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Color, Vector2 } from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader';
import { ConfiguratorState } from '../redux';
extend( { EffectComposer, RenderPass, OutlinePass, ShaderPass } );
declare global {
  namespace JSX {
    interface IntrinsicElements {
      outlinePass: ReactThreeFiber.Object3DNode<OutlinePass, typeof OutlinePass>;
    }
  }
}

interface IOwnProps {
  children : ReactNode;
}
interface IProps extends IReduxProps, IOwnProps {}

const Composer = ( { children, selectedObject }: IProps ) => {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef( null as EffectComposer | null );
  const aspect = useMemo( () => new Vector2( size.width, size.height ), [size] );
  useEffect( () => ( composer.current as EffectComposer ).setSize( size.width, size.height ), [size] );
  useFrame( () => ( composer.current as EffectComposer ).render(), 1 );
  const object = scene.getObjectByProperty( 'uuid', selectedObject as string );
  const selectedObjects = object ? [object] : [];

  return (
    <>
      {children}
      <effectComposer ref={ composer } args={ [gl] }>
        <renderPass attachArray='passes' args={ [scene, camera] } />
        <outlinePass
          attachArray='passes'
          args={ [
            aspect,
            scene,
            camera
          ] }
          selectedObjects={ selectedObjects }
          visibleEdgeColor={ new Color( 'orangered' ) }
          edgeStrength={ 5 }
          edgeThickness={ 1 }
          hiddenEdgeColor = { new Color( 'orangered' ) }
        />
        <shaderPass
          attachArray='passes'
          args={ [FXAAShader] }
          uniforms-resolution-value={
            [1 / size.width / window.devicePixelRatio, 1 / size.height / window.devicePixelRatio]
          }
        />
        <shaderPass
          attachArray='passes'
          args={ [GammaCorrectionShader] }
        />
      </effectComposer>
    </>
  );
};

function mapStateToProps( state: { configurator : ConfiguratorState} ) {
  const { configurator: { selectedObject } } = state;

  return { selectedObject };
}

const connector = connect( mapStateToProps );
type IReduxProps = ConnectedProps<typeof connector>
export default connector( Composer );
