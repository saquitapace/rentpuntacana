export interface GuestsObject {
  guestAdults?: number;
  guestChildren?: number;
  guestInfants?: number;
}

export type StaySearchFormFields = "location" | "guests" | "dates";

export interface PropertyType {
  name: string;
  description: string;
  abbreviation: string;
  checked: boolean;
}

export interface ClassOfProperties extends PropertyType {}

export type DateRage = [Date | null, Date | null];

export interface BedBath {
  name: string;
  abbreviation: string;
  defaultValue : number;
}

export interface ClassOfBedBath extends BedBath {}

export interface OptionsType {
  field: string
  name: string
  en: string
  sp: string
  category: string
  checked?: boolean
}

export interface ClassOfOptions extends OptionsType {}