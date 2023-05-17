import React from 'react';
import Flexbox from '../../Layout/Flexbox/Flexbox';
import Popup, { PopupProps } from '../../Popup';
import Typography from '../../Typography/Typography';
import Loading from '../Loading';

interface PopupLoadingProps extends PopupProps {
  text?: string,
}

const PopupLoading: React.FC<PopupLoadingProps> = ({ maxWidth, text = "Espere um segundo! Carregando informações...", ...rest }) => {
  return (
    <Popup maxWidth='xs' {...rest}>
      <Flexbox align='center' justify='center' flexDirection='column'>
        <Loading type='spin' />
        <Typography component='h4' align="center" color='primary'>{text}</Typography>
      </Flexbox>
    </Popup>
  );
}

export default PopupLoading;