import { useNavigate } from "react-router-dom";
import useTable from "../../../hooks/useTable";
import TableInput from "./TableInput/TableInput";
import { useState } from "react";
import { districtService, type District } from "../../../services/district.service";

type Props = {
  selectedProvince: string;
  setSelectedProvince: (province: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
};

const TableView = ({
  selectedProvince,
  setSelectedProvince,
  selectedDistrict,
  setSelectedDistrict,
  selectedStatus,
  setSelectedStatus,
}: Props) => {
  const { tableData, fetchDistrictData } = useTable(selectedProvince, selectedStatus, selectedDistrict);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<String[]>([]);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);

  const actionCheckAllItems = (event: any) => {
    if (event.target.checked) {
      setSelectedItems(tableData.map((item: District) => item.DistrictCode));
      setIsCheckAll(true);
    } else {
      setSelectedItems([]);
      setIsCheckAll(false);
    }
  };

  const actionSelectedItems = (event: any, district: string) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, district]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i !== district));
    }
  };

  const actionDeleteItems = () => {
    if (window.confirm("Are you sure to delete?")) {
      districtService.deleteSomeDistrict(selectedItems);
      fetchDistrictData();
      setSelectedItems([]);
      setIsCheckAll(false);
    }
  };

  return (
    <div className="w-3/4 overflow-y-scroll h-3/4 bg-gray-400 rounded-md">
      <div className="flex justify-around items-center">
        <TableInput
          selectedProvince={selectedProvince}
          setSelectedProvince={setSelectedProvince}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
        <button className="bg-green-400 px-6 py-3  rounded-xl" onClick={fetchDistrictData}>
          Find
        </button>
      </div>
      <div className="flex p-5 justify-between">
        <button className="px-3 py-1 bg-red-800 text-white" onClick={actionDeleteItems}>
          Delete
        </button>
        <button className="px-3 py-1 bg-red-400" onClick={() => navigate("/create")}>
          Create
        </button>
      </div>
      <div>
        <div className="w-full p-5">
          <table className="w-full border border-white">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border border-white">
                  <input type="checkbox" checked={isCheckAll} onChange={actionCheckAllItems} />
                </th>
                <th className="border border-white">STT</th>
                <th className="border border-white">Province Code</th>
                <th className="border border-white">Province Name</th>
                <th className="border border-white">District</th>
                <th className="border border-white">Status</th>
                <th className="border border-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData &&
                tableData.map((item: District, index: number) => (
                  <tr key={index} className="hover:bg-red-100 cursor-pointer">
                    <td className="border border-white text-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.some((selectedItem) => selectedItem === item.DistrictCode)}
                        onChange={(e) => actionSelectedItems(e, item.DistrictCode)}
                      />
                    </td>
                    <td className="border border-white text-center">{index + 1}</td>
                    <td className="border border-white">{item.ProvinceCode}</td>
                    <td className="border border-white">{item.DistrictName}</td>
                    <td className="border border-white">{item.DistrictCode}</td>
                    <td className="border border-white text-center">
                      {item.FlagActive === "1" ? "active" : "un-active"}
                    </td>
                    <td className="flex justify-center border border-white">
                      <button
                        className="px-3 py-1 bg-orange-400 rounded-xl my-2"
                        onClick={() => navigate(`/edit?districtCode=${item.DistrictCode}`)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableView;
