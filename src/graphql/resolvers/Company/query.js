import Company from '../../../models/Company';

export default {
  companies: async (parents, args, { employee }, info) =>
    await Company.find({}),
  company: async (parents, args, { employee }, info) => {
    const company = await Company.findById(args.id);
    if (!company) throw new Error('ຂໍອິໄພເກີດຂໍ້ຜິດພາດ ບໍພົບບໍລິສັດນີ້');
    return company;
  },
};
