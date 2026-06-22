import React from "react";

const Picture = ({
    img,
    handleCloseModal,
}: {
    img: string;
    handleCloseModal: () => void;
}) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleCloseModal}
        >
            <div
                className="relative bg-background rounded-lg animate-zoomIn"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={img}
                    alt="Waifu Photo"
                    className="max-w-full max-h-[80vh] rounded-lg"
                />
                <button
                    onClick={handleCloseModal}
                    className="absolute top-2 right-2 text-text hover:text-text-foreground"
                >
                    ✖
                </button>
            </div>
        </div>
    );
};

export default Picture;
