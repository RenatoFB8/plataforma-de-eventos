<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Event;
use App\Models\User;

class NewRegistrationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $event;
    protected $participant;

    /**
     * Create a new notification instance.
     *
     * @param Event $event
     * @param User $participant
     * @return void
     */
    public function __construct(Event $event, User $participant)
    {
        $this->event = $event;
        $this->participant = $participant;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via(mixed $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toArray(mixed $notifiable): array
    {
        return [
            'message' => "{$this->participant->name} se inscreveu no seu evento \"{$this->event->title}\".",
            'event_id' => $this->event->id,
            'url' => route('event.show', $this->event->id), // Adiciona a URL do evento
        ];
    }
}
