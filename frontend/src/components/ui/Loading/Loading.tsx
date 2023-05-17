import React from 'react';
import { ThemeColorsType } from '~/types/global/ThemeColorsType';

import style from "./loading.module.scss";

import ClassJoin from '~/utils/ClassJoin/ClassJoin';

interface LoadingProps {
  size?: number,
  theme?: ThemeColorsType,
  type: LoadingType,
  mr?: number,
}

type LoadingType = "spin";

const Loading: React.FC<LoadingProps> = ({ theme, type, size, mr }) => {

  let classList = [
    style.loading,
    style[`${type}`],
    style[`${theme}`],
  ]

  return <div className={ClassJoin(classList)} style={{ width: size, height: size, marginRight: (mr || undefined) }} />;
}

export default Loading;