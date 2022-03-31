import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { Layers, sRGBEncoding } from 'three';
import Scene from './components/Scene';
import Controls from './components/Controls';
import Composer from './components/Composer';

const layers = new Layers();
layers.disableAll();

function Configurator() {
  return (
    <div style={ { width: '100hw', height: '100vh' } }>
      <Canvas
        gl={ {
          antialias: false,
          preserveDrawingBuffer: true,
          alpha: true,
          logarithmicDepthBuffer: true,
          physicallyCorrectLights: false,
          precision: 'highp',
          outputEncoding: sRGBEncoding
          // toneMapping: ACESFilmicToneMapping
        } }
        frameloop='demand'
        dpr={ window.devicePixelRatio || 1 }
        raycaster={ { layers } }
      >
        <color attach='background' args = { [
          0,
          0,
          0
        ] }/>
        <Provider store={ store }>
          <Composer>
            <Suspense fallback={ null }>
              <Scene />
              <Controls/>
            </Suspense>
          </Composer>
        </Provider>
      </Canvas>;
    </div>
  );
}

export default Configurator;
