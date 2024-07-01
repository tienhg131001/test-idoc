import { useEffect, useState } from "react";
import { districtService, type District } from "../services/district.service";

const useTable = (selectedProvince: string, selectedStatus: string, selectedDistrict: string) => {
  const [tableData, setTableData] = useState<any>([]);

  const fetchDistrictData = async () => {
    const fetchData = selectedProvince
      ? districtService.getDistrictsByProvinceCode(selectedProvince, selectedStatus)
      : districtService.getDistricts(selectedStatus);

    const data = (await fetchData) as District[];

    if (data) {
      const filterData = selectedDistrict
        ? data.filter((item: any) => item.DistrictName.toLowerCase().includes(selectedDistrict.toLowerCase()))
        : data;
      setTableData(filterData);
    }
  };

  useEffect(() => {
    fetchDistrictData();
  }, []);
  return { tableData, fetchDistrictData };
};

export default useTable;
