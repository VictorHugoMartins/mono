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

const isPrime = (n: number): boolean => {
  if (n < 2) return false;

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }

  return true
}

const isPrimeList = (nList: number[]): number[] => {
  return nList.filter(isPrime);
}

const sumList = (nList: number[]): number => {
  return nList.reduce((acc, curr) => acc + curr, 0);
}

function generateList(initialValue: number, finalValue: number): number[] {
  const list = [];

  for (let i = initialValue; i <= finalValue; i++)
    list.push(i);

  return list;
}

function test() {
  // Code here
  const list = generateList(1, 1000);
  const primeList = isPrimeList(list);
  return sumList(primeList);
}

const LoginPageStructure: React.FC<LoginStructureProps> = ({ children, title }) => {
  return (
    <div className={styles.container}>
      <LocalNavBar title={""} returnPath={"/"} publicPage />
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