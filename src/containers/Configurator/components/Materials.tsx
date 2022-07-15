import { useGraph, useThree } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  CanvasTexture,
  ImageBitmapLoader,
  MeshStandardMaterial,
  RepeatWrapping,
  Texture
} from 'three';
import { ConfiguratorState } from '../../../redux/configurator';

interface IOwnProps {};
interface IProps extends IReduxProps, IOwnProps {};

function Materials( { path }:IProps ) {
  useEffect( () => {
    const loaderDefault = new ImageBitmapLoader();
    const loaderFlipped = new ImageBitmapLoader();
    loaderFlipped.setOptions( { imageOrientation: 'flipY' } );
    const a = async () => {
      const response = await fetch( `${ path }paths.json`
        , {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      );
      const paths = await response.json() as string[];
      const imageBitmaps = await Promise.all(
        ( paths as unknown as string[] ).map(
          ( filePath ) => (
            filePath.includes( 'lightMap' )
              ? loaderFlipped
              : loaderDefault
          ).loadAsync( path + filePath )
        )
      );
      setImageBitmaps( imageBitmaps );
    };
    a();
  }, [path] );
  const [imageBitmaps, setImageBitmaps] = useState( [] as ImageBitmap[] );
  const { scene } = useThree();
  const { materials } = useGraph( scene );

  useEffect( () => {
    const a = async () => {
      // @ts-ignore
      const response = await fetch( `${ path }applyData.json`
        , {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      );
      const applyData = await response.json() as
       [string[], 'map'| 'normalMap' | 'lightMap' | 'roughnessMap' | 'metalnessMap'][];
      const textures = imageBitmaps.map( ( imageBitmap ) => new CanvasTexture( imageBitmap ) );
      const arrMaterials = Object.values( materials );
      for ( let i = 0, l1 = textures.length; i < l1; i += 1 ) {
        if ( textures[ i ] && textures[ i ].isTexture ) {
          for ( let j = 0, l2 = arrMaterials.length; j < l2; j += 1 ) {
            for ( let k = 0, l3 = applyData[ i ][ 0 ].length; k < l3; k += 1 ) {
              const material = arrMaterials[ j ] as MeshStandardMaterial;
              if ( material.name === applyData[ i ][ 0 ][ k ] ) {
                const prevTexture = material[ applyData[ i ][ 1 ] ] as Texture;
                if ( prevTexture ) {
                  textures[ i ].mapping = prevTexture.mapping;
                  textures[ i ].repeat = prevTexture.repeat;
                  textures[ i ].offset = prevTexture.offset;
                  textures[ i ].center = prevTexture.center;
                  textures[ i ].rotation = prevTexture.rotation;
                  textures[ i ].wrapS = prevTexture.wrapS;
                  textures[ i ].wrapT = prevTexture.wrapT;
                  textures[ i ].format = prevTexture.format;
                  textures[ i ].type = prevTexture.type;
                  textures[ i ].encoding = prevTexture.encoding;
                  textures[ i ].minFilter = prevTexture.minFilter;
                  textures[ i ].magFilter = prevTexture.magFilter;
                  textures[ i ].anisotropy = prevTexture.anisotropy;
                  textures[ i ].flipY = prevTexture.flipY;
                  textures[ i ].premultiplyAlpha = prevTexture.premultiplyAlpha;
                  textures[ i ].unpackAlignment = prevTexture.unpackAlignment;
                } else {
                  textures[ i ].wrapS = RepeatWrapping;
                  textures[ i ].wrapT = RepeatWrapping;
                }

                material[ applyData[ i ][ 1 ] ] = textures[ i ];
                textures[ i ].needsUpdate = true;
                material.needsUpdate = true;
              }
            }
          }
        }
      }

    };
    a();
  }, [
    imageBitmaps,
    materials,
    path
  ] );

  return null;
}

function mapStateToProps( state: { configurator : ConfiguratorState} ) {
  const { configurator: { path } } = state;

  return { path };
}

const connector = connect( mapStateToProps );
type IReduxProps = ConnectedProps<typeof connector>
export default connector( Materials );

