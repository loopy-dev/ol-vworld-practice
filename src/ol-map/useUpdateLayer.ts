import { useEffect } from 'react';
import type Layer from 'ol/layer/Layer';
import type { Map } from 'ol';

function useUpdateLayer(map: Map, layer: Layer) {
  useEffect(() => {
    map.addLayer(layer);

    return () => {
      map.removeLayer(layer);
    };
  }, [layer, map]);
}

export default useUpdateLayer;
