import BusType from '../../../models/BusType';

export default {
  busTypes: async (parents, args, { employee }, info) => await BusType.find({}),
  busType: async (parents, args, { employee }, info) => {
    const busType = await BusType.findById(args.id);
    if (!busType) throw new Error('ຂໍອິໄພເກີດຂໍ້ຜິດພາດ ບໍພົບລົດປະເພດນີ້');
    return busType;
  },
};
