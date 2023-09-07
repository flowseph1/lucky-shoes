"use client";

import { TableData, TableRow } from "@/src/interfaces/table";
import { useState } from "react";
import TabelBody from "./TableBody";
import TableHead from "./TableHead";

interface TableProps {
  dataHeader: TableData;
  dataBody: TableData;
  headerLabelExtractor?: string;
  bodyLabelExtractor?: string;
  onRowPress?: (item: TableRow) => void;
  elementsToShow?: number;
}

const Table = ({
  dataHeader,
  dataBody,
  headerLabelExtractor,
  bodyLabelExtractor,
  elementsToShow = 5,
  onRowPress,
}: TableProps) => {
  const [activePage, setActivePage] = useState(1);

  const [numberOfElements, setNumberOfElements] = useState(elementsToShow);

  return (
    <table className="w-full table-auto overflow-hidden rounded-lg text-sm">
      <TableHead
        dataHeader={dataHeader}
        headerLabelExtractor={headerLabelExtractor}
      />
      <TabelBody
        dataBody={dataBody}
        onRowPress={onRowPress}
        activePage={activePage}
        numberOfElements={numberOfElements}
        bodyLabelExtractor={bodyLabelExtractor}
      />
    </table>
  );
};

export default Table;
