import React from "react";
import {InView, IntersectionObserverProps} from 'react-intersection-observer';

interface InViewObserverProps extends Omit<IntersectionObserverProps,"children">{
    children:React.ReactNode;
}

const InViewObserver:React.FC<InViewObserverProps> = ({children,...rest})=>{
    return(
        <>
            <InView
                {...rest}
            >
                {children}
            </InView>
        </>
    )
} 
export default InViewObserver;