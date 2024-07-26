import { useState, PropsWithChildren, ReactNode, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import axios from "axios";

export default function HeaderLayout({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [notifications, setNotifications] = useState<any[]>([]);

    // Fetch notifications on component mount
    useEffect(() => {
        if (user) {
            axios.get("/notifications").then((response) => {
                setNotifications(response.data);
            });
        }
    }, [user]);

    // Mark notifications as read when dropdown is opened
    const handleNotificationsDropdownOpen = () => {
        if (notifications.some((notification) => !notification.read)) {
            axios.post("/notifications/mark-as-read").then(() => {
                // Atualiza o estado local para marcar todas como lidas
                setNotifications((prevNotifications) =>
                    prevNotifications.map((notification) => ({
                        ...notification,
                        read: true,
                    }))
                );
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link
                                    href={route("event.index")}
                                    className="font-aclonica text-4xl"
                                >
                                    Laravent
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    href={route("user.events")}
                                    active={route().current("user.events")}
                                >
                                    Meus eventos
                                </NavLink>
                                <NavLink
                                    href={route("event.create")}
                                    active={route().current("event.create")}
                                >
                                    Criar evento
                                </NavLink>
                            </div>
                        </div>
                        {user ? (
                            <div className="hidden sm:flex sm:items-center sm:mr-6">
                                {/* Notification Dropdown */}
                                <div className="mr-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                    onClick={
                                                        handleNotificationsDropdownOpen
                                                    }
                                                >
                                                    Notificações
                                                    {notifications.some(
                                                        (notification) =>
                                                            !notification.read
                                                    ) && (
                                                        <span className="ml-2 bg-red-600 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                                                            {
                                                                notifications.filter(
                                                                    (
                                                                        notification
                                                                    ) =>
                                                                        !notification.read
                                                                ).length
                                                            }
                                                        </span>
                                                    )}
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            {notifications.length > 0 ? (
                                                <div className="max-h-44 overflow-y-auto flex flex-col gap-1">
                                                    {notifications.map(
                                                        (notification) => (
                                                            <Dropdown.Link
                                                                key={
                                                                    notification.id
                                                                }
                                                                href={
                                                                    notification
                                                                        .data
                                                                        .url
                                                                }
                                                                className={`${
                                                                    notification.read
                                                                        ? "bg-gray-100 text-gray-500"
                                                                        : "bg-white text-gray-900"
                                                                } px-4 py-2 text-sm`}
                                                            >
                                                                {
                                                                    notification
                                                                        .data
                                                                        .message
                                                                }
                                                            </Dropdown.Link>
                                                        )
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="px-4 py-2 text-sm text-gray-500">
                                                    No new notifications
                                                </div>
                                            )}
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>

                                {/* User Dropdown */}
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.063a.75.75 0 111.08 1.04l-4.25 4.666a.75.75 0 01-1.08 0l-4.25-4.666a.75.75 0 01.02-1.06z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Perfil
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Sair
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        ) : (
                            <div className="flex space-x-4 sm:mr-6">
                                {/* Links de Login e Cadastro quando o usuário não está autenticado */}
                                <NavLink
                                    href={route("login")}
                                    active={route().current("login")}
                                >
                                    Entrar
                                </NavLink>
                                <NavLink
                                    href={route("register")}
                                    active={route().current("register")}
                                >
                                    Cadastrar
                                </NavLink>
                            </div>
                        )}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("user.events")}
                            active={route().current("user.events")}
                        >
                            Meus eventos
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("event.create")}
                            active={route().current("event.create")}
                        >
                            Criar evento
                        </ResponsiveNavLink>
                    </div>

                    {user ? (
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">
                                    {user.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-1">
                            <ResponsiveNavLink href={route("login")}>
                                Entrar
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route("register")}>
                                Cadastrar
                            </ResponsiveNavLink>
                        </div>
                    )}
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
