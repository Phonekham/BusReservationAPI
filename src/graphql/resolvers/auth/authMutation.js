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
  loginEmployee: async (parents, args, context, info) => {
    const { username, password } = args;

    //  check if password is correct
    const employee = await Employee.findOne({ username });
    const validPassword = await bcrypt.compare(password, employee.password);
    if (!validPassword || !employee)
      throw new Error('ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານ ບໍ່ຖືກຕ້ອງ');

    const token = jwt.sign({ employee }, process.env.SECRET, {
      expiresIn: '1days',
    });
    console.log(employee);
    return { employee, jwt: token };
  },
};
