import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const TermsAndPoliciesPage: React.FC = () => {
    return (
        <div className="bg-background w-[100%]">
            <Navbar />

            <div className="container mx-auto px-[10vw] mt-[100px]">
                <h1>Terms and policies</h1>

                <br/>
                <ul>
                    <li className="text-primary">
                        <Link href="/terms-and-policies/terms-of-use">Terms of Service</Link>
                    </li>
                    <li className="text-primary">
                        <Link href="/terms-and-policies/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li className="text-primary">
                        <Link href="/terms-and-policies/content-removal-policy">Content Removal Policy</Link>
                    </li>
                </ul>
            </div>

            <Footer />
        </div>
    );
}

export default TermsAndPoliciesPage;
