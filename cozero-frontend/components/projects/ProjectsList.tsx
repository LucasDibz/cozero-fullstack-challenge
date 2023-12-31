import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Project } from '../../interfaces/project.interface';
import ProjectsService from '../../services/ProjectsService';
import { translate } from '../../utils/language.utils';
import ProjectItem from './ProjectItem';
import { ProjectsEmptyState } from './ProjectsEmptyState';

import { AiOutlineSearch } from 'react-icons/ai';
import { useDebounce } from '../../hooks/useDebounce';

export default function ProjectsList() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const toast = useToast();

  const searchQuery = useDebounce(query);

  const fetchProjects = useCallback(async () => {
    const projects = await ProjectsService.fetchProjects(searchQuery);
    setProjectList(projects ?? []);

    setIsLoading(false);
  }, [searchQuery]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const onDelete = async (projectId: string) => {
    const deletedProject = await ProjectsService.deleteProject(projectId);

    toast({
      title: translate(
        deletedProject ? 'PROJECT_DELETED' : 'PROJECTED_DELETE_ERROR',
      ),
      description: translate(
        deletedProject
          ? 'PROJECT_DELETED_DESCRIPTION'
          : 'PROJECT_DELETE_ERROR_DESCRIPTION',
      ),
      status: deletedProject ? 'success' : 'error',
      duration: 9000,
      isClosable: true,
    });

    if (deletedProject) {
      setProjectList(projectList.filter((project) => project.id !== projectId));
    }
  };

  return (
    <Stack spacing={8}>
      <InputGroup>
        <Input
          type='text'
          placeholder='Search for projects...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <InputRightElement pointerEvents='none'>
          <AiOutlineSearch color='#CBD5E0' />
        </InputRightElement>
      </InputGroup>

      {projectList.length === 0 && !isLoading && (
        <ProjectsEmptyState query={searchQuery} />
      )}

      {projectList?.map((project) => (
        <ProjectItem key={project.id} project={project} onDelete={onDelete} />
      ))}

      <Flex gap={2} justifyContent='center'>
        <Text>{translate('PROJECTS_FOOTER_CTA')}</Text>
        <Text
          onClick={() => navigate(`/projects/create`)}
          cursor='pointer'
          fontWeight='bold'
          color='green.500'
          textAlign='center'
        >
          {translate('PROJECTS_FOOTER_CTA_BUTTON')}
        </Text>
      </Flex>
    </Stack>
  );
}
