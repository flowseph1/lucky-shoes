import { Category } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse<Category[]>) {
    switch (req.method) {
        case "GET":
            return await getCategories(req, res);

        default:
            throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
    }
}

const getCategories = async (req: NextApiRequest, res: NextApiResponse<Category[]>) => {
    const categories: Category[] = await prisma.category.findMany();
    res.status(200).json(categories);
};
