import { homeData } from "@/data/home";
import { products } from "@/data/producst";
import { ApiResponse, HomeData, SneakersData } from "@/types";

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

export function getHomeData(): Promise<ApiResponse<HomeData>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: "success",
        code: 200,
        data: homeData,
      });
    }, 1000);
  });
}
