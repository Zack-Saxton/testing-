import { makeStyles } from "@mui/styles";


//Styling
const useStylesMultiSelectComponent = makeStyles((theme) => ({

  formControl: {
    margin: theme.spacing(1),
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
    marginTop: theme.spacing(3),
  },
  menu: {
    width: 200,
  },

}));

export { useStylesMultiSelectComponent };
