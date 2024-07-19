import React, { FormEvent, useState, ChangeEvent } from "react";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

interface CreateEventFormData {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    max_participants: number | string;
    entry_price: number | string;
    main_image: File | null;
    location_images: File[];
}

const MAX_LOCATION_IMAGES = 6;

const CreateEventForm: React.FC = () => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm<CreateEventFormData>({
            title: "",
            description: "",
            start_date: "",
            end_date: "",
            max_participants: "",
            entry_price: "",
            main_image: null,
            location_images: [],
        });

    const [mainImagePreview, setMainImagePreview] = useState<string | null>(
        null
    );
    const [locationImagePreviews, setLocationImagePreviews] = useState<
        string[]
    >([]);

    const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setData("main_image", file);
        setMainImagePreview(file ? URL.createObjectURL(file) : null);
        e.target.value = ""
    };

    const handleLocationImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        const updatedFiles = [...data.location_images, ...files].slice(
            0,
            MAX_LOCATION_IMAGES
        );
        setData("location_images", updatedFiles);
        setLocationImagePreviews(
            updatedFiles.map((file) => URL.createObjectURL(file))
        );
        e.target.value = ""
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
            updatedFiles.map((file) => URL.createObjectURL(file))
        );
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/event");
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="title" value="Título" />
                <TextInput
                    id="title"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    required
                />
                <InputError message={errors.title} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Descrição" />
                <textarea
                    id="description"
                    className="mt-1 block w-full"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    required
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="start_date" value="Data de Início" />
                <TextInput
                    id="start_date"
                    type="datetime-local"
                    className="mt-1 block w-full"
                    value={data.start_date}
                    onChange={(e) => setData("start_date", e.target.value)}
                    required
                />
                <InputError message={errors.start_date} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="end_date" value="Data de Término" />
                <TextInput
                    id="end_date"
                    type="datetime-local"
                    className="mt-1 block w-full"
                    value={data.end_date}
                    onChange={(e) => setData("end_date", e.target.value)}
                    required
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
                    className="mt-1 block w-full"
                    value={data.max_participants}
                    onChange={(e) =>
                        setData("max_participants", e.target.value)
                    }
                    required
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
                    className="mt-1 block w-full"
                    value={data.entry_price}
                    onChange={(e) => setData("entry_price", e.target.value)}
                    required
                />
                <InputError message={errors.entry_price} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="main_image" value="Imagem Principal" />
                <TextInput
                    id="main_image"
                    type="file"
                    accept="image/*"
                    className="mt-1 block w-full"
                    onChange={handleMainImageChange}
                    disabled={data.main_image !== null}
                    required
                />
                {mainImagePreview && (
                    <img
                        src={mainImagePreview}
                        alt="Main Preview"
                        className="mt-2 h-24 w-24 object-cover cursor-pointer"
                        onClick={handleRemoveMainImage}
                    />
                )}
                <InputError message={errors.main_image} className="mt-2" />
            </div>

            <div>
                <InputLabel
                    htmlFor="location_images"
                    value="Imagens do Local"
                />
                <TextInput
                    id="location_images"
                    type="file"
                    accept="image/*"
                    multiple
                    className="mt-1 block w-full"
                    onChange={handleLocationImagesChange}
                    disabled={
                        data.location_images.length >= MAX_LOCATION_IMAGES
                    }
                />
                <div className="mt-2 flex space-x-2">
                    {locationImagePreviews.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Location Preview ${index + 1}`}
                            className="h-24 w-24 object-cover cursor-pointer"
                            onClick={() => handleRemoveLocationImage(index)}
                        />
                    ))}
                </div>
                <InputError message={errors.location_images} className="mt-2" />
            </div>

            <PrimaryButton disabled={processing}>Criar Evento</PrimaryButton>
            {recentlySuccessful && (
                <p className="text-sm text-gray-600 mt-2">
                    Evento criado com sucesso.
                </p>
            )}
        </form>
    );
};

export default CreateEventForm;
