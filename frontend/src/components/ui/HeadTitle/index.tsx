import React from 'react';

// import { Container } from './styles';
import Head from 'next/head'

interface HeadProps {
    children?: React.ReactNode;
    title?: string;
}

const HeadTitle: React.FC<HeadProps> = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                {
                    children &&
                    children
                }
            </Head>
        </>
    );
}

export default HeadTitle;