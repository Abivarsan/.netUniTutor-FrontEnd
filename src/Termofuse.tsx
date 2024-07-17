import React from "react";
import Typography from "@mui/material/Typography";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div style={{ marginBottom: "20px" }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <div>{children}</div>
  </div>
);

// Section 1: Acceptance of Terms
export const AcceptanceOfTerms: React.FC = () => (
  <Section title="1. Acceptance of Terms">
    <Typography>
      By accessing and using the UniTutor platform, you agree to comply with and
      be bound by these Terms of Use. If you do not agree to these terms, please
      do not use our platform.
    </Typography>
  </Section>
);

// Section 2: User Accounts
export const UserAccounts: React.FC = () => (
  <Section title="2. User Accounts">
    <Typography>
      <strong>Registration:</strong> Users must provide accurate and complete
      information during registration. You are responsible for maintaining the
      confidentiality of your account and password.
    </Typography>
    <Typography>
      <strong>Account Security:</strong> You are responsible for all activities
      that occur under your account. Notify us immediately of any unauthorized
      use of your account.
    </Typography>
  </Section>
);

// Continue defining each section similarly...

// Section 3: Platform Usage
export const PlatformUsage: React.FC = () => (
  <Section title="3. Platform Usage">
    <Typography>
      <strong>User Conduct:</strong> You agree to use the platform only for
      lawful purposes and in accordance with these Terms of Use. You must not
      use the platform to engage in any illegal or harmful activities.
    </Typography>
    <Typography>
      <strong>Prohibited Activities:</strong> Users are prohibited from
      transmitting any unlawful, threatening, defamatory, obscene, or otherwise
      objectionable content. Any form of harassment, abuse, or harm to other
      users is strictly prohibited.
    </Typography>
  </Section>
);

// Section 4: Tutor-Student Interaction
export const TutorStudentInteraction: React.FC = () => (
  <Section title="4. Tutor-Student Interaction">
    <Typography>
      <strong>Responsibilities:</strong> Tutors and students are solely
      responsible for their interactions. UniTutor does not guarantee the
      quality or outcome of any tutoring sessions.
    </Typography>
    <Typography>
      <strong>Communication:</strong> All communication between tutors and
      students conducted through the UniTutor platform.
    </Typography>
  </Section>
);

// Section 5: Payment and Coins
export const PaymentAndCoins: React.FC = () => (
  <Section title="5. Payment and Coins">
    <Typography>
      <strong>Coin System:</strong> UniTutor uses a coin-based payment system.
      Tutors require coins to accept student requests. Coins can be purchased
      through our secure payment gateway.
    </Typography>
    <Typography>
      <strong>Refund Policy:</strong> Coins purchased are non-refundable. In
      case of any disputes, please contact our support team for assistance.
    </Typography>
  </Section>
);

// Continue defining each section similarly...

// Section 6: Reviews and Feedback
export const ReviewsAndFeedback: React.FC = () => (
  <Section title="6. Reviews and Feedback">
    <Typography>
      <strong>User Reviews:</strong> Students can leave reviews and ratings for
      tutors after sessions. Reviews must be honest and based on actual
      experiences.
    </Typography>
    <Typography>
      <strong>Moderation:</strong> UniTutor reserves the right to remove or
      moderate any reviews that violate our guidelines or terms.
    </Typography>
  </Section>
);

// Section 7: Privacy and Data Protection
export const PrivacyAndDataProtection: React.FC = () => (
  <Section title="7. Privacy and Data Protection">
    <Typography>
      <strong>Data Collection:</strong> We collect and use your personal
      information in accordance with our Privacy Policy. By using the platform,
      you consent to our data practices.
    </Typography>
    <Typography>
      <strong>Security:</strong> We employ advanced security measures to protect
      your data. However, we cannot guarantee absolute security and are not
      responsible for any breaches beyond our control.
    </Typography>
  </Section>
);

// Section 8: Intellectual Property
export const IntellectualProperty: React.FC = () => (
  <Section title="8. Intellectual Property">
    <Typography>
      <strong>Ownership:</strong> All content and materials on the UniTutor
      platform, including text, graphics, logos, and software, are the property
      of UniTutor or its licensors.
    </Typography>
    <Typography>
      <strong>Usage Rights:</strong> Users may access and use the content for
      personal, non-commercial purposes only. Any unauthorized use or
      reproduction of the content is prohibited.
    </Typography>
  </Section>
);

// Section 9: Termination
export const Termination: React.FC = () => (
  <Section title="9. Termination">
    <Typography>
      <strong>Suspension or Termination:</strong> UniTutor reserves the right to
      suspend or terminate user accounts for any violations of these Terms of
      Use or any other policies.
    </Typography>
    <Typography>
      <strong>Effect of Termination:</strong> Upon termination, your right to
      use the platform will immediately cease. Any data or content associated
      with your account may be deleted.
    </Typography>
  </Section>
);

// Section 10: Limitation of Liability
export const LimitationOfLiability: React.FC = () => (
  <Section title="10. Limitation of Liability">
    <Typography>
      <strong>Disclaimer:</strong> UniTutor provides the platform on an "as is"
      and "as available" basis. We do not guarantee that the platform will be
      error-free or uninterrupted.
    </Typography>
    <Typography>
      <strong>Liability:</strong> To the fullest extent permitted by law,
      UniTutor shall not be liable for any indirect, incidental, special, or
      consequential damages arising out of or in connection with your use of the
      platform.
    </Typography>
  </Section>
);

// Section 11: Changes to Terms
export const ChangesToTerms: React.FC = () => (
  <Section title="11. Changes to Terms">
    <Typography>
      <strong>Amendments:</strong> UniTutor reserves the right to modify these
      Terms of Use at any time. Any changes will be effective immediately upon
      posting on the platform.
    </Typography>
    <Typography>
      <strong>Notification:</strong> We will notify users of any significant
      changes to the terms via email or through the platform. Continued use of
      the platform after changes constitutes acceptance of the new terms.
    </Typography>
  </Section>
);

// Section 12: Governing Law
export const GoverningLaw: React.FC = () => (
  <Section title="12. Governing Law">
    <Typography>
      <strong>Jurisdiction:</strong> These Terms of Use shall be governed by and
      construed in accordance with the laws of Srilanka. Any
      disputes arising from these terms shall be resolved in the courts of Srilanka.
    </Typography>
    <Typography>
      By using UniTutor, you acknowledge that you have read, understood, and
      agree to be bound by these Terms of Use. If you have any questions or
      concerns, please contact us at <Typography variant="body1" color="blue">unitutor@gmail.com</Typography>
      .
    </Typography>
  </Section>
);

export default Section;
