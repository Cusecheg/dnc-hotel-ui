import ClientHeader from "@/app/ClientHeader";



export default function Layout ({ children }: { children: React.ReactNode }) {
    return (
    <>  
            <ClientHeader/>
            <main className='w-full flex justify-center align-middle'>
                {children}
            </main>
            <footer className='w-full flex justify-center p-6 border-t border-t-light-grey-400'>
                2024 DNC Hotel. All rights reserved.
            </footer>

    </>
    );
}