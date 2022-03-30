// import { useGLTF } from '@react-three/drei';
import { useLoader, useThree } from '@react-three/fiber';
import React, { useMemo } from 'react';
import {
  Color,
  DoubleSide,
  Group,
  Material,
  Mesh,
  MeshPhysicalMaterial,
  MeshPhysicalMaterialParameters,
  MeshStandardMaterial,
  ObjectLoader,
  PMREMGenerator,
  Texture,
  TextureLoader
} from 'three';
function Scene() {
  // const { scene } = useGLTF( `${ process.env.PUBLIC_URL }scene.glb`, true );
  // eslint-disable-next-line no-process-env
  const scene = useLoader( ObjectLoader as any, `${ process.env.PUBLIC_URL }scene.json` ) as Group;
  // eslint-disable-next-line no-process-env
  const envMap = useLoader( TextureLoader, `${ process.env.PUBLIC_URL }envMap.jpg` );
  const { gl, scene: s } = useThree();
  const convertedScene = useMemo( () => {
    const convertedScene = new Group();
    // for ( let i = 0, l = scene.children.length; i < l; i += 1 ) {
    // console.log( scene.children[ i ] );
    convertedScene.attach( scene.children[ 1 ].clone() );
    // }

    convertedScene.traverse( ( obj ) => {
      if ( ( obj as Mesh ).isMesh ) {
        ( obj as Mesh ).layers.enable( 2 );
        console.log( ( obj as Mesh ).material );
        ( ( obj as Mesh ).material as MeshStandardMaterial ).lightMapIntensity = 1.2;
        ( ( obj as Mesh ).material as MeshStandardMaterial ).envMapIntensity = 0.3;
        ( ( obj as Mesh ).material as MeshStandardMaterial ).emissive = new Color( 0, 0, 0 );
        if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).metalness > 0.9 ) {
          ( ( obj as Mesh ).material as MeshStandardMaterial ).metalness = 0.9;
        }

        if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'floor' ) ||
        ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'wall' ) ||
        ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'ceiling' ) ||
        ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'table_bottom' )
        ) {
          ( ( obj as Mesh ).material as MeshStandardMaterial ).roughness = 0.05;
          // ( ( obj as Mesh ).material as MeshStandardMaterial ).emissive = new Color( 0, 0, 0 );
        }
        if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'table_bottom' )
        ) {
          ( ( obj as Mesh ).material as MeshStandardMaterial ).side = DoubleSide;
        }
        if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'leaves_container' )
        ) {
          ( ( obj as Mesh ).material as MeshStandardMaterial ).roughness = 0.9;
          ( ( obj as Mesh ).material as MeshStandardMaterial ).metalness = 0.1;
        }
        if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'table_top' ) ) {
          ( ( obj as Mesh ).material as MeshStandardMaterial ).lightMapIntensity = 2;
          ( ( obj as Mesh ).material as MeshStandardMaterial ).roughness = 0.2;

        }
        if ( ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'door_glass' ) ||
        ( ( obj as Mesh ).material as MeshStandardMaterial ).name.includes( 'bottle_plastic_transparent' )
        ) {
          ( obj as Mesh ).material = new MeshPhysicalMaterial(
            {
              name: ( ( obj as Mesh ).material as MeshStandardMaterial ).name,
              map: ( ( obj as Mesh ).material as MeshStandardMaterial ).map,
              lightMap: ( ( obj as Mesh ).material as MeshStandardMaterial ).lightMap,
              normalMap: ( ( obj as Mesh ).material as MeshStandardMaterial ).normalMap,
              roughnessMap: ( ( obj as Mesh ).material as MeshStandardMaterial ).roughnessMap,
              opacity: 1.0,
              roughness: ( ( obj as Mesh ).material as MeshStandardMaterial ).roughness,
              metalness: ( ( obj as Mesh ).material as MeshStandardMaterial ).metalness,
              transparent: true,
              transmission: 0.97,
              reflectivity: 0.2,
              envMapIntensity: 0.1
            } as MeshPhysicalMaterialParameters );
        }
      }
    } );
    if ( ( envMap as Texture ).isTexture ) {
      const gen = new PMREMGenerator( gl );
      gen.compileEquirectangularShader();
      const hdrCubeRenderTarget = gen.fromEquirectangular( envMap );
      envMap.dispose();
      gen.dispose();

      // envMap.mapping = EquirectangularRefractionMapping;
      // ( envMap as Texture ).needsUpdate = true;
      console.log( s );
      s.environment = hdrCubeRenderTarget.texture;
    }
    // const box = new Box3().setFromObject( convertedScene, true );
    // const center = new Vector3();
    // box.getCenter( center );
    // const size = new Vector3();
    // box.getSize( size );
    // const position = new Vector3().copy( ( center.clone().multiplyScalar( -1 ) ) );

    return convertedScene;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, envMap] );

  return (
    <primitive
      object={ convertedScene }
    />
  );
}

export default Scene;
