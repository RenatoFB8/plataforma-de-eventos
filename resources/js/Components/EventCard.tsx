import { Link, Head } from "@inertiajs/react";
import Clock from "./Icons/Clock";
import MapPin from "./Icons/MapPin";

interface EventCardProps {
    event: {
        id: number;
        title: string;
        start_date: string;
        main_image: string;
        location: { city: string; state: string };
    };
}

export default function EventCard({ event }: EventCardProps) {
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    };

    const startDate = new Date(event.start_date);
    const formattedDate = startDate
        .toLocaleString("pt-BR", dateOptions)
        .replaceAll(",", "");

    const truncateTitle = (title: string, maxLength: number) => {
        return title.length > maxLength
            ? title.substring(0, maxLength) + "..."
            : title;
    };

    return (
        <div className={`w-60`}>
            <div className="h-28 w-full overflow-hidden rounded-t-lg">
                <img
                    src={"/storage/" + event.main_image}
                    alt={event.title}
                    className="w-full"
                />
            </div>
            <div className="bg-white rounded-b-lg h-32">
                <div className="mb-1 border-b border-black pl-4 py-1">
                    <h1 className="font-semibold text-2xl">
                        {truncateTitle(event.title, 16)}
                    </h1>
                </div>
                <div className="flex items-center gap-1 pl-4">
                    <Clock className="w-6" />
                    <p>{formattedDate}</p>
                </div>
                <div className="flex items-center gap-1 pl-4">
                    <MapPin className="w-6" />
                    <p>{event.location.city} - {event.location.state}</p>
                </div>
            </div>
        </div>
    );
}
