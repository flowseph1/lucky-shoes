import type { ReactNode } from "react";

export type LabelValue = { label: string | ReactNode; value: string | number };

export type TableData = string[] | { [key: string]: string | LabelValue }[];

export type TableRow = { [key: string]: string | LabelValue };
