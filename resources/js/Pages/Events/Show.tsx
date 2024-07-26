import { Link, Head, useForm, usePage } from "@inertiajs/react";
import Clock from "@/Components/Icons/Clock";
import MapPin from "@/Components/Icons/MapPin";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import { useState, useEffect } from "react";
import HeaderLayout from "@/Layouts/HeaderLayout";

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
        user_id: number;
        participants: string[];
    };
}

export default function Show({ auth, event }: ShowProps) {
    const { post, processing, errors } = useForm();
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [openParticipantsModal, setOpenParticipantsModal] = useState(false);

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
        <HeaderLayout user={auth.user}>
            <Head title="Evento" />
            <div>
                <section className="flex flex-col items-center w-full">
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
                            <div className="mb-1  py-1">
                                <h1 className="font-semibold text-2xl">
                                    {event.title}
                                </h1>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-6" />
                                <p>
                                    {formattedStartDate} até {formattedEndDate}
                                </p>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="w-6" />
                                <p>
                                    {event.location.street},{" "}
                                    {event.location.street_number} -{" "}
                                    {event.location.city} -{" "}
                                    {event.location.state}
                                </p>
                            </div>
                            <div className="mb-1  py-1">
                                <h1 className="font-semibold text-xl">
                                    Descrição do evento
                                </h1>
                                <p>{event.description}</p>
                            </div>
                        </div>
                        <div>
                            <div className="bg-gray-300 p-8 font-semibold text-lg rounded-lg">
                                {auth.user.id === event.user_id ? (
                                    <>
                                        <PrimaryButton
                                            className="mx-auto"
                                            onClick={() =>
                                                setOpenParticipantsModal(true)
                                            }
                                        >
                                            Ver participantes
                                        </PrimaryButton>
                                    </>
                                ) : (
                                    <>
                                        <h1>
                                            Valor de entrada:{" "}
                                            {event.entry_price}
                                        </h1>
                                        <PrimaryButton
                                            className="mx-auto"
                                            onClick={handleParticipation}
                                            disabled={
                                                isParticipatingDisabled ||
                                                processing
                                            }
                                        >
                                            {isParticipatingDisabled
                                                ? "Limite atingido"
                                                : processing
                                                ? "Processando..."
                                                : "Participar"}
                                        </PrimaryButton>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <h1 className="font-semibold text-xl w-4/5 text-left">
                        Imagens do local do evento
                    </h1>
                    <div className="bg-gray-300 w-4/5 p-8 mb-4 flex flex-wrap gap-8 justify-center rounded-lg">
                        {event.location_images.map((image, index) => (
                            <img
                                key={index}
                                src={"/storage/" + image}
                                className="w-64 h-40"
                                alt={`${event.title} location image`}
                            />
                        ))}
                    </div>
                </section>
                <Modal show={openParticipantsModal} maxWidth="sm">
                    <div className="relative w-full">
                        <button
                            className="absolute top-2 right-4 text-red-500 font-semibold"
                            onClick={() => setOpenParticipantsModal(false)}
                        >
                            X
                        </button>
                        <div className="p-4 h-40 ">
                            <h1 className="text-1xl font-semibold">
                                Participantes:
                            </h1>
                            <div className="pl-2 h-28 overflow-y-auto">
                                {event.participants.map(
                                    (participant, index) => (
                                        <p key={index}>• {participant}</p>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </HeaderLayout>
    );
}
