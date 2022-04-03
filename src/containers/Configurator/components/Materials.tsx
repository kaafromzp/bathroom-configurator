import { useGraph, useThree } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import {
  MeshStandardMaterial,
  Texture,
  TextureLoader,
  Vector2
} from 'three';
// interface IOwnProps {};
// interface IProps = IOwnProps;

const texturesPaths = [
  // "1683F37D-E40F-46B3-B2FC-04BF0C1D2516",
  'assets/lightMaps/shower.jpg',
  'assets/textures/shower_n.jpg',
  'assets/lightMaps/door.jpg',
  'assets/textures/leave_3_d.jpg',
  'assets/lightMaps/flowers.jpg',
  'assets/textures/leave_3_n.png',
  'assets/textures/leave_1_d.png',
  // "9E424DD2-1BD1-42A6-B10E-8744CCEEFC0E"
  // 'assets/lightMaps/flowers.jpg',
  // [['leave_1', 'lightMap']],
  'assets/textures/leave_1_n.png',
  'assets/textures/leave_2_d.png',
  // '1BF237A6-2DC7-4FD0-AD5D-3F2037321BFB',
  // 'assets/lightMaps/flowers.jpg',
  // [['leave_2', 'lightMap']],
  'assets/textures/leave_2_n.png',
  'assets/textures/stem_d.jpg',
  'assets/lightmaps/flower_container.jpg',
  'assets/textures/ground_d.jpg',
  'assets/textures/ground_n.jpg',
  'assets/lightmaps/sinks_fausets.jpg',
  'assets/textures/noise_n.jpg',
  'assets/textures/noise.jpg',
  'assets/textures/words.jpg',
  'assets/lightmaps/sinks.jpg',
  // '013D7F00-1EB7-4840-B144-1DBDA6A98DEF',
  // sinks normalMal
  'assets/textures/noise_r.jpg',
  'assets/lightmaps/bottles.jpg',
  'assets/lightmaps/decorate.jpg',
  // '68620407-F721-4022-8AB1-4CB0959D5490',
  // table_handles normalMap
  'assets/textures/wood_d.jpg',
  'assets/lightmaps/table_top.jpg',
  'assets/textures/table_r.jpg',
  'assets/lightmaps/table_bottom.jpg',
  'assets/textures/noise-1.jpg',
  'assets/lightmaps/celling.jpg',
  'assets/textures/floor.jpg',
  'assets/lightmaps/floor.jpg',
  'assets/textures/wall_front_d.jpg',
  'assets/lightmaps/wall_front.jpg',
  'assets/textures/wall_front_n.jpg',
  'assets/lightmaps/wall_back.jpg',
  'assets/textures/wall_bottom_d.jpg'
];
const texturesApplyData = [
// "1683F37D-E40F-46B3-B2FC-04BF0C1D2516",
  [['shower_main', 'lightMap']],
  [['shower_main', 'normalMap']],
  [['door_glass', 'lightMap']],
  [['leave_3', 'map']],
  [
    ['leave_1', 'lightMap'],
    ['leave_2', 'lightMap'],
    ['leave_3', 'lightMap']
  ],
  [['leave_3', 'normalMap']],
  [['leave_1', 'map']],
  // "9E424DD2-1BD1-42A6-B10E-8744CCEEFC0E"
  // 'assets/lightMaps/flowers.jpg',
  // [['leave_1', 'lightMap']],
  [['leave_1', 'normalMap']],
  [['leave_2', 'map']],
  // '1BF237A6-2DC7-4FD0-AD5D-3F2037321BFB',
  // 'assets/lightMaps/flowers.jpg',
  // [['leave_2', 'lightMap']],
  [['leave_2', 'normalMap']],
  [['leaves_stem', 'map']],
  [['leaves_container', 'lightMap']],
  [['leaves_ground', 'map']],
  [['leaves_ground', 'normalMap']],
  [['sinks_faucet', 'lightMap']],
  [
    ['leaves_container', 'normalMap'],
    ['sinks_faucet', 'normalMap'],
    ['sinks', 'normalMap'],
    ['table_handles', 'normalMap']
  ],
  [
    ['sinks_faucet', 'metalnessMap'],
    ['sinks_faucet', 'roughnessMap'],
    ['walls_front_bottom', 'map']
  ],
  [['sinks_faucet_logos', 'map']],
  [['sinks', 'lightMap']],
  // '013D7F00-1EB7-4840-B144-1DBDA6A98DEF',
  // sinks normalMal
  [['sinks', 'roughnessMap'], ['sinks', 'metalnessMap']],
  [['bottle_plastic_transparent', 'lightMap']],
  [
    ['lamps_top', 'lightMap'],
    ['lamps_chrome', 'lightMap'],
    ['lamps_glass', 'lightMap'],
    ['mirror_body', 'lightMap']
  ],
  // '68620407-F721-4022-8AB1-4CB0959D5490',
  // table_handles normalMap
  [['table_top', 'map']],
  [['table_top', 'lightMap']],
  [['table_top', 'roughnessMap'], ['table_top', 'metalnessMap']],
  [['table_bottom', 'lightMap']],
  [['table_bottom', 'normalMap']],
  [['celling', 'lightMap']],
  [['floor', 'map']],
  [['floor', 'lightMap']],
  [['walls_front', 'map']],
  [['walls_front', 'lightMap']],
  [['walls_front', 'normalMap']],
  [['walls_back', 'lightMap'], ['walls_back_bottom', 'lightMap']],
  [['walls_back_bottom', 'map']]
] as [string, 'map'| 'normalMap' | 'lightMap' | 'roughnessMap' | 'metalnessMap'][][];
const v0 = new Vector2();
const v1 = new Vector2( 1, 1 );

