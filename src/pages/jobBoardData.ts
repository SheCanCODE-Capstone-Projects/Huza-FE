export interface Job {
  id: number;
  title: string;
  company: string;
  companyInitials: string;
  companyColor: string;
  location: string;
  salary: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  jobType: 'Full Time' | 'Part Time' | 'Contract' | 'Freelance' | 'Internship';
  posted: string;
  skills: string[];
  category: string;
  experience: 'Junior' | 'Mid-Level' | 'Senior' | 'Lead';
  status?: 'Active' | 'Closed' | 'Draft';
  applicantCount?: number;
  inReviewCount?: number;
  icon?: string;
  filedBy?: string;
}

export interface Company {
  id: number;
  name: string;
  initials: string;
  color: string;
  openJobs: number;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  initials: string;
}

export const JOBS: Job[] = [
  { id: 1, title: 'Senior UI/UX Designer', company: 'Figma', companyInitials: 'FG', companyColor: '#7C3AED', location: 'San Francisco, CA', salary: '$120k–$160k', workMode: 'Remote', jobType: 'Full Time', posted: '2 days ago', skills: ['Figma', 'Prototyping', 'User Research'], category: 'UI/UX Design', experience: 'Senior', status: 'Active', applicantCount: 42, inReviewCount: 18 },
  { id: 2, title: 'Product Designer', company: 'Notion', companyInitials: 'NT', companyColor: '#000000', location: 'New York, NY', salary: '$100k–$140k', workMode: 'Hybrid', jobType: 'Full Time', posted: '1 day ago', skills: ['Figma', 'Design Systems', 'Wireframing'], category: 'Product Design', experience: 'Mid-Level', status: 'Active', applicantCount: 128, inReviewCount: 56 },
  { id: 3, title: 'Brand Designer', company: 'Stripe', companyInitials: 'ST', companyColor: '#635BFF', location: 'Remote', salary: '$90k–$120k', workMode: 'Remote', jobType: 'Full Time', posted: '3 days ago', skills: ['Illustrator', 'Branding', 'Typography'], category: 'Branding', experience: 'Mid-Level', status: 'Closed', applicantCount: 84, inReviewCount: 1, filedBy: 'Elias M.' },
  { id: 4, title: 'Motion Designer', company: 'Airbnb', companyInitials: 'AB', companyColor: '#FF5A5F', location: 'Los Angeles, CA', salary: '$95k–$130k', workMode: 'Hybrid', jobType: 'Full Time', posted: '5 days ago', skills: ['After Effects', 'Cinema 4D', 'Lottie'], category: 'Motion Design', experience: 'Senior', status: 'Active', applicantCount: 31, inReviewCount: 12 },
  { id: 5, title: 'Junior Graphic Designer', company: 'Mailchimp', companyInitials: 'MC', companyColor: '#FFE01B', location: 'Atlanta, GA', salary: '$55k–$75k', workMode: 'On-site', jobType: 'Full Time', posted: '1 week ago', skills: ['Photoshop', 'Illustrator', 'InDesign'], category: 'Graphic Design', experience: 'Junior', status: 'Closed', applicantCount: 12, inReviewCount: 0, filedBy: 'Aisha K.' },
  { id: 6, title: 'Web Designer', company: 'Shopify', companyInitials: 'SH', companyColor: '#96BF48', location: 'Toronto, Canada', salary: '$80k–$110k', workMode: 'Remote', jobType: 'Contract', posted: '4 days ago', skills: ['HTML/CSS', 'Figma', 'Webflow'], category: 'Web Design', experience: 'Mid-Level', status: 'Draft', applicantCount: 0, inReviewCount: 0 },
];

export const COMPANIES: Company[] = [
  { id: 1, name: 'Figma', initials: 'FG', color: '#7C3AED', openJobs: 12, description: 'Building the future of collaborative design tools.' },
  { id: 2, name: 'Notion', initials: 'NT', color: '#2F3530', openJobs: 8, description: 'All-in-one workspace for notes, docs, and projects.' },
  { id: 3, name: 'Stripe', initials: 'ST', color: '#635BFF', openJobs: 15, description: 'Financial infrastructure for the internet economy.' },
  { id: 4, name: 'Airbnb', initials: 'AB', color: '#FF5A5F', openJobs: 6, description: 'Creating a world where anyone can belong anywhere.' },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Sarah Chen', role: 'Senior UX Designer', company: 'Figma', text: 'Huza helped me land my dream role in just 3 weeks. The quality of job listings and the seamless application process made all the difference.', initials: 'SC' },
  { id: 2, name: 'Marcus Johnson', role: 'Product Designer', company: 'Notion', text: 'As a mid-level designer looking to level up, Huza connected me with companies that truly value design. Best career move I ever made.', initials: 'MJ' },
  { id: 3, name: 'Priya Patel', role: 'Brand Designer', company: 'Stripe', text: 'The category filters and skill matching saved me hours of searching. Found a remote role that perfectly matched my portfolio within days.', initials: 'PP' },
];

export const CATEGORIES = [
  { name: 'UI/UX Design', jobs: 1240, icon: 'Layers' },
  { name: 'Graphic Design', jobs: 890, icon: 'PenTool' },
  { name: 'Product Design', jobs: 760, icon: 'Package' },
  { name: 'Branding', jobs: 540, icon: 'Feather' },
  { name: 'Motion Design', jobs: 320, icon: 'Play' },
  { name: 'Illustration', jobs: 410, icon: 'Brush' },
  { name: 'Web Design', jobs: 680, icon: 'Monitor' },
  { name: '3D Design', jobs: 190, icon: 'Box' },
];

export const STATS = [
  { value: '5,000+', label: 'Active Jobs' },
  { value: '1,200', label: 'Hiring Companies' },
  { value: '15,000', label: 'Designers' },
  { value: '98%', label: 'Successful Matches' },
];
