import { useContext, useMemo } from 'react';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import useUpdateLayer from './useUpdateLayer';
import { MapContext } from './map';

interface Props {
  apiKey?: string;
}
const VWorld = ({ apiKey }: Props) => {
  const { map } = useContext(MapContext);
  const vworldBaseLayer = useMemo(() => {
    const MAP_URL = `https://api.vworld.kr/req/wmts/1.0.0/${apiKey}/Base/{z}/{y}/{x}.png`;

    return new TileLayer({
      source: new XYZ({
        url: MAP_URL,
      }),
      properties: { name: 'base-vworld-base' },
      minZoom: 5,
      maxZoom: 19,
      zIndex: 2,
      preload: Infinity,
    });
  }, [apiKey]);

  useUpdateLayer(map, vworldBaseLayer);

  return null;
};

export default VWorld;
