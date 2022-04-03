import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { Layers, sRGBEncoding } from 'three';
// import Scene from './components/Scene';
import Controls from './components/Controls';
import Composer from './components/Composer';
import Loader from '../Loader';
import Geometry from './components/Geometry';
import Materials from './components/Materials';

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
          1,
          1,
          1
        ] } />
        <Provider store={ store }>
          <Composer>
            <Suspense fallback={ <Loader/> }>
              <Geometry/>
            </Suspense>
            {/* <Suspense fallback={ null }> */}
            <Materials/>
            {/* </Suspense> */}
            <Controls />
          </Composer>
        </Provider>
      </Canvas>;
    </div>
  );
}

export default Configurator;


