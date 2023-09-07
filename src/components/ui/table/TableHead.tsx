import { TableData } from "@/interfaces/table";

interface TableHeadProps {
    dataHeader: TableData;
    headerLabelExtractor?: string;
}

const TableHead = ({ dataHeader, headerLabelExtractor }: TableHeadProps) => {
    return (
        <thead className="border-b-[0.1rem] border-neutral-100 bg-neutral-300 text-left text-text-light">
            <tr>
                {dataHeader.map((item, index) => (
                    <th className="px-8 py-5" key={index}>
                        {typeof item !== "string" ? item[headerLabelExtractor ?? "label"] : item}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHead;
