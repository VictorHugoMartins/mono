import React from "react";
import Typography from "~/components/ui/Typography/Typography";
import { GetProjectVersion } from "~/utils/GetProjectVersion";
import styles from "./navbarversion.module.scss";
import useTheme from "~/hooks/useTheme";



const Navbarversion: React.FC = () => {
  const getProjectVersion = GetProjectVersion();
  const { theme } = useTheme();
  
  return (
    <div className={`${styles.navbarversion} ${
        styles[`theme${theme}`]
      }`}>
        <Typography component="caption"> SCManager v 
        {(getProjectVersion)}</Typography>
    </div>
  )
}

export default Navbarversion;