import React from "react"
import Button from "~/components/ui/Button/Button";
import Typography from "~/components/ui/Typography/Typography"
import style from './chartDetailsModal.module.scss'


interface Props {
    handleClose?: React.MouseEventHandler<HTMLButtonElement>;
}
export const ChartDetailsModal: React.FC<Props> = ({ handleClose }) => {
    return (
        <>
            <Typography component="h4">
                <p>Dados do Gráfico</p>
            </Typography>
            <div className={style.buttonsArea}>
                <Button color="danger" text={"Fechar"} onClick={handleClose} />
            </div>
        </>
    )
}