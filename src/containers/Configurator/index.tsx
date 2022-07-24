import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { connect, ConnectedProps, Provider } from 'react-redux';
import { store } from '../../redux/store';
import { Layers, sRGBEncoding } from 'three';
import Controls from './components/Controls';
import Composer from './components/Composer';
import Loader from '../Loader';
import Geometry from './components/Geometry';
import Materials from './components/Materials';
import { isMobile } from 'react-device-detect';
import Icons from './components/Icons';
import { ConfiguratorState } from '../../redux';

const layers = new Layers();
layers.set( 2 );

interface IOwnProps { };
interface IProps extends IReduxProps, IOwnProps { };

function Configurator( { isLocked, selectedObject }: IProps ) {

  return (
    <div style={ { width: '100hw', height: '100vh' } }>
      <Canvas
        camera={ {
          position: [
            2.09,
            1.67,
            1.34
          ],
          rotation: [
            -0.245,
            0.294,
            0.072
          ]
        } }
        gl={ {
          antialias: false,
          preserveDrawingBuffer: true,
          alpha: true,
          logarithmicDepthBuffer: true,
          physicallyCorrectLights: false,
          precision: isMobile ? 'mediump' : 'highp',
          outputEncoding: sRGBEncoding
        } }
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
            <Suspense fallback={ <Loader /> }>
              <Geometry />
            </Suspense>
            <Materials />
            <Controls />
            {( isLocked || ( !isLocked && selectedObject ) ) && <Icons />}
          </Composer>
        </Provider>
      </Canvas>
    </div>
  );
}

function mapStateToProps( state: { configurator: ConfiguratorState } ) {
  const { configurator: { isLocked, selectedObject } } = state;

  return { isLocked, selectedObject };
}

const connector = connect( mapStateToProps );
type IReduxProps = ConnectedProps<typeof connector>
export default connector( Configurator );


