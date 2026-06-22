import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


const PrivacyPolicy = () => (
    <div className="bg-background w-[100%]">
        <Navbar />
    
        <div className="terms-and-policies-page container mx-auto px-[10vw] mt-[100px]">
            <h1>Privacy Policy</h1>
            <p>Last updated on 12/31/2024</p>
        
            <h4><strong>1. Introduction</strong></h4>
            <p>
                Welcome to <strong>MySexyWaifu</strong> (the "Platform"). This Privacy Policy outlines how we
                collect, use, store, and protect your personal data when you interact with our Platform. It
                is our commitment to ensure transparency and clarity regarding your data. By using our
                services, you confirm that you understand and agree to the practices described in this
                policy. If you have any concerns or queries, please reach out to us using the contact
                information provided below.
            </p>
        
            <h4><strong>2. Data We Collect</strong></h4>
            <p>We collect the following types of information to enhance your experience and improve the quality of our services:</p>
        
            <h5><strong>2.1. Personal Information</strong></h5>
            <ul>
                <li><strong>Full Name</strong>: Your name is used to personalize interactions with AI-generated content and ensure a more engaging user experience.</li>
                <li><strong>Email Address</strong>: We use your email for account creation, secure communication, password recovery, and user verification. It is also essential for sending updates and notifications about the Platform.</li>
                <li><strong>Age</strong>: We collect your age to confirm eligibility requirements for accessing our Platform and its specific content offerings.</li>
            </ul>
        
            <h5><strong>2.2. User Input Data</strong></h5>
            <p>Any data you provide during your interactions with the chat interface, including text, prompts, images, and audio. This data enables us to deliver tailored responses and generate AI-driven outputs aligned with your inputs.</p>
        
            <h5><strong>2.3. Authentication Data</strong></h5>
            <p>
                Authentication services are securely handled by <strong>Auth0</strong>, which encrypts and safely
                stores your email and password to prevent unauthorized access to your account.
            </p>
        
            <h5><strong>2.4. Payment Data</strong></h5>
            <p>
                Payment transactions are managed via <strong>Stripe</strong>, which collects and securely stores
                sensitive billing details, such as credit card numbers, cardholder names, and billing
                addresses, ensuring secure and compliant processing.
            </p>
        
            <h4><strong>3. Purpose of Data Collection</strong></h4>
            <p>The data we collect is used to provide and improve our services, with the following primary objectives:</p>
            <ul>
                <li><strong>Personalization</strong>: To customize AI-generated interactions, making them relevant and engaging based on your provided information.</li>
                <li><strong>Service Improvement</strong>: To enhance the capabilities of our AI models and develop better features, except when users explicitly opt out of such data usage.</li>
                <li><strong>Communication</strong>: To send updates about new features, respond to inquiries, and assist with account-related matters.</li>
                <li><strong>Security</strong>: To verify user identities, prevent fraudulent activities, and maintain the integrity of the Platform.</li>
            </ul>
        
            <h4><strong>4. User Rights and Choices</strong></h4>
            <p>We prioritize user control and offer the following rights concerning your personal data:</p>
        
            <h5><strong>4.1. Opt-Out of Data Usage</strong></h5>
            <p>
                Users who prefer not to have their data used for improving AI models can opt out by
                contacting us at <strong>support@mysexywaifu.com</strong>. We will ensure your data is excluded from such
                processes moving forward.
            </p>
        
            <h5><strong>4.2. Access and Deletion</strong></h5>
            <p>You may:</p>
            <ul>
                <li><strong>Request Access</strong>: Receive a comprehensive copy of all personal data collected.</li>
                <li><strong>Request Deletion</strong>: Request the permanent removal of your data from our systems.</li>
            </ul>
            <p>
                All requests must be submitted via email to <strong>support@mysexywaifu.com</strong> from the registered email
                address associated with your account. We aim to process these requests promptly while
                ensuring data security and verification.
            </p>
        
            <h4><strong>5. Data Sharing</strong></h4>
            <p>We limit data sharing to the following trusted partners essential for the Platform's operations:</p>
            <ul>
                <li><strong>Auth0</strong>: Manages authentication processes securely.</li>
                <li><strong>Stripe</strong>: Handles all payment processing securely and in compliance with industry standards.</li>
            </ul>
            <p>We do not sell or disclose personal data to other third parties or external entities under any circumstances.</p>
        
            <h4><strong>6. Data Retention</strong></h4>
            <p>We retain user data as follows:</p>
            <ul>
                <li><strong>Personal Information</strong>: Retained indefinitely to maintain active accounts unless a deletion request is received.</li>
                <li><strong>User Input Data</strong>: Stored for improving AI functionality unless a user explicitly opts out.</li>
                <li>
                <strong>Authentication and Payment Data</strong>: Retained by Auth0 and Stripe in accordance with their
                individual data retention policies and compliance requirements.
                </li>
            </ul>
        
            <h4><strong>7. Data Security</strong></h4>
            <p>We employ advanced security measures to safeguard user data against unauthorized access, alteration, or misuse:</p>
            <ul>
                <li>Comprehensive encryption protocols for sensitive data.</li>
                <li>Routine security audits to identify and mitigate potential vulnerabilities.</li>
                <li>
                Restricting access to personal data to authorized personnel only and ensuring rigorous
                confidentiality agreements are in place.
                </li>
            </ul>
        
            <h4><strong>8. Age Restriction</strong></h4>
            <p>
                The Platform is designed for users aged 18 and older. We do not knowingly collect or process
                data from individuals under this age threshold. If we identify or are informed of a minor
                using the Platform, we will promptly delete their data after verification.
            </p>
        
            <h4><strong>9. Cookies and Tracking Technologies</strong></h4>
            <p>
                To improve your experience and optimize Platform functionality, we use cookies and other
                tracking technologies. These tools help us understand user behavior and enhance service
                delivery. Users can manage their preferences through browser settings and may disable
                certain cookies if preferred, though this may impact some functionalities.
            </p>
        
            <h4><strong>10. Changes to This Privacy Policy</strong></h4>
            <p>
                We reserve the right to update this Privacy Policy to reflect changes in our practices or
                legal requirements. Significant updates will be communicated through the Platform or via
                email. Your continued use of the Platform after any changes indicates your acceptance of
                the revised policy. Please review this document periodically to stay informed of any
                modifications.
            </p>
        
            <h4><strong>11. Contact Information</strong></h4>
            <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or your
                data, please contact us via:
            </p>
            <ul>
                <li><strong>Email</strong>: <strong>support@mysexywaifu.com</strong></li>
            </ul>
            <p>We are committed to addressing all inquiries promptly and transparently.</p>
        
            <p>This Privacy Policy is effective as of 12/31/2024. By using <strong>MySexyWaifu</strong>, you acknowledge and consent to the practices and policies outlined herein.</p>
        </div>

        <Footer />
    </div>
  );
  
  export default PrivacyPolicy;