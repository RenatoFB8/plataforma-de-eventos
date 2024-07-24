<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ImageOrString implements Rule
{
    public function passes($attribute, $value)
    {
        // Verifique se é uma imagem
        if ($value instanceof \Illuminate\Http\UploadedFile && $value->isValid()) {
            return true;
        }

        // Verifique se é uma string de caminho de imagem
        if (is_string($value) && preg_match('/^images\/.+\.(jpeg|png|jpg)$/i', $value)) {
            return true;
        }

        return false;
    }

    public function message()
    {
        return 'The :attribute must be a valid image or image path.';
    }
}
