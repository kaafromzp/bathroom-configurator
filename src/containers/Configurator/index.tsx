import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { ACESFilmicToneMapping, Layers } from 'three';
import Scene from './components/Scene';
import { OrbitControls } from '@react-three/drei';

const layers = new Layers();
layers.disableAll();

function Configurator() {

  return (
    <div style={ { width: '100hw', height: '100vh' } }>
      <Canvas
        gl={ {
          antialias: true,
          preserveDrawingBuffer: true,
          alpha: true,
          logarithmicDepthBuffer: true,
          physicallyCorrectLights: false,
          precision: 'highp',
          toneMapping: ACESFilmicToneMapping
          // outputEncoding: sRGBEncoding
        } }
        frameloop='demand'
        dpr={ window.devicePixelRatio || 1 }
        raycaster={ { layers } }
      >
        <Provider store={ store }>
          {/* <Composer> */}
          <color attach='background' args = { [
            0,
            0,
            0
          ] }/>
          <Suspense fallback={ null }>
            <Scene />
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
          </Suspense>
          {/* </Composer> */}
        </Provider>
      </Canvas>;
    </div>
  );
}

export default Configurator;
