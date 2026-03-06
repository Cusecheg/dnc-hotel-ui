import NextLink, { LinkProps as NextLinkProps } from 'next/link';

type LinkProps = NextLinkProps & {
    children: React.ReactNode;
    className?: string;
};

const Link = ({ className = '', ...props }: LinkProps) => {

    return (
        <NextLink {...props} className={`${className} hover:underline hover:cursor-pointer flex`} />
    );
};

export default Link;