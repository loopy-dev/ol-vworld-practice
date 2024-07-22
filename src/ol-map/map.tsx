import React, { useEffect, useMemo, useRef, createContext } from 'react';
import { Map as OlMap, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import 'ol/ol.css';

const MAP_URL = `https://api.vworld.kr/req/wmts/1.0.0/${process.env.NEXT_PUBLIC_VWORLD_API_KEY}/Base/{z}/{y}/{x}.png`;

interface MapContext {
  map: OlMap;
}

const MapContext = createContext({} as MapContext);

interface Props {
  initial?: {
    center?: {
      lat: number;
      lng: number;
    };
    zoom?: number;
  };
  children?: React.ReactNode;
  width: number | string;
  height: number | string;
}

const Map = ({
  initial = { center: { lng: 14135490.777017945, lat: 4518386.883679577 } },
  width,
  height,
  children,
}: Props) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const map = useMemo(() => {
    const vworldBaseLayer = new TileLayer({
      source: new XYZ({
        url: MAP_URL,
      }),
      properties: { name: 'base-vworld-base' },
      minZoom: 5,
      maxZoom: 19,
      zIndex: 2,
      preload: Infinity,
    });

    const center = initial.center
      ? [initial.center.lng, initial.center.lat]
      : [14135490.777017945, 4518386.883679577];

    const view = new View({
      projection: 'EPSG:3857',
      center,
      zoom: 17,
    });

    const initialMap = new OlMap({
      layers: [vworldBaseLayer],
      view,
    });

    return initialMap;
  }, [initial.center]);

  useEffect(() => {
    if (map && targetRef.current) {
      map.setTarget(targetRef.current);
    }

    return () => {
      map.setTarget(undefined);
    };
  }, [map]);

  return (
    <div ref={targetRef} className="relative" style={{ width, height }}>
      <MapContext.Provider value={{ map }}>{children}</MapContext.Provider>
    </div>
  );
};

export default Map;
