import React, { useEffect, useState } from "react";

//Import components
import Icon from "../../Icon/Icon";
import { Grid } from "../../Layout/Grid";
import TextInput from "../TextInput";

//Import types
import { SpacingPatternType } from "~/types/global/SpacingType";

import style from "./multiTextInput.module.scss";
export interface Params {
    key: string;
    value: string;
}

export interface MultiTextInputPropsDouble {
    name?: string;
    onChange?: (value: Params[]) => void;
    value?: Params[];
    required?: boolean;
    error?: boolean;
    spacing?: SpacingPatternType;
}

const MultiDoubleTextInput: React.FC<MultiTextInputPropsDouble> = ({
    name,
    error,
    onChange,
    required,
    spacing,
    value,
}) => {
    const [inputs, setInputs] = useState<Params[]>([{
        key: '',
        value: '',
    }]);

    useEffect(() => {
        if (value?.length > 0) setInputs(value);
    }, [value]);

    function handleChange(event, index, className) {
        const inputsArray = [...inputs];
        if(className === 'value'){
            inputsArray[index].value = event.target.value;
        }
        if(className === 'key'){
            inputsArray[index].key = event.target.value;
        }
        setInputs(inputsArray);
        if (onChange) onChange(inputsArray);
    }

    function handleAddField() {
        setInputs([...inputs, {
            key: '',
            value: ''
        }]);
    }

    function handleRemoveField(index) {
        let values = [...inputs];
        values.splice(index, 1);
        setInputs(values);
        if (onChange) onChange(values);
    }

    let spaceDefault = "xg" as SpacingPatternType;

    return (
        <Grid container spacing={spacing || spaceDefault}>
            {inputs?.map((inputValue, index) => (
                <Grid container>
                    <Grid md={10}>
                        <TextInput
                            name={name}
                            value={inputValue.value}
                            error={error}
                            onChange={(e) => handleChange(e, index, 'value')}
                        />
                    </Grid>
                    <Grid md={2}>
                        <div className={style.multiTextInputButtonGroup}>
                            <a
                                className={style.multiTextInputButton}
                                onClick={handleAddField}
                                title="Adicionar"
                            >
                                <Icon type="FaPlus" />
                            </a>
                            {index !== 0 && (
                                <a
                                    className={style.multiTextInputButton}
                                    onClick={() => handleRemoveField(index)}
                                    title="Remover"
                                >
                                    <Icon type="FaMinus" />
                                </a>
                            )}
                        </div>
                    </Grid>
                    <Grid md={10}>
                        <div className={style.textInputValue}>
                            <TextInput
                                name={name}
                                value={inputValue.key}
                                error={error}
                                onChange={(e) => handleChange(e, index, 'key')}
                            />
                        </div>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
};

export default MultiDoubleTextInput;
