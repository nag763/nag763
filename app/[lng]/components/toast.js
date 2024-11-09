'use client'

import { useEffect, useState } from 'react';
import { MdOutlineErrorOutline } from "react-icons/md";
import { GrValidate } from "react-icons/gr";

export default function Toast({ message, isError = false, onClose }) {
    const [isHovered, setIsHovered] = useState(false);
    const [timer, setTimer] = useState(Math.max(5000, message.length * 100)); // Minimum de 5s, ajusté selon la longueur du message

    useEffect(() => {
        if (!isHovered && timer > 0) {
            const countdown = setInterval(() => setTimer((prev) => prev - 1000), 1000);
            return () => clearInterval(countdown);
        }
        if (timer <= 0) onClose();
    }, [timer, isHovered, onClose]);

    return (
        <div
            className={`toast fixed bottom-4 right-4 z-50 transition-transform duration-300 ${timer <= 0 ? 'opacity-0' : 'opacity-100'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`alert ${isError ? "alert-error" : "alert-success"} shadow-lg flex items-center`}>
                {isError ? <MdOutlineErrorOutline size={24} className="mr-2"/> : <GrValidate size={24} className="mr-2"/>} 
                <span>{message}</span>
            </div>
        </div>
    );
}
