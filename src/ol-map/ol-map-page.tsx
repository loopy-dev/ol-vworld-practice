'use client';

import dynamic from 'next/dynamic';
import VWorld from './vworld';
import Marker from './marker';
import ClusterLayer from './cluster-layer';
import Cluster from './cluster';

const OlMap = dynamic(() => import('./map'), { ssr: false });

const OlMapPage = () => {
  return (
    <div>
      <div>VWORLD + Open Layers</div>
      <OlMap height={'600px'} maxZoom={18} minZoom={6} width={'600px'}>
        <VWorld apiKey={process.env.NEXT_PUBLIC_VWORLD_API_KEY} />
        {/* <VectorLayer minZoom={11} zIndex={10}>
          <Marker
            position={{ lng: 14135126.30194829, lat: 4518366.509981735 }}
          />
        </VectorLayer> */}
        <ClusterLayer minZoom={6} zIndex={10}>
          <Cluster
            position={{ lng: 14135126.30194829, lat: 4518366.509981735 }}
          />
          <Cluster position={{ lng: 14135126.30194, lat: 4518366.509981735 }} />
        </ClusterLayer>
      </OlMap>
    </div>
  );
};

export default OlMapPage;
