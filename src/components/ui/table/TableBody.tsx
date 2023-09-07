import { TableData, TableRow } from "@/types/table";
import { AnimatePresence, motion } from "framer-motion";

interface TableBodyProps {
  dataBody: TableData;
  bodyLabelExtractor?: string;
  activePage?: number;
  numberOfElements?: number;
  onRowPress?: (row: TableRow) => void;
}

const TableBody = ({
  dataBody,
  bodyLabelExtractor,
  activePage = 1,
  numberOfElements = 5,
  onRowPress,
}: TableBodyProps) => {
  const variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.3,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <tbody className="table-row-group bg-container-extra-light">
      <AnimatePresence mode="wait" initial={false}>
        {dataBody
          .slice(
            (activePage - 1) * numberOfElements,
            activePage * numberOfElements
          )
          .map((row, index) => (
            <motion.tr
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={index}
              className="h-[9rem] shrink-0 cursor-pointer border-b-[0.1rem] border-neutral-300 hover:bg-neutral-400"
              onClick={() => onRowPress && onRowPress(row)}
            >
              {Object.values(row).map((column, index) => (
                <td className="px-8 py-5" key={index}>
                  <div className="text-sm">
                    {typeof column === "string" ? column : column.label}
                  </div>
                </td>
              ))}
            </motion.tr>
            // <AdminProductTableRow key={item.id} onSelectProduct={onSelectProduct} item={item} />
          ))}
      </AnimatePresence>
    </tbody>
  );
};

export default TableBody;
