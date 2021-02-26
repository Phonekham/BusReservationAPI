import Company from '../../../models/Company';

export default {
  companies: async (parents, args, { user }, info) => await Company.find({}),
  company: async (parents, args, { user }, info) => {
    const company = await Company.findById(args.id);
    if (!company) throw new Error('ຂໍອິໄພເກີດຂໍ້ຜິດພາດ ບໍພົບບໍລິສັດນີ້');
    return company;
  },
};
