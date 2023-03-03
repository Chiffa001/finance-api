import { ControllerHandler } from '~/types/route';

export const controllerMethodCreator = (cb: ControllerHandler): ControllerHandler => async (req, res, next) => {
  try {
    await cb(req, res, next);
  } catch (e) {
    next(e);
  }
};
