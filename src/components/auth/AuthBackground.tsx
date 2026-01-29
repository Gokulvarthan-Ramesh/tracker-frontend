
import silhouette_mountain from '../../assets/Images/Bg/silhouette-mountain.jpg';

export default function AuthBackground() {
    return (
        <>
            <div className="absolute inset-0 z-0">
                <img
                    src={silhouette_mountain}
                    alt="Silhouette mountain landscape – GVTracker"
                    className="h-full w-full object-cover brightness-[0.65] contrast-[1.2] saturate-[0.9]"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/70 to-gray-950/95" />
            </div>
        </>
    );
}