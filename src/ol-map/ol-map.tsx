import { useEffect, useId } from 'react';
import { Map as OlMap, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import 'ol/ol.css';

const MAP_URL = `https://api.vworld.kr/req/wmts/1.0.0/${process.env.NEXT_PUBLIC_VWORLD_API_KEY}/Base/{z}/{y}/{x}.png`;

interface Props {
  center?: {
    lat: number;
    lng: number;
  };
}

const Map = ({
  center = { lng: 14135490.777017945, lat: 4518386.883679577 },
}: Props) => {
  const id = useId();

  // init
  /**
   * 1. center값 입력받을 수 있도록
   */
  useEffect(() => {
    if (!id) return;

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

    const view = new View({
      projection: 'EPSG:3857',
      center: [center.lng, center.lat],
      zoom: 17,
    });

    const initialMap = new OlMap({
      target: 'ol-map'.concat(id),
      layers: [vworldBaseLayer],
      view,
    });

    return () => {
      initialMap.setTarget(undefined);
    };
  }, [center, id]);

  return (
    <div
      className="relative"
      id={'ol-map'.concat(id)}
      style={{ width: '600px', height: '600px' }}
    />
  );
};

export default Map;
