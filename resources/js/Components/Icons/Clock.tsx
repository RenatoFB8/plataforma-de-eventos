import React from "react";
import type { SVGProps } from "react";

interface ClockProps extends SVGProps<SVGSVGElement> {
    className?: string;
}

export default function Clock({ className }: ClockProps) {
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
                d="M14.9648 8.72908V14.6432H20.8789M14.9648 25.2886C9.08549 25.2886 4.3194 20.5225 4.3194 14.6432C4.3194 8.7639 9.08549 3.9978 14.9648 3.9978C20.8441 3.9978 25.6101 8.7639 25.6101 14.6432C25.6101 20.5225 20.8441 25.2886 14.9648 25.2886Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
