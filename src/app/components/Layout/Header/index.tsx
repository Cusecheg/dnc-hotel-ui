'use client';
import { signOut, useSession } from "next-auth/react";
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import Button from "../../Button";



const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    const { data } = useSession();
    const user = data?.user


    const headerStyle = user ? 'justify-between px-20' : 'justify-center px-0';
    const menuStyle = showMenu ? '' : 'sr-only';

    const logout = () => {
        signOut({ redirect: true, callbackUrl: '/login' }).then(() => {
            setShowMenu(false);
        })
    }

    return(
    <header className={`w-full flex items-center py-5 border-b border-b-light-grey-400 ${headerStyle}`}>
        <Link href="/">
            <Image
                src="/logo-dnc.png"
                alt="Logo Escola DNC"
                width={40}
                height={40}
            />
        </Link>
        {
            user && (
                <div>
                    <div className="flex border border-light-grey-400 py-1 px-2 rounded-full cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
                        <Image
                            src="/menu.svg"
                            alt="Menu"
                            width={33}
                            height={33}
                        />
                        <Image
                            src={data?.user.avatar ? `/uploads/avatars/${data.user.avatar}` : '/default-profile.jpg'  }
                            alt={`Imagen de ${data?.user.name}`}
                            width={33}
                            height={33}
                            className="rounded-full w-9 h-9 object-cover ml-2"
                        />
                    </div>
                </div>
            )
        }
        {
            showMenu && (
                <nav className={`absolute px-8 py-6 bg-white rounded-2xl shadow-lg right-10 top-18 ${menuStyle}`}>
                    <ul className="font-medium">
                        <li>
                            <Link href="/perfil">Meu Perfil</Link>
                        </li>
                        <li className="mt-4">
                            <Link href="/reservas">Minhas reservas</Link>
                        </li>
                        <hr className="mt-4"/>
                        <li className="flex justify-center text-center mt-4">
                            <Button appearance="secondary" className="py-0 px-0" onClick={logout}>Sair</Button>
                        </li>

                    </ul>
                </nav>
            )
        }
    </header>
    )
}

export default Header