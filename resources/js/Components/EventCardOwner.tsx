import { Link, Head } from "@inertiajs/react";
import Clock from "./Icons/Clock";
import MapPin from "./Icons/MapPin";
import EditPencil from "./Icons/EditPencil";

interface EventCardProps {
    event: {
        id: number;
        title: string;
        start_date: string;
        end_date: string;
        main_image: string;
        location: { city: string; state: string };
    };
}

export default function EventCardOwner({ event }: EventCardProps) {
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

    const endDate = new Date(event.end_date);

    const hasEnded = new Date() > endDate;

    const truncateTitle = (title: string, maxLength: number) => {
        return title.length > maxLength
            ? title.substring(0, maxLength) + "..."
            : title;
    };

    return (
        <Link href={`/event/${event.id}`} className={`w-72`}>
            <div className="h-28 w-full overflow-hidden rounded-t-lg">
                <img
                    src={"/storage/" + event.main_image}
                    alt={event.title}
                    className="w-full"
                />
            </div>
            <div className="bg-white rounded-b-lg">
                <div className="mb-1 pl-4 py-4 relative">
                    <h1 className="font-semibold text-2xl">
                        {truncateTitle(event.title, 18)}
                    </h1>

                    <Link
                        href={`/event/${event.id}/edit`}
                        className="absolute top-[-1rem] right-4"
                    >
                        <EditPencil className="bg-gray-800 rounded-full" />
                    </Link>
                </div>
            </div>
        </Link>
    );
}
