// src/pages/Landing.tsx
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import {
  Button,
  PageContainer,
  Footer,
  FooterContent,
  FooterGrid,
  FooterColumn,
  FooterTitle,
  FooterLink,
  FooterText,
  FooterLogo,
  SocialLinks,
  SocialLink,
  FooterBottom,
  Copyright,
  FooterLinks,
  FooterBottomLink,
  TaskIcon,
  LinkIcon,
  AIIcon,
  UsersIcon,
  CoinIcon,
  ChartIcon,
  LightningIcon,
  ChatIcon,
} from '../components/common';
import { useAppSelector } from '../store/hooks';

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

const glow = keyframes`
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
`;

const rotate3D = keyframes`
  0% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  33% {
    transform: rotateX(360deg) rotateY(180deg) rotateZ(90deg);
  }
  66% {
    transform: rotateX(180deg) rotateY(360deg) rotateZ(180deg);
  }
  100% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
`;

const float3D = keyframes`
  0%, 100% {
    transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg);
  }
  25% {
    transform: translate3d(20px, -30px, 50px) rotateX(90deg) rotateY(90deg);
  }
  50% {
    transform: translate3d(-20px, -60px, 100px) rotateX(180deg) rotateY(180deg);
  }
  75% {
    transform: translate3d(30px, -30px, 50px) rotateX(270deg) rotateY(270deg);
  }
`;

const pulse3D = keyframes`
  0%, 100% {
    transform: scale3d(1, 1, 1) translateZ(0);
    opacity: 0.6;
  }
  50% {
    transform: scale3d(1.2, 1.2, 1.2) translateZ(50px);
    opacity: 1;
  }
`;

const orbit = keyframes`
  0% {
    transform: rotateZ(0deg) translateX(150px) rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg) translateX(150px) rotateZ(-360deg);
  }
`;

const particleFloat = keyframes`
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  50% {
    transform: translate3d(var(--tx), var(--ty), var(--tz)) scale(1.5);
  }
`;

const LandingWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeroSectionWrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  perspective: 1000px;
  transform-style: preserve-3d;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
    animation: ${float} 20s ease-in-out infinite;
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -20%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
    animation: ${float} 15s ease-in-out infinite reverse;
    pointer-events: none;
  }
`;

// 3D Animated Shapes
const AnimatedShape = styled.div<{ $delay?: number; $size?: number; $color?: string; $duration?: number }>`
  position: absolute;
  width: ${({ $size = 100 }) => $size}px;
  height: ${({ $size = 100 }) => $size}px;
  pointer-events: none;
  transform-style: preserve-3d;
  animation: ${float3D} ${({ $duration = 20 }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay = 0 }) => $delay}s;
  opacity: 0.4;
  filter: blur(1px);
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${({ $color, theme }) => 
      $color || `linear-gradient(135deg, ${theme.colors.primary}40, ${theme.colors.accent}40)`};
    border-radius: 20%;
    box-shadow: 0 0 30px ${({ $color, theme }) => 
      $color || theme.colors.primary}40;
  }
  
  &::before {
    transform: rotateY(45deg) translateZ(${({ $size = 100 }) => $size * 0.5}px);
  }
  
  &::after {
    transform: rotateX(45deg) translateZ(${({ $size = 100 }) => $size * 0.5}px);
  }
`;

const Cube3D = styled.div<{ $delay?: number; $x?: number; $y?: number }>`
  position: absolute;
  width: 80px;
  height: 80px;
  left: ${({ $x = 10 }) => $x}%;
  top: ${({ $y = 20 }) => $y}%;
  transform-style: preserve-3d;
  animation: ${rotate3D} 15s linear infinite;
  animation-delay: ${({ $delay = 0 }) => $delay}s;
  pointer-events: none;
  opacity: 0.3;
  
  div {
    position: absolute;
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3));
    border: 1px solid rgba(99, 102, 241, 0.5);
    backdrop-filter: blur(10px);
  }
  
  div:nth-child(1) {
    transform: rotateY(0deg) translateZ(40px);
  }
  div:nth-child(2) {
    transform: rotateY(90deg) translateZ(40px);
  }
  div:nth-child(3) {
    transform: rotateY(180deg) translateZ(40px);
  }
  div:nth-child(4) {
    transform: rotateY(-90deg) translateZ(40px);
  }
  div:nth-child(5) {
    transform: rotateX(90deg) translateZ(40px);
  }
  div:nth-child(6) {
    transform: rotateX(-90deg) translateZ(40px);
  }
