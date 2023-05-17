import React from "react";

interface ColumnContentProps {
    columnCount: number,
    children: React.ReactNode,
}

const ColumnContent: React.FC<ColumnContentProps> = ({ children, columnCount }) => {
    return (
        <div style={{ columnCount }}>
            {children}
        </div>
    )
}

export default ColumnContent;