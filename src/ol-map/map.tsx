import React, { useEffect, useMemo, useRef, createContext } from 'react';
import { Map as OlMap, View } from 'ol';
import 'ol/ol.css';

interface MapContext {
  map: OlMap;
}

export const MapContext = createContext({} as MapContext);

interface Props {
  initial?: {
    center?: {
      lat: number;
      lng: number;
    };
    zoom?: number;
  };
  children?: React.ReactNode;
  minZoom?: number;
  maxZoom?: number;
  width: number | string;
  height: number | string;
}

const Map = ({
  initial = { center: { lng: 14135490.777017945, lat: 4518386.883679577 } },
  width,
  height,
  minZoom,
  maxZoom,
  children,
}: Props) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const map = useMemo(() => {
    const center = initial.center
      ? [initial.center.lng, initial.center.lat]
      : [14135126.30194829, 4518366.509981735];

    const view = new View({
      projection: 'EPSG:3857',
      center,
      minZoom,
      maxZoom,
      zoom: 17,
    });

    const initialMap = new OlMap({
      layers: [],
      view,
    });

    return initialMap;
  }, [initial.center, maxZoom, minZoom]);

  useEffect(() => {
    if (map && targetRef.current) {
      map.setTarget(targetRef.current);
    }

    return () => {
      map.setTarget(undefined);
    };
  }, [map]);

  const value = useMemo(() => ({ map }), [map]);

  return (
    <div ref={targetRef} className="relative" style={{ width, height }}>
      <MapContext.Provider value={value}>{children}</MapContext.Provider>
    </div>
  );
};

export default Map;
