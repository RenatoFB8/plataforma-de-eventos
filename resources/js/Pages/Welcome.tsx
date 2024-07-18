import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />
            <div className="">
                <div className="flex justify-between p-3">
                    <div className='ml-6 '>
                    <Link
                            href={route('dashboard')}
                            className="font-aclonica text-4xl"
                        >
                            Laravent
                        </Link>
                    </div>
                    <div className='mr-6 flex items-center gap-4'>
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                            >
                                Register
                            </Link>
                        </>
                    )}
                    </div>
                </div>
                <div className='flex flex-col items-center pt-12'> 
                    <h1>Bem Vindo ao Laravent a sua plataforma de eventos!</h1>
                    <h3>No laravent você consegue o ingresso do seu evento favorito, e criar seu próprio evento</h3>
                    <h3>Crie sua conta já</h3>
                    <div className='bg-gray-500 h-96 w-11/12 rounded-2xl mt-12'>
                    <p>espaço reservado para os ultimos eventos</p>
                    </div>
                </div>
            </div>
            
        </>
    );
}
