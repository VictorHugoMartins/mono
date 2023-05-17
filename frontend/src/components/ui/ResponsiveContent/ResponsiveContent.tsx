import React from 'react';

import { ResponsiveContentProps } from './responsiveContext';

const ResponsiveContent: React.FC<ResponsiveContentProps> = ({ width, height, children }) => {
    return (
        <div style={{ width: width || "100%", height: height || "100%" }}>
            {children}
        </div>

    )
}

export default ResponsiveContent;