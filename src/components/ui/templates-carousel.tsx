"use client";

import React, { useEffect, useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { profiles } from "@/db/persona";
import Picture from "./picture";

const TemplatesCarousel = ({
    handleTemplateSelect,
    activeIndex,
    setActiveIndex,
}: {
    handleTemplateSelect: (values: any) => void;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [api, setApi] = useState<CarouselApi | null>(null);

    useEffect(() => {
        if (api) {
            const handleSelect = () => {
                setActiveIndex(api.selectedScrollSnap());
            };

            api.on("select", handleSelect);

            // Cleanup listener on unmount
            return () => {
                api.off("select", handleSelect);
            };
        }
    }, [api]);

    useEffect(() => {
        handleTemplateSelect(profiles[activeIndex]);
    }, [activeIndex]);

    const handleCloseModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <Carousel opts={{ loop: true }} setApi={setApi}>
            <CarouselContent className="w-[300px] md:w-[400px]">
                {Object.keys(profiles).map((key) => {
                    const index = Number(key);
                    return (
                        <CarouselItem key={index}>
                            <div className="w-full">
                                <AspectRatio
                                    ratio={1 / 1}
                                    className="cursor-pointer overflow-hidden rounded-md"
                                    onClick={handleCloseModal}
                                >
                                    <img
                                        src={profiles[index].picture}
                                        alt={profiles[index].name}
                                        className="object-cover"
                                    />
                                </AspectRatio>
                            </div>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            {isModalOpen && (
                <Picture
                    img={profiles[activeIndex].picture}
                    handleCloseModal={handleCloseModal}
                />
            )}
        </Carousel>
    );
};

export default TemplatesCarousel;
