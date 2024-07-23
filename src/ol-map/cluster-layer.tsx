import { createContext, useContext, useMemo } from 'react';
import { Cluster } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { MapContext } from './map';
import useUpdateLayer from './useUpdateLayer';

export interface ClusterLayerContext {}

export const ClusterLayerContext = createContext({} as ClusterLayerContext);

interface Props {
  children?: React.ReactNode;
}

const ClusterLayer = ({ children }: Props) => {
  const { map } = useContext(MapContext);

  const source = useMemo(() => {
    return new VectorSource();
  }, []);

  const clusterSource = useMemo(() => {
    const c = new Cluster({
      source,
    });
    return c;
  }, [source]);

  const vectorLayer = useMemo(() => {
    return new VectorLayer({
      source: clusterSource,
    });
  }, [clusterSource]);

  useUpdateLayer(map, vectorLayer);

  const value = useMemo(() => ({ source }), [source]);

  return (
    <ClusterLayerContext.Provider value={value}>
      {children}
    </ClusterLayerContext.Provider>
  );
};

export default ClusterLayer;
