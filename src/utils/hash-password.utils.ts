import * as bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = Number(process.env.CRYPT_SALT);
  return await bcrypt.hash(password, salt);
};

export const isEqualPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
