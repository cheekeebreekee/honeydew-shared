export interface CareCoordinator {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  detachedFromNewPatients?: boolean;
}
