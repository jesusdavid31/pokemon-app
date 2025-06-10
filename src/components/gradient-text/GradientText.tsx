
import type { ReactNode } from "react";
import "./GradientText.scss";

interface GradientTextProps {
    children: ReactNode;
    className?: string;
    colors?: string[];
    animationSpeed?: number;
    showBorder?: boolean;
}

export default function GradientText({
    children,
    className = "",
    colors = [
        '#66cc66', // grass
        '#ff9933', // fire
        '#66ccff', // water
        '#99cc33', // bug
        '#8a2be2', // poison
        '#99ccff', // flying
        '#ffcc33', // electric
        '#ff66cc', // psychic
        '#b8a038', // rock
        '#e0c068', // ground
        '#ee99ac', // fairy
        '#66ffff', // ice
        '#7038f8', // dragon
        '#705848', // dark
        '#705898', // ghost
        '#c03028', // fighting
        '#b8b8d0', // steel
        '#a8a878', // normal
    ],
    animationSpeed = 8,
    showBorder = false
}: GradientTextProps) {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        animationDuration: `${animationSpeed}s`,
    };

    return (
        <div className={`animated-gradient-text ${className}`}>
            {showBorder && <div className="gradient-overlay" style={gradientStyle}></div>}
            <div className="text-content" style={gradientStyle}>{children}</div>
        </div>
    );
}
