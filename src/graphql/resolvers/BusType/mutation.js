import { UserInputError } from 'apollo-server-express';
import BusType from '../../../models/BusType';

export default {
  addBusType: async (parents, args, { employee }, info) => {
    const { type, capacity } = args.input;
    const busTypes = await BusType.find({});

    // Validations
    if (!employee)
      throw new Error('ທ່ານບໍມີສິດໃຊ້ງານຟັງຊັນນີ້ ກະລຸນາເຂົ້າສູ່ລະບົບ');
    const isBrandExist =
      (await busTypes.findIndex((busType) => busType.type === type)) > -1;
    if (type.trim().toUpperCase() === '') {
      throw new UserInputError('ກາລະນາປ້ອນປະເພດລົດ');
    } else if (isBrandExist) {
      throw new UserInputError('ລົດປະເພດນີ້ມີແລ້ວ');
    }
    if (!capacity) {
      throw new UserInputError('ກາລະນາປ້ອນຈຳນວນບ່ອນນັ່ງ');
    }

    const newBusType = new BusType({ ...args.input });
    const busType = await newBusType.save();
    return busType;
  },
};
