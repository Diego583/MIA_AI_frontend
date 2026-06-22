"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useToast } from "@/hooks/use-toast";
import useApi from "@/hooks/use-api";
import { EditAccountSchema } from "@/schema";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar as CalendarIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function EditAccountForm() {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const { toast } = useToast();
    const { updateUser, getUserById, getStatus } = useApi();
    const isLoading = getStatus() === 'loading';

    const form = useForm<z.infer<typeof EditAccountSchema>>({
        resolver: zodResolver(EditAccountSchema),
    });

    async function onSubmit(values: z.infer<typeof EditAccountSchema>) {
        try {
            await updateUser(values);
            toast({
                title: "Success",
                description: "Account updated successfully!",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update account. Please try again.",
            });
        }
    }

    useEffect(() => {
        async function fetchUserData() {
            if (user?.id) {
                try {
                    setLoading(true);
                    const response = await getUserById();
                    const userData = response.user; // Backend returns { user: { ... } }
                    setUserInfo(userData);
                    form.reset({
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        birthDate: new Date(userData.birthDate)
                    });
                } catch (err) {
                    setError(err);
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Failed to fetch user data. Please try again.",
                    });
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchUserData();
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <Loader2 className="animate-spin h-8 w-8" />
            </div>
        );
    }

    if (error || !userInfo) {
        return (
            <div className="text-center p-8">
                <p className="text-red-500">Failed to load user data. Please refresh the page.</p>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col md:flex-row gap-2">
                    <h2>Email:</h2>
                    <h2 className="font-normal">{userInfo?.email || ""}</h2>
                </div>
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    type="text"
                                    {...field}
                                    value={field.value || ""}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name (optional)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    type="text"
                                    {...field}
                                    value={field.value || ""}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="flex w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        captionLayout="dropdown-buttons"
                                        fromYear={1900}
                                        toYear={new Date().getFullYear()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Your date of birth is used to calculate your age{" "}
                                <br />
                                (you must be at least 18 years old).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isLoading}>
                    {isLoading && (
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    )}
                    Save
                </Button>
            </form>
        </Form>
    );
}
