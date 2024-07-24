import { Link, Head } from "@inertiajs/react";
import EventCard from "@/Components/EventCard";
import EventCardOwner from "@/Components/EventCardOwner";
import { useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";

interface PaginatedEvents {
    data: {
        id: number;
        title: string;
        start_date: string;
        end_date: string;
        main_image: string;
        location: { city: string; state: string };
    }[];
    prev_page_url: string | null;
    current_page: number;
    next_page_url: string | null;
    path: string;
}

interface UserEventsProps {
    auth: any;
    createdEvents: PaginatedEvents;
    participatingEvents: PaginatedEvents;
}

export default function UserEvents({
    auth,
    createdEvents,
    participatingEvents,
}: UserEventsProps) {
    const {
        prev_page_url: prevCreatedPageUrl,
        current_page: currentCreatedPage,
        next_page_url: nextCreatedPageUrl,
        path: path,
    } = createdEvents;
    const {
        prev_page_url: prevParticipatingPageUrl,
        current_page: currentParticipatingPage,
        next_page_url: nextParticipatingPageUrl,
    } = participatingEvents;

    const [isNavigating, setIsNavigating] = useState(false);

    const handleNavigationClick = () => {
        setIsNavigating(true);
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="My Events" />
            <div>
                <div className="flex flex-col items-center pt-4">
                    <h1 className="font-actor text-3xl m-4 w-11/12 text-left">
                        Eventos Criados
                    </h1>
                    <div className="bg-gray-300 h-96 w-11/12 rounded-2xl mt-2 mb-4 flex flex-col justify-center">
                        <div className="flex flex-wrap gap-8 justify-center">
                            {createdEvents.data.map((event) => (
                                <EventCardOwner event={event} key={event.id} />
                            ))}
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Link
                                href={
                                    prevCreatedPageUrl
                                        ? `${path}?created_page=${
                                              currentCreatedPage - 1
                                          }&participating_page=${currentParticipatingPage}`
                                        : "#"
                                }
                                disabled={!prevCreatedPageUrl || isNavigating}
                                className="p-2 bg-white disabled:opacity-70"
                                as="button"
                                preserveScroll={true}
                                onClick={handleNavigationClick}
                            >
                                Prev
                            </Link>
                            <span className="p-2 bg-white">
                                {currentCreatedPage}
                            </span>
                            <Link
                                href={
                                    nextCreatedPageUrl
                                        ? `${path}?created_page=${
                                              currentCreatedPage + 1
                                          }&participating_page=${currentParticipatingPage}`
                                        : "#"
                                }
                                disabled={!nextCreatedPageUrl || isNavigating}
                                className="p-2 bg-white disabled:opacity-70"
                                as="button"
                                preserveScroll={true}
                                onClick={handleNavigationClick}
                            >
                                Next
                            </Link>
                        </div>
                    </div>

                    <h2 className="font-actor text-3xl m-4 w-11/12 text-left">
                        Eventos que participo
                    </h2>
                    <div className="bg-gray-300 h-96 w-11/12 rounded-2xl mt-1 mb-4 flex flex-col justify-center">
                        <div className="flex flex-wrap gap-8 justify-center">
                            {participatingEvents.data.map((event) => (
                                <EventCard event={event} key={event.id} />
                            ))}
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Link
                                href={
                                    prevParticipatingPageUrl
                                        ? `${path}?created_page=${currentCreatedPage}&participating_page=${
                                              currentParticipatingPage - 1
                                          }`
                                        : "#"
                                }
                                disabled={
                                    !prevParticipatingPageUrl || isNavigating
                                }
                                className="p-2 bg-white disabled:opacity-70"
                                as="button"
                                preserveScroll={true}
                                onClick={handleNavigationClick}
                            >
                                Prev
                            </Link>
                            <span className="p-2 bg-white">
                                {currentParticipatingPage}
                            </span>
                            <Link
                                href={
                                    nextParticipatingPageUrl
                                        ? `${path}?created_page=${currentCreatedPage}&participating_page=${
                                              currentParticipatingPage + 1
                                          }`
                                        : "#"
                                }
                                disabled={
                                    !nextParticipatingPageUrl || isNavigating
                                }
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
        </Authenticated>
    );
}
