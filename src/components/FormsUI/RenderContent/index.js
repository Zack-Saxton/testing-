import React, { useEffect } from "react";
import DisclosureLinkController from "../../Controllers/DisclosureLinkController"
import CircularProgress from '@material-ui/core/CircularProgress';
import "./Style.css"

const RenderContent = ({ disclosureLink }) => {
    const [ HTML, setHTML ] = React.useState(``);

    useEffect(async () => { 
            setHTML( await DisclosureLinkController(disclosureLink) );
        }, []);
    return(
        <div>
            {
                HTML !== `` ?  <div dangerouslySetInnerHTML={{ __html: HTML.data }} /> : <CircularProgress />
            }
           
        </div>
    )
}
export default RenderContent;