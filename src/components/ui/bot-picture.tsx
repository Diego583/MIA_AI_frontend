"use client";

import { useState } from "react";
import { AspectRatio } from "./aspect-ratio";
import { profiles } from "@/db/persona";
import Picture from "./picture";

const BotPicture = ({ activeIndex }: { activeIndex: number }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="w-[300px] md:w-[400px]">
            <AspectRatio
                ratio={1 / 1}
                className="cursor-pointer overflow-hidden rounded-md"
                onClick={handleCloseModal}
            >
                <img
                    src={profiles[activeIndex].picture}
                    alt={profiles[activeIndex].name}
                    className="object-cover"
                />
            </AspectRatio>
            {isModalOpen && (
                <Picture
                    img={profiles[activeIndex].picture}
                    handleCloseModal={handleCloseModal}
                />
            )}
        </div>
    );
};

export default BotPicture;
