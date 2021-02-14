import { AuthenticationError } from 'apollo-server-express';

import Bus from '../../../models/Bus';

export default {
  buses: async (parents, args, { employee }, info) => {
    //   Check Auth
    if (!employee) {
      throw new AuthenticationError('Access denied', {
        errors: {
          auth: 'ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ',
        },
      });
    }
    return await Bus.find({})
      .populate({ path: 'busType' })
      .populate({ path: 'company' });
  },
  bus: async (parents, args, { employee }, info) => {
    //   Check Auth
    if (!employee)
      throw new Error('ທ່ານບໍມີສິດໃຊ້ງານຟັງຊັນນີ້ ກະລຸນາເຂົ້າສູ່ລະບົບ');

    try {
      return await Bus.findById(args.id)
        .populate({ path: 'busType' })
        .populate({ path: 'company' });
    } catch (error) {
      throw new Error('ເກີດຂໍ້ຜິດພາດ ບໍພົບໄອດີລົດທີ່ທ່ານຄົ້ນຫາ', {
        errors: {
          bus: 'ເກີດຂໍ້ຜິດພາດ ບໍພົບໄອດີລົດທີ່ທ່ານຄົ້ນຫາ',
        },
      });
    }
  },
};
