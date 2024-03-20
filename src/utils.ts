import { EntityType } from './types';

export const getNotFoundMessage = (type: EntityType, id: string) => {
  return `${
    type.charAt(0).toUpperCase() + type.slice(1)
  } with id '${id}' does not exist`;
};

export const getNotFoundInFavsMessage = (type: EntityType, id: string) => {
  return `${
    type.charAt(0).toUpperCase() + type.slice(1)
  } with id '${id}' is not favorite`;
};
