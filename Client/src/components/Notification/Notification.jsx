import React from "react";
import { Badge } from '@mui/material'

import MailIcon from "@mui/icons-material/Mail";

impro
 
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
