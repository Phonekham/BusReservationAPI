import { AuthenticationError, UserInputError } from "apollo-server-express";

import DepartureTime from "../../../models/DepartureTime";

export default {
  departureTimes: async (parents, args, { user }, info) => {
    //   Check Auth
    if (!user) {
      throw new AuthenticationError(
        "ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ"
      );
    }
    return await DepartureTime.find({})
      .populate({ path: "busType" })
      .populate({ path: "route" });
  },
  departureTime: async (parents, args, { user }, info) => {
    //   Check Auth
    if (!user) {
      throw new AuthenticationError(
        "ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ"
      );
    }

    const departureTime = await DepartureTime.findById(args.id)
      .populate({ path: "busType" })
      .populate({ path: "route" });
    if (!departureTime) {
      throw new UserInputError("Route ID Not Found", {
        errors: {
          departureTimeId: "ເກີດຂໍ້ຜິດພາດ ບໍພົບໄອດີເວລາສາຍທາງນີ້",
        },
      });
    }
    return departureTime;
  },
  routeDepartureTime: async (parents, args, { user }, info) => {
    //   Check Auth
    if (!user) {
      throw new AuthenticationError(
        "ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ"
      );
    }

    try {
      const departureTime = await DepartureTime.find({
        route: { $eq: args.route },
      })
        .populate({ path: "busType" })
        .populate({ path: "route" });
      if (!departureTime) {
        throw new UserInputError("Route ID Not Found", {
          errors: {
            departureTimeId: "ເກີດຂໍ້ຜິດພາດ ບໍພົບໄອດີເວລາສາຍທາງນີ້",
          },
        });
      }
      console.log(departureTime);
      return departureTime;
    } catch (error) {
      console.log(error);
    }
  },
};
