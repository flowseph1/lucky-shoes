import { Sneaker } from "@/types/sneaker";

export type SneakersData = Sneaker[];

export interface ApiResponse<T> {
  status: string;
  code: number | string;
  data: T;
}
