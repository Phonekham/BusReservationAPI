import { UserInputError, AuthenticationError } from 'apollo-server-express';

import DepartureTime from '../../../models/DepartureTime';

export default {
  addDepartureTime: async (parents, args, { employee }, info) => {
    const { time, busType, fare, route } = args.input;

    const departureTimes = await DepartureTime.find({
      busType: { $eq: busType },
    });

    const isDepartureTimeExist =
      (await departureTimes.findIndex((dp) => dp.time === time)) > -1;

    // Check Auth
    if (!employee) {
      throw new AuthenticationError(
        'ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ'
      );
    }

    if (time === '') {
      throw new UserInputError('Time is required ', {
        errors: {
          routeName: 'ກາລຸນາປ້ອນເວລາລົດອອກ',
        },
      });
    } else if (isDepartureTimeExist) {
      throw new UserInputError('Time Exist', {
        errors: {
          time: 'ເວລາທີ່ທ່ານປ້ອນຊ້ຳກັນ ກາລຸນາກວດຄືນ',
        },
      });
    } else if (!fare) {
      throw new UserInputError('Fare is required', {
        errors: {
          fare: 'ກາລຸນາປ້ອນຄ່າເດີນທາງ',
        },
      });
    } else if (busType === '') {
      throw new Error('BusType is required', {
        errors: {
          bustype: 'ກາລຸນາເລືອກປະເພດລົດ',
        },
      });
    } else if (route === '') {
      throw new Error('Route is required', {
        errors: {
          bustype: 'ກາລຸນາເລືອກສາຍທາງ',
        },
      });
    }

    const newDepartureTime = new DepartureTime({ ...args.input });
    const departureTime = await newDepartureTime
      .save()
      .then((departureTime) =>
        departureTime
          .populate({ path: 'busType' })
          .populate({ path: 'route' })
          .execPopulate()
      );
    return departureTime;
  },
  updateDepartureTime: async (parents, args, { employee }, info) => {
    // Check Auth
    if (!employee)
      throw new AuthenticationError(
        'ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ'
      );

    try {
      const updateDepartureTime = await DepartureTime.findByIdAndUpdate(
        args.input.id,
        {
          ...args.input,
        },
        { new: true }
      )
        .populate({ path: 'busType' })
        .populate({ path: 'route' });
      return updateDepartureTime;
    } catch (error) {
      // throw new Error('Error', error.message);
      console.log(error);
    }
  },
  deleteDepartureTime: async (parents, args, { employee }, info) => {
    if (!employee)
      throw new AuthenticationError(
        'ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ'
      );

    try {
      const deleteDepartureTime = await DepartureTime.findByIdAndDelete(
        args.id
      );
      return deleteDepartureTime;
    } catch (error) {
      throw new Error('Error', error);
    }
  },
};
