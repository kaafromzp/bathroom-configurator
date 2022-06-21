import { Html } from '@react-three/drei';
import React from 'react';
import './index.css';

function Loader() {
  return <Html center>
    {/* eslint-disable-next-line max-len */}
    <div className='spinner'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </Html>;
}

export default Loader;

