import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ConfiguratorState } from '../../redux';
import Configurator from '../Configurator';
import './App.css';

interface IOwnProps {};
interface IProps extends IReduxProps, IOwnProps {};

function App( { isLocked }: IProps ) {
  return (
    <>
      <Configurator />
      {!isLocked && <div
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
    </>
  );
}

function mapStateToProps( state: { configurator : ConfiguratorState} ) {
  const { configurator: { isLocked } } = state;

  return { isLocked };
}

const connector = connect( mapStateToProps );
type IReduxProps = ConnectedProps<typeof connector>
export default connector( App );