`;

const Orb3D = styled.div<{ $delay?: number; $x?: number; $y?: number; $size?: number }>`
  position: absolute;
  width: ${({ $size = 150 }) => $size}px;
  height: ${({ $size = 150 }) => $size}px;
  left: ${({ $x = 50 }) => $x}%;
  top: ${({ $y = 50 }) => $y}%;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, 
    rgba(99, 102, 241, 0.4), 
    rgba(139, 92, 246, 0.2),
    transparent 70%);
  box-shadow: 
    0 0 60px rgba(99, 102, 241, 0.3),
    inset 0 0 60px rgba(139, 92, 246, 0.2);
  animation: ${pulse3D} ${({ $delay = 4 }) => 4 + $delay * 0.5}s ease-in-out infinite;
  animation-delay: ${({ $delay = 0 }) => $delay}s;
  pointer-events: none;
  filter: blur(2px);
  transform-style: preserve-3d;
`;

const Particle = styled.div<{ $delay?: number; $tx?: string; $ty?: string; $tz?: string }>`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
  left: 50%;
  top: 50%;
  --tx: ${({ $tx = '0px' }) => $tx};
  --ty: ${({ $ty = '0px' }) => $ty};
  --tz: ${({ $tz = '0px' }) => $tz};
  animation: ${particleFloat} 8s ease-in-out infinite;
  animation-delay: ${({ $delay = 0 }) => $delay}s;
  pointer-events: none;
  opacity: 0;
`;

const OrbitingShape = styled.div<{ $delay?: number; $size?: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${({ $size = 60 }) => $size}px;
  height: ${({ $size = 60 }) => $size}px;
  transform-style: preserve-3d;
  animation: ${orbit} 20s linear infinite;
  animation-delay: ${({ $delay = 0 }) => $delay}s;
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, 
      rgba(99, 102, 241, 0.4), 
      rgba(139, 92, 246, 0.4));
    border-radius: 20%;
    transform: rotateX(45deg) rotateY(45deg);
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
    animation: ${rotate3D} 5s linear infinite;
  }
`;

const LandingContainer = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
  position: relative;
  overflow: hidden;
  padding-top: ${({ theme }) => theme.spacing.xxl};
  padding-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const HeroSection = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  backdrop-filter: blur(2px);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
  
  /* Add subtle glow effect */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${pulse3D} 4s ease-in-out infinite;
    z-index: -1;
    pointer-events: none;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      width: 400px;
      height: 400px;
    }
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.2;
  background: ${({ theme }) => theme.gradients.primary};
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientAnimation} 3s ease infinite;
  filter: drop-shadow(0 0 30px rgba(99, 102, 241, 0.5));
  padding: 0 ${({ theme }) => theme.spacing.md};
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
  
  /* Animated glow effect behind text */
  &::before {
    content: 'Reward Flow';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.gradients.primary};
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: blur(20px) opacity(0.5);
    z-index: -1;
    animation: ${gradientAnimation} 3s ease infinite;
    transform: translateZ(-50px);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 3rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 4rem;
    padding: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 5rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: 6rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.8;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.25rem;
    padding: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 1.5rem;
    max-width: 900px;
  }
`;

const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  width: 100%;
  position: relative;
  z-index: 1;
  padding: 0 ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl};
    padding: 0;
  }
`;

