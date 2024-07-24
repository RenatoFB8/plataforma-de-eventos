import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import EditEventForm from "./Partials/EditEventForm";

export default function Create({ auth, event }: PageProps) { 
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Criar Evento
                </h2>
            }
        >
            <Head title="Criar Evento" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <EditEventForm event={event} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
