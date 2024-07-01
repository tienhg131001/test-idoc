type Props = {
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
};

const InputSelectDistrict = ({
  selectedDistrict,
  setSelectedDistrict,
}: Props) => {
  return (
    <div className="w-[300px] ">
      <label className="flex justify-between items-center">
        <p>District: </p>
        <input
          type="text"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="w-[200px] px-2 py-1"
        />
      </label>
    </div>
  );
};

export default InputSelectDistrict;
