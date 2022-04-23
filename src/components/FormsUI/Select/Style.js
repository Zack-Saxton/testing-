import { useTheme } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";


//Styling
const useStylesSelectComponent = makeStyles(() => ({
  formControl: {
    margin: useTheme().spacing(1),
  }

}));

export { useStylesSelectComponent };
