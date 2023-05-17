import React from 'react';

import style from './container.module.scss';
import { ContainerProps } from './container.interface';

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className={style.container}>
      {children}
    </div>
  );
}

export default Container;