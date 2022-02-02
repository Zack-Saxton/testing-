import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { RenderContent } from "../../FormsUI";
import {useStylesDisclosure} from "./Style"

export default function TextingTermsOfUse() {
    const classes = useStylesDisclosure();
    
  //View part
  return (
    <div >
      <div className="mainDiv">   
        <Grid  item xs={ 12 }>
        <Paper  className={ classes.paper }>           
          <RenderContent disclosureLink="/textingTermsOfUse" />
            </Paper>
        </Grid>
      </div>
    </div>
  );
}