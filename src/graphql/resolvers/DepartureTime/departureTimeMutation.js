import { UserInputError, AuthenticationError } from "apollo-server-express";

import DepartureTime from "../../../models/DepartureTime";

export default {
  addDepartureTime: async (parents, args, { user }, info) => {
    const { time, busType, fare, route } = args.input;

    const isDepartureTimeExist = await DepartureTime.findOne({
      route,
      time,
    });

    // Check Auth
    if (!user) {
      throw new AuthenticationError(
        "ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ"
      );
    }

    if (time === "") {
      throw new UserInputError("Time is required ", {
        errors: {
          routeName: "ກາລຸນາປ້ອນເວລາລົດອອກ",
        },
      });
    } else if (isDepartureTimeExist) {
      throw new UserInputError("ເວລາທີ່ທ່ານປ້ອນຊ້ຳກັນ ກາລຸນາກວດຄືນ", {
        errors: {
          time: "ເວລາຖ້ຽວທີ່ທ່ານປ້ອນຊ້ຳກັນ ກາລຸນາກວດຄືນ",
        },
      });
    } else if (!fare) {
      throw new UserInputError("Fare is required", {
        errors: {
          fare: "ກາລຸນາປ້ອນຄ່າເດີນທາງ",
        },
      });
    } else if (busType === "") {
      throw new Error("BusType is required", {
        errors: {
          bustype: "ກາລຸນາເລືອກປະເພດລົດ",
        },
      });
    } else if (route === "") {
      throw new Error("Route is required", {
        errors: {
          bustype: "ກາລຸນາເລືອກສາຍທາງ",
        },
      });
    }

    const newDepartureTime = new DepartureTime({ ...args.input });
    const departureTime = await newDepartureTime
      .save()
      .then((departureTime) =>
        departureTime
          .populate({ path: "busType" })
          .populate({ path: "route" })
          .execPopulate()
      );
    return departureTime;
  },
  updateDepartureTime: async (parents, args, { user }, info) => {
    // Check Auth
    if (!user)
      throw new AuthenticationError(
        "ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ"
      );

    try {
      const updateDepartureTime = await DepartureTime.findByIdAndUpdate(
        args.input.id,
        {
          ...args.input,
        },
        { new: true }
      )
        .populate({ path: "busType" })
        .populate({ path: "route" });
      return updateDepartureTime;
    } catch (error) {
      console.log(error);
    }
  },
  deleteDepartureTime: async (parents, args, { user }, info) => {
    if (!user)
      throw new AuthenticationError(
        "ທ່ານບໍມີສິດ ກາລຸນາເຂົ້າສູ່ລະບົບຜູ້ດູແລລະບົບ"
      );

    try {
      const deleteDepartureTime = await DepartureTime.findByIdAndDelete(
        args.id
      );
      return deleteDepartureTime;
    } catch (error) {
      throw new Error("Error", error);
    }
  },
};
