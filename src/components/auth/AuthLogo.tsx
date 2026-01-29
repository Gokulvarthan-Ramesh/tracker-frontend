import { authTexts } from "../../constants/authTexts";

// src/components/auth/AuthLogo.tsx
export default function AuthLogo() {
  return (
    <div className="flex items-center justify-center mb-8 sm:mb-10">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-pink-500 shadow-md shadow-pink-900/40" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
         {authTexts.appName}
        </h2>
      </div>
    </div>
  );
}