export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  readme_link: string;
  demo_link: string;
  repo_link: string;
  slack_id: string;
  created_at: string;
  updated_at: string;
}

export interface Devlog {
  text: string;
  id: number;
  attachment?: string;
  project_id: number;
  slack_id: string;
  created_at: string;
  updated_at: string;
}

export interface PayoutResponse {
  slack_id: string;
  payouts: Payout[];
  shells: number;
}

export interface Payout {
  amount: string;
  created_at: string;
  id: string;
  payable_type: string;
}