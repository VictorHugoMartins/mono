import React from "react";
import Typography from "~/components/ui/Typography/Typography";
import { GetProjectVersion } from "~/utils/GetProjectVersion";
import styles from "./navbarversion.module.scss";

const Navbarversion: React.FC = () => {
  const getProjectVersion = GetProjectVersion();

  return (
    <div className={`${styles.navbarversion} ${styles[`theme${'light'}`]
      }`}>
      <Typography component="caption"> SCManager v
        {(getProjectVersion)}</Typography>
    </div>
  )
}

export default Navbarversion;