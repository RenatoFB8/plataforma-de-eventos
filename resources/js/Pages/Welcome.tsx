import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import FaSolidTheaterMasks from '@/Components/Icons/mask';
import WpfGuitar from '@/Components/Icons/guitar';
import FluentMicSparkle20Filled from '@/Components/Icons/mic';
import RiPresentationLine from '@/Components/Icons/presentation';
import DashiconsAirplane from '@/Components/Icons/plane';
import GameIconsCarousel from '@/Components/Icons/carousel';

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />
            <div>
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
                                Entrar
                            </Link>

                            <Link
                                href={route('register')}
                            >
                                Cadastre-se
                            </Link>
                        </>
                    )}
                    </div>
                </div>
                <div className='flex flex-col items-center pt-4'> 
                    <h1 className='font-actor text-3xl m-8'>Bem Vindo ao Laravent a sua plataforma de eventos!</h1>
                    <div  className='flex mt-6 gap-2'>
                        <div id='card' className='flex flex-col items-center my-4 w-48'>
                            <div className='bg-gray-300 h-20 w-24 flex justify-center items-center rounded-full'>
                                <FaSolidTheaterMasks />
                            </div>
                            <p className='p-2'>Teatro e espetáculos</p>
                        </div>
                        <div id='card' className='flex flex-col items-center my-4 w-48'>
                            <div className='bg-gray-300 h-20 w-24 flex justify-center items-center rounded-full'>
                                <WpfGuitar />
                            </div>
                            <p className='p-2'>Festas e Shows</p>
                        </div>
                        <div id='card' className='flex flex-col items-center my-4 w-48'>
                            <div className='bg-gray-300 h-20 w-24 flex justify-center items-center rounded-full'>
                                <FluentMicSparkle20Filled />
                            </div>
                            <p className='p-2'>Stand-up Comedy</p>
                        </div>
                        <div id='card' className='flex flex-col items-center my-4 w-48'>
                            <div className='bg-gray-300 h-20 w-24 flex justify-center items-center rounded-full'>
                                <RiPresentationLine />
                            </div>
                            <p className='p-2'>Congressos e Palestras</p>
                        </div>
                        <div id='card' className='flex flex-col items-center my-4 w-48'>
                            <div className='bg-gray-300 h-20 w-24 flex justify-center items-center rounded-full'>
                                <DashiconsAirplane />
                            </div>
                            <p className='p-2'>Congressos e Palestras</p>
                        </div>
                        <div id='card' className='flex flex-col items-center my-4 w-48'>
                            <div className='bg-gray-300 h-20 w-24 flex justify-center items-center rounded-full'>
                                <GameIconsCarousel />
                            </div>
                            <p className='p-2'>Infantil</p>
                        </div>
                    </div>
                    <h3 className='font-actor text-2xl m-6'>No laravent você consegue o ingresso do seu evento favorito, e criar seu próprio evento</h3>
                    <div className='bg-gray-500 h-96 w-11/12 rounded-2xl mt-12'>
                    <p>espaço reservado para os ultimos eventos</p>
                    </div>
                </div>
            </div>
            
        </>
    );
}
