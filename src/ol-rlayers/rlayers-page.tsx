'use client';
import { useEffect, useRef, useState } from 'react';
import { RFeature, RLayerVector, RMap, ROverlay } from 'rlayers';
import 'ol/ol.css';
import VWorld from './vworld';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { Icon, Style } from 'ol/style';

const Page = () => {
  const [lonLats, setLonLats] = useState<Array<[number, number]>>([]);
  const mapRef = useRef<RMap | null>(null);

  useEffect(() => {
    setLonLats([
      [126.9778222, 37.5664056],
      [126.98479293208457, 37.56640619023242],
    ]);
  }, []);

  return (
    <div>
      <RMap
        ref={mapRef}
        height={'600px'}
        initial={{ center: fromLonLat([126.9778222, 37.5664056]), zoom: 15 }}
        maxZoom={18}
        minZoom={6}
        projection="EPSG:3857"
        width={'600px'}
        onPointerMove={(e) => {
          const hit = e.map.hasFeatureAtPixel(e.pixel);
          e.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        }}
      >
        <VWorld apiKey={process.env.NEXT_PUBLIC_VWORLD_API_KEY} />
        <RLayerVector minZoom={11} zIndex={10}>
          {lonLats.map((lonLat) => {
            return (
              <RFeature
                key={`${lonLat[0]}-${lonLat[1]}`}
                geometry={new Point(fromLonLat(lonLat))}
                style={
                  new Style({
                    image: new Icon({
                      anchor: [0.5, 1],
                      src: 'https://openlayers.org/en/latest/examples/data/icon.png',
                    }),
                  })
                }
                onClick={(e) => {
                  const geometry = e.target.getGeometry();
                  if (!geometry) return;

                  const zoom = e.map.getView().getZoom()!;

                  e.map.getView().fit(geometry.getExtent(), {
                    duration: 250,
                    maxZoom: zoom > 17 ? zoom : 17,
                  });
                }}
              >
                <ROverlay autoPan className="text-blue-400">
                  <div>Hello, World!</div>
                </ROverlay>
              </RFeature>
            );
          })}
        </RLayerVector>
      </RMap>
    </div>
  );
};

export default Page;
