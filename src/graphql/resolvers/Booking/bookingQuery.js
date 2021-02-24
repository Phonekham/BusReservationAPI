import DepartureTime from '../../../models/DepartureTime';

const checkDepartureTime = async (parents, args, context, info) => {
  const { route } = args;
  return await DepartureTime.find({ route })
    .populate({ path: 'busType' })
    .populate({ path: 'route' });
};

export default { checkDepartureTime };
