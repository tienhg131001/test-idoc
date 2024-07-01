import { FC } from "react";
import InputSelectDistrict from "./InputSelectDistrict/InputSelectDistrict";
import InputSelectProvinces from "./InputSelectProvinces/InputSelectProvinces";
import InputSelectStatus from "./InputSelectStatus/InputSelectStatus";


type Props = {
  selectedProvince: string;
  setSelectedProvince: (province: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
};

const TableInput: FC<Props> = ({
  selectedProvince,
  setSelectedProvince,
  selectedDistrict,
  setSelectedDistrict,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className="p-5 flex flex-col gap-5">
      <InputSelectProvinces
        selectedProvince={selectedProvince}
        setSelectedProvince={setSelectedProvince}
      />
      <InputSelectDistrict
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
      />
      <InputSelectStatus
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
    </div>
  );
};

export default TableInput;
