import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useQuery } from 'react-query';
import DisclosureLinkController from "../../Controllers/DisclosureLinkController";
import "./Style.css";
import ScrollToTop from '../../Pages/ScrollToTop';

const RenderContent = ({ disclosureLink, findContent, replaceContent }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [disclosureLink]);
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
            <ScrollToTop />
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