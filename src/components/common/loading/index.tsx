import React from "react";

interface ILoadingProps {
  loading: boolean;
  children?: React.ReactNode;
}

const Loading: React.FC<ILoadingProps> = (props) => {
  const { loading, children } = props;
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen absolute w-full bg-white">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Loading;