"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ContactSupportSchema } from "@/schema";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "../ui/loading";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function ContactSupportForm() {
    const { toast } = useToast();
    const { user, error, isLoading } = useAuth();
    const [submitting, setSubmitting] = useState(false);

    const form = useForm({
        resolver: zodResolver(ContactSupportSchema),
        defaultValues: {
            subject: "",
            message: "",
            // files: "",
            replyTo: "",
        },
    });

    useEffect(() => {
        if (user) {
            form.setValue("replyTo", user.email ?? "user@mail.com");
        }
    }, [user]);

    if (isLoading) {
        return (
            <div className="mt-8">
                <Loading />
            </div>
        );
    }

    if (error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch user data. Please try again.",
        });
    }

    async function onSubmit(values: z.infer<typeof ContactSupportSchema>) {
        setSubmitting(true);
        try {
            await axios.post("api/send", values);
            toast({
                title: "Email sent",
                description:
                    "Your message has been sent to support. We will get back to you as soon as possible.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to submit the form. Please try again.",
            });
        }
        setSubmitting(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Input placeholder="" type="text" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder=""
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Describe the problem or issue. Try to be as
                                brief and direct as possible.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* <FormField
                    control={form.control}
                    name="files"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Attachments</FormLabel>
                            <FormControl>
                                <Input type="file" multiple {...field} />
                            </FormControl>
                            <FormDescription>
                                Attach any files that may help us understand the
                                issue.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

                <Button type="submit" disabled={submitting}>
                    {submitting && <Loader2 className="animate-spin" />}
                    Send
                </Button>
            </form>
        </Form>
    );
}
