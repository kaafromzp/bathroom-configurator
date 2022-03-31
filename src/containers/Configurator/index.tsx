import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { Layers, sRGBEncoding } from 'three';
import Scene from './components/Scene';
import Controls from './components/Controls';
import Composer from './components/Composer';
import Loader from '../Loader';

const layers = new Layers();
layers.disableAll();

function Configurator() {
  return (
    <div style={ { width: '100hw', height: '100vh' } }>
      <Canvas
        camera = { {
          position: [
            -0.2988704413196319,
            1.6731538252262097,
            3.50194365037641
          ]
        } }
        gl={ {
          antialias: false,
          preserveDrawingBuffer: true,
          alpha: true,
          logarithmicDepthBuffer: true,
          physicallyCorrectLights: false,
          precision: 'highp',
          outputEncoding: sRGBEncoding
          //  toneMapping: ACESFilmicToneMapping
        } }
        frameloop='demand'
        dpr={ window.devicePixelRatio || 1 }
        raycaster={ { layers } }
      >
        <color attach='background' args={ [
          0,
          0,
          0
        ] } />
        <Provider store={ store }>
          <Composer>
            <Suspense fallback={
              <Loader/>
              //  <>
              //    <ambientLight intensity={ 0.5 } />
              //    <directionalLight position={ [
              //      10,
              //      10,
              //      5
              //    ] } intensity={ 1 } />
              //    <pointLight position={ [
              //      0,
              //      -10,
              //      5
              //    ] } intensity={ 1 } />
              //    <Sphere visible position={ [
              //      0,
              //      0,
              //      0
              //    ] } args={ [
              //      1,
              //      16,
              //      200
              //    ] }>
              //      <MeshDistortMaterial
              //        color='#00A38D'
              //        attach='material'
              //        distort={ 0.5 }
              //        speed={ 2 }
              //        roughness={ 0 }
              //        alphaWrite={ undefined }
              //        refractionRatio={ undefined }
              //      />
              //    </Sphere>
              //  </>
            }>
              <Scene />
              <Controls />
            </Suspense>
          </Composer>
        </Provider>
      </Canvas>;
    </div>
  );
}

export default Configurator;
