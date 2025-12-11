// src/pages/TermsOfService.tsx
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

export const TermsOfService = () => {
  return (
    <PageWrapper>
      <PolicyPageContainer>
        <PolicyCard>
        <CardHeader>
          <PolicyTitle>Terms of Service</PolicyTitle>
          <LastUpdated>Last Updated: March 2024</LastUpdated>
        </CardHeader>
        <CardBody>
          <Text>
            Please read these Terms of Service carefully before using RewardFlow. By accessing or using
            our service, you agree to be bound by these Terms.
          </Text>

          <SectionTitle>Acceptance of Terms</SectionTitle>
          <Text>
            By creating an account or using RewardFlow, you acknowledge that you have read, understood,
            and agree to be bound by these Terms of Service and our Privacy Policy.
          </Text>

          <SectionTitle>Use of Service</SectionTitle>
          <Text>You agree to use RewardFlow only for lawful purposes and in accordance with these Terms. You agree not to:</Text>
          <List>
            <ListItem>Violate any applicable laws or regulations</ListItem>
            <ListItem>Infringe upon the rights of others</ListItem>
            <ListItem>Transmit any harmful or malicious code</ListItem>
            <ListItem>Attempt to gain unauthorized access to our systems</ListItem>
            <ListItem>Interfere with or disrupt the service</ListItem>
            <ListItem>Use the service for any illegal or unauthorized purpose</ListItem>
          </List>

          <SectionTitle>Account Responsibility</SectionTitle>
          <Text>
            You are responsible for maintaining the confidentiality of your account credentials and for
            all activities that occur under your account. You must notify us immediately of any unauthorized
            use of your account.
          </Text>

          <SectionTitle>Web3 and Cryptocurrency</SectionTitle>
          <Text>
            When using Web3 features, you are responsible for the security of your cryptocurrency wallet.
            RewardFlow is not responsible for any loss of funds due to wallet security issues or user error.
            Cryptocurrency transactions are irreversible.
          </Text>

          <SectionTitle>Intellectual Property</SectionTitle>
          <Text>
            The RewardFlow service, including its original content, features, and functionality, is owned
            by RewardFlow and is protected by international copyright, trademark, and other intellectual
            property laws.
          </Text>

          <SectionTitle>Limitation of Liability</SectionTitle>
          <Text>
            RewardFlow shall not be liable for any indirect, incidental, special, consequential, or punitive
            damages resulting from your use or inability to use the service.
          </Text>

          <SectionTitle>Changes to Terms</SectionTitle>
          <Text>
            We reserve the right to modify these Terms at any time. We will notify users of any material
            changes. Your continued use of the service after changes constitutes acceptance of the new Terms.
          </Text>

          <SectionTitle>Contact Us</SectionTitle>
          <Text>
            If you have any questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:legal@rewardflow.com" style={{ color: '#6366F1' }}>legal@rewardflow.com</a>
          </Text>
        </CardBody>
      </PolicyCard>
      </PolicyPageContainer>
      <AppFooter />
    </PageWrapper>
  );
};

