import { Role, User } from "@/types/User";
import Image from "next/image";

type UserDetailsProps = {
    user: User;
    role: Role;
}

const UserDetails = ({ user, role }: UserDetailsProps) => {

    return(
        <>
           <div className="mt-4 flex">
                    <Image
                        src={user.avatar ? `/uploads/avatars/${user.avatar}` : '/default-profile.jpg'}
                        alt={`Foto do anfitrião ${user.name}`}
                        width={56}
                        height={56}
                        className="rounded-full w-14 h-14 object-cover"
                    />
                    <div className="flex flex-col ml-2 justify-center">
                        <b>{role === "ADMIN" ? "Solicitante:" : "Anfitriã(o):"} {user.name}</b>
                        <span className="font-medium">Desde {user.createdAt ? new Date(user.createdAt).getFullYear() : 'N/A'}</span>
        
                    </div>
                </div>
        </>
    )
}

export default UserDetails;