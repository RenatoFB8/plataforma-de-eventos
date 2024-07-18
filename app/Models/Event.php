<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'max_participants',
        'entry_price',
        'main_image',
        'location_images',
        'user_id'
    ];

    protected $casts = [
        'location_images' => 'array',
    ];
}
