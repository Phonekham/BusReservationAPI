import Member from "../../../models/Member";
import Employee from "../../../models/Employee";

const user = async (parents, args, { user }, info) => {
  try {
    return await Member.findById(args.id);
  } catch (error) {
    throw new Error("ເກີດຂໍ້ຜິດພາດ ບໍພົບໄອດີທີ່ທ່ານຄົ້ນຫາ");
  }
};

const employees = async (parents, args, { user }, info) => {
  try {
    return await Employee.find({});
  } catch (error) {
    throw new Error("ເກີດຂໍ້ຜິດພາດການຕິດຕໍ່ເຊີບເວີ");
  }
};

const admin = async (parents, args, { user }, info) => {
  try {
    return await Employee.findById(args.id);
  } catch (error) {
    throw new Error("ເກີດຂໍ້ຜິດພາດການຕິດຕໍ່ເຊີບເວີ");
  }
};

export default { user, employees, admin };
