import { UserInputError } from "apollo-server-express";
import Company from "../../../models/Company";

export default {
  addCompany: async (parents, args, { user }, info) => {
    const { name, address, tel, email } = args.input;
    const companies = await Company.find({});

    // Validations
    if (!user)
      throw new Error("ທ່ານບໍມີສິດໃຊ້ງານຟັງຊັນນີ້ ກະລຸນາເຂົ້າສູ່ລະບົບ");
    const isCompanyExist =
      (await companies.findIndex((company) => company.name === name)) > -1;
    if (name.trim().toUpperCase() === "") {
      throw new UserInputError("ກາລະນາປ້ອນຊື່ບໍລິສັດ");
    } else if (isCompanyExist) {
      throw new UserInputError("ຊື່ບໍລິສັດນີ້ມີແລ້ວ");
    }

    const newCompany = new Company({ ...args.input });
    const company = await newCompany.save();
    return company;
  },
  updateCompany: async (parents, args, { user }, info) => {
    if (!user)
      throw new Error("ທ່ານບໍມີສິດໃຊ້ງານຟັງຊັນນີ້ ກະລຸນາເຂົ້າສູ່ລະບົບ");
    try {
      const updateCompany = await Company.findByIdAndUpdate(
        args.id,
        {
          ...args.input,
        },
        { new: true }
      );
      return updateCompany;
    } catch (error) {
      throw new Error("Error", error);
    }
  },
  deleteCompany: async (parents, args, { user }, info) => {
    if (!user)
      throw new Error("ທ່ານບໍມີສິດໃຊ້ງານຟັງຊັນນີ້ ກະລຸນາເຂົ້າສູ່ລະບົບ");
    try {
      const deleteCompany = await Company.findByIdAndDelete(args.id);
      return deleteCompany;
    } catch (error) {
      throw new Error("Error", error);
    }
  },
};
