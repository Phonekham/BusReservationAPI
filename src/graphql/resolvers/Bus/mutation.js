import { UserInputError } from 'apollo-server-express';

import Bus from '../../../models/Bus';

export default {
  addBus: async (parents, args, { employee }, info) => {
    const { licencePlate, company, busType } = args.input;
    const buses = await Bus.find({});

    // Validations
    if (!employee) {
      throw new Error('Access denied', {
        errors: {
          auth: 'ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ',
        },
      });
    }
    const isBusExist =
      (await buses.findIndex((bus) => bus.licencePlate === licencePlate)) > -1;
    if (licencePlate.trim().toUpperCase() === '') {
      throw new UserInputError('Bus Name Is Required', {
        errors: {
          bus: 'ກາລຸນາປ້ອນທະບຽນລົດ',
        },
      });
    } else if (isBusExist) {
      throw new UserInputError('LicencePlate Exist', {
        errors: {
          bus: 'ທະບຽນລົດນີ້ມີໃນລະບົບແລ້ວ ກາລຸນາກວດຄືນ',
        },
      });
    }
    if (!company) {
      throw new UserInputError('company is required', {
        errors: {
          bus: 'ກາລຸນາເລືອກບໍລິສັດ',
        },
      });
    }
    if (!busType) {
      throw new Error('bus type is required', {
        errors: {
          bus: 'ກາລຸນາເລືອກປະເພດລົດ',
        },
      });
    }

    const newBus = new Bus({ ...args.input });
    const bus = await newBus
      .save()
      .then((bus) =>
        bus
          .populate({ path: 'busType' })
          .populate({ path: 'company' })
          .execPopulate()
      );
    return bus;
  },
  updateBus: async (parents, args, { employee }, info) => {
    if (!employee)
      throw new Error('ທ່ານບໍມີສິດໃຊ້ງານຟັງຊັນນີ້ ກະລຸນາເຂົ້າສູ່ລະບົບ');
    try {
      const updateBus = await Bus.findByIdAndUpdate(
        args.input.id,
        {
          ...args.input,
        },
        { new: true }
      )
        .populate({ path: 'busType' })
        .populate({ path: 'company' });
      return updateBus;
    } catch (error) {
      throw new Error('Error', error);
    }
  },
  deleteBus: async (parents, args, { employee }, info) => {
    if (!employee)
      throw new Error('ທ່ານບໍມີສິດໃຊ້ງານຟັງຊັນນີ້ ກະລຸນາເຂົ້າສູ່ລະບົບ');
    try {
      const deleteBus = await Bus.findByIdAndDelete(args.id);
      return deleteBus;
    } catch (error) {
      throw new Error('Error', error);
    }
  },
};
