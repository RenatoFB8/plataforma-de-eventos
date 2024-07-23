<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:30',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'max_participants' => 'required|integer',
            'entry_price' => 'required|numeric',
            'main_image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'location_images' => 'required|array|max:6',
            'location_images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
            'street' => 'required|string|max:100',
            'street_number' => 'required|string',
            'city' => 'required|string|max:50',
            'neighborhood' => 'required|string|max:50',
            'state' => 'required|string|max:2',
            'cep' => 'required|string|max:8',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'O título é obrigatório. Por favor, insira o título do evento.',
            'title.string' => 'O título deve ser um texto válido.',
            'title.max' => 'O título não pode ter mais de 30 caracteres.',

            'description.required' => 'A descrição é obrigatória. Por favor, forneça uma descrição para o evento.',
            'description.string' => 'A descrição deve ser um texto válido.',

            'start_date.required' => 'A data de início é obrigatória. Por favor, selecione uma data de início para o evento.',
            'start_date.date' => 'Por favor, insira uma data de início válida.',

            'end_date.required' => 'A data de término é obrigatória. Por favor, selecione uma data de término para o evento.',
            'end_date.date' => 'Por favor, insira uma data de término válida.',

            'max_participants.required' => 'O número máximo de participantes é obrigatório. Por favor, insira o limite de participantes.',
            'max_participants.integer' => 'O número máximo de participantes deve ser um número inteiro.',

            'entry_price.required' => 'O preço de entrada é obrigatório. Por favor, insira o preço do evento.',
            'entry_price.numeric' => 'O preço de entrada deve ser um valor numérico.',

            'main_image.required' => 'A imagem principal é obrigatória. Por favor, faça o upload de uma imagem para o evento.',
            'main_image.image' => 'O arquivo enviado deve ser uma imagem.',
            'main_image.mimes' => 'A imagem principal deve estar nos formatos jpeg, png ou jpg.',
            'main_image.max' => 'A imagem principal não pode exceder 2MB.',

            'location_images.required' => 'As imagens da localização são obrigatórias. Por favor, faça o upload de até 6 imagens do local do evento.',
            'location_images.array' => 'As imagens da localização devem estar em formato de array.',
            'location_images.max' => 'Você pode enviar no máximo 6 imagens da localização.',
            'location_images.*.image' => 'Cada arquivo de imagem deve ser uma imagem válida.',
            'location_images.*.mimes' => 'As imagens devem estar nos formatos jpeg, png ou jpg.',
            'location_images.*.max' => 'Cada imagem da localização não pode exceder 2MB.',

            'street.required' => 'A rua é obrigatória. Por favor, insira o nome da rua.',
            'street.string' => 'O nome da rua deve ser um texto válido.',
            'street.max' => 'O nome da rua não pode ter mais de 100 caracteres.',

            'street_number.required' => 'O número da rua é obrigatório. Por favor, insira o número da rua.',

            'city.required' => 'A cidade é obrigatória. Por favor, insira o nome da cidade.',
            'city.string' => 'O nome da cidade deve ser um texto válido.',
            'city.max' => 'O nome da cidade não pode ter mais de 50 caracteres.',

            'neighborhood.required' => 'O bairro é obrigatório. Por favor, insira o nome do bairro.',
            'neighborhood.string' => 'O nome do bairro deve ser um texto válido.',
            'neighborhood.max' => 'O nome do bairro não pode ter mais de 50 caracteres.',

            'state.required' => 'O estado é obrigatório. Por favor, insira a sigla do estado.',
            'state.string' => 'A sigla do estado deve ser um texto válido.',
            'state.max' => 'A sigla do estado deve ter exatamente 2 caracteres.',

            'cep.required' => 'O CEP é obrigatório. Por favor, insira o CEP da localização.',
            'cep.string' => 'O CEP deve ser um texto válido.',
            'cep.max' => 'O CEP deve ter no máximo 8 caracteres.',
        ];
    }
}
