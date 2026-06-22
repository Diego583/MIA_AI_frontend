import EditAccountForm from "@/components/forms/edit-account-form";

const Account = () => {
    return (
        <div className="w-full h-full flex flex-col items-center px-5 pt-8 gap-4">
            <h1>Account</h1>
            <p>Edit Account Information</p>
            <EditAccountForm />
            {/* <div className="border-t p-4 space-y-2">
                <div className="flex gap-2 items-center">
                    <h2>Available tokens:</h2>
                    <h2 className="font-normal">1000</h2>
                </div>
                <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => {
                        window.location.href = "/store";
                    }}
                >
                    <p>Buy Tokens</p>
                    <MdArrowForward className="w-6 h-6" />
                </Button>
            </div> */}
            {/* <div className="border-t p-4">
                <Button variant="destructive">Delete Account</Button>
            </div> */}
        </div>
    );
};

export default Account;
