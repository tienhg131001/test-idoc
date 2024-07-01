import districtData from "../../db_district.json";

export type District = {
  DistrictCode: string;
  DistrictName: string;
  ProvinceCode: string;
  FlagActive: string;
};

class DistrictService {
  async getDistricts(FlagActive: string = "1") {
    try {
      return districtData.filter((district) => district.FlagActive === FlagActive);
    } catch (error) {
      return error;
    }
  }
  async getDistrictsByProvinceCode(provinceCode: string, FlagActive: string = "1") {
    try {
      return districtData.filter(
        (district) => district.ProvinceCode === provinceCode && district.FlagActive === FlagActive
      );
    } catch (error) {
      return error;
    }
  }
  async getDistrictByDistrictCode(districtCode: string) {
    try {
      return districtData.find((district) => {
        console.log(district.DistrictCode, districtCode);
        return district.DistrictCode === districtCode;
      });
    } catch (error) {
      return error;
    }
  }
  async updateDistrict(district: District) {
    try {
      const index = districtData.findIndex((item) => item.DistrictCode === district.DistrictCode);
      districtData[index] = district;
      return district;
    } catch (error) {
      return error;
    }
  }
  async createDistrict(district: District) {
    try {
      const finIndex = districtData.findIndex((item) => item.DistrictCode === district.DistrictCode);
      if (finIndex === -1) {
        districtData.push(district);
        return districtData;
      } else {
        return { error: "District Code already exist" };
      }
    } catch (error) {
      return error;
    }
  }
  async deleteSomeDistrict(district: String[]) {
    try {
      district.forEach((item) => {
        const index = districtData.findIndex((district) => district.DistrictCode === item);
        districtData.splice(index, 1);
      });
      return districtData;
    } catch (error) {
      return error;
    }
  }
}

export const districtService = new DistrictService();
