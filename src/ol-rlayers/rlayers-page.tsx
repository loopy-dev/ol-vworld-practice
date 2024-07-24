'use client';
import React, { useEffect, useRef, useState } from 'react';
import { RFeature, RMap, ROverlay } from 'rlayers';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import VWorld from './vworld';
import { useThrottle } from '~/hooks/useThrottle';
import { RLayerVector } from 'rlayers';
import { Icon, Style } from 'ol/style';
import 'ol/ol.css';
import type { Map } from 'ol';

interface Data {
  id: string;
  lonLat: [number, number];
  open: boolean;
  content?: string;
}

const Page = () => {
  const [state, setState] = useState<Data[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const mapRef = useRef<Map | null>(null);
  const layerRef = useRef<RLayerVector | null>(null);
  const throttle = useThrottle(() => {
    const map = mapRef.current;
    if (!map) return;

    const view = map.getView();

    const zoom = view.getZoom();
    const overlays = map.getOverlays();

    if (!zoom) return;
    if (zoom < 11) {
      overlays.forEach((o) => {
        const element = o.getElement();
        if (!element) return;
        element.style.display = 'none';
      });
    } else {
      overlays.forEach((o) => {
        const element = o.getElement();
        if (!element) return;
        element.style.display = 'block';
      });
    }
  }, 200);

  useEffect(() => {
    setState([
      {
        id: '1',
        lonLat: [126.9778222, 37.5664056],
        open: false,
        content: 'city hall',
      },
      {
        id: '2',
        lonLat: [126.98479293208457, 37.56640619023242],
        open: false,
        content: 'SK Telecom tower',
      },
    ]);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const map = mapRef.current;
    if (!map) return;

    const view = map.getView();

    view.on('change:resolution', throttle);

    return () => {
      view.un('change:resolution', throttle);
    };
  }, [isMounted, throttle]);

  return (
    <div>
      <RMap
        height={'600px'}
        maxZoom={18}
        minZoom={6}
        projection="EPSG:3857"
        width={'600px'}
        initial={{
          center: fromLonLat([126.9778222, 37.5664056]),
          zoom: 15,
        }}
        onClick={(e) => {
          const hit = e.map.hasFeatureAtPixel(e.pixel);

          if (!hit) {
            setState((prev) => prev.map((p) => ({ ...p, open: false })));
          }
        }}
        onPointerMove={(e) => {
          const hit = e.map.hasFeatureAtPixel(e.pixel);
          e.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        }}
        onPostRender={(e) => {
          setIsMounted(true);
          mapRef.current = e.map;
        }}
      >
        <VWorld apiKey={process.env.NEXT_PUBLIC_VWORLD_API_KEY} />
        <RLayerVector ref={layerRef} minZoom={11} zIndex={10}>
          {state.map((s) => {
            return (
              <RFeature
                key={s.id}
                geometry={new Point(fromLonLat(s.lonLat))}
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
                    maxZoom: zoom > 15 ? zoom : 15,
                  });

                  setState((prev) =>
                    prev.map((p) =>
                      p.id === s.id
                        ? { ...p, open: !p.open }
                        : { ...p, open: false }
                    )
                  );
                }}
              >
                {s.open && (
                  <ROverlay>
                    <div style={{ backgroundColor: 'white', padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <button
                          style={{
                            cursor: 'pointer',
                            border: '1px solid #333',
                            borderRadius: '6px',
                            flexShrink: 0,
                            width: '20px',
                            height: '20px',

                            fontSize: '14px',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onClick={() => {
                            setState((prev) =>
                              prev.map((p) =>
                                p.id === s.id ? { ...p, open: false } : p
                              )
                            );
                          }}
                        >
                          X
                        </button>
                      </div>

                      <div>{s.content}</div>
                    </div>
                  </ROverlay>
                )}
              </RFeature>
            );
          })}
        </RLayerVector>
        {/* <RLayerCluster
          ref={clusterRef}
          distance={40}
          minZoom={11}
          zIndex={20}
          style={(feature) => {
            const size = feature.get('features').length;

            const style = new Style({
              image: new CircleStyle({
                radius: 20,
                stroke: new Stroke({
                  color: '#fff',
                }),
                fill: new Fill({
                  color: '#3399CC',
                }),
              }),
              text: new Text({
                text: size.toString(),
                fill: new Fill({
                  color: '#fff',
                }),
                scale: 1.5,
              }),
            });

            return style;
          }}
        >
          {state.map((s) => {
            return (
              <RFeature key={s.id} geometry={new Point(fromLonLat(s.lonLat))}>
                {s.open && (
                  <ROverlay>
                    <div style={{ backgroundColor: 'white', padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <button
                          style={{
                            cursor: 'pointer',
                            border: '1px solid #333',
                            borderRadius: '6px',
                            flexShrink: 0,
                            width: '20px',
                            height: '20px',

                            fontSize: '14px',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onClick={() => {
                            setState((prev) =>
                              prev.map((p) =>
                                p.id === s.id ? { ...p, open: false } : p
                              )
                            );
                          }}
                        >
                          X
                        </button>
                      </div>
                      <div>{s.content}</div>
                    </div>
                  </ROverlay>
                )}
              </RFeature>
            );
          })}
        </RLayerCluster> */}
      </RMap>
    </div>
  );
};

export default Page;
