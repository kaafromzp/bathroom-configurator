import { useGLTF } from '@react-three/drei';
import { useLoader, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  CanvasTexture,
  ImageBitmapLoader,
  Mesh,
  MeshStandardMaterial,
  PMREMGenerator,
  Scene
} from 'three';
import { ConfiguratorState } from '../redux';

interface IOwnProps {};
interface IProps extends IReduxProps, IOwnProps {};

function Geometry( { colors, path }: IProps ) {

  const { scene: model } = useGLTF( `${ path }scene.glb`, true );
  const { set } = useThree();
  const envMap = useLoader( ImageBitmapLoader, `${ path }envMap.jpg` );
  const { gl, scene, invalidate } = useThree();
  ( window as any ).scene = scene;
  useMemo( () => {
    model.traverse( ( obj ) => {
      if ( ( obj as Mesh ).isMesh ) {
        // ( ( obj as Mesh ).material as MeshStandardMaterial ).lightMapIntensity = 1.2;
        // ( ( obj as Mesh ).material as MeshStandardMaterial ).envMapIntensity = 0.3;
        // ( ( obj as Mesh ).material as MeshStandardMaterial ).emissive = new Color( 0, 0, 0 );
        // if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).metalness > 0.9 ) {
        //   ( ( obj as Mesh ).material as MeshStandardMaterial ).metalness = 0.9;
        // }

        if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'floor' ) ||
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
          // ( ( obj as Mesh ).material as MeshStandardMaterial ).roughness = 0.05;
        }
        // if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'table_bottom' )
        // ) {
        //   ( ( obj as Mesh ).material as MeshStandardMaterial ).side = DoubleSide;
        // }
        // if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'leaves_container' )
        // ) {
        //   ( ( obj as Mesh ).material as MeshStandardMaterial ).roughness = 0.9;
        //   ( ( obj as Mesh ).material as MeshStandardMaterial ).metalness = 0.1;
        // }
        // if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'table_top' ) ) {
        //   ( ( obj as Mesh ).material as MeshStandardMaterial ).lightMapIntensity = 2;
        //   ( ( obj as Mesh ).material as MeshStandardMaterial ).roughness = 0.2;

        // }
        // if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'door_glass' ) ||
        // ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'bottle_plastic_transparent' )
        // ) {
        //   ( obj as Mesh ).material = new MeshPhysicalMaterial(
        //     {
        //       name: ( ( obj as Mesh ).material as MeshStandardMaterial ).name,
        //       map: ( ( obj as Mesh ).material as MeshStandardMaterial ).map,
        //       lightMap: ( ( obj as Mesh ).material as MeshStandardMaterial ).lightMap,
        //       normalMap: ( ( obj as Mesh ).material as MeshStandardMaterial ).normalMap,
        //       roughnessMap: ( ( obj as Mesh ).material as MeshStandardMaterial ).roughnessMap,
        //       opacity: 1.0,
        //       roughness: ( ( obj as Mesh ).material as MeshStandardMaterial ).roughness,
        //       metalness: ( ( obj as Mesh ).material as MeshStandardMaterial ).metalness,
        //       transparent: true,
        //       transmission: 0.95,
        //       reflectivity: 0.4,
        //       envMapIntensity: 0.1
        //     } as MeshPhysicalMaterialParameters );
        // }
      }
    } );
    invalidate();
    // const box = new Box3().setFromObject( convertedScene, true );
    // const center = new Vector3();
    // box.getCenter( center );
    // const size = new Vector3();
    // box.getSize( size );
    // const position = new Vector3().copy( ( center.clone().multiplyScalar( -1 ) ) );

    // return model;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors] );

  useEffect( () => {
    // setUuid( generateUUID() );
    model.traverse( ( obj ) => {
      if ( ( obj as Mesh ).isMesh ) {
        ( ( obj as Mesh ).material as MeshStandardMaterial ).lightMapIntensity = 1.2;
        ( ( obj as Mesh ).material as MeshStandardMaterial ).envMapIntensity = 0.7;
        // ( ( obj as Mesh ).material as MeshStandardMaterial ).emissive = new Color( 0, 0, 0 );
        // if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).metalness > 0.9 ) {
        //   ( ( obj as Mesh ).material as MeshStandardMaterial ).metalness = 0.9;
        // }

        if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'floor' ) ||
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
          // ( ( obj as Mesh ).material as MeshStandardMaterial ).roughness = 0.05;
        }
        // if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'table_bottom' )
        // ) {
        //   ( ( obj as Mesh ).material as MeshStandardMaterial ).side = DoubleSide;
        // }
        // if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'leaves_container' )
        // ) {
        //   ( ( obj as Mesh ).material as MeshStandardMaterial ).roughness = 0.9;
        //   ( ( obj as Mesh ).material as MeshStandardMaterial ).metalness = 0.1;
        // }
        // if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'table_top' ) ) {
        //   ( ( obj as Mesh ).material as MeshStandardMaterial ).lightMapIntensity = 2;
        //   ( ( obj as Mesh ).material as MeshStandardMaterial ).roughness = 0.2;

        // }
        // if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'door_glass' ) ||
        // ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'bottle_plastic_transparent' )
        // ) {
        //   ( obj as Mesh ).material = new MeshPhysicalMaterial(
        //     {
        //       name: ( ( obj as Mesh ).material as MeshStandardMaterial ).name,
        //       map: ( ( obj as Mesh ).material as MeshStandardMaterial ).map,
        //       lightMap: ( ( obj as Mesh ).material as MeshStandardMaterial ).lightMap,
        //       normalMap: ( ( obj as Mesh ).material as MeshStandardMaterial ).normalMap,
        //       roughnessMap: ( ( obj as Mesh ).material as MeshStandardMaterial ).roughnessMap,
        //       opacity: 1.0,
        //       roughness: ( ( obj as Mesh ).material as MeshStandardMaterial ).roughness,
        //       metalness: ( ( obj as Mesh ).material as MeshStandardMaterial ).metalness,
        //       transparent: true,
        //       transmission: 0.95,
        //       reflectivity: 0.4,
        //       envMapIntensity: 0.1
        //     } as MeshPhysicalMaterialParameters );
        // }
      }
    } );
    const s = new Scene().add( model );
    set( { scene: s } );

    // const box = new Box3().setFromObject( convertedScene, true );
    // const center = new Vector3();
    // box.getCenter( center );
    // const size = new Vector3();
    // box.getSize( size );
    // const position = new Vector3().copy( ( center.clone().multiplyScalar( -1 ) ) );

    // return model;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model] );

  useMemo( () => {
    if ( envMap ) {
      const gen = new PMREMGenerator( gl );
      gen.compileEquirectangularShader();
      const texture = new CanvasTexture( envMap );
      const hdrCubeRenderTarget = gen.fromEquirectangular( texture );
      texture.dispose();
      gen.dispose();
      scene.environment = hdrCubeRenderTarget.texture;
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
