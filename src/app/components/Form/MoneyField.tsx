import { NumericFormat } from "react-number-format"
import TextField from "./TextField"
import { useState } from "react"


const MoneyField = ({
    label,
    error,
    defaultValue,
    ...props
}: any) => {
    const [price, setPrice] = useState<number>(defaultValue);
    return(
        <>
        <NumericFormat 
        customInput={TextField}
        label={label}
        error={error}
        prefix="R$"
        decimalScale={2}
        decimalSeparator=","
        thousandSeparator="."
        defaultValue={defaultValue}
        {...props}
        onValueChange={(values) => {
            if(values.floatValue){
                setPrice(values.floatValue)
            }
        }}
        />
        <input type="hidden" id="price" name="price" value={price}/>
        </>
    )
}

export default MoneyField