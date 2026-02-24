export interface MediaItem {
  url: string;
  public_id: string;
  _id: string;
}

export interface Student {
  studentId: string;
  name: string;
  email: string;
  others: Record<string, string>;
  raisedAmount: number;
}

export interface Donor {
  name: string;
  email: string;
  mobile: string;
  country: string;
  city: string;
}

export interface Donation {
  _id: string;
  studentId: string;
  donor: Donor;
  amount: number;
  createdAt: string;
}

export interface CreatedBy {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface Campaign {
  _id: string;
  name: string;
  description: string;
  media: MediaItem[];
  totalRaised: number;
  raiseGoal: string;
  createdBy: CreatedBy;
  students: Student[];
  donations: Donation[];
  createdAt: string;
  updatedAt: string;
}