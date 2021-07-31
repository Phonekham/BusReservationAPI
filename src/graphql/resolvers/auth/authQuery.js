import Member from "../../../models/Member";

const user = async (parents, args, { user }, info) => {
  try {
    return await Member.findById(args.id);
  } catch (error) {
    throw new Error("ເກີດຂໍ້ຜິດພາດ ບໍພົບໄອດີທີ່ທ່ານຄົ້ນຫາ");
  }
};

export default { user };
