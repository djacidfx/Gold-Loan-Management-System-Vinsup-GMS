import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase ,Typography} from '@mui/material';

// project imports
import LogoSection from '../LogoSection';

import ProfileSection from './ProfileSection';


// assets
import { IconMenu2 } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  const gradientTextColor = `linear-gradient(45deg, #E5B617, #9A0101)`;
  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* Title */}
      <h1
  style={{
    marginLeft: '30%', // Updated margin-left
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    fontSize: '1.5rem', // Font size
    fontFamily: 'Poppins, sans-serif', // Font family
    backgroundImage: gradientTextColor, // Gradient text color
    WebkitBackgroundClip: 'text', // Apply gradient to text
    color: 'transparent', // Make the original text color transparent
    // Darken the text color (adjust the value as needed)
  }}
>
 VINSUP GMS
</h1>
      {/* header search */}
  
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
   
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};
export default Header;