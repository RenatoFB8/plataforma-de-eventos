import React from "react";
import type { SVGProps } from "react";

interface ClockProps extends SVGProps<SVGSVGElement> {
    className?: string;
}

export default function EditPencil({ className }: ClockProps) {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M20.3333 12.9768L7 26.3101V32.9768L13.6667 32.9767L27 19.6434M20.3333 12.9768L25.1144 8.19567L25.1173 8.19283C25.7754 7.53469 26.105 7.20504 26.4851 7.08157C26.8198 6.97281 27.1804 6.97281 27.5151 7.08157C27.8949 7.20495 28.2241 7.53423 28.8813 8.19144L31.781 11.0911C32.441 11.7511 32.7712 12.0813 32.8948 12.4618C33.0036 12.7966 33.0036 13.1572 32.8948 13.4919C32.7713 13.8722 32.4416 14.2018 31.7825 14.8609L31.781 14.8623L27 19.6434M20.3333 12.9768L27 19.6434"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
}
