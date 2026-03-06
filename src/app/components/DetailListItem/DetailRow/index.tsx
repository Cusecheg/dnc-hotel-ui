
type DetailRowProps = {
    title: string;
    description: string;
    className?: string;
}


const DetailRow = ({ title, description, className }: DetailRowProps) => {
    return(
        <div className={`flex flex-col w-full justify-between gap-0 font-bold lg:flex-row lg:gap-4  ${className}`}>
            <span >{title}</span>
            <span >{description}</span>
        </div>
    )
}

export default DetailRow;