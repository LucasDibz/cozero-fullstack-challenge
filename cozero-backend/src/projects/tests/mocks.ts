import { InjectionToken } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Project } from '../entities/project.entity';

export function mocker(token: InjectionToken) {
  if (token === AuthService) {
    return { login: jest.fn() };
  }
}

export const mockProjectsRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findBy: jest.fn(),
  findOneBy: jest.fn(),
  softDelete: jest.fn(),
  delete: jest.fn(),
  restore: jest.fn(),
};

export const mockedProjects: Project[] = [
  {
    id: 1,
    name: 'Mocked Project 1',
    owner: 'admin',
    isActive: true,
    co2EstimateReduction: [1, 2],
    description: 'Mocked project 1 description',
    listing: ['Goal 1', 'Goal 2'],
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    deletedAt: null,
  },
  {
    id: 2,
    name: 'Mocked Project 2',
    owner: 'admin',
    isActive: true,
    co2EstimateReduction: [2, 3],
    description: 'Mocked project 2 description',
    listing: ['Goal 1', 'Goal 2'],
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    deletedAt: null,
  },
];