function Materials( ) {
  console.log( 'materials render' );
  useEffect( () => {
    const loader = new TextureLoader();
    Promise.all( texturesPaths.map( ( path ) => loader.load( path ) ) ).then(
      ( t ) => {
        setTextures( t );
      }
    );
    ;
  }, [] );
  const [textures, setTextures] = useState( [] as Texture[] );
  const { scene } = useThree();
  const { materials } = useGraph( scene );

  useEffect( () => {
    console.log( 'useMemo textures', textures, materials );
    const arrMaterials = Object.values( materials );
    for ( let i = 0, l1 = textures.length; i < l1; i += 1 ) {
      if ( textures[ i ] && textures[ i ].isTexture ) {
        for ( let j = 0, l2 = arrMaterials.length; j < l2; j += 1 ) {
          for ( let k = 0, l3 = texturesApplyData[ i ].length; k < l3; k += 1 ) {
            const material = arrMaterials[ j ] as MeshStandardMaterial;
            if ( material.name === texturesApplyData[ i ][ k ][ 0 ] ) {
              textures[ i ].mapping = 300;
              textures[ i ].repeat = v1;
              textures[ i ].offset = v0;
              textures[ i ].center = v0;
              textures[ i ].rotation = 0;
              textures[ i ].wrapS = 1001;
              textures[ i ].wrapT = 1001;
              textures[ i ].format = 1023;
              textures[ i ].type = 1009;
              textures[ i ].encoding = texturesPaths[ i ].endsWith( '.png' ) ? 3000 : 3001;
              textures[ i ].minFilter = 1008;
              textures[ i ].magFilter = 1006;
              textures[ i ].anisotropy = 1;
              textures[ i ].flipY = true;
              textures[ i ].premultiplyAlpha = false;
              textures[ i ].unpackAlignment = 4;
              material[ texturesApplyData[ i ][ k ][ 1 ] ] = textures[ i ];
              textures[ i ].needsUpdate = true;
              material.needsUpdate = true;
            }
          }
        }
      }
    }
  }, [textures, materials] );
  console.log( 'scene render' );

  return null;
}

export default Materials;

