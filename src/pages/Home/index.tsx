import { useState } from "react";
import TableView from "../../components/Home/CountryTable/TableView";

const index = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("1");
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <TableView
        selectedProvince={selectedProvince}
        setSelectedProvince={setSelectedProvince}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
    </div>
  );
};

export default index;
