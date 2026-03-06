


type AlertProps = {
    type?: 'success' | 'error';
    children?: React.ReactNode | string;
}


const getStylesByAlertType = ( alertType: AlertProps['type'] ) => ({
    success: "bg-green-300",
    error: "bg-red-300",
})[alertType || 'success'];

const defaultAlertStyles = "w-full flex justify-center py-2 px-4 rounded-lg my-4 text-black font-medium";

const Alert = ({ type, ...props }: AlertProps) => {
    return <span className={`${getStylesByAlertType(type)} ${defaultAlertStyles}`} {...props}/>;
};


export default Alert;