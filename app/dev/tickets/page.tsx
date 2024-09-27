import { TicketsTable } from "../_components/datatables/TicketsTable";

const page = () => {
  return (
    <>
      <div className="flex w-full flex-col">
        <TicketsTable />
      </div>
    </>
  );
};

export default page;
