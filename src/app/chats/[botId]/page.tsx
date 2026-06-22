"use client";

import { useParams } from "next/navigation";
import React from "react";

const EditWaifu = () => {
    const { botId } = useParams<{ botId: string }>();
    return (
        <div
            className="w-full h-full flex flex-col justify-start items-center py-6 gap-4
                        px-5"
        >
            {/* {botId && <WaifuSettingsForm botId={"32131"} />} */}
        </div>
    );
};

export default EditWaifu;
