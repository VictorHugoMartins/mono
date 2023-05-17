import React from "react";
import Typography from "~/components/ui/Typography/Typography";

interface RowWithValueProps {
    title: string;
    value: string | number;
}

const RowWithValue: React.FC<RowWithValueProps> = ({ title, value }) => {
    return (
        <Typography component="p"> <strong>{title}:</strong> {value} </Typography>
    )
}

export default RowWithValue;