export interface PropertyType {
  name: string;
  description: string;
  abbreviation?: string;
  checked: boolean;
}

export interface ClassOfProperties extends PropertyType {}