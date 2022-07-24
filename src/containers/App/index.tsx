/* eslint-disable global-require */

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ConfiguratorState } from '../../redux';
import Configurator from '../Configurator';
import { SvgRender } from '../SvgRender';
import './App.css';
const viewfinder = require( './viewfinder.svg' ) as string;

interface IOwnProps {};
interface IProps extends IReduxProps, IOwnProps {};

function App( { isLocked, selectedObject }: IProps ) {
  return (
    <>
      <Configurator />
      {!isLocked && !selectedObject && <div
        style={ {
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          backgroundColor: 'rgba(0,0,0,0.3)'
        } }
      >
        <div style ={ {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          fontSize: '18px',
          cursor: 'pointer',
          color: 'red'
        } }>
          <p style={ { fontSize: '36px' } }>Click to go</p>
          <p>
            "Move: WASD or ARROWS"
            <br/>
            <br/>
            "Look: MOUSE or TOUCHPAD"
          </p>
        </div>
      </div>}
      {isLocked && (
        <SvgRender
          src={ viewfinder }
          style={ { position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%' } }
        />
      )}
    </>
  );
}

function mapStateToProps( state: { configurator : ConfiguratorState} ) {
  const { configurator: { isLocked, selectedObject } } = state;

  return { isLocked, selectedObject };
}

const connector = connect( mapStateToProps );
type IReduxProps = ConnectedProps<typeof connector>
export default connector( App );
