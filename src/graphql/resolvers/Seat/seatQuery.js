import { AuthenticationError, UserInputError } from 'apollo-server-express';

import Seat from '../../../models/Seat';

export default {
  seats: async (parents, args, { user }, info) => {
    const { busType } = args;
    //   Check Auth
    if (!user) {
      throw new AuthenticationError(
        'ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ'
      );
    }
    return await Seat.find({ busType: { $eq: busType } }).populate({
      path: 'busType',
    });
  },
  seat: async (parents, args, { user }, info) => {
    //   Check Auth
    if (!user) {
      throw new AuthenticationError(
        'ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ'
      );
    }

    const seat = await Seat.findById(args.id).populate({ path: 'busType' });
    if (!seat) {
      throw new UserInputError('Route ID Not Found', {
        errors: {
          seat: 'ເກີດຂໍ້ຜິດພາດ ບໍພົບໄອດີບ່ອນນັ່ງນີ້',
        },
      });
    }
    return seat;
  },
};
