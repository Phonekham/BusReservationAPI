import { UserInputError, AuthenticationError } from 'apollo-server-express';

import Seat from '../../../models/Seat';
import BusType from '../../../models/BusType';

export default {
  addSeat: async (parents, args, { user }, info) => {
    const { seatNo, busType } = args.input;

    const seats = await Seat.find({
      busType: { $eq: busType },
    });
    const isSeatExist =
      (await seats.findIndex((seat) => seat.seatNo === seatNo)) > -1;

    // Check Auth
    if (!user) {
      throw new AuthenticationError(
        'ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ'
      );
    }

    if (seatNo.trim().toUpperCase() === '') {
      throw new UserInputError('SeatNo is required ', {
        errors: {
          seatNo: 'ກາລຸນາປ້ອນຊື່ບ່ອນນັ່ງ',
        },
      });
    } else if (isSeatExist) {
      throw new UserInputError('Seat Name Exist', {
        errors: {
          seat: 'ບ່ອນນັ່ງທີ່ທ່ານປ້ອນຊ້ຳກັນ ກາລຸນາກວດຄືນ',
        },
      });
    }

    const newSeat = new Seat({ ...args.input });
    const seat = await newSeat
      .save()
      .then((seat) => seat.populate({ path: 'busType' }).execPopulate());
    return seat;
  },
  updateSeat: async (parents, args, { user }, info) => {
    const { seatNo, busType } = args.input;
    // Check Auth
    if (!user)
      throw new AuthenticationError(
        'ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ'
      );

    const seat = await Seat.findById(args.input.id);
    const seats = await Seat.find({
      busType: { $eq: busType ? busType : seat.busType },
    });
    const isSeatExist =
      (await seats.findIndex((seat) => seat.seatNo === seatNo)) > -1;
    if (isSeatExist) {
      throw new UserInputError('Seat Name Exist', {
        errors: {
          seat: 'ບ່ອນນັ່ງທີ່ທ່ານປ້ອນຊ້ຳກັນ ກາລຸນາກວດຄືນ',
        },
      });
    }

    try {
      const updateSeat = await Seat.findByIdAndUpdate(
        args.input.id,
        {
          ...args.input,
        },
        { new: true }
      ).populate({ path: 'busType' });
      return updateSeat;
    } catch (error) {
      // throw new Error('Error', error.message);
      console.log(error);
    }
  },
  deleteSeat: async (parents, args, { user }, info) => {
    if (!user)
      throw new AuthenticationError(
        'ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ'
      );

    try {
      const deleteSeat = await Seat.findByIdAndDelete(args.id);
      return deleteSeat;
    } catch (error) {
      throw new Error('Error', error);
    }
  },
};
