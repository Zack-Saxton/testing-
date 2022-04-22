import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';


//Styling
const useStylesSelectComponent = makeStyles(() => ({
  formControl: {
    margin: useTheme().spacing(1),
  }

}));

export { useStylesSelectComponent };
