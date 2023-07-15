import { BaseDto } from './base-models';

export enum CustomerType {
  Individual = 'Individual',
  Corporate = 'Corporate',
  Contractor = 'Contractor',
}

export interface CustomerDto extends BaseDto {
  customerType: CustomerType;
  companyName?: string;
  UENNo?: string;
  POCName?: string;
  POCEmail?: string;
  POCContactNo?: string;

  PIC: string;
  PICEmail: string;
  PICContactNo: string;

  customerRemarks?: string;

  address1?: string;
  address2?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}
