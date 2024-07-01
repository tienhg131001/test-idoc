import provinceData from "../../db_province.json";

export type Province = {
  ProvinceCode: string;
  ProvinceName: string;
  FlagActive: string;
};

class ProvinceService {
  constructor() {
  }

  async getProvinces(): Promise<Province[]> {
    return provinceData as Province[];
  }
  async getProvinceByProvinceCode(provinceCode: string) {
    return provinceData.find(
      (province: Province) => province.ProvinceCode === provinceCode
    );
  }
}

export const provinceService = new ProvinceService();
