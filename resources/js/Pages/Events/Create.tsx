import HeaderLayout from "@/Layouts/HeaderLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import CreateEventForm from "./Partials/CreateEventForm";

export default function Create({ auth }: PageProps) {
    return (
        <HeaderLayout
            user={auth.user}
        >
            <Head title="Criar Evento" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <CreateEventForm />
                    </div>
                </div>
            </div>
        </HeaderLayout>
    );
}
