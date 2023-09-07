import { products } from "@/data/producst";
import { ApiResponse, SneakersData } from "@/types";

export function getSneakers(): Promise<ApiResponse<SneakersData>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: "success",
        code: 200,
        data: products,
      });
    }, 1000);
  });
}
