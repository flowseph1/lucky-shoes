import { homeData } from "@/data/home";
import { hottestSneakersData } from "@/data/hottest-sneakers";
import { products } from "@/data/producst";
import type { ApiResponse, HomeData, SneakersData } from "@/types";

export function getHottestSneakers(): Promise<ApiResponse<SneakersData>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: "success",
        code: 200,
        data: hottestSneakersData,
      });
    }, 1000);
  });
}
