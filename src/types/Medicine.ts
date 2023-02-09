export interface Medicine {
  id: string;
  instructions: string[];
  size: string | null;
  specialInstructions: string;
  refillExpiration: number | null;
  strength: string | null;
  refillCount: string | null;
  name: string;
}
