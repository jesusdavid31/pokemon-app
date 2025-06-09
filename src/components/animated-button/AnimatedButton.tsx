
import React from "react";

interface AnimatedButtonProps {
    text: string;
    icon: React.ReactElement | React.ReactElement[];
}

const AnimatedButton = ( { text, icon }: AnimatedButtonProps ) => {

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
                {icon}
                </svg>
                <span className="text">{text}</span>
                <span className="circle"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
                {icon}
            </svg>
        </>
    );

}

export default AnimatedButton;