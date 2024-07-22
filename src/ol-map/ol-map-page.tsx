'use client';

import dynamic from 'next/dynamic';
import Marker from './ol-marker';

const OlMap = dynamic(() => import('./ol-map'), { ssr: false });

const OlMapPage = () => {
  return (
    <div>
      <div>VWORLD + Open Layers</div>
      <OlMap height={'600px'} width={'600px'} />
    </div>
  );
};

export default OlMapPage;
