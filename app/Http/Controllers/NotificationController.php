<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * Retrieve all notifications for the authenticated user.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getNotifications(Request $request)
    {
        $user = Auth::user();
        $notifications = $user->notifications; // Todas as notificações

        // Formatar as notificações para o formato desejado
        $formattedNotifications = $notifications->map(function ($notification) {
            return [
                'id' => $notification->id,
                'data' => $notification->data,
                'read' => $notification->read_at !== null, // Verifica se a notificação foi lida
                'created_at' => $notification->created_at,
            ];
        });

        return response()->json($formattedNotifications);
    }

    /**
     * Mark all notifications as read for the authenticated user.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAsRead(Request $request)
    {
        $user = Auth::user();
        $user->unreadNotifications->markAsRead(); // Marca todas as notificações não lidas como lidas

        return response()->json(['message' => 'All notifications marked as read.']);
    }
}
