import useProvinces from "../../../../../hooks/useProvinces";

type Props = {
  setSelectedProvince: (province: string) => void;
  selectedProvince: string;
};

const InputSelectProvinces = ({
  selectedProvince,
  setSelectedProvince,
}: Props) => {
  const { provinces } = useProvinces();
  return (
    <div className="w-[300px] ">
      <label className="flex justify-between">
        <p>Province: </p>
        <select
          className="w-[200px] px-2 py-1"
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
        >
          <option value="">Chọn tất cả</option>
          {provinces.length > 0 &&
            provinces.map((province) => (
              <option key={province.ProvinceCode} value={province.ProvinceCode}>
                {province.ProvinceName}
              </option>
            ))}
        </select>
      </label>
    </div>
  );
};

export default InputSelectProvinces;
