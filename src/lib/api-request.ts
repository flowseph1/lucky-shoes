import { hottestSneakersData } from "@/data/hottest-sneakers";
import type { ApiResponse, SneakersData } from "@/types";

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
