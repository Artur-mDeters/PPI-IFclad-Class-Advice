
import { Badge } from '@mui/material'

import MailIcon from "@mui/icons-material/Mail";

 
const Notification = () => {
  return (
    <Badge
      badgeContent={4}
      color="error"
      sx={{ cursor: "pointer" }}
    >
      <MailIcon color="action" />
    </Badge>
  );
};

export default Notification;
