
type Options = {
    label: string;
    value: string;
    id: string;
}


type RadioGroupProps = {
 options:  Options[];
 name: string;
 label: string;
 className?: string;
}



const RadioGroup = ({options, name, label, className }: RadioGroupProps) => {
    return (
    <fieldset className={className}>
        <legend>{label}</legend>
        <div className="flex">
            {options.map(({value, label, id}) => {
                return (
                    <div key={`${value}-id`}  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex justify-center items-center align-middle">
                        <input 
                        type="radio"
                        value={value}
                        id={id}
                        name={name}
                        required
                        className="w-4 h-4 accent-blue-600"
                         />
                        <label htmlFor={id} className="ms-2 text-sm font-medium text-black">
                            {label}
                        </label>
                    </div>
                )
            })}
        </div>
    </fieldset>
    )
} 




export default RadioGroup;
