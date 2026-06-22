import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const TermsOfUse = () => (
    <div className="bg-background w-[100%]">
        <Navbar />
        
        <div className="terms-and-policies-page container mx-auto px-[10vw] mt-[100px]">
            <h1>Terms of Use</h1>
            <p>Last updated on 12/31/2024</p>

            <h2>1. General Information</h2>
            <p>Welcome to <strong>MySexyWaifu</strong> (the “Platform”), an AI-powered service operating under the jurisdiction of Mexico. By accessing or using the Platform, you agree to abide by these Terms of Use (“Terms”), as well as any applicable laws or regulations.</p>
            <p>If you do not agree to these Terms, you must cease using the Platform immediately.</p>

            <h2>2. Services Provided</h2>
            <p><strong>MySexyWaifu</strong> provides the following services:</p>
            <ul>
                <li>Text-based interactions with AI-powered chatbots.</li>
                <li>AI-generated images based on user inputs.</li>
                <li>AI-generated audio interactions and responses.</li>
            </ul>
            <p>The Platform offers a free beta trial period. After the beta, users must purchase “Green Papers” to access premium features.</p>

            <h2>3. User Eligibility</h2>
            <p>To use the Platform:</p>
            <ol>
                <li>You must be at least 18 years of age.</li>
                <li>You confirm that the information you provide during registration is accurate and truthful.</li>
                <li>You agree to notify us promptly of any unauthorized use of your account or any security breach.</li>
            </ol>
            <p>The Platform is intended solely for personal, non-commercial use. Business use or resale of the services is strictly prohibited without prior written approval from us.</p>

            <h2>4. Prohibited Conduct</h2>
            <p>Users are strictly prohibited from engaging in the following activities while using the Platform:</p>
            <ul>
                <li>Violating any applicable local, state, national, or international laws, including those of Mexico and the United States.</li>
                <li>Uploading, posting, or transmitting content that is offensive, defamatory, obscene, or harmful.</li>
                <li>Attempting to interfere with or compromise the Platform’s security or operation.</li>
                <li>Engaging in activities that infringe on the intellectual property rights of <strong>MySexyWaifu</strong> or third parties.</li>
                <li>Reverse engineering, decompiling, or attempting to derive the source code of the Platform’s software.</li>
                <li>Circumventing any security measures or restrictions on the Platform.</li>
                <li>Using the Platform for commercial purposes without explicit written consent from us.</li>
            </ul>
            <p>Failure to comply with these rules may result in the suspension or termination of your account.</p>

            <h2>5. Account Creation and Management</h2>
            <p>To access certain features of the Platform, users must create an account. By creating an account, you agree to:</p>
            <ol>
                <li>Provide accurate and up-to-date personal information.</li>
                <li>Maintain the confidentiality of your account credentials.</li>
                <li>Accept responsibility for all activities conducted under your account.</li>
            </ol>
            <p>We reserve the right to suspend or terminate accounts suspected of being in breach of these Terms.</p>

            <h2>6. Subscription and Payments</h2>
            <h3>Beta Period:</h3>
            <p>During the beta trial period, the Platform is free to use.</p>
            <h3>Post-Beta Period:</h3>
            <ul>
                <li>Access to premium features requires purchasing “Green Papers.”</li>
                <li>Pricing:
                    <ul>
                        <li>500 text tokens = 1 Green Paper.</li>
                        <li>Each image generation = 10 Green Papers.</li>
                        <li>Each second of audio generation = 1 Green Paper.</li>
                    </ul>
                </li>
                <li>Payments:
                    <ul>
                        <li>Payments are processed securely via Stripe.</li>
                        <li>Green Papers can be purchased through the Platform.</li>
                    </ul>
                </li>
            </ul>
            <h3>Refund Policy:</h3>
            <p>Refunds are not available except in cases of proven technical errors caused by the Platform.</p>

            <h2>7. Ownership and Intellectual Property</h2>
            <p>All intellectual property on the Platform, including but not limited to software, AI models, content, and branding, is owned by <strong>MySexyWaifu</strong>. Users retain rights to their input content but grant the Platform a perpetual, worldwide license to use, reproduce, and modify such inputs for service improvement.</p>
            <p>Users may not reproduce, distribute, or exploit any aspect of the Platform without express written consent from us.</p>

            <h2>8. AI-Generated Content</h2>
            <p>The Platform uses advanced AI technologies to generate text, images, and audio based on user inputs. Users understand that:</p>
            <ul>
                <li>AI-generated content may not always be accurate or appropriate.</li>
                <li>The Platform disclaims any responsibility for the actions taken by users based on AI-generated outputs.</li>
                <li>The generated content is fictional and should not be interpreted as factual or advisory.</li>
            </ul>

            <h2>9. Content Moderation</h2>
            <p>The Platform employs automated systems to moderate user-generated content. We reserve the right to:</p>
            <ul>
                <li>Monitor, review, and remove content that violates these Terms or applicable laws.</li>
                <li>Suspend or terminate accounts associated with repeated or severe violations.</li>
            </ul>

            <h2>10. Data Collection and Privacy</h2>
            <p>For information on data collection and usage, please refer to our <a href="#">Privacy Policy</a>. By using the Platform, you agree to the terms outlined in the Privacy Policy.</p>

            <h2>11. Governing Law and Jurisdiction</h2>
            <p>These Terms are governed by the laws of Mexico. Any disputes arising from these Terms or the use of the Platform shall be resolved exclusively in the courts of Mexico.</p>

            <h2>12. Changes to These Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Users will be notified of significant changes through the Platform or via email. Continued use of the Platform after such changes constitutes acceptance of the new Terms.</p>

            <h2>13. Limitation of Liability</h2>
            <p>The Platform is provided “AS IS” without warranties of any kind. We are not liable for any damages resulting from:</p>
            <ul>
                <li>Interruptions or errors in the Platform.</li>
                <li>Unauthorized access to user data.</li>
                <li>Actions taken by users based on AI-generated content.</li>
            </ul>

            <h2>14. Contact Information</h2>
            <p>For questions or concerns about these Terms, contact us at <strong>support@mysexywaifu.com</strong>.</p>

            <hr/>
            <p>This document is a legally binding agreement. By using the Platform, you acknowledge and agree to all terms stated above.</p>
        </div>
        
        <Footer />
    </div>
);

export default TermsOfUse;
