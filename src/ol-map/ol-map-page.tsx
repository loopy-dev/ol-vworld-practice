'use client';

import dynamic from 'next/dynamic';
import VectorLayer from './vector-layer';
import VWorld from './vworld';
import Marker from './marker';

const OlMap = dynamic(() => import('./map'), { ssr: false });

const OlMapPage = () => {
  return (
    <div>
      <div>VWORLD + Open Layers</div>
      <OlMap height={'600px'} minZoom={6} width={'600px'}>
        <VWorld apiKey={process.env.NEXT_PUBLIC_VWORLD_API_KEY} />
        <VectorLayer minZoom={11} zIndex={10}>
          <Marker
            position={{ lng: 14135126.30194829, lat: 4518366.509981735 }}
          />
        </VectorLayer>
      </OlMap>
    </div>
  );
};

export default OlMapPage;
