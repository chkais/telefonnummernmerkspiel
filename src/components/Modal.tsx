import React from "react";
import { useRouter } from 'next/navigation';

interface ModalProps {
    message: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
    const router = useRouter();
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-20 ">
            <div className="bg-third p-4 rounded-lg mx-2 border-1 shadow-lg border-primary-border">
                <p className="mb-4">{message}</p>
                <button
                    className="px-4 py-2 bg-primary border border-primary-border text-white rounded"
                    onClick={onClose}
                >
                    OK
                </button>
                <button
                    className="px-4 py-2 bg-primary border border-primary-border text-white rounded ml-2"
                    onClick={()=> router.push("/settings")}
                >
                    Direkt zu den Einstellungen
                </button>
            </div>
        </div>
    );
};

export default Modal;