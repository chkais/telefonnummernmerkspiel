import React, { useEffect, useRef, useState } from "react";

interface ColorPickerProps {
    selectedColor: string;
    onSelectColor: (color: string) => void;
    colors: string[];
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onSelectColor, colors }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandLeft, setExpandLeft] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    const handleColorClick = (color: string) => {
        onSelectColor(color);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            const rect = pickerRef.current?.getBoundingClientRect();
            if (rect && rect.right > window.innerWidth) {
                setExpandLeft(true);
            } else {
                setExpandLeft(false);
            }
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={pickerRef}>
            <button
                className={`p-2 w-10 h-10 border mb-2 bg-${selectedColor}`}
                onClick={() => setIsOpen(!isOpen)}
            >
            </button>
            {isOpen && (
                <div className={`absolute top-12 ${expandLeft ? "right-0" : "-left-20"} bg-white border rounded shadow-lg p-2 w-30`}>
                    <div className="grid grid-cols-3 gap-2">
                        {colors.map((color) => (
                            <div
                                key={color}
                                className={`w-8 h-8 rounded cursor-pointer bg-${color}`}
                                onClick={() => handleColorClick(color)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColorPicker;