'use client';

import dynamic from 'next/dynamic';
import VectorLayer from './vector-layer';

const OlMap = dynamic(() => import('./map'), { ssr: false });

const OlMapPage = () => {
  return (
    <div>
      <div>VWORLD + Open Layers</div>
      <OlMap height={'600px'} width={'600px'}>
        <VectorLayer />
      </OlMap>
    </div>
  );
};

export default OlMapPage;
