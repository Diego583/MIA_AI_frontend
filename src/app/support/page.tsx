import React from "react";
import ContactSupportForm from "@/components/forms/contact-support-form";

const Support = () => {
    return (
        <div className="px-5 pt-8">
            <h1>Help & Support</h1>
            <p className="mt-8">
                If you run into any issues or you want to make a sugestion,
                write us an email and we’ll look into it
            </p>
            <ContactSupportForm />
        </div>
    );
};

export default Support;
