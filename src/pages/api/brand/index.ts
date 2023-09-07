import { Brand } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse<Brand[]>) {
    switch (req.method) {
        case "GET":
            return await getBrands(req, res);

        default:
            throw new Error("Method not allowed");
    }
}

const getBrands = async (req: NextApiRequest, res: NextApiResponse<Brand[]>) => {
    const brands: Brand[] = await prisma.brand.findMany();
    return res.status(200).json(brands);
};
