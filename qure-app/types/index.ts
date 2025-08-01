export interface Agent {
  id: string;
  name: string;
  location: string;
  rating: number;
  profilePhoto: string;
  experience: string;
  completedVerifications: number;
  verificationHistory: VerificationReport[];
}

export interface VerificationRequest {
  id: string;
  productTitle: string;
  productDescription: string;
  photos: string[];
  category: string;
  location: string;
  preferredAgent?: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: Date;
}

export interface VerificationReport {
  id: string;
  productName: string;
  category: string;
  photos: string[];
  agentName: string;
  agentId: string;
  report: string;
  status: 'verified' | 'rejected' | 'pending';
  date: Date;
  location: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  isAgent?: boolean;
}

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
  AgentProfile: { agentId: string };
  VerificationRequest: undefined;
  VerificationReport: { reportId: string };
};

export type MainTabParamList = {
  Home: undefined;
  MyRequests: undefined;
  Agents: undefined;
  Profile: undefined;
};