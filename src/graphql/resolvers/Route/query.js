import { AuthenticationError, UserInputError } from 'apollo-server-express';

import Route from '../../../models/Route';

export default {
  routes: async (parents, args, { user }, info) => {
    //   Check Auth
    if (!user) {
      throw new AuthenticationError(
        'ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ'
      );
    }
    return await Route.find({});
  },
  route: async (parents, args, { user }, info) => {
    //   Check Auth
    if (!user) {
      throw new AuthenticationError(
        'ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ'
      );
    }

    const route = await Route.findById(args.id);
    if (!route) {
      throw new UserInputError('Route ID Not Found', {
        errors: {
          routeId: 'ເກີດຂໍ້ຜິດພາດ ບໍພົບໄອດີສາຍທາງນີ້',
        },
      });
    }
    return route;
  },
};
