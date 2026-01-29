import { authTexts } from "../../constants/authTexts";

export default function AuthFooter() {
    return (
        <p className="text-center mt-8 sm:mt-10 text-xs text-gray-600">
            {authTexts.copyright(new Date().getFullYear())}
        </p>
    );
}