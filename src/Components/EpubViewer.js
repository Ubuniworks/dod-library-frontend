import React, { useEffect, useRef } from 'react';
import ePub from 'epubjs';

function EpubViewer({ url }) {
    const viewerRef = useRef(null);

    useEffect(() => {
        const viewer = ePub({ restore: true });
        const element = viewerRef.current;

        if (element && url) {
            viewer.open(url);
            viewer.renderTo(element);
        }

        return () => {
            viewer.destroy();
        };
    }, [url]);

    return <div ref={viewerRef} style={{ height: '600px' }} />;
}

export default EpubViewer;
