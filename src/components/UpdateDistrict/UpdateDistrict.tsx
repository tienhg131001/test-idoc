import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useProvinces from "../../hooks/useProvinces";
import { districtService } from "../../services/district.service";

type Props = {};

const UpdateDistrict = ({}: Props) => {
  const [searchParams] = useSearchParams();
  const { districtCode } = Object.fromEntries(searchParams);
  const { provinces } = useProvinces();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({
    ProvinceCode: "",
    ProvinceName: "",
    DistrictCode: "",
    DistrictName: "",
    FlagActive: "",
  });

  const fetchData = async () => {
    const data = (await districtService.getDistrictByDistrictCode(districtCode)) as any;
    if (data) {
      setFormData((prev: any) => ({ ...prev, ...data }));
    }
    if (data?.ProvinceCode) {
      const districtData = provinces.find((province) => province.ProvinceCode === data.ProvinceCode);
      setFormData((prev: any) => ({ ...prev, ProvinceName: districtData?.ProvinceName }));
    }
  };

  const handleUpdateCheckbox = (e: any) => {
    e.target.checked ? setFormData({ ...formData, FlagActive: "1" }) : setFormData({ ...formData, FlagActive: "0" });
  };

  const updateData = () => {
    const pushedData = JSON.parse(JSON.stringify(formData));
    delete pushedData.ProvinceName;
    console.log(pushedData);
    const data = districtService.updateDistrict(pushedData) as any;
    if (data) {
      alert("Update success");
      navigate(-1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-1/2 overflow-y-scroll h-1/2 bg-gray-400 rounded-md">
      <div className="w-full flex items-center justify-center relative p-3">
        <button className="absolute left-3 top-3 px-3 py-1 bg-orange-300 rounded-xl" onClick={() => navigate(-1)}>
          Back
        </button>
        <p className="text-3xl font-bold">Update District</p>
      </div>
      <div className="flex flex-col w-3/4 gap-5">
        <label htmlFor="" className="flex justify-between">
          Province Code:
          <input
            type="text"
            value={formData.ProvinceCode}
            disabled
            className="w-[200px] px-5 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          />
        </label>
        <label htmlFor="" className="flex justify-between">
          Province Name:
          <select
            name=""
            id=""
            disabled
            className="w-[200px] px-5 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {provinces.length > 0 &&
              provinces.map((province) => (
                <>
                  {province.ProvinceCode === formData.ProvinceCode && (
                    <option key={province.ProvinceCode} value={province.ProvinceCode}>
                      {province.ProvinceName}
                    </option>
                  )}
                </>
              ))}
          </select>
        </label>
        <label htmlFor="" className="flex justify-between">
          District Code:
          <input
            type="text"
            value={formData.DistrictCode}
            disabled
            className="w-[200px] px-5 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          />
        </label>
        <label htmlFor="" className="flex justify-between">
          District Name:
          <input
            type="text"
            value={formData.DistrictName}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, DistrictName: e.target.value }))}
            className="w-[200px] px-5 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          />
        </label>
        <label htmlFor="" className="flex justify-between">
          Status:
          <input
            type="checkbox"
            checked={formData.FlagActive === "1"}
            onChange={handleUpdateCheckbox}
            className="w-[200px] px-5 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          />
        </label>
      </div>
      <div className="flex justify-center mt-10">
        <button className="px-6 py-2 bg-orange-400 rounded-md" onClick={updateData}>
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateDistrict;
