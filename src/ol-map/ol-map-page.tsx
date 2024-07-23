'use client';

import dynamic from 'next/dynamic';
import VectorLayer from './vector-layer';
import VWorld from './vworld';

const OlMap = dynamic(() => import('./map'), { ssr: false });

const OlMapPage = () => {
  return (
    <div>
      <div>VWORLD + Open Layers</div>
      <OlMap height={'600px'} width={'600px'}>
        <VWorld apiKey={process.env.NEXT_PUBLIC_VWORLD_API_KEY} />
        <VectorLayer />
      </OlMap>
    </div>
  );
};

export default OlMapPage;
