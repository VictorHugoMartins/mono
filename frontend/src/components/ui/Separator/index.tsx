import React from 'react';


interface SeparatorProps{
    borderSize?: number;
    marginBlock?:number|string;
    color?: string
}

const Separator: React.FC<SeparatorProps> = ({borderSize,marginBlock,color}) => {
    return (
        <div 
            style={
                {
                    width:"100%",
                    borderWidth:borderSize ?? 1,
                    borderStyle: 'solid',
                    marginBlock:marginBlock ?? 15,
                    color:color??"#183462",
                    backgroundColor:color??"#183462"
                }
            }>
        </div>
    )
}

export default Separator;