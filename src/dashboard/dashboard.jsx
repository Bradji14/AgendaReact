import "bootstrap/dist/css/bootstrap.min.css";

import MySection from "../section/section";
import { useEffect, useState } from "react";
import "animate.css";
import "./index.css";
import AccordionUsage from "../optionsUser/uptionsUsers";

const Dashboard = () => {


  return (
    <>
      <MySection />
      <AccordionUsage/>
    </>
  );
};

export default Dashboard;
