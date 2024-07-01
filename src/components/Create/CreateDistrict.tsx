import { useNavigate } from "react-router-dom";
import useProvinces from "../../hooks/useProvinces";
import { useState } from "react";
import type { Province } from "../../services/province.services";
import { districtService } from "../../services/district.service";

type Props = {};

const CreateDistrict = ({}: Props) => {
  const navigate = useNavigate();
  const { provinces } = useProvinces();
  const [formData, setFormData] = useState<any>({
    ProvinceCode: "",
    ProvinceName: "",
    DistrictCode: "",
    DistrictName: "",
    FlagActive: "1",
  });

  const submitButton = async () => {
    if (formData.ProvinceCode === "") {
      alert("Please fill in the Province Code field");
      return;
    }
    if (formData.DistrictCode === "") {
      alert("Please fill in the District Code field");
      return;
    }
    const pushedData = JSON.parse(JSON.stringify(formData));
    delete pushedData.ProvinceName;
    const data = (await districtService.createDistrict(pushedData)) as any;
    if (data.error) {
      alert(data.error);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="w-1/2 overflow-y-scroll h-1/2 bg-gray-400 rounded-md">
      <div className="w-full flex items-center justify-center relative p-3">
        <button className="absolute left-3 top-3 px-3 py-1 bg-orange-300 rounded-xl" onClick={() => navigate(-1)}>
          Back
        </button>
        <p className="text-3xl font-bold">Create District</p>
      </div>
      <div className="flex flex-col w-3/4 gap-5">
        <label htmlFor="" className="flex justify-between">
          Province Code (*):
          <select
            value={formData.ProvinceCode}
            className="w-[200px] px-5 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                ProvinceCode: e.target.value,
                ProvinceName: provinces.find((province: Province) => province.ProvinceCode === e.target.value)
                  ?.ProvinceName,
              }))
            }
          >
            <option value="">Select Province</option>
            {provinces.length > 0 &&
              provinces.map((province) => (
                <option key={province.ProvinceCode} value={province.ProvinceCode}>
                  {province.ProvinceCode}
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="" className="flex justify-between">
          Province Name:
          <input
            type="text"
            name=""
            id=""
            disabled
            value={formData.ProvinceName || ""}
            className="w-[200px] px-5 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          />
        </label>
        <label htmlFor="" className="flex justify-between">
          District Code (*):
          <input
            type="text"
            value={formData.DistrictCode}
            required
            onChange={(e) => setFormData((prev: any) => ({ ...prev, DistrictCode: e.target.value }))}
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
            onChange={(e) => setFormData((prev: any) => ({ ...prev, FlagActive: e.target.checked ? "1" : "0" }))}
            className="w-[200px] px-5 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          />
        </label>
      </div>
      <div className="flex justify-center mt-10">
        <button className="px-6 py-2 bg-orange-400 rounded-md" onClick={submitButton}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateDistrict;
