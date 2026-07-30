export type School = {
  prefecture: string;
  kind: "国立" | "公立" | "私立";
  university: string;
  faculty: string;
  department: string;
  major?: string;
  course?: string;
  mode?: string;
  licenses: string[];
  licenseLevels?: Record<string, string[]>;
  note?: string;
};
