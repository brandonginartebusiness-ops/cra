export interface LeadFormData {
  full_name: string;
  phone: string;
  email: string;
  claim_number?: string;
  help_type: string;
  message?: string;
  service_page: string;
}

export interface LeadRecord extends LeadFormData {
  id: string;
  created_at: string;
  status: string;
  notes?: string;
}
