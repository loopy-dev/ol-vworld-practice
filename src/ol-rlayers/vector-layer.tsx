import { useContext, useEffect } from 'react';
import { RContext, RLayerVector } from 'rlayers';
import type BaseEvent from 'ol/events/Event';
import type { RLayerVectorProps } from 'rlayers';

const VectorLayer = (props: RLayerVectorProps) => {
  const context = useContext(RContext);

  useEffect(() => {
    const map = context.map;
    if (!map) return;

    const view = map.getView();

    const callback = (e: BaseEvent) => {
      const zoom = view.getZoom();
    };

    view.on('change:resolution', callback);

    return () => {
      view.un('change:resolution', callback);
    };
  }, [context.map]);
  return <RLayerVector {...props} />;
};

export default VectorLayer;
