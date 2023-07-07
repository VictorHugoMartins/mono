import React from "react";
// import LocalNavBar from "~/components/local/LocalNavBar/LocalNavBar";

import styles from "./loginPageStructure.module.scss";
import HeadTitle from "../../../components/ui/HeadTitle";
import Footer from "../../../components/ui/Footer";
import LocalNavBar from "~/components/local/LocalNavBar/LocalNavBar";

interface LoginStructureProps {
  children: React.ReactNode;
  title?: string;
}

const LoginPageStructure: React.FC<LoginStructureProps> = ({ children, title }) => {
  return (
    <div className={styles.container}>
      <LocalNavBar title={""} returnPath={"/login"} publicPage hideLoginButton />
      <HeadTitle title={title} />
      <div>
        {children}
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}


export default LoginPageStructure;