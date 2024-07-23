import { useContext, useMemo, createContext } from 'react';
import { MapContext } from './map';
import OlVectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import useUpdateLayer from './useUpdateLayer';

interface VectorLayerContext {
  source: VectorSource;
}

export const VectorLayerContext = createContext({} as VectorLayerContext);

interface Props {
  zIndex?: number;
  minZoom?: number;
  maxZoom?: number;
  children?: React.ReactNode;
}

const VectorLayer = ({ zIndex, minZoom, maxZoom, children }: Props) => {
  const mapContext = useContext(MapContext);
  const vectorSource = useMemo(() => new VectorSource(), []);
  const vectorLayer = useMemo(() => {
    const initialVectorLayer = new OlVectorLayer({
      source: vectorSource,
      minZoom,
      maxZoom,
      zIndex,
    });

    return initialVectorLayer;
  }, [maxZoom, minZoom, vectorSource, zIndex]);

  useUpdateLayer(mapContext.map, vectorLayer);

  const value = useMemo(() => ({ source: vectorSource }), [vectorSource]);

  return (
    <VectorLayerContext.Provider value={value}>
      {children}
    </VectorLayerContext.Provider>
  );
};

export default VectorLayer;
