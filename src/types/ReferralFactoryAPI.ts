export interface SharingEntity {
  social: string;
  url: string;
}

export interface ReferralFactoryUser {
  data: {
    id: number;
    referrer_id: number;
    campaign_id: number;
    qualified: boolean;
    qualified_at: string;
    first_name: string;
    email: string;
    code: string;
    reach: number;
    referrals_count: number;
    converted_referrals_count: number;
    source: string;
    date: string;
    url: string;
    sharing: SharingEntity[];
    campaign: object; // TBD
  };
}
