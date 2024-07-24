import React, { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import axios from "axios";
import Modal from "@/Components/Modal";
import ImageIcon from "@/Components/Icons/Image";

interface EditEventFormData {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    max_participants: number | string;
    entry_price: number | string;
    main_image: File | null;
    location_images: (File | string)[];
    street: string;
    street_number: string;
    city: string;
    neighborhood: string;
    state: string;
    cep: string;
}

const MAX_LOCATION_IMAGES = 6;

const EditEventForm: React.FC<{ event: any }> = ({ event }) => {
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const { data, setData, processing, recentlySuccessful } =
        useForm<EditEventFormData>({
            title: event.title,
            description: event.description,
            start_date: event.start_date,
            end_date: event.end_date,
            max_participants: event.max_participants,
            entry_price: event.entry_price,
            main_image: event.main_image,
            location_images: event.location_images,
            street: event.location.street,
            street_number: event.location.street_number,
            city: event.location.city,
            neighborhood: event.location.neighborhood,
            state: event.location.state,
            cep: event.location.cep,
        });

    const { errors } = usePage().props;

    const [mainImagePreview, setMainImagePreview] = useState<string | null>(
        event.main_image ? `/storage/${event.main_image}` : null
    );
    const [locationImagePreviews, setLocationImagePreviews] = useState<
        string[]
    >(event.location_images.map((img: string) => `/storage/${img}`));

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setData("main_image", file);
        setMainImagePreview(file ? URL.createObjectURL(file) : null);
        e.target.value = "";
    };

    const handleLocationImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        const updatedFiles = [...data.location_images, ...files].slice(
            0,
            MAX_LOCATION_IMAGES
        );
        setData("location_images", updatedFiles);
        setLocationImagePreviews(
            updatedFiles.map((file) =>
                typeof file === "string"
                    ? `/storage/${file}`
                    : URL.createObjectURL(file)
            )
        );
        e.target.value = "";
    };

    const handleRemoveMainImage = () => {
        setData("main_image", null);
        setMainImagePreview(null);
    };

    const handleRemoveLocationImage = (index: number) => {
        const updatedFiles = [...data.location_images];

        updatedFiles.splice(index, 1);
        setData("location_images", updatedFiles);
        setLocationImagePreviews(
            updatedFiles.map((file) =>
                typeof file === "string"
                    ? `/storage/${file}`
                    : URL.createObjectURL(file)
            )
        );
    };

    const fetchAddressByCep = async (cep: string) => {
        try {
            const response = await axios.get(
                `https://viacep.com.br/ws/${cep}/json/`
            );
            const address = response.data;
            setData((prevData) => ({
                ...prevData,
                street: address.logradouro,
                neighborhood: address.bairro,
                city: address.localidade,
                state: address.uf,
            }));
        } catch (error) {
            console.error("Erro ao buscar o endereço:", error);
        }
    };

    const handleCepChange = (e: ChangeEvent<HTMLInputElement>) => {
        const cep = e.target.value;
        const filteredCep = cep.replaceAll("-", "");
        setData("cep", filteredCep);

        if (filteredCep.length === 8) {
            fetchAddressByCep(filteredCep);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.post(`/event/${event.id}`, {
            _method: "put",
            ...data,
        });
    };

    const handleOpenDeleteModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDeleteModalOpen(true);
    };

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDeleteModalOpen(false);
        router.delete(`/event/${event.id}`, {
            onError: (errors) => {
                const messages = Object.values(errors);
                setFeedbackMessage(messages[0]);
                setTimeout(() => {
                    setFeedbackMessage("");
                }, 3000);
            },
            onSuccess: () => {
                console.log("Delete succeeded");
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 px-8 pb-6 rounded-lg space-y-6"
        >
            {feedbackMessage && (
                <div
                    className={`p-4 rounded mb-4 fixed top-8 right-4 ${
                        feedbackMessage.includes("sucesso")
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                    }`}
                >
                    {feedbackMessage}
                </div>
            )}

            <div>
                <InputLabel htmlFor="title" value="Título" />
                <TextInput
                    id="title"
                    type="text"
                    className="mt-1 block w-3/5"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                />
                <InputError message={errors.title} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Descrição" />
                <textarea
                    id="description"
                    className="mt-1 block w-3/5"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="start_date" value="Data de Início" />
                <TextInput
                    id="start_date"
                    type="datetime-local"
                    className="mt-1 block w-3/5"
                    value={data.start_date}
                    onChange={(e) => setData("start_date", e.target.value)}
                />
                <InputError message={errors.start_date} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="end_date" value="Data de Término" />
                <TextInput
                    id="end_date"
                    type="datetime-local"
                    className="mt-1 block w-3/5"
                    value={data.end_date}
                    onChange={(e) => setData("end_date", e.target.value)}
                />
                <InputError message={errors.end_date} className="mt-2" />
            </div>

            <div>
                <InputLabel
                    htmlFor="max_participants"
                    value="Número Máximo de Participantes"
                />
                <TextInput
                    id="max_participants"
                    type="number"
                    className="mt-1 block w-3/5"
                    value={data.max_participants}
                    onChange={(e) =>
                        setData("max_participants", e.target.value)
                    }
                />
                <InputError
                    message={errors.max_participants}
                    className="mt-2"
                />
            </div>

            <div>
                <InputLabel htmlFor="entry_price" value="Preço de Entrada" />
                <TextInput
                    id="entry_price"
                    type="number"
                    step="0.01"
                    className="mt-1 block w-3/5"
                    value={data.entry_price}
                    onChange={(e) => setData("entry_price", e.target.value)}
                />
                <InputError message={errors.entry_price} className="mt-2" />
            </div>

            <div className="flex">
                <div>
                    <InputLabel
                        htmlFor="main_image"
                        value={`Imagens Principal (${
                            mainImagePreview ? 1 : 0
                        }/1)`}
                    />
                    <TextInput
                        id="main_image"
                        type="file"
                        accept="image/*"
                        className="mt-1 block w-3/5"
                        onChange={handleMainImageChange}
                        disabled={data.main_image !== null}
                    />
                    <InputError message={errors.main_image} className="mt-2 w-9/12" />
                </div>
                <div>
                    <h1>
                        Previa da imagem{" "}
                        {mainImagePreview && "(Clique para remover)"}
                    </h1>
                    {mainImagePreview ? (
                        <img
                            src={mainImagePreview}
                            alt="Main Preview"
                            className="mt-2 size-48 object-cover cursor-pointer"
                            onClick={handleRemoveMainImage}
                        />
                    ) : (
                        <div className="mt-2 size-48 border border-dashed border-black flex flex-col justify-center items-center bg-gray-200">
                            <ImageIcon className="w-12" />
                            Envie uma imagem
                        </div>
                    )}
                </div>
            </div>

            <div className="flex">
                <div>
                    <InputLabel
                        htmlFor="location_images"
                        value={`Imagens do Local (${locationImagePreviews.length}/${MAX_LOCATION_IMAGES})`}
                    />
                    <TextInput
                        id="location_images"
                        type="file"
                        accept="image/*"
                        className="mt-1 block w-3/5"
                        multiple
                        onChange={handleLocationImagesChange}
                        disabled={
                            locationImagePreviews.length >= MAX_LOCATION_IMAGES
                        }
                    />
                    <InputError
                        message={errors.location_images}
                        className="mt-2 w-9/12"
                    />
                </div>
                <div className="flex">
                    {locationImagePreviews.length > 0 ? (
                        locationImagePreviews.map((preview, index) => (
                            <img
                                key={index}
                                src={preview}
                                alt={`Location Preview ${index}`}
                                className="mt-2 size-24 object-cover cursor-pointer"
                                onClick={() => handleRemoveLocationImage(index)}
                            />
                        ))
                    ) : (
                        <div className="mt-2 size-24 border border-dashed border-black flex flex-col justify-center items-center bg-gray-200">
                            <ImageIcon className="w-8" />
                            <span className="text-[0.6rem]">
                                Envie uma imagem
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <InputLabel htmlFor="cep" value="CEP" />
                <TextInput
                    id="cep"
                    type="text"
                    className="mt-1 block w-3/5"
                    value={data.cep}
                    onChange={handleCepChange}
                    maxLength={8}
                />
                <InputError message={errors.cep} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="street" value="Rua" />
                <TextInput
                    id="street"
                    type="text"
                    className="mt-1 block w-3/5"
                    value={data.street}
                    onChange={(e) => setData("street", e.target.value)}
                />
                <InputError message={errors.street} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="street_number" value="Número" />
                <TextInput
                    id="street_number"
                    type="text"
                    className="mt-1 block w-3/5"
                    value={data.street_number}
                    onChange={(e) => setData("street_number", e.target.value)}
                />
                <InputError message={errors.street_number} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="neighborhood" value="Bairro" />
                <TextInput
                    id="neighborhood"
                    type="text"
                    className="mt-1 block w-3/5"
                    value={data.neighborhood}
                    onChange={(e) => setData("neighborhood", e.target.value)}
                />
                <InputError message={errors.neighborhood} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="city" value="Cidade" />
                <TextInput
                    id="city"
                    type="text"
                    className="mt-1 block w-3/5"
                    value={data.city}
                    onChange={(e) => setData("city", e.target.value)}
                />
                <InputError message={errors.city} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="state" value="Estado" />
                <TextInput
                    id="state"
                    type="text"
                    className="mt-1 block w-3/5"
                    value={data.state}
                    onChange={(e) => setData("state", e.target.value)}
                />
                <InputError message={errors.state} className="mt-2" />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Salvar</PrimaryButton>
                {recentlySuccessful && (
                    <p className="text-sm text-gray-600">Salvo com sucesso!</p>
                )}
                <PrimaryButton onClick={handleOpenDeleteModal}>
                    Apagar Evento
                </PrimaryButton>
            </div>
            <Modal show={deleteModalOpen} maxWidth="sm">
                <div className="w-full flex flex-col items-center justify-center h-32 gap-5">
                    <h1 className="text-3xl">Você tem certeza?</h1>
                    <div className="flex gap-2">
                        <PrimaryButton onClick={handleDelete}>
                            Apagar
                        </PrimaryButton>
                        <PrimaryButton
                            onClick={() => setDeleteModalOpen(false)}
                        >
                            Candelar
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </form>
    );
};

export default EditEventForm;
