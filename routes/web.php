<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\EventParticipationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\NotificationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Rotas de eventos com autenticação
Route::middleware('auth')->group(function () {
    Route::get('event/create', [EventController::class, 'create'])->name('event.create');
    Route::put('event/{event}', [EventController::class, 'update'])->name('event.update');
    Route::post('event', [EventController::class, 'store'])->name('event.store');
    Route::get('event/{event}/edit', [EventController::class, 'edit'])->name('event.edit');
    Route::delete('event/{event}', [EventController::class, 'destroy'])->name('event.destroy');
    Route::get('event/{event}', [EventController::class, 'show'])->name('event.show');
});

// Rotas de eventos sem autenticação
Route::get('/', [EventController::class, 'index'])->name('event.index');

// Outras rotas

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/events/{event}/participate', [EventParticipationController::class, 'participate'])->name('events.participate');

Route::get('/user-events', [EventController::class, 'userEvents'])
    ->name('user.events')
    ->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/notifications', [NotificationController::class, 'getNotifications']);
    Route::post('/notifications/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');
});

require __DIR__ . '/auth.php';
