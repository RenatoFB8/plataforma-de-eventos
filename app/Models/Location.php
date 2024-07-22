<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'street',
        'street_number',
        'city',
        'neighborhood',
        'state',
        'cep',
    ];

    public function events()
    {
        return $this->hasOne(Event::class);
    }
}
