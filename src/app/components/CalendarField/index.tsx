import React from "react"


type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string | null;
}

const defaultStyle = "border border-light-grey-600 rounded-lg w-full px-4 py-2"
const errorStyle = "border border-red-500"


const CalendarField = ({ className, label, id, name, min, error, ...props }: TextFieldProps) => {
    return (
        <div className={className}>
            <label htmlFor={id}>{label}</label>
            <input 
            type="date" 
            id={id}
            name={name}
            aria-label={label}
            min={min}
            className={error ? errorStyle : defaultStyle}
            {...props}
            ></input>
        </div>
    )
}

export default CalendarField;