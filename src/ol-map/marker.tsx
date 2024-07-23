import { useContext, useEffect, useMemo } from 'react';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Style, Icon } from 'ol/style';
import { VectorLayerContext } from './vector-layer';

interface Props {
  position: {
    lat: number;
    lng: number;
  };
}

// 현재 marker는 image가 아닌 css 형태로 사용
const Marker = ({ position }: Props) => {
  const { source } = useContext(VectorLayerContext);
  const marker = useMemo(() => {
    const initMarker = new Feature({
      geometry: new Point([position.lng, position.lat]),
    });

    initMarker.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
        }),
      })
    );

    return initMarker;
  }, [position.lat, position.lng]);

  useEffect(() => {
    source.addFeature(marker);

    return () => {
      source.removeFeature(marker);
    };
  }, [marker, position, source]);

  return null;
};

export default Marker;
