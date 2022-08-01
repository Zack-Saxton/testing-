import Cookies from "js-cookie";
import { useEffect } from "react";
import TagManager from 'react-gtm-module'
 
const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM_ID,
    dataLayerName: 'PageDataLayer'
} 
TagManager.initialize(tagManagerArgs)

export default function ExposeDataLayer(){
  let pagePath = window.location.pathname + window.location.search;  
  useEffect(() => {
    const dataLayerInfo = {
      dataLayer: {
          userId: Cookies.get("userId")?Cookies.get("userId"):0,
          userProject: 'cac-project',
          page: pagePath
      },
      dataLayerName: 'PageDataLayer'
    }
    TagManager.dataLayer(dataLayerInfo);
  }, [pagePath]);
}