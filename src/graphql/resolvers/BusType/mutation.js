import { UserInputError } from 'apollo-server-express';
import BusType from '../../../models/BusType';

export default {
  addBusType: async (parents, args, { user }, info) => {
    const { type, capacity } = args.input;
    const busTypes = await BusType.find({});

    // Validations
    if (!user)
      throw new Error('ທ່ານບໍມີສິດໃຊ້ງານຟັງຊັນນີ້ ກະລຸນາເຂົ້າສູ່ລະບົບ');
    const isBusTypeExist =
      (await busTypes.findIndex((busType) => busType.type === type)) > -1;
    if (type.trim().toUpperCase() === '') {
      throw new UserInputError('ກາລະນາປ້ອນປະເພດລົດ');
    } else if (isBusTypeExist) {
      throw new UserInputError('ລົດປະເພດນີ້ມີແລ້ວ');
    }
    if (!capacity) {
      throw new UserInputError('ກາລະນາປ້ອນຈຳນວນບ່ອນນັ່ງ');
    }

    const newBusType = new BusType({ ...args.input });
    const busType = await newBusType.save();
    return busType;
  },
  updateBusType: async (parents, args, { user }, info) => {
    if (!user)
      throw new Error('ທ່ານບໍມີສິດໃຊ້ງານຟັງຊັນນີ້ ກະລຸນາເຂົ້າສູ່ລະບົບ');
    try {
      const updateBusType = await BusType.findByIdAndUpdate(
        args.input.id,
        {
          ...args.input,
        },
        { new: true }
      );
      return updateBusType;
    } catch (error) {
      throw new Error('Error', error);
    }
  },
  deleteBusType: async (parents, args, { user }, info) => {
    if (!user)
      throw new Error('ທ່ານບໍມີສິດໃຊ້ງານຟັງຊັນນີ້ ກະລຸນາເຂົ້າສູ່ລະບົບ');
    try {
      const deleteBusType = await BusType.findByIdAndDelete(args.id);
      return deleteBusType;
    } catch (error) {
      throw new Error('Error', error);
    }
  },
};
