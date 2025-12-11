// src/pages/CookiePolicy.tsx
import styled from 'styled-components';
import { PageContainer, Card, CardHeader, CardTitle, CardBody, AppFooter } from '../components/common';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px);
`;

const PolicyPageContainer = styled(PageContainer)`
  max-width: 900px;
  flex: 1;
`;

const PolicyCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const PolicyTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const LastUpdated = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CookieTable = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CookieRow = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(139, 92, 246, 0.05) 100%
  );
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const CookieName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const CookiePurpose = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const CookiePolicy = () => {
  return (
    <PageWrapper>
      <PolicyPageContainer>
        <PolicyCard>
        <CardHeader>
          <PolicyTitle>Cookie Policy</PolicyTitle>
          <LastUpdated>Last Updated: March 2024</LastUpdated>
        </CardHeader>
        <CardBody>
          <Text>
            This Cookie Policy explains how RewardFlow uses cookies and similar technologies to recognize
            you when you visit our website and use our service.
          </Text>

          <SectionTitle>What Are Cookies?</SectionTitle>
          <Text>
            Cookies are small text files that are placed on your device when you visit a website. They are
            widely used to make websites work more efficiently and provide information to website owners.
          </Text>

          <SectionTitle>How We Use Cookies</SectionTitle>
          <Text>We use cookies for the following purposes:</Text>
          <CookieTable>
            <CookieRow>
              <CookieName>Authentication Cookies</CookieName>
              <CookiePurpose>Essential cookies that keep you logged in and maintain your session</CookiePurpose>
            </CookieRow>
            <CookieRow>
              <CookieName>Preference Cookies</CookieName>
              <CookiePurpose>Remember your preferences and settings for a better experience</CookiePurpose>
            </CookieRow>
            <CookieRow>
              <CookieName>Analytics Cookies</CookieName>
              <CookiePurpose>Help us understand how visitors interact with our service</CookiePurpose>
            </CookieRow>
            <CookieRow>
              <CookieName>Security Cookies</CookieName>
              <CookiePurpose>Protect against fraud and ensure security</CookiePurpose>
            </CookieRow>
          </CookieTable>

          <SectionTitle>Third-Party Cookies</SectionTitle>
          <Text>
            We may also use third-party cookies from trusted partners for analytics and advertising purposes.
            These cookies are subject to the respective third parties' privacy policies.
          </Text>

          <SectionTitle>Managing Cookies</SectionTitle>
          <Text>
            You can control and manage cookies through your browser settings. However, disabling certain
            cookies may affect the functionality of our service. Most browsers allow you to refuse or delete
            cookies, but this may impact your user experience.
          </Text>

          <SectionTitle>Contact Us</SectionTitle>
          <Text>
            If you have any questions about our use of cookies, please contact us at{' '}
            <a href="mailto:privacy@rewardflow.com" style={{ color: '#6366F1' }}>privacy@rewardflow.com</a>
          </Text>
        </CardBody>
      </PolicyCard>
      </PolicyPageContainer>
      <AppFooter />
    </PageWrapper>
  );
};

