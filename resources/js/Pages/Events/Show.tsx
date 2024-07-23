import { Link, Head, useForm, usePage } from "@inertiajs/react";
import Clock from "@/Components/Icons/Clock";
import MapPin from "@/Components/Icons/MapPin";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState, useEffect } from "react";

interface ShowProps {
    auth: any;
    event: {
        id: number;
        title: string;
        description: string;
        start_date: string;
        end_date: string;
        max_participants: number;
        entry_price: string;
        main_image: string;
        location_images: string[];
        users_count: number;
        location: {
            city: string;
            state: string;
            street: string;
            street_number: string;
        };
    };
}

export default function Show({ auth, event }: ShowProps) {
    const { post, processing, errors } = useForm();
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const dateOptions: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };

    const formatCustomDate = (dateString: string): string => {
        const date = new Date(dateString);

        const parts = new Intl.DateTimeFormat(
            "pt-BR",
            dateOptions
        ).formatToParts(date);

        const datePartsMap = parts.reduce((acc, part) => {
            acc[part.type] = part.value;
            return acc;
        }, {} as Record<string, string>);

        const formattedDate = `${datePartsMap.day} ${datePartsMap.month} - ${datePartsMap.year} • ${datePartsMap.hour}:${datePartsMap.minute}`;

        return formattedDate;
    };

    const handleParticipation = async () => {
        post(route("events.participate", event.id), {
            onSuccess: () => {
                setFeedbackMessage("Inscrição realizada com sucesso.");
                setTimeout(() => {
                    setFeedbackMessage("");
                }, 3000);
            },
            onError: (error) => {
                const messages = Object.values(error);
                setFeedbackMessage(messages[0]);
                setTimeout(() => {
                    setFeedbackMessage("");
                }, 3000);
            },
        });
    };

    const formattedStartDate = formatCustomDate(event.start_date);
    const formattedEndDate = formatCustomDate(event.end_date);

    const isParticipatingDisabled = event.max_participants <= event.users_count;

    return (
        <>
            <Head title="Evento" />
            <div>
                <div className="flex justify-between p-3 w-full">
                    <div className="ml-6">
                        <Link
                            href={route("event.index")}
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
                <section className="flex flex-col items-center pt-4 w-full">
                    {feedbackMessage && (
                        <div
                            className={`p-4 rounded mb-4 fixed top-2 ${
                                feedbackMessage.includes("sucesso")
                                    ? "bg-green-500 text-white"
                                    : "bg-red-500 text-white"
                            }`}
                        >
                            {feedbackMessage}
                        </div>
                    )}
                    <div className="w-full h-96 bg-gray-300 flex justify-center">
                        <img
                            src={"/storage/" + event.main_image}
                            alt={event.title}
                            className="w-4/5"
                        />
                    </div>

                    <div className="flex justify-between w-4/5 mt-8">
                        <div>
                            <div className="mb-1  pl-4 py-1">
                                <h1 className="font-semibold text-2xl">
                                    {event.title}
                                </h1>
                            </div>
                            <div className="flex items-center gap-1 pl-4">
                                <Clock className="w-6" />
                                <p>
                                    {formattedStartDate} até {formattedEndDate}
                                </p>
                            </div>
                            <div className="flex items-center gap-1 pl-4">
                                <MapPin className="w-6" />
                                <p>
                                    {event.location.street},{" "}
                                    {event.location.street_number} -{" "}
                                    {event.location.city} -{" "}
                                    {event.location.state}
                                </p>
                            </div>
                            <div className="mb-1  pl-4 py-1">
                                <h1 className="font-semibold text-xl">
                                    Descrição do evento
                                </h1>
                                <p>{event.description}</p>
                            </div>
                        </div>
                        <div>
                            <div className="bg-gray-300 p-8 font-semibold text-lg rounded-lg">
                                <h1>Valor de entrada: {event.entry_price}</h1>
                                <PrimaryButton
                                    className="mx-auto"
                                    onClick={handleParticipation}
                                    disabled={
                                        isParticipatingDisabled || processing
                                    }
                                >
                                    {isParticipatingDisabled
                                        ? "Limite atingido"
                                        : processing
                                        ? "Processando..."
                                        : "Participar"}
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-300 w-4/5 p-8 flex flex-wrap gap-8 justify-center rounded-lg">
                        {event.location_images.map((image, index) => (
                            <img
                                key={index}
                                src={"/storage/" + image}
                                className="w-64"
                                alt={`${event.title} location image`}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
