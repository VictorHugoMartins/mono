import React from 'react';
import Head from 'next/head'
import { HeadTagsProps } from './headTags.interface';

const HeadTags:React.FC<HeadTagsProps> = ({children,title}) =>{
  return (
    <>
      <Head>
        <title>{title}</title>
        {children ? children : ""}
      </Head>
    </>
  )
}
export default HeadTags;