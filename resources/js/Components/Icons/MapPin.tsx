import React from "react";
import type { SVGProps } from "react";

interface ClockProps extends SVGProps<SVGSVGElement> {
    className?: string;
}

export default function MapPin({ className }: ClockProps) {
    return (
        <svg
            width="30"
            height="29"
            viewBox="0 0 30 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M6.68503 12.1907C6.68503 17.9295 11.7055 22.6753 13.9277 24.4948C14.2457 24.7552 14.4066 24.887 14.6439 24.9538C14.8286 25.0058 15.1005 25.0058 15.2853 24.9538C15.523 24.8869 15.6828 24.7564 16.002 24.495C18.2242 22.6755 23.2444 17.9301 23.2444 12.1912C23.2444 10.0194 22.3721 7.93635 20.8194 6.40066C19.2666 4.86497 17.1608 4.00223 14.9649 4.00223C12.7689 4.00223 10.6629 4.8651 9.11011 6.40079C7.55735 7.93648 6.68503 10.0189 6.68503 12.1907Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.5991 11.0991C12.5991 12.4057 13.6583 13.4648 14.9648 13.4648C16.2713 13.4648 17.3304 12.4057 17.3304 11.0991C17.3304 9.79264 16.2713 8.73351 14.9648 8.73351C13.6583 8.73351 12.5991 9.79264 12.5991 11.0991Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
