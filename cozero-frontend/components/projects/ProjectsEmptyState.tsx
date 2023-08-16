import { Button, Container, Heading, Text } from '@chakra-ui/react';
import { TbMoodEmpty } from 'react-icons/tb';
import { useNavigate } from 'react-router';
import { translate } from '../../utils/language.utils';

export const ProjectsEmptyState = () => {
  const navigate = useNavigate();

  return (
    <Container
      gap={5}
      display={'flex'}
      alignItems='center'
      justifyContent={'center'}
      flexDirection='column'
    >
      <TbMoodEmpty size={60} />
      <Heading size='lg' textAlign='center'>
        {translate('NO_PROJECTS_TITLE')}
      </Heading>
      <Text>{translate('NO_PROJECTS_DESCRIPTION')}</Text>
      <Button onClick={() => navigate('/projects/create')}>
        {translate('CREATE_PROJECT')}
      </Button>
    </Container>
  );
};
