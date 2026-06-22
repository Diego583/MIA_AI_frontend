import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function DeleteButton({
    deleteStatus,
    onClick,
}: {
    deleteStatus: string;
    onClick: () => void;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-text-foreground"
                    variant="outline"
                    disabled={
                        deleteStatus == "loading" || deleteStatus == "success"
                    }
                >
                    {deleteStatus == "loading" && (
                        <Loader2 className="animate-spin" />
                    )}
                    Delete Waifu
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your waifu and remove its data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onClick}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
