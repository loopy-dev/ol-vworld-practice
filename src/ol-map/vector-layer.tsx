import { useContext, useEffect, useMemo, createContext } from 'react';
import { MapContext } from './map';
import OlVectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

interface VectorLayerContext {
  source: VectorSource;
}

export const VectorLayerContext = createContext({} as VectorLayerContext);

interface Props {
  zIndex?: number;
  children?: React.ReactNode;
}

const VectorLayer = ({ zIndex, children }: Props) => {
  const mapContext = useContext(MapContext);
  const vectorSource = useMemo(() => new VectorSource(), []);
  const vectorLayer = useMemo(() => {
    const initialVectorLayer = new OlVectorLayer({
      source: vectorSource,
      zIndex,
    });

    return initialVectorLayer;
  }, [vectorSource, zIndex]);

  useEffect(() => {
    mapContext.map.addLayer(vectorLayer);

    return () => {
      mapContext.map.removeLayer(vectorLayer);
    };
  }, [mapContext.map, vectorLayer]);

  const value = useMemo(() => ({ source: vectorSource }), [vectorSource]);

  return (
    <VectorLayerContext.Provider value={value}>
      {children}
    </VectorLayerContext.Provider>
  );
};

export default VectorLayer;
