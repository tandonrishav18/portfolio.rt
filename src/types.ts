export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string;
  certificateTitle: string;
  certificateIssuer: string;
  certificateDate: string;
  certificateId: string;
  skills: string[];
  certificateType: 'bluestock' | 'ibm_edunet';
  logoUrl?: string;
  imageUrl?: string;
  certificatePdf?: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  journal: string;
  date: string;
  abstract: string;
  doi?: string;
  authors: string[];
  keyContributions: string[];
  pdfUrl?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  skills: string[];
  description?: string;
  certificateType?: 'sap' | 'ibm_edunet' | 'bluestock' | 'gcp' | 'aws' | 'meta' | 'deeplearning' | 'nptel' | 'cisco' | 'oracle' | 'microsoft' | 'custom_image';
  imageUrl?: string;
  width?: string;
  height?: string;
  tilt?: number;
  certificatePdf?: string;
}
