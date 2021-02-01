import bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import Employee from '../../../models/Employee';

export default {
  createEmployee: async (parents, args, context, info) => {
    let { username, password, confirmPassword, email } = args.input;

    // Check if username already existist
    const employee = await Employee.findOne({ username, email });
    if (employee) {
      throw new UserInputError('User is already taken', {
        errors: {
          username: 'ຊື່ຜູ້ໃຊ້ນີ້ມີແລ້ວ! ກາລຸນາປຽນຊື່ອື່ນ',
        },
      });
    }
    if (password !== confirmPassword) {
      throw new UserInputError('Password not match', {
        errors: {
          password: 'ລະຫັດຜ່ານບໍ່ຕົງກັນ',
        },
      });
    }

    password = await bcrypt.hash(password, 10);
    return Employee.create({ ...args.input, password });
  },
};
