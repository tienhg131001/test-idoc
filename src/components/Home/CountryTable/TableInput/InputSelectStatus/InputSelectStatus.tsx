type Props = {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
};

const InputSelectStatus = ({ selectedStatus, setSelectedStatus }: Props) => {
  return (
    <div className="w-[300px]">
      <label className="flex justify-between">
        <p>Status: </p>
        <input
          type="checkbox"
          checked={selectedStatus === "1"}
          onChange={(e) => setSelectedStatus(e.target.checked ? "1" : "0")}
          className="w-[200px] px-2 py-1"
        />
      </label>
    </div>
  );
};

export default InputSelectStatus;
