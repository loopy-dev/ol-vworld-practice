import { useContext, useEffect, useMemo } from 'react';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Style, Icon } from 'ol/style';
import { ClusterLayerContext } from './cluster-layer';

interface Props {
  position: {
    lat: number;
    lng: number;
  };
}

// 현재 marker는 image가 아닌 css 형태로 사용
const Cluster = ({ position }: Props) => {
  const { source } = useContext(ClusterLayerContext);
  const cluster = useMemo(() => {
    const initCluster = new Feature({
      geometry: new Point([position.lng, position.lat]),
    });

    initCluster.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
        }),
      })
    );

    return initCluster;
  }, [position.lat, position.lng]);

  useEffect(() => {
    source.addFeature(cluster);

    return () => {
      source.removeFeature(cluster);
    };
  }, [cluster, position, source]);

  return null;
};

export default Cluster;
