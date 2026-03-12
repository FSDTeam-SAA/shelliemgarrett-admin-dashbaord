export interface Donor {
  name: string;
  email: string;
  mobile: string;
  country: string;
  city: string;
}

export interface Donation {
  _id: string;
  studentId: string | null;
  donor: Donor;
  amount: number;
  createdAt: string;
}

export interface Campaign {
  _id: string;
  name: string;
  description: string;
  media: { url: string }[];
  students: {
    studentId: string;
    name: string;
    email: string;
    raisedAmount: number;
  }[];
  totalRaised: number;
  raiseGoal: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
  studentDonations: Donation[];
  guestDonations: Donation[];
}