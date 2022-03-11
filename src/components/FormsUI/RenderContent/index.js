import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from "prop-types";
import React from "react";
import { useQuery } from 'react-query';
import DisclosureLinkController from "../../Controllers/DisclosureLinkController";
import "./Style.css";

const RenderContent = ({ disclosureLink }) => {
    const loadData = () => {
        return DisclosureLinkController(disclosureLink);
    };
    const { isLoading, data: accountDetails } = useQuery(disclosureLink, loadData);
    return (
        <div>
            {
                !isLoading ? <div className='contentWrap' dangerouslySetInnerHTML={ { __html: accountDetails.data } } /> : <CircularProgress />
            }

        </div>
    );
};

RenderContent.propTypes = {
    disclosureLink: PropTypes.string.isRequired,
};

export default RenderContent;