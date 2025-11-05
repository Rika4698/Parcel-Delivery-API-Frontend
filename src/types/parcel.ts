export type ParcelStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'BLOCKED'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'REORDER'

  

export interface ParcelDetails {
  address: string;
  note: string;
  phone: string;
  weight: number;
}

export interface StatusHistoryItem {
  status: ParcelStatus;
  updatedAt: string;
  updatedBy: {
    role: string;
  };
}


export interface Parcel {
  _id: string;
  trackingId: string;
  senderId: {
    name?: string;
    email?: string;
    picture?: string;
  };
  receiverEmail: string;
  parcelDetails: ParcelDetails;
  fee: number;
  currentStatus: ParcelStatus;
  statusHistory: StatusHistoryItem[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
