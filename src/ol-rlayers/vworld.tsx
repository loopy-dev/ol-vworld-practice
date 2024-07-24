import { useContext, useEffect, useMemo } from 'react';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { RContext } from 'rlayers';

interface Props {
  apiKey?: string;
}
const VWorld = ({ apiKey }: Props) => {
  const context = useContext(RContext);

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

  useEffect(() => {
    if (!context.map) return;

    context.map.addLayer(vworldBaseLayer);
    return () => {
      context.map?.removeLayer(vworldBaseLayer);
    };
  }, [context.map, vworldBaseLayer]);

  return null;
};

export default VWorld;
