import { Link, Head } from "@inertiajs/react";
import FaSolidTheaterMasks from "@/Components/Icons/mask";
import WpfGuitar from "@/Components/Icons/guitar";
import FluentMicSparkle20Filled from "@/Components/Icons/mic";
import RiPresentationLine from "@/Components/Icons/presentation";
import DashiconsAirplane from "@/Components/Icons/plane";
import GameIconsCarousel from "@/Components/Icons/carousel";
import EventCard from "@/Components/EventCard";
import { useState } from "react";

interface PaginatedEvents {
    data: {
        id: number;
        title: string;
        start_date: string;
        end_date: string;
        main_image: string;
        location: { city: string; state: string };
    }[];
    prev_page_url: string;
    current_page: number;
    next_page_url: string;
}

interface WelcomeProps {
    auth: any;
    events: PaginatedEvents;
}

export default function Welcome({ auth, events }: WelcomeProps) {
    const { prev_page_url, current_page, next_page_url } = events;
    const [isNavigating, setIsNavigating] = useState(false);

    const handleNavigationClick = () => {
        setIsNavigating(true);
    };

    return (
        <>
            <Head title="Welcome" />
            <div>
                <div className="flex justify-between p-3">
                    <div className="ml-6">
                        <Link
                            href={route("dashboard")}
                            className="font-aclonica text-4xl"
                        >
                            Laravent
                        </Link>
                    </div>
                    <div className="mr-6 flex items-center gap-4">
                        {auth.user ? (
                            <Link href={route("dashboard")}>Dashboard</Link>
                        ) : (
                            <>
                                <Link href={route("login")}>Entrar</Link>
                                <Link href={route("register")}>
                                    Cadastre-se
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-center pt-4">
                    <h1 className="font-actor text-3xl m-8">
                        Bem Vindo ao Laravent a sua plataforma de eventos!
                    </h1>
                    <div className="flex mt-6 gap-2">
                        <div
                            id="card"
                            className="flex flex-col items-center my-4 w-48"
                        >
                            <div className="bg-gray-300 h-20 w-24 flex justify-center items-center rounded-full">
                                <FaSolidTheaterMasks />
                            </div>
                            <p className="p-2">Teatro e espetáculos</p>
                        </div>
                        <div
                            id="card"
                            className="flex flex-col items-center my-4 w-48"
                        >
                            <div className="bg-gray-300 h-20 w-24 flex justify-center items-center rounded-full">
                                <WpfGuitar />
                            </div>
                            <p className="p-2">Festas e Shows</p>
                        </div>
                        <div
                            id="card"
                            className="flex flex-col items-center my-4 w-48"
                        >
                            <div className="bg-gray-300 h-20 w-24 flex justify-center items-center rounded-full">
                                <FluentMicSparkle20Filled />
                            </div>
                            <p className="p-2">Stand-up Comedy</p>
                        </div>
                        <div
                            id="card"
                            className="flex flex-col items-center my-4 w-48"
                        >
                            <div className="bg-gray-300 h-20 w-24 flex justify-center items-center rounded-full">
                                <RiPresentationLine />
                            </div>
                            <p className="p-2">Congressos e Palestras</p>
                        </div>
                        <div
                            id="card"
                            className="flex flex-col items-center my-4 w-48"
                        >
                            <div className="bg-gray-300 h-20 w-24 flex justify-center items-center rounded-full">
                                <DashiconsAirplane />
                            </div>
                            <p className="p-2">Congressos e Palestras</p>
                        </div>
                        <div
                            id="card"
                            className="flex flex-col items-center my-4 w-48"
                        >
                            <div className="bg-gray-300 h-20 w-24 flex justify-center items-center rounded-full">
                                <GameIconsCarousel />
                            </div>
                            <p className="p-2">Infantil</p>
                        </div>
                    </div>
                    <h3 className="font-actor text-2xl m-6">
                        No Laravent você consegue o ingresso do seu evento
                        favorito, e criar seu próprio evento
                    </h3>
                    <div className="bg-gray-300 h-96 w-11/12 rounded-2xl mt-2 mb-4 flex flex-col justify-center">
                        <div className="flex flex-wrap gap-8 justify-center">
                            {events.data.map((event) => (
                                <EventCard event={event} key={event.id} />
                            ))}
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Link
                                href={prev_page_url || "#"}
                                disabled={!prev_page_url || isNavigating}
                                className="p-2 bg-white disabled:opacity-70"
                                as="button"
                                preserveScroll={true}
                                onClick={handleNavigationClick}
                            >
                                Prev
                            </Link>
                            <span className="p-2 bg-white">{current_page}</span>
                            <Link
                                href={next_page_url || "#"}
                                disabled={!next_page_url || isNavigating}
                                className="p-2 bg-white disabled:opacity-70"
                                as="button"
                                preserveScroll={true}
                                onClick={handleNavigationClick}
                            >
                                Next
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
