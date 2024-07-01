import { useEffect, useState } from "react";
import { provinceService, type Province } from "../services/province.services";

const useProvinces = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);

  const fetchProvince = async () => {
    try {
      const data = await provinceService.getProvinces();
      setProvinces(data as Province[]);
    } catch (error) {}
  };

  useEffect(() => {
    fetchProvince();
  }, []);

  return { provinces };
};

export default useProvinces;
