import { styled } from '@mui/material/styles';
import { Card } from '@mui/material'
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import LinkIcon from '@mui/icons-material/Link';


const IFrameWrapper = styled('iframe')(({ theme }) => ({
  height: 'calc(100vh - 210px)',
  border: '1px solid',
  borderColor: theme.palette.primary.light
}));



const TablerIcons = () => (
  <MainCard title="Tabler Icons" secondary={<SecondaryAction icon={<LinkIcon fontSize="small" />} link="https://tablericons.com/" />}>
    <Card sx={{ overflow: 'hidden' }}>
      <IFrameWrapper title="Tabler Icons" width="100%" src="https://tablericons.com/" />
    </Card>
  </MainCard>
);

export default TablerIcons;