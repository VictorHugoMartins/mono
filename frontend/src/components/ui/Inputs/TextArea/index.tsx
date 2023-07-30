import React from 'react';
import ClassJoin from '~/utils/ClassJoin/ClassJoin';
import { TextAreaProps } from './textArea.interface';
import style from './textArea.module.scss';

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ error, type, ...rest }, ref) => {
  return (
    <textarea
      className={ClassJoin([style.textArea, error && style.error])}
      ref={ref}
      style={{ resize: 'vertical' }}
      rows={5}
      {...rest}
    />
  )
});


export default TextArea;


