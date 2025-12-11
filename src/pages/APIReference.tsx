// src/pages/APIReference.tsx
import styled from 'styled-components';
import { PageContainer, Card, CardHeader, CardTitle, CardBody, AppFooter } from '../components/common';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px);
`;

const APIPageContainer = styled(PageContainer)`
  max-width: 1000px;
  flex: 1;
`;

const APICard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const APITitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const APIDescription = styled.p`
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

const CodeBlock = styled.pre`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  overflow-x: auto;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Code = styled.code`
  color: ${({ theme }) => theme.colors.textLight};
  font-family: 'Courier New', monospace;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const Endpoint = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(139, 92, 246, 0.05) 100%
  );
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
`;

const Method = styled.span<{ method: string }>`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-right: ${({ theme }) => theme.spacing.sm};
  background: ${({ method, theme }) => 
    method === 'GET' ? theme.colors.success :
    method === 'POST' ? theme.colors.primary :
    method === 'PUT' ? theme.colors.warning :
    method === 'DELETE' ? theme.colors.danger :
    theme.colors.border
  };
  color: white;
`;

const EndpointPath = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Courier New', monospace;
  font-size: ${({ theme }) => theme.fontSize.md};
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const APIReference = () => {
  return (
    <PageWrapper>
      <APIPageContainer>
        <APICard>
        <CardHeader>
          <APITitle>API Reference</APITitle>
          <APIDescription>
            Complete API documentation for integrating RewardFlow into your applications.
          </APIDescription>
        </CardHeader>
        <CardBody>
          <SectionTitle>Base URL</SectionTitle>
          <CodeBlock>
            <Code>https://api.rewardflow.com/v1</Code>
          </CodeBlock>

          <SectionTitle>Authentication</SectionTitle>
          <Text>
            All API requests require authentication using Bearer tokens. Include your token in the Authorization header:
          </Text>
          <CodeBlock>
            <Code>{'Authorization: Bearer YOUR_ACCESS_TOKEN'}</Code>
          </CodeBlock>

          <SectionTitle>Endpoints</SectionTitle>
          
          <Endpoint>
            <Method method="GET">GET</Method>
            <EndpointPath>/api/health</EndpointPath>
            <Text style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              Health check endpoint. Returns server status.
            </Text>
          </Endpoint>

          <Endpoint>
            <Method method="POST">POST</Method>
            <EndpointPath>/api/auth/login</EndpointPath>
            <Text style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              Authenticate user and receive access token.
            </Text>
          </Endpoint>

          <Endpoint>
            <Method method="POST">POST</Method>
            <EndpointPath>/api/auth/signup</EndpointPath>
            <Text style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              Register a new user account.
            </Text>
          </Endpoint>

          <Endpoint>
            <Method method="GET">GET</Method>
            <EndpointPath>/api/tasks</EndpointPath>
            <Text style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              Retrieve all tasks for the authenticated user.
            </Text>
          </Endpoint>

          <Endpoint>
            <Method method="POST">POST</Method>
            <EndpointPath>/api/tasks</EndpointPath>
            <Text style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              Create a new task.
            </Text>
          </Endpoint>

          <SectionTitle>Rate Limits</SectionTitle>
          <Text>
            API requests are rate-limited to 100 requests per minute per API key.
            Rate limit information is included in response headers.
          </Text>

          <SectionTitle>Getting Started</SectionTitle>
          <Text>
            To get started with the API, you'll need to generate an API key from your profile settings.
            Once you have your API key, you can start making requests to our endpoints. For more detailed
            documentation and examples, please visit our full API documentation portal.
          </Text>
        </CardBody>
      </APICard>
      </APIPageContainer>
      <AppFooter />
    </PageWrapper>
  );
};

