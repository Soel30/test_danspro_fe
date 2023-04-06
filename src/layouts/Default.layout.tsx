import Loading from "../components/common/loading";
import AppHeader from "../components/templates/AppHeader";
import React from "react";

interface DefaultLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

const DefaultLayout = ({
  children,
  fullWidth,
  loading = false,
}: DefaultLayoutProps) => {
  return (
    <>
      <Loading loading={loading} />
      <AppHeader />
      <div className="container mx-auto max-w-[85rem] pb-10">{children}</div>
    </>
  );
};

export default DefaultLayout;
