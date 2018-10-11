export interface Collaborator {
  email: string;
  photoURL: string;
  uid?: string;
  owner?: boolean;
  invitedBy?: string;
}
