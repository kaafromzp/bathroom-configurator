import { useCubeTexture, useGLTF } from '@react-three/drei';
import { useLoader, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  CanvasTexture,
  EquirectangularReflectionMapping,
  EquirectangularRefractionMapping,
  ImageBitmapLoader,
  Material,
  Mesh,
  MeshStandardMaterial,
  PMREMGenerator,
  Scene
} from 'three';
import { ConfiguratorState } from '../../../redux/configurator';

interface IOwnProps {};
interface IProps extends IReduxProps, IOwnProps {};

function Geometry( { colors, path }: IProps ) {

  const { scene: model } = useGLTF( `${ path }scene.glb`, true );
  const { set } = useThree();
  const envMap = useCubeTexture( [
    'envMapnx.jpg',
    'envMapny.jpg',
    'envMapnz.jpg',
    'envMappx.jpg',
    'envMappy.jpg',
    'envMappz.jpg'
  ], { path } );
  const { gl, scene } = useThree();

  useMemo( () => {
    model.traverse( ( obj ) => {
      if ( ( obj as Mesh ).isMesh ) {
        if ( true || ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'floor' ) ||
        ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'wall' ) ||
        ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'celling' ) ||
        ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'table_bottom' )
        ) {
          ( ( obj as Mesh ).material as MeshStandardMaterial ).color.r =
          colors[ ( ( obj as Mesh ).material as Material ).name ]
            ? colors[ ( ( obj as Mesh ).material as Material ).name ].r / 255
            : 1;
          ( ( obj as Mesh ).material as MeshStandardMaterial ).color.g =
          colors[ ( ( obj as Mesh ).material as Material ).name ]
            ? colors[ ( ( obj as Mesh ).material as Material ).name ].g / 255
            : 1;
          ( ( obj as Mesh ).material as MeshStandardMaterial ).color.b =
          colors[ ( ( obj as Mesh ).material as Material ).name ]
            ? colors[ ( ( obj as Mesh ).material as Material ).name ].b / 255
            : 1;

          ( obj as Mesh ).layers.enable( 2 );
        }

        if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'floor' ) ) {
          ( obj as Mesh ).layers.enable( 3 );
        }
      }
    } );
  }, [colors, model] );

  useEffect( () => {
    model.traverse( ( obj ) => {
      if ( ( obj as Mesh ).isMesh ) {
        ( ( obj as Mesh ).material as MeshStandardMaterial ).lightMapIntensity = 0.9;
        ( ( obj as Mesh ).material as MeshStandardMaterial ).envMapIntensity = 0.2;

        if ( true || ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'floor' ) ||
        ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'wall' ) ||
        ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'celling' ) ||
        ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'table_bottom' )
        ) {
          ( ( obj as Mesh ).material as MeshStandardMaterial ).color.r =
          colors[ obj.uuid ] ? colors[ obj.uuid ].r / 255 : 1;
          ( ( obj as Mesh ).material as MeshStandardMaterial ).color.g =
          colors[ obj.uuid ] ? colors[ obj.uuid ].g / 255 : 1;
          ( ( obj as Mesh ).material as MeshStandardMaterial ).color.b =
          colors[ obj.uuid ] ? colors[ obj.uuid ].b / 255 : 1;

          ( obj as Mesh ).layers.enable( 2 );
        }

        if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'mirror' ) ) {
          // ( ( obj as Mesh ).material as MeshStandardMaterial ).roughness = 0.15;
          // ( ( obj as Mesh ).material as MeshStandardMaterial ).metalness = 0.9;

        }
        if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'floor' ) ) {
          ( obj as Mesh ).layers.enable( 3 );
        }
      }
    } );
    const s = new Scene().add( model );
    set( { scene: s } );
  }, [model] );

  useMemo( () => {
    if ( envMap ) {

      // const gen = new PMREMGenerator( gl );
      // gen.compileEquirectangularShader();
      // const texture = new CanvasTexture( envMap, EquirectangularRefractionMapping );
      // const hdrCubeRenderTarget = gen.fromEquirectangular( texture );
      // texture.dispose();
      // gen.dispose();
      // scene.environment = hdrCubeRenderTarget.texture;
      scene.environment = envMap;
    }
  }, [
    envMap,
    gl,
    scene
  ] );

  return (
    null
  );
}

function mapStateToProps( state: { configurator : ConfiguratorState} ) {
  const { configurator: { colors, path } } = state;

  return { colors, path };
}

const connector = connect( mapStateToProps );
type IReduxProps = ConnectedProps<typeof connector>
export default connector( Geometry );
