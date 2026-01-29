// src/components/auth/AuthCard.tsx

import type { ReactNode } from "react";


type AuthCardProps = {
    children: ReactNode;
    className?: string;
};

export default function AuthCard({ children, className = '' }: AuthCardProps) {
    return (
        <div
            className={`bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 
        rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl ${className}`}
        >
            {children}
        </div>
    );
}