import { useContext } from "react";
import { ThemeContext } from "../../context/AppContext";

type ButtonValueProps = {
  ButtonValue: string;
  onClick: (e: React.ChangeEvent<HTMLFormElement>) => void;
};

export const PrimaryButton = (props: ButtonValueProps) => {
  const { ButtonValue } = props;
  const { theme } = useContext(ThemeContext);
  return (
    <button
      className={`
    
    ${
      theme === "light"
        ? " hover:bg-clrHeader text-clrHeader border-clrHeader"
        : " hover:bg-clrBlack text-clrBlue border-clrBlack"
    }
    bg-transparent  font-semibold hover:text-clrWhite py-2 px-3 border  hover:border-transparent`}
    >
      {ButtonValue}
    </button>
  );
};

export const SecondaryButton = (props: ButtonValueProps) => {
  const { theme } = useContext(ThemeContext);

  const { ButtonValue } = props;
  return (
    <button
      className={`
        py-2 px-4 border text-clrWhite hover:bg-transparent font-bold
     ${
       theme === "light"
         ? "bg-clrHeader hover:border-clrHeader hover:text-clrHeader"
         : "bg-clrBlack hover:border-clrBlack  hover:text-clrBlack"
     }
    `}
    >
      {ButtonValue}
    </button>
  );
};

export const ExtraBtn = ({ButtonValue}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <button
      className={`
        py-2 px-4 border text-clrWhite hover:bg-transparent font-bold
     ${
       theme === "light"
         ? "bg-clrHeader hover:border-clrHeader hover:text-clrHeader"
         : "bg-clrBlack hover:border-clrBlack  hover:text-clrBlack"
     }
    `}
    >
      {ButtonValue}
    </button>
  );
};
