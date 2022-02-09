import CircularProgress from '@material-ui/core/CircularProgress';
import React from "react";
import { useQuery } from 'react-query';
import DisclosureLinkController from "../../Controllers/DisclosureLinkController";
import "./Style.css";

const RenderContent = ({ disclosureLink }) => {
    const loadData =  () => {
        return  DisclosureLinkController(disclosureLink)
    }
	const { isLoading, data: accountDetails } = useQuery(disclosureLink, loadData);
    return (
        <div>
            {
                !isLoading ? <div dangerouslySetInnerHTML={ { __html: accountDetails.data } } /> : <CircularProgress />
            }

        </div>
    );
};
export default RenderContent;