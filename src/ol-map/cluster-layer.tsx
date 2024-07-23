import { createContext, useContext, useMemo } from 'react';
import { Cluster } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { MapContext } from './map';
import useUpdateLayer from './useUpdateLayer';
import { Fill, Stroke, Style, Text } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

export interface ClusterLayerContext {
  source: VectorSource;
}

export const ClusterLayerContext = createContext({} as ClusterLayerContext);

interface Props {
  minDistance?: number;
  distance?: number;
  minZoom?: number;
  maxZoom?: number;
  zIndex?: number;
  children?: React.ReactNode;
}

const ClusterLayer = ({
  children,
  minDistance,
  distance,
  minZoom,
  maxZoom,
  zIndex,
}: Props) => {
  const { map } = useContext(MapContext);

  const source = useMemo(() => {
    return new VectorSource();
  }, []);

  const clusterSource = useMemo(() => {
    const c = new Cluster({
      source,
      distance,
      minDistance,
    });
    return c;
  }, [distance, minDistance, source]);

  const vectorLayer = useMemo(() => {
    const styleCache: Record<string, any> = {};
    return new VectorLayer({
      source: clusterSource,
      minZoom,
      maxZoom,
      zIndex,
      style: (feature) => {
        const size = feature.get('features').length;
        let style = styleCache[size];
        if (!style) {
          style = new Style({
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
          styleCache[size] = style;
        }
        return style;
      },
    });
  }, [clusterSource, maxZoom, minZoom, zIndex]);

  useUpdateLayer(map, vectorLayer);

  const value = useMemo(() => ({ source }), [source]);

  return (
    <ClusterLayerContext.Provider value={value}>
      {children}
    </ClusterLayerContext.Provider>
  );
};

export default ClusterLayer;
