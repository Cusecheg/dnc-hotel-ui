import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProfile } from "@/app/api/users/actions";
import Link from "@/app/components/Link";
import UserForm from "@/app/components/UserForm";
import { User } from "@/types/User";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const EditarPage = async () => {
    const session = await getServerSession(authOptions);

    if(!session?.user) redirect('/login');

    const { user } = await getProfile()

    return(
        <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
            <span className="my-5">Editar Perfil</span>
            <UserForm user={user} avatar />
            <Link href="/perfil" className="mt-2 justify-center text-blue-500">
                Voltar
            </Link>
        </section >
    )
}

export default EditarPage;