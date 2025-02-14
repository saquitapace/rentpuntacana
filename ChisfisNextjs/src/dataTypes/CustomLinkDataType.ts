import { Route } from "@/routers/types";

export interface CustomLinkDataType {
  label: string;
  href: Route<string> | string;
  targetBlank?: boolean;
}