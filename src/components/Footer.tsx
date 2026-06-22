import Link from 'next/link';

const Footer = () => {  
    return (
        <footer>
            <div className="flex justify-center items-center h-20">
                <p className="text-[#555]">
                    &copy; 2026 Mia AI. All rights reserved.
                </p>
            </div>
            <div className="flex justify-center items-center h-10">
                <ul className="flex space-x-4 text-sm text-gray-500">
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
        </footer>
    );
}

export default Footer;
