// src/pages/PrivacyPolicy.tsx
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

const List = styled.ul`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-left: ${({ theme }) => theme.spacing.xl};
`;

const ListItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const PrivacyPolicy = () => {
  return (
    <PageWrapper>
      <PolicyPageContainer>
        <PolicyCard>
        <CardHeader>
          <PolicyTitle>Privacy Policy</PolicyTitle>
          <LastUpdated>Last Updated: March 2024</LastUpdated>
        </CardHeader>
        <CardBody>
          <Text>
            At RewardFlow, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our service.
          </Text>

          <SectionTitle>Information We Collect</SectionTitle>
          <Text>We collect information that you provide directly to us, including:</Text>
          <List>
            <ListItem>Account information (name, email address, password)</ListItem>
            <ListItem>Profile information (bio, preferences, settings)</ListItem>
            <ListItem>Task data and content you create</ListItem>
            <ListItem>Payment and transaction information (for Web3 features)</ListItem>
            <ListItem>Communication data when you contact support</ListItem>
          </List>

          <SectionTitle>How We Use Your Information</SectionTitle>
          <Text>We use the information we collect to:</Text>
          <List>
            <ListItem>Provide, maintain, and improve our services</ListItem>
            <ListItem>Process transactions and send related information</ListItem>
            <ListItem>Send you technical notices and support messages</ListItem>
            <ListItem>Respond to your comments and questions</ListItem>
            <ListItem>Monitor and analyze trends and usage</ListItem>
            <ListItem>Detect, prevent, and address technical issues</ListItem>
          </List>

          <SectionTitle>Data Security</SectionTitle>
          <Text>
            We implement appropriate technical and organizational security measures to protect your
            personal information. However, no method of transmission over the Internet is 100% secure,
            and we cannot guarantee absolute security.
          </Text>

          <SectionTitle>Your Rights</SectionTitle>
          <Text>You have the right to:</Text>
          <List>
            <ListItem>Access and receive a copy of your personal data</ListItem>
            <ListItem>Rectify inaccurate or incomplete data</ListItem>
            <ListItem>Request deletion of your personal data</ListItem>
            <ListItem>Object to processing of your personal data</ListItem>
            <ListItem>Request restriction of processing</ListItem>
            <ListItem>Data portability</ListItem>
          </List>

          <SectionTitle>Contact Us</SectionTitle>
          <Text>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:privacy@rewardflow.com" style={{ color: '#6366F1' }}>privacy@rewardflow.com</a>
          </Text>
        </CardBody>
      </PolicyCard>
      </PolicyPageContainer>
      <AppFooter />
    </PageWrapper>
  );
};

