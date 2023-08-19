import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { mockProjectsRepository, mockedProjects, mocker } from './tests/mocks';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockProjectsRepository,
        },
      ],
    })
      .useMocker(mocker)
      .compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET', () => {
    it('should call service findAll', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockedProjects);

      await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('with query should call service findAllWithText', async () => {
      jest.spyOn(service, 'findAllWithText');

      await controller.findAll({ search: '2' });

      expect(service.findAllWithText).toHaveBeenCalledTimes(1);
    });
  });
});
