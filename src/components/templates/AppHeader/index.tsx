import useDeviceScreen from "../../../hooks/useCheckMobileScreen";
import React from "react";
import AppHeaderDekstop from "./Dekstop";
import AppHeaderMobile from "./Mobile";

const AppHeader: React.FC = () => {
  const isMobile = useDeviceScreen();

  return <>{isMobile ? <AppHeaderMobile /> : <AppHeaderDekstop />}</>;
};

export default AppHeader;
