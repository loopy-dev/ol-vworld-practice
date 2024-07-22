import { useEffect } from 'react';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Style, Icon } from 'ol/style';
import type VectorSource from 'ol/source/Vector';
import type { Map } from 'ol';

interface Props {
  position: {
    lat: number;
    lng: number;
  };
  map?: Map;
  type?: 'marker';
  vectorSource?: VectorSource;
}

// 현재 marker는 image가 아닌 css 형태로 사용
const Marker = ({ position, map, vectorSource }: Props) => {
  useEffect(() => {
    if (!(map && position && vectorSource)) return;
    const marker = new Feature({
      geometry: new Point([position.lng, position.lat]),
    });

    marker.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
        }),
      })
    );

    vectorSource.addFeature(marker);

    return () => {
      vectorSource.removeFeature(marker);
    };
  }, [map, position, vectorSource]);

  return null;
};

export default Marker;
