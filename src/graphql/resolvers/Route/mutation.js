import { UserInputError, AuthenticationError } from 'apollo-server-express';

import Route from '../../../models/Route';

export default {
  addRoute: async (parents, args, { user }, info) => {
    const { routeEngName, distance, destination } = args.input;
    const departure = 'ວຽງຈັນ';
    const name = departure.concat(' - ', destination);
    const routes = await Route.find({});

    // Check Auth
    if (!user) {
      throw new AuthenticationError(
        'ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ'
      );
    }

    const isRouteExist =
      (await routes.findIndex((route) => route.routeName === name)) > -1;

    if (isRouteExist) {
      throw new UserInputError('routename is exist', {
        errors: {
          routeName: 'ທະບຽນລົດນີ້ມີໃນລະບົບແລ້ວ ກາລຸນາກວດຄືນ',
        },
      });
    } else if (routeEngName.trim().toUpperCase() === '') {
      throw new UserInputError('Route EngName is required', {
        errors: {
          routeEngName: 'ກາລຸນາປ້ອນສາຍທາງພາສາອັງກິດ',
        },
      });
    } else if (!distance) {
      throw new UserInputError('Distance is required', {
        errors: {
          distance: 'ກາລຸນາປ້ອນໄລຍະທາງ',
        },
      });
    } else if (destination.trim().toUpperCase() === '') {
      throw new Error('Distance is required', {
        errors: {
          destination: 'ກາລຸນາປ້ອນປາຍທາງ',
        },
      });
    }

    const newRoute = new Route({ ...args.input, routeName: name });
    const route = await newRoute.save();
    return route;
  },
  updateRoute: async (parents, args, { user }, info) => {
    // Check Auth
    if (!user)
      throw new AuthenticationError(
        'ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ'
      );

    try {
      const updateRoute = await Route.findByIdAndUpdate(
        args.input.id,
        {
          ...args.input,
        },
        { new: true }
      );
      return updateRoute;
    } catch (error) {
      throw new Error('Error', error);
    }
  },
  deleteRoute: async (parents, args, { user }, info) => {
    if (!user)
      throw new AuthenticationError(
        'ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ'
      );

    try {
      const deleteRoute = await Route.findByIdAndDelete(args.id);
      return deleteRoute;
    } catch (error) {
      throw new Error('Error', error);
    }
  },
};
