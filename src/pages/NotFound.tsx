// src/pages/NotFound.tsx
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { PageContainer, Button, AppFooter } from '../components/common';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px);
`;

const NotFoundContainer = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const NotFoundContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 600px;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin: 0;
  background: ${({ theme }) => theme.gradients.primary};
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientAnimation} 3s ease infinite;
  filter: drop-shadow(0 0 30px rgba(99, 102, 241, 0.5));
  line-height: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 6rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 4rem;
  }
`;

const ErrorIcon = styled.div`
  font-size: 6rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  animation: ${float} 3s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.5));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 4rem;
  }
`;

const ErrorTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ErrorDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
  animation: ${float} 20s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
`;

const BackgroundDecoration2 = styled.div`
  position: absolute;
  top: 50%;
  right: -20%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
  animation: ${float} 15s ease-in-out infinite reverse;
  pointer-events: none;
  z-index: 0;
`;

export const NotFound = () => {
  return (
    <PageWrapper>
      <NotFoundContainer>
        <BackgroundDecoration />
        <BackgroundDecoration2 />
        <NotFoundContent>
          <ErrorIcon>🔍</ErrorIcon>
          <ErrorCode>404</ErrorCode>
          <ErrorTitle>Page Not Found</ErrorTitle>
          <ErrorDescription>
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or the URL might be incorrect.
          </ErrorDescription>
          <ButtonGroup>
            <Button as={StyledLink} to="/" size="lg">
              Go Home
            </Button>
            <Button as={StyledLink} to="/tasks" variant="outline" size="lg">
              View Tasks
            </Button>
          </ButtonGroup>
        </NotFoundContent>
      </NotFoundContainer>
      <AppFooter />
    </PageWrapper>
  );
};


