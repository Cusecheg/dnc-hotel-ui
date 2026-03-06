import { InputHTMLAttributes } from "react";



type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    className?: string;
    error?: string;
}

const TextField = ({id, label, type = 'text', className, error, ...props}: TextFieldProps) => {
    const defaultStyle = " border border-light-grey-600 rounded-lg w-full px-4 py-2";
    const errorStyle = "border-red-500";
    return (
        <div className={ `w-full ${className}`}>
            <label htmlFor={id} className="sr-only">{label}</label>
            <input id={id} type={type} className={`${defaultStyle} ${error ? errorStyle : ''}`} placeholder={label} {...props} />
            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    )
}

export default TextField;
