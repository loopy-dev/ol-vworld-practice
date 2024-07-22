'use client';

import dynamic from 'next/dynamic';

const OlMap = dynamic(() => import('./ol-map'), { ssr: false });

const OlMapPage = () => {
  return (
    <div>
      <div>VWORLD + Open Layers</div>
      <OlMap />
    </div>
  );
};

export default OlMapPage;
