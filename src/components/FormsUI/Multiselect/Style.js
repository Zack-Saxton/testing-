import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';


//Styling
const useStylesMultiSelectComponent = makeStyles(() => ({
  
  formControl: {
    margin: useTheme().spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: useTheme().spacing(3),
  },
    menu: {
    width: 200,
  },

}));

export { useStylesMultiSelectComponent };
