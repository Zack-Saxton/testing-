import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from "prop-types";
import React from "react";
import { useQuery } from 'react-query';
import DisclosureLinkController from "../../Controllers/DisclosureLinkController";
import "./Style.css";

const RenderContent = ({ disclosureLink, findContent, replaceContent }) => {
    const loadData = () => {
        return DisclosureLinkController(disclosureLink);
    };
    const { isLoading, data: accountDetails } = useQuery(disclosureLink, loadData);
    let content = "";
    if (accountDetails?.data) {
        content = findContent !== "" ? accountDetails.data.replace(findContent, replaceContent) : accountDetails.data;
    }
    return (
        <div>
            {
                !isLoading ? <div className='contentWrap' dangerouslySetInnerHTML={{ __html: content }} /> : <CircularProgress />
            }

        </div>
    );
};

RenderContent.propTypes = {
    disclosureLink: PropTypes.string.isRequired,
    findContent: PropTypes.string,
    replaceContent: PropTypes.string
};

export default RenderContent;