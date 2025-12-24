import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Input, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, PageContainer, MFAVerification } from '../components/common';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchUserProfile, updateUserProfile } from '../store/slices/userSlice';
import { useToast } from '../components/common/Toast';
import { API_ENDPOINTS } from '../config/api';

const ProfileContainer = styled(PageContainer)`
  max-width: 600px;
  padding: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

const ProfileCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    text-align: left;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const Avatar = styled.div<{ $hasImage?: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ $hasImage, theme }) => $hasImage ? 'transparent' : `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: white;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const AvatarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: white;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  ${Avatar}:hover & {
    opacity: 1;
  }
`;

const AvatarInput = styled.input`
  display: none;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  color: ${({ theme }) => theme.colors.text};
`;

const UserEmail = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSize.md};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const QRCodeImage = styled.img`
  max-width: 200px;
  margin: ${({ theme }) => theme.spacing.md} auto;
  display: block;
`;

const SecretKey = styled.div`
  background: #f5f5f5;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: monospace;
  text-align: center;
  word-break: break-all;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const StatusBadge = styled.span<{ enabled: boolean }>`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  background: ${({ enabled }) => enabled ? '#10B981' : '#EF4444'};
  color: white;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ErrorContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.danger}20;
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.danger};
`;

const MFASection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const MFAText = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const MFATitle = styled.p`
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

const MFADescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Profile = () => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const { user, token } = useAppSelector((state) => state.auth);
  const { profile, isLoading, error } = useAppSelector((state) => state.user);
  const { showToast } = useToast();
  
  // MFA state
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaSetupMode, setMfaSetupMode] = useState(false);
  const [mfaQRCode, setMfaQRCode] = useState<string | null>(null);
  const [mfaSecret, setMfaSecret] = useState<string | null>(null);
  const [mfaVerifying, setMfaVerifying] = useState(false);
  const [mfaError, setMfaError] = useState<string | null>(null);

  // Fetch user profile when component mounts or user changes
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserProfile(user.id));
      fetchMFAStatus();
    }
  }, [dispatch, user?.id]);

  // Initialize form data from Redux store when profile is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        bio: profile.bio || '',
      });
      setAvatarPreview(profile.avatarUrl || null);
    } else if (user) {
      // Fallback to auth user data if profile doesn't exist
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: '',
      });
      setAvatarPreview(null);
    }
  }, [profile, user]);

  const fetchMFAStatus = async () => {
    // This would typically come from user profile API
    // For now, we'll check it when setting up
  };

  const handleMFASetup = async () => {
    if (!user?.id) return;
    
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.MFA_SETUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to setup MFA');
      }

      const data = await response.json();
      setMfaQRCode(data.qrCode);
      setMfaSecret(data.secret);
      setMfaSetupMode(true);
      setMfaError(null);
    } catch (error: any) {
      setMfaError(error.message);
      showToast(error.message, 'error');
    }
  };

  const handleMFAVerify = async (code: string) => {
    if (!user?.id || !mfaSecret) return;
    
    setMfaVerifying(true);
    setMfaError(null);

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.MFA_VERIFY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          code,
          secret: mfaSecret,
          action: 'setup',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'MFA verification failed');
      }

      setMfaEnabled(true);
      setMfaSetupMode(false);
      setMfaQRCode(null);
      setMfaSecret(null);
      showToast('MFA enabled successfully!', 'success');
    } catch (error: any) {
      setMfaError(error.message);
      showToast(error.message, 'error');
    } finally {
      setMfaVerifying(false);
    }
  };

  const handleMFADisable = async () => {
    if (!user?.id) return;
    
    // For disabling, we need to verify the code first
    // This would typically show a verification modal
    const code = prompt('Enter your 6-digit code to disable MFA:');
    if (!code) return;

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.MFA_DISABLE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          code,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to disable MFA');
      }

      setMfaEnabled(false);
      showToast('MFA disabled successfully', 'success');
    } catch (error: any) {
      showToast(error.message, 'error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size must be less than 5MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setAvatarPreview(result);
      
      if (!user?.id) return;
      
      dispatch(updateUserProfile({
        userId: user.id,
        avatarUrl: result,
      })).unwrap().then(() => {
        showToast('Profile picture updated successfully!', 'success');
      }).catch((error: any) => {
        showToast(error || 'Failed to update profile picture', 'error');
        setAvatarPreview(profile?.avatarUrl || null);
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      await dispatch(updateUserProfile({
        userId: user.id,
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
      })).unwrap();
      
      setIsEditing(false);
      showToast('Profile updated successfully!', 'success');
    } catch (error: any) {
      showToast(error || 'Failed to update profile', 'error');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data from Redux store
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        bio: profile.bio || '',
      });
      setAvatarPreview(profile.avatarUrl || null);
    } else if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: '',
      });
      setAvatarPreview(null);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get display values (use formData if editing, otherwise use profile/user)
  const displayName = isEditing ? formData.name : (profile?.name || user?.name || '');
  const displayEmail = isEditing ? formData.email : (profile?.email || user?.email || '');
  const currentAvatarUrl = avatarPreview || profile?.avatarUrl || '';

  if (isLoading && !profile) {
    return (
      <ProfileContainer>
        <ProfileCard>
          <CardBody>
            <LoadingContainer>
              Loading profile...
            </LoadingContainer>
          </CardBody>
        </ProfileCard>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <ProfileCard>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardBody>
          {error && (
            <ErrorContainer>
              {error}
            </ErrorContainer>
          )}
          <ProfileHeader>
            <Avatar 
              $hasImage={!!currentAvatarUrl}
              onClick={() => document.getElementById('profile-avatar-input')?.click()}
            >
              {currentAvatarUrl ? (
                <>
                  <AvatarImage src={currentAvatarUrl} alt={displayName || 'User'} />
                  <AvatarOverlay>Change Photo</AvatarOverlay>
                </>
              ) : (
                getInitials(displayName || 'User')
              )}
            </Avatar>
            <AvatarInput
              id="profile-avatar-input"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <UserInfo>
              <UserName>{displayName || 'User'}</UserName>
              <UserEmail>{displayEmail || 'No email'}</UserEmail>
            </UserInfo>
          </ProfileHeader>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter your name"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter your name"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="bio">Bio</Label>
              <Input
                type="text"
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Tell us about yourself"
              />
            </FormGroup>
            {isEditing ? (
              <ButtonGroup>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                  Cancel
                </Button>
              </ButtonGroup>
            ) : (
              <Button type="button" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </Form>
        </CardBody>
      </ProfileCard>

      {/* MFA Settings Card */}
      <ProfileCard>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardBody>
          <MFASection>
            <StatusBadge enabled={mfaEnabled}>
              {mfaEnabled ? 'Enabled' : 'Disabled'}
            </StatusBadge>
          </MFASection>

          {mfaSetupMode && mfaQRCode && mfaSecret ? (
            <div>
              <MFAText>
                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
              </MFAText>
              <QRCodeImage src={mfaQRCode} alt="MFA QR Code" />
              <MFATitle>
                Or enter this code manually:
              </MFATitle>
              <SecretKey>{mfaSecret}</SecretKey>
              
              <MFAVerification
                userId={user?.id || ''}
                onVerify={handleMFAVerify}
                onCancel={() => {
                  setMfaSetupMode(false);
                  setMfaQRCode(null);
                  setMfaSecret(null);
                }}
                isLoading={mfaVerifying}
                error={mfaError}
                title="Verify Setup"
                instructions="Enter the 6-digit code from your authenticator app to complete setup"
              />
            </div>
          ) : (
            <div>
              {mfaEnabled ? (
                <Button variant="outline" onClick={handleMFADisable}>
                  Disable MFA
                </Button>
              ) : (
                <Button onClick={handleMFASetup}>
                  Enable MFA
                </Button>
              )}
              <MFADescription>
                {mfaEnabled 
                  ? 'Your account is protected with two-factor authentication.'
                  : 'Add an extra layer of security to your account by enabling two-factor authentication.'}
              </MFADescription>
            </div>
          )}
        </CardBody>
      </ProfileCard>
    </ProfileContainer>
  );
};



