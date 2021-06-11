import { AuthenticationError, UserInputError } from "apollo-server-express";

import Route from "../../../models/Route";

export default {
  routes: async (parents, args, { user }, info) => {
    return await Route.find({});
  },
  route: async (parents, args, { user }, info) => {
    const route = await Route.findById(args.id);
    if (!route) {
      throw new UserInputError("Route ID Not Found", {
        errors: {
          routeId: "ເກີດຂໍ້ຜິດພາດ ບໍພົບໄອດີສາຍທາງນີ້",
        },
      });
    }
    return route;
  },
};
