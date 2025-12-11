// src/pages/Blog.tsx
import styled from 'styled-components';
import { PageContainer, Card, CardHeader, CardTitle, CardBody, AppFooter } from '../components/common';
import { Link } from 'react-router-dom';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px);
`;

const BlogPageContainer = styled(PageContainer)`
  max-width: 1000px;
  flex: 1;
`;

const BlogTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const BlogDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const BlogPost = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const PostDate = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PostTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PostExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ReadMoreLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with Web3 Task Management',
      date: 'March 15, 2024',
      excerpt: 'Learn how to connect your crypto wallet and start earning rewards for completing tasks. This guide covers everything you need to know about our Web3 integration.',
    },
    {
      id: 2,
      title: '5 Productivity Tips Using AI-Powered Features',
      date: 'March 10, 2024',
      excerpt: 'Discover how to leverage our AI features to boost your productivity. From smart suggestions to auto-categorization, learn how AI can help you stay organized.',
    },
    {
      id: 3,
      title: 'Collaboration Best Practices for Remote Teams',
      date: 'March 5, 2024',
      excerpt: 'Tips and tricks for using RewardFlow to collaborate effectively with your remote team. Learn how real-time features can keep everyone in sync.',
    },
    {
      id: 4,
      title: 'Understanding Your Productivity Analytics',
      date: 'February 28, 2024',
      excerpt: 'A deep dive into our analytics features. Learn how to interpret your productivity data and use insights to improve your workflow.',
    },
  ];

  return (
    <BlogPageContainer>
      <Card>
        <CardHeader>
          <BlogTitle>Blog</BlogTitle>
          <BlogDescription>
            Tips, tutorials, and updates from the RewardFlow team.
          </BlogDescription>
        </CardHeader>
      </Card>

      {blogPosts.map((post) => (
        <BlogPost key={post.id}>
          <CardBody>
            <PostDate>{post.date}</PostDate>
            <PostTitle>{post.title}</PostTitle>
            <PostExcerpt>{post.excerpt}</PostExcerpt>
            <ReadMoreLink to="#">Read More →</ReadMoreLink>
          </CardBody>
        </BlogPost>
      ))}
    </BlogPageContainer>
  );
};

