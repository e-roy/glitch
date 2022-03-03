import React from "react";

interface Props {
  setApiKey: (apiKey: string) => void;
}

const APIKeyForm: React.FC<Props> = ({ setApiKey }) => {
  const livepeerApi = process.env.NEXT_PUBLIC_LIVEPEER_API;

  React.useEffect(() => {
    setApiKey(livepeerApi);
  }, []);
  return null;
};

export default APIKeyForm;
