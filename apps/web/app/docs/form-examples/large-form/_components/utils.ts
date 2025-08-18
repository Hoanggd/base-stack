import { Option } from "@workspace/ui/components/select";

export type FormInputs = {
  isPublic: boolean;
  name: string;
  bio: string;
  birthday: string;
  gender: Option;
  languages: Language[];
  phoneNumber: string;
  works: {
    company: string;
    position: string;
    duration: {
      start: string;
      end: string;
    };
  }[];
  enableNotify?: boolean;
  notifyType: string;
};

export type Language = {
  label: string;
  value: string;
  flag: string;
};

export const languages: Language[] = [
  { label: "English - United Kingdom", value: "GB", flag: "🇬🇧" },
  { label: "English - United States", value: "US", flag: "🇺🇸" },
  { label: "French", value: "FR", flag: "🇫🇷" },
  { label: "German", value: "DE", flag: "🇩🇪" },
  { label: "Hindi", value: "IN", flag: "🇮🇳" },
  { label: "Italian", value: "IT", flag: "🇮🇹" },
  { label: "Japanese", value: "JP", flag: "🇯🇵" },
  { label: "Portuguese", value: "BR", flag: "🇧🇷" },
  { label: "Spanish", value: "MX", flag: "🇲🇽" },
];
