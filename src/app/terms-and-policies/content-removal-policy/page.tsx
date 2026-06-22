import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const ContentRemovalPolicy = () => (
    <div className="bg-background w-[100%]">
        <Navbar />
        
        <div className="terms-and-policies-page container mx-auto px-[10vw] mt-[100px]">
            <h1>Content Removal Policy</h1>
            <p>Last updated on 12/31/2024</p>
        
            <h4><strong>1. Introduction</strong></h4>
            <p>
                At <strong>MySexyWaifu</strong>, we are committed to fostering a safe, respectful, and enjoyable environment
                for all users. This Content Removal Policy outlines the processes and guidelines we follow to address
                concerns about content generated on our platform. While the Platform leverages AI to generate text,
                images, and audio, we recognize that issues may arise regarding inappropriate, offensive, or unintended
                content. This policy ensures that concerns are addressed effectively and transparently.
            </p>
        
            <h4><strong>2. Scope of the Policy</strong></h4>
            <p>This policy applies to all content generated on the Platform, including:</p>
            <ul>
                <li>AI-generated text, images, and audio.</li>
                <li>User-uploaded inputs used to prompt AI-generated outputs.</li>
            </ul>
        
            <h4><strong>3. Grounds for Content Removal</strong></h4>
            <p>Content may be subject to removal under the following circumstances:</p>
        
            <h5><strong>3.1. Violation of Terms of Use</strong></h5>
            <p>Content that breaches the Platform’s Terms of Use will be removed. This includes but is not limited to:</p>
            <ul>
                <li>Illegal or unlawful content under applicable laws.</li>
                <li>Content that promotes hate speech, violence, or discrimination.</li>
                <li>Obscene, defamatory, or explicitly harmful content.</li>
                <li>Misleading or fraudulent content.</li>
            </ul>
        
            <h5><strong>3.2. Infringement of Intellectual Property</strong></h5>
            <p>Content that infringes upon copyrights, trademarks, or other intellectual property rights will be removed upon verification.</p>
        
            <h5><strong>3.3. Privacy Violations</strong></h5>
            <p>Content that contains or mimics personal information without consent, including but not limited to names, images, or likenesses, will be removed to protect privacy rights.</p>
        
            <h5><strong>3.4. Unintended Resemblance to Real Individuals</strong></h5>
            <p>
                Although AI-generated content is fictional, instances where the generated content unintentionally resembles real
                individuals may warrant removal upon valid request.
            </p>
        
            <h4><strong>4. Requesting Content Removal</strong></h4>
            <p>Users or affected parties may request content removal by following the steps below:</p>
        
            <h5><strong>4.1. Submission of a Request</strong></h5>
            <p>
                Contact us at <strong>support@mysexywaifu.com</strong> or submit a request via the Platform’s contact section. Include
                the following details:
            </p>
            <ul>
                <li>Your name and contact information.</li>
                <li>A detailed description of the content to be removed, including URLs, screenshots, or specific timestamps where applicable.</li>
                <li>The grounds for removal (e.g., privacy concerns, intellectual property infringement).</li>
            </ul>
        
            <h5><strong>4.2. Verification Process</strong></h5>
            <p>To ensure the legitimacy of requests, we may require additional information to verify the identity of the requester and their relationship to the affected content. Examples of verification include:</p>
            <ul>
                <li>Proof of identity.</li>
                <li>Proof of ownership for intellectual property claims.</li>
            </ul>
        
            <h5><strong>4.3. Processing Timeline</strong></h5>
            <p>
                Once a request is received and verified, we aim to address it within <strong>10 business days</strong>. In complex
                cases, such as those requiring legal consultation, the process may take longer, but updates will be provided
                to the requester.
            </p>
        
            <h4><strong>5. Automated Moderation and Manual Review</strong></h4>
            <p>The Platform employs both automated and manual processes to ensure compliance with this policy:</p>
        
            <h5><strong>5.1. Automated Moderation</strong></h5>
            <p>Our automated systems are designed to:</p>
            <ul>
                <li>Detect and flag potentially harmful or inappropriate content.</li>
                <li>Prevent the generation of content that violates our guidelines.</li>
            </ul>
        
            <h5><strong>5.2. Manual Review</strong></h5>
            <p>Flagged content is reviewed by our moderation team to determine if it violates our policies. This dual-layer approach ensures accuracy and fairness in decision-making.</p>
        
            <h4><strong>6. Appeals Process</strong></h4>
            <p>
                If a user disagrees with a decision regarding content removal, they may appeal by sending an email to
                <strong>support@mysexywaifu.com</strong> with the subject line “Content Removal Appeal.” Provide detailed reasoning
                for the appeal and any supporting evidence.
            </p>
            <p>Appeals will be reviewed within <strong>15 business days</strong>, and the outcome will be communicated to the user. All decisions made during the appeals process are final.</p>
        
            <h4><strong>7. Privacy Protection</strong></h4>
            <p>
                We prioritize user privacy throughout the content removal process:
            </p>
            <ul>
                <li>All requests and supporting documents are treated as confidential.</li>
                <li>
                Personal information provided during the removal request or appeal process will not be disclosed to third
                parties without explicit consent unless required by law.
                </li>
            </ul>
        
            <h4><strong>8. Legal and Regulatory Compliance</strong></h4>
            <p>
                This policy aligns with applicable laws and regulations, including but not limited to:
            </p>
            <ul>
                <li>Privacy and data protection laws.</li>
                <li>Intellectual property rights and compliance obligations.</li>
            </ul>
        
            <h4><strong>9. Changes to the Policy</strong></h4>
            <p>
                We reserve the right to update or amend this Content Removal Policy as needed. Significant changes will be
                communicated via the Platform or email. Continued use of the Platform after changes are made constitutes
                acceptance of the revised policy.
            </p>
        
            <h4><strong>10. Contact Information</strong></h4>
            <p>For any questions or concerns regarding this Content Removal Policy, please contact us:</p>
            <ul>
                <li>Email: <strong>support@mysexywaifu.com</strong></li>
                <li>Contact Section: Accessible through the Platform.</li>
            </ul>
        
            <p>This Content Removal Policy is effective as of 12/31/2024. By using <strong>MySexyWaifu</strong>, you agree to the practices and processes outlined in this policy.</p>
        </div>

        <Footer />
    </div>
);
  
export default ContentRemovalPolicy;
