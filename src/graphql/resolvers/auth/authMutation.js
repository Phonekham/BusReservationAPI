import bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import Employee from '../../../models/Employee';
import Member from '../../../models/Member';

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
    } else if (password !== confirmPassword) {
      throw new UserInputError('Password not match', {
        errors: {
          password: 'ລະຫັດຜ່ານບໍ່ຕົງກັນ',
        },
      });
    } else if (password !== confirmPassword) {
      throw new UserInputError('Password not match', {
        errors: {
          password: 'ລະຫັດຜ່ານບໍ່ຕົງກັນ',
        },
      });
    }

    password = await bcrypt.hash(password, 10);
    return Employee.create({ ...args.input, password });
  },
  registerMember: async (parents, args, context, info) => {
    let {
      firstname,
      lastname,
      phone,
      username,
      password,
      confirmPassword,
      email,
    } = args.input;

    // Check if username already existist
    const member = await Member.findOne({ username, email });
    if (username === '') {
      throw new UserInputError('username Required', {
        errors: {
          username: 'ກາລຸນາປ້ອນຊື່ຜູ້ໃຊ້',
        },
      });
    } else if (member) {
      throw new UserInputError('User is already taken', {
        errors: {
          username: 'ຊື່ຜູ້ໃຊ້ນີ້ມີແລ້ວ! ກາລຸນາປຽນຊື່ອື່ນ',
        },
      });
    } else if (password === '') {
      throw new UserInputError('Password Required', {
        errors: {
          password: 'ກາລຸນາປ້ອນລະຫັດຜ່ານ',
        },
      });
    } else if (password !== confirmPassword) {
      throw new UserInputError('Password not match', {
        errors: {
          password: 'ລະຫັດຜ່ານບໍ່ຕົງກັນ',
        },
      });
    } else if (firstname === '') {
      throw new UserInputError('Require Firstname', {
        errors: {
          firstname: 'ກາລຸນາປ້ອນຊື່',
        },
      });
    } else if (lastname === '') {
      throw new UserInputError('Require lastname', {
        errors: {
          lastname: 'ກາລຸນາປ້ອນນາມສະກຸນ',
        },
      });
    } else if (email === '') {
      throw new UserInputError('Require email', {
        errors: {
          email: 'ກາລຸນາປ້ອນອີເມວ',
        },
      });
    } else {
      const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (!email.match(regEx)) {
        throw new UserInputError('Invalid Email', {
          errors: {
            email: 'ກາລຸນາປ້ອນອີເມວໃຫ້ຖືກຮູບແບບອີເມວ',
          },
        });
      }
    }

    password = await bcrypt.hash(password, 10);
    return Member.create({ ...args.input, password });
  },
  loginEmployee: async (parents, args, context, info) => {
    const { username, password } = args;

    //  check if password is correct
    const employee = await Employee.findOne({ username });
    if (!employee) throw new Error('ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານ ບໍ່ຖືກຕ້ອງ');
    const validPassword = await bcrypt.compare(password, employee.password);
    if (!validPassword) throw new Error('ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານ ບໍ່ຖືກຕ້ອງ');

    const token = jwt.sign({ user: employee }, process.env.SECRET, {
      expiresIn: '1days',
    });
    return { employee, jwt: token };
  },
  loginMember: async (parents, args, context, info) => {
    const { username, email, password } = args;

    //  check if password is correct
    const member = username
      ? await Member.findOne({ username })
      : await Member.findOne({ email });
    if (!member) throw new Error('ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານ ບໍ່ຖືກຕ້ອງ');
    const validPassword = await bcrypt.compare(password, member.password);
    if (!validPassword) throw new Error('ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານ ບໍ່ຖືກຕ້ອງ');

    const token = jwt.sign({ user: member }, process.env.SECRET, {
      expiresIn: '1days',
    });
    return { member, jwt: token };
  },
};
