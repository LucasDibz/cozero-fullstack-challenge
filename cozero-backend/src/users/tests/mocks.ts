import { InjectionToken } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

export function mocker(token: InjectionToken) {
  if (token === AuthService) {
    return { login: jest.fn() };
  }
}

export const mockUsersRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findBy: jest.fn(),
  findOneBy: jest.fn(),
  softDelete: jest.fn(),
  delete: jest.fn(),
  restore: jest.fn(),
};
