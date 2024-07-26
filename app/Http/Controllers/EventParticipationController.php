<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Carbon\Carbon; // Importando a classe Carbon para manipulação de datas
use App\Notifications\NewRegistrationNotification;

class EventParticipationController extends Controller
{
    public function participate(Event $event)
    {
        $user = Auth::user();

        if (!($user instanceof User)) {
            throw new \Exception('User is not authenticated or is not of the expected type.');
        }

        // Verifica se o usuário já está participando do evento
        if ($event->users()->where('user_id', $user->id)->exists()) {
            throw ValidationException::withMessages([
                'user_id' => 'Você já está participando deste evento.',
            ]);
        }

        // Verifica se o número máximo de participantes foi atingido
        if ($event->users()->count() >= $event->max_participants) {
            throw ValidationException::withMessages([
                'max_participants' => 'Este evento já atingiu o número máximo de participantes.',
            ]);
        }

        // Verifica se o evento já acabou
        if (Carbon::now()->greaterThan($event->end_date)) {
            throw ValidationException::withMessages([
                'end_date' => 'Este evento já terminou.',
            ]);
        }

        // Anexa o usuário ao evento e incrementa o contador de participantes
        $event->users()->attach($user);
        $event->increment('users_count');

        $eventOwner = User::find($event->user_id);
        $eventOwner->notify(new NewRegistrationNotification($event, $user));
    }
}
