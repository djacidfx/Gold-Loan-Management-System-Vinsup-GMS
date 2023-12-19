// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://vinsupinfotech.com" target="_blank" underline="hover">
    vinsupinfotech.com
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://vinsupinfotech.com" target="_blank" underline="hover">
      &copy;vinsupinfotech.com
    </Typography>
  </Stack>
);

export default AuthFooter;
