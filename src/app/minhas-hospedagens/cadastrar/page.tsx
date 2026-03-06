import HotelForm from "@/app/components/HotelForm";
import Link from "@/app/components/Link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const CadastrarHotelPage = async () => {
    const session = await getServerSession();

    if(!session?.user) redirect('/login');

  return (
    <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Nova Hospedagem</span>
      <HotelForm />
      <Link href="/minhas-hospedagens" className="text-blue-500">Voltar</Link>
    </section>
  );
};

export default CadastrarHotelPage;