const FeatureCard = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(139, 92, 246, 0.05) 100%
  );
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.gradients.primary};
    opacity: 0.1;
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    border-color: ${({ theme }) => theme.colors.primary};
    
    &::before {
      left: 100%;
    }
  }
`;

const FeatureIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.5));
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  
  svg {
    width: 3.5rem;
    height: 3.5rem;
  }
  
  ${FeatureCard}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`;

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  margin-top: 0;
`;

const FeatureDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.7;
`;

const CTAButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    justify-content: center;
    width: auto;
    padding: 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

// How It Works Section
const HowItWorksSection = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.xxl} auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  position: relative;
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.gradients.primary};
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientAnimation} 3s ease infinite;
  padding: 0 ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.xxxl};
    padding: 0;
  }
`;

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.lg};
    padding: 0;
  }
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const StepCard = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(139, 92, 246, 0.05) 100%
  );
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  text-align: center;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.glow};
`;

const StepTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StepDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.7;
`;

// Stats Section
const StatsSection = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.xl} auto;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  position: relative;
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: ${({ theme }) => theme.spacing.xxl} auto;
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing.xl};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const StatCard = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(139, 92, 246, 0.05) 100%
  );
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(10px);
  text-align: center;
  transition: all 0.4s ease;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.xl};
    min-height: 140px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 160px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    transform: translateY(-2px);
  }
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  line-height: 1.2;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 3rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 3.5rem;
  }
`;

const StatLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0;
  line-height: 1.4;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.md};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

// Testimonials Section
const TestimonialsSection = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.xxl} auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  position: relative;
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const TestimonialCard = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(139, 92, 246, 0.05) 100%
  );
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 5rem;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.3;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TestimonialText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

const AuthorRole = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

