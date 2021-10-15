import axios from "axios";
import printJS from "print-js";
import { toast } from 'react-toastify';
import handleTokenExpiry from './HandleTokenExpiry';

//Get loan document
export async function loanDocumentController(accNo) {

//Login access token
const loginToken = JSON.parse(localStorage.getItem("token"));

//Get response on API call
  let response = {
    isLoggedIn: "",
    active: "",
    data: "",
  };

  try {
    await axios({
      method: "GET",
      url:
        accNo === null
          ? "/gps/get_active_loan_documents"
          : "/gps/get_loan_documents/" + accNo,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loginToken.apiKey,
      },
    }).then((res) => {
      response.data = res;
    });
  } catch (error) {
    handleTokenExpiry(error);
    response.data = error.response;
  }

  return response;
}

//Document Download
export async function documentdownload(id, name) {

//Login access token
  const loginToken = JSON.parse(localStorage.getItem("token"));

//Get response form API call  
  let resAccDetails = [];
  try {
    await axios({
      method: "GET",
      url: "/gps/download_document/" + id + "/" + name,

      headers: {
        "Content-Type": "application/json",       
        "x-access-token": loginToken.apiKey,
      },
    })
      .then((res) => {
        var Buffer = require("buffer/").Buffer; // note: the trailing slash is important!
        const buff = Buffer.from(res.data.bufferFile.data); 
        const url = window.URL.createObjectURL(new Blob([buff]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", res.data.exportName);
        document.body.appendChild(link);
        link.click();

        toast.success("downloaded successfully", {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  } catch (error) {
    handleTokenExpiry(error);
    resAccDetails.push(error.resAccDetails);
  }

  return resAccDetails;
}

//Print Document
export async function documentprint(id, name) {

//Login access token
  const loginToken = JSON.parse(localStorage.getItem("token"));

// Get response from API call
  let resAccDetails = [];

  try {
    await axios({
      method: "GET",
      url: "/gps/download_document/" + id + "/" + name,

      headers: {
        "Content-Type": "application/json",       
        "x-access-token": loginToken.apiKey,
      },
    }).then((res) => {
      var Buffer = require("buffer/").Buffer; // note: the trailing slash is important!
      const buff = Buffer.from(res.data.bufferFile.data);
      var pdfFile = new Blob([buff]);
      var pdfUrl = URL.createObjectURL(pdfFile);
      printJS(pdfUrl);
    });
  } catch (error) {
    handleTokenExpiry(error);
    resAccDetails.push(error.resAccDetails);
  }

  return resAccDetails;
}

//upload document
export async function uploadDocument(test, fileName, fileType, documentType) {
//Login access token
  const loginToken = JSON.parse(localStorage.getItem("token"));

//Get reponse from API call
  let resAccDetails = [];
  let body = {
    compressedFile: [
      {
        data: test,
        mimetype: fileType,
        documentType: documentType,
        fileName: fileName,
      },
    ],
  };

  try {
    await axios({
      method: "POST",
      url: "/gps/upload_loan_document",
      data: JSON.stringify(body),

      headers: {
        "Content-Type": "application/json",
        "x-access-token": loginToken.apiKey,
      },
      transformRequest: (data, headers) => {
        delete headers.common["Content-Type"];
        return data;
      },
    })
      .then((res) => {
        toast.success(res.data.data.message, {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error(err.data.data.message, {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  } catch (error) {
    handleTokenExpiry(error);
    resAccDetails.push(error.resAccDetails);
  }

  return resAccDetails;
}