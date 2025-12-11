// src/pages/Documentation.tsx
import styled from 'styled-components';
import { PageContainer, Card, CardHeader, CardTitle, CardBody, AppFooter } from '../components/common';
import { Link } from 'react-router-dom';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px);
`;

const DocPageContainer = styled(PageContainer)`
  max-width: 1000px;
  flex: 1;
`;

const DocCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const DocTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const DocDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const DocLink = styled(Link)`
  display: block;
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(139, 92, 246, 0.05) 100%
  );
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateX(5px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const LinkTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
`;

const LinkDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSize.md};
  margin: 0;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Documentation = () => {
  return (
    <PageWrapper>
      <DocPageContainer>
        <DocCard>
          <CardHeader>
            <DocTitle>Documentation</DocTitle>
            <DocDescription>
              Comprehensive guides and documentation to help you get the most out of RewardFlow.
            </DocDescription>
          </CardHeader>
          <CardBody>
            <SectionTitle>Getting Started</SectionTitle>
            <DocLink to="/signup">
              <LinkTitle>Quick Start Guide</LinkTitle>
              <LinkDescription>Get up and running with RewardFlow in minutes</LinkDescription>
            </DocLink>
            <DocLink to="/">
              <LinkTitle>Creating Your First Task</LinkTitle>
              <LinkDescription>Learn how to create and manage tasks</LinkDescription>
            </DocLink>
            <DocLink to="/profile">
              <LinkTitle>Setting Up Your Profile</LinkTitle>
              <LinkDescription>Customize your profile and preferences</LinkDescription>
            </DocLink>

            <SectionTitle>Features</SectionTitle>
            <DocLink to="/web3-integration">
              <LinkTitle>Web3 Integration</LinkTitle>
              <LinkDescription>Connect your wallet and earn crypto rewards</LinkDescription>
            </DocLink>
            <DocLink to="/ai-powered">
              <LinkTitle>AI-Powered Features</LinkTitle>
              <LinkDescription>Learn about our AI capabilities</LinkDescription>
            </DocLink>
            <DocLink to="/collaboration">
              <LinkTitle>Real-Time Collaboration</LinkTitle>
              <LinkDescription>Work together with your team</LinkDescription>
            </DocLink>
            <DocLink to="/analytics">
              <LinkTitle>Analytics & Insights</LinkTitle>
              <LinkDescription>Track your productivity and get insights</LinkDescription>
            </DocLink>

            <SectionTitle>Advanced Topics</SectionTitle>
            <Text>
              For advanced topics, API documentation, and developer resources, check out our
              API Reference page. You can also visit our Support page if you need help or have questions.
            </Text>

            <SectionTitle>Need Help?</SectionTitle>
            <Text>
              Can't find what you're looking for? Visit our Support page or check out our Blog
              for tips, tutorials, and updates.
            </Text>
          </CardBody>
        </DocCard>
      </DocPageContainer>
      <AppFooter />
    </PageWrapper>
  );
};