export const Landing = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <LandingWrapper>
      {/* Full Screen Hero Section */}
      <HeroSectionWrapper>
        {/* 3D Animated Background Elements */}
        <AnimatedShape $delay={0} $size={120} $duration={25} style={{ left: '10%', top: '20%' }} />
        <AnimatedShape $delay={2} $size={80} $duration={30} style={{ right: '15%', top: '30%' }} />
        <AnimatedShape $delay={4} $size={150} $duration={35} style={{ left: '50%', bottom: '20%' }} />
        <AnimatedShape $delay={1} $size={100} $duration={28} style={{ right: '30%', bottom: '30%' }} />
        
        {/* 3D Cubes */}
        <Cube3D $delay={0} $x={15} $y={25}>
          <div></div><div></div><div></div><div></div><div></div><div></div>
        </Cube3D>
        <Cube3D $delay={5} $x={75} $y={60}>
          <div></div><div></div><div></div><div></div><div></div><div></div>
        </Cube3D>
        <Cube3D $delay={10} $x={50} $y={15}>
          <div></div><div></div><div></div><div></div><div></div><div></div>
        </Cube3D>
        
        {/* 3D Orbs */}
        <Orb3D $delay={0} $x={20} $y={40} $size={200} />
        <Orb3D $delay={3} $x={80} $y={20} $size={150} />
        <Orb3D $delay={6} $x={60} $y={70} $size={180} />
        
        {/* Orbiting Shapes */}
        <OrbitingShape $delay={0} $size={80} />
        <OrbitingShape $delay={10} $size={60} style={{ animationDuration: '25s' }} />
        
        {/* Particles */}
        <Particle $delay={0} $tx="200px" $ty="-200px" $tz="100px" />
        <Particle $delay={1} $tx="-150px" $ty="-250px" $tz="150px" />
        <Particle $delay={2} $tx="250px" $ty="200px" $tz="80px" />
        <Particle $delay={3} $tx="-200px" $ty="150px" $tz="120px" />
        <Particle $delay={4} $tx="180px" $ty="-150px" $tz="200px" />
        <Particle $delay={5} $tx="-180px" $ty="-100px" $tz="90px" />
        <Particle $delay={6} $tx="220px" $ty="180px" $tz="160px" />
        <Particle $delay={7} $tx="-220px" $ty="120px" $tz="110px" />
        
        <HeroSection>
          <HeroTitle>Reward Flow</HeroTitle>
          <HeroSubtitle>
            Organize your tasks, collaborate with your team, and achieve your goals.
            Built with cutting-edge technology including Web3, AI, and real-time collaboration.
          </HeroSubtitle>
          <CTAButtons>
            <Button as={StyledLink} to={isAuthenticated ? "/tasks" : "/signup"} size="lg">
              Get Started
            </Button>
            {!isAuthenticated && (
              <Button as={StyledLink} to="/login" variant="outline" size="lg">
                Sign In
              </Button>
            )}
          </CTAButtons>
        </HeroSection>
      </HeroSectionWrapper>

      {/* Rest of the content */}
      <LandingContainer>
        <FeaturesSection>
          <FeatureCard>
            <FeatureIcon><TaskIcon size={56} /></FeatureIcon>
            <FeatureTitle>Task Management</FeatureTitle>
            <FeatureDescription>
              Create, organize, and track your tasks with ease. Set priorities, due dates, and collaborate with your team.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon><LinkIcon size={56} /></FeatureIcon>
            <FeatureTitle>Web3 Integration</FeatureTitle>
            <FeatureDescription>
              Connect your crypto wallet, earn token rewards, and mint NFT badges for your achievements.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon><AIIcon size={56} /></FeatureIcon>
            <FeatureTitle>AI-Powered</FeatureTitle>
            <FeatureDescription>
              Get smart task suggestions, auto-categorization, and intelligent prioritization powered by AI.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon><UsersIcon size={56} /></FeatureIcon>
            <FeatureTitle>Real-Time Collaboration</FeatureTitle>
            <FeatureDescription>
              Work together in real-time with live updates, comments, and collaborative editing.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon><CoinIcon size={56} /></FeatureIcon>
            <FeatureTitle>Crypto Rewards</FeatureTitle>
            <FeatureDescription>
              Earn tokens and crypto rewards for completing tasks. Stake tokens and grow your earnings.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon><ChartIcon size={56} /></FeatureIcon>
            <FeatureTitle>Analytics & Insights</FeatureTitle>
            <FeatureDescription>
              Track your productivity, view detailed analytics, and get insights into your work patterns.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesSection>

        {/* How It Works Section */}
        <HowItWorksSection>
          <SectionTitle>How It Works</SectionTitle>
          <SectionSubtitle>
            Get started in three simple steps and transform your productivity
          </SectionSubtitle>
          <StepsContainer>
            <StepCard>
              <StepNumber>1</StepNumber>
              <StepTitle>Sign Up & Connect</StepTitle>
              <StepDescription>
                Create your account in seconds. Connect your crypto wallet to unlock Web3 features and start earning rewards.
              </StepDescription>
            </StepCard>
            <StepCard>
              <StepNumber>2</StepNumber>
              <StepTitle>Create & Organize</StepTitle>
              <StepDescription>
                Add your tasks, set priorities, and let AI help you organize. Collaborate with your team in real-time.
              </StepDescription>
            </StepCard>
            <StepCard>
              <StepNumber>3</StepNumber>
              <StepTitle>Complete & Earn</StepTitle>
              <StepDescription>
                Finish your tasks and earn crypto rewards. Collect NFT badges and watch your productivity grow.
              </StepDescription>
            </StepCard>
          </StepsContainer>
        </HowItWorksSection>

        {/* Stats Section */}
        <StatsSection>
          <SectionTitle>Trusted by Thousands</SectionTitle>
          <SectionSubtitle>
            Join a growing community of productive individuals and teams
          </SectionSubtitle>
          <StatsGrid>
            <StatCard>
              <StatNumber>10K+</StatNumber>
              <StatLabel>Active Users</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>500K+</StatNumber>
              <StatLabel>Tasks Completed</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>50K+</StatNumber>
              <StatLabel>NFTs Minted</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>99.9%</StatNumber>
              <StatLabel>Uptime</StatLabel>
            </StatCard>
          </StatsGrid>
        </StatsSection>

        {/* Testimonials Section */}
        <TestimonialsSection>
          <SectionTitle>What Our Users Say</SectionTitle>
          <SectionSubtitle>
            Don't just take our word for it - hear from our community
          </SectionSubtitle>
          <TestimonialsGrid>
            <TestimonialCard>
              <TestimonialText>
                RewardFlow has completely transformed how I manage my tasks. The AI suggestions are incredibly helpful, and earning crypto rewards makes productivity fun!
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorAvatar>SM</AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>Sarah Martinez</AuthorName>
                  <AuthorRole>Product Manager</AuthorRole>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
            <TestimonialCard>
              <TestimonialText>
                The Web3 integration is game-changing. My team loves earning NFT badges for milestones, and the real-time collaboration features keep us all in sync.
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorAvatar>JD</AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>James Davis</AuthorName>
                  <AuthorRole>Tech Lead</AuthorRole>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
            <TestimonialCard>
              <TestimonialText>
                Best task management tool I've used. The interface is beautiful, the features are powerful, and the crypto rewards are a nice bonus. Highly recommend!
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorAvatar>EW</AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>Emily Wilson</AuthorName>
                  <AuthorRole>Freelancer</AuthorRole>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialsGrid>
        </TestimonialsSection>
      </LandingContainer>

      {/* Footer */}
      <Footer>
        <FooterContent>
          <FooterGrid>
            <FooterColumn>
              <FooterLogo to="/">RewardFlow</FooterLogo>
              <FooterText>
                The modern task management platform with Web3 integration, AI-powered features, and real-time collaboration.
              </FooterText>
              <SocialLinks>
                <SocialLink href="#" aria-label="Twitter">𝕏</SocialLink>
                <SocialLink href="#" aria-label="GitHub"><LightningIcon size={20} /></SocialLink>
                <SocialLink href="#" aria-label="Discord"><ChatIcon size={20} /></SocialLink>
                <SocialLink href="#" aria-label="LinkedIn">in</SocialLink>
              </SocialLinks>
            </FooterColumn>
            <FooterColumn>
              <FooterTitle>Product</FooterTitle>
              <FooterLink to="/tasks">Tasks</FooterLink>
              <FooterLink to="/profile">Profile</FooterLink>
              <FooterLink to="/user-details">User Details</FooterLink>
              <FooterLink to="/signup">Sign Up</FooterLink>
            </FooterColumn>
            <FooterColumn>
              <FooterTitle>Features</FooterTitle>
              <FooterLink to="/web3-integration">Web3 Integration</FooterLink>
              <FooterLink to="/ai-powered">AI-Powered</FooterLink>
              <FooterLink to="/collaboration">Collaboration</FooterLink>
              <FooterLink to="/analytics">Analytics</FooterLink>
            </FooterColumn>
            <FooterColumn>
              <FooterTitle>Resources</FooterTitle>
              <FooterLink to="/documentation">Documentation</FooterLink>
              <FooterLink to="/api-reference">API Reference</FooterLink>
              <FooterLink to="/support">Support</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
            </FooterColumn>
          </FooterGrid>
          <FooterBottom>
            <Copyright>
              © {new Date().getFullYear()} RewardFlow. All rights reserved.
            </Copyright>
            <FooterLinks>
              <FooterBottomLink to="/privacy-policy">Privacy Policy</FooterBottomLink>
              <FooterBottomLink to="/terms-of-service">Terms of Service</FooterBottomLink>
              <FooterBottomLink to="/cookie-policy">Cookie Policy</FooterBottomLink>
            </FooterLinks>
          </FooterBottom>
        </FooterContent>
      </Footer>
    </LandingWrapper>
  );
};

