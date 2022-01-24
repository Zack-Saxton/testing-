import printJS from "print-js";
import { toast } from "react-toastify";
import APICall from "../lib/AxiosLib";
import Buffer from "buffer"

/***** Get loan document *****/
export async function loanDocumentController(accNo) {
  let url = accNo === null ? "active_loan_document" : "loan_document";
  let param = url === "loan_document" ? "/" + accNo : "";
  let data = {};
  let method = "GET";
  let addAccessToken = true;

  //API call
  return APICall(url, param, data, method, addAccessToken);

}

/***** Download and converting bufferdata *****/
function downloadFileData(data) {
  Buffer = require("buffer/").Buffer; // note: the trailing slash is important!
  const buff = Buffer.from(data?.data?.bufferFile.data);
  const url = window.URL.createObjectURL(new Blob([buff]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", data?.data?.exportName);
  document.body.appendChild(link);
  link.click();

  toast.success("Document Downloaded Successfully", {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

/****** Document Download method *****/
export async function documentdownload(id, name) {
  let url = "download_document";
  let param = "/" + id + "/" + name;
  let data = {};
  let method = "GET";
  let addAccessToken = true;

  //API call
  let loanDocumentDownload = await APICall(
    url,
    param,
    data,
    method,
    addAccessToken
  );
  loanDocumentDownload.data.status === 200
    ? downloadFileData(loanDocumentDownload)
    : toast.error(
      loanDocumentDownload?.data?.message
        ? loanDocumentDownload?.data?.message
        : "Downloading failed",
      {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
}

/***** Print file *****/
function print(data) {
  Buffer = require("buffer/").Buffer; // note: the trailing slash is important!
  const buff = Buffer.from(data?.data?.bufferFile.data);
  var pdfFile = new Blob([buff]);
  var pdfUrl = URL.createObjectURL(pdfFile);
  printJS(pdfUrl);
}

/***** Print Document method *****/
export async function documentprint(id, name) {
  let url = "download_document";
  let param = "/" + id + "/" + name;
  let data = {};
  let method = "GET";
  let addAccessToken = true;

  //API call
  let documentDownloadPrint = await APICall(
    url,
    param,
    data,
    method,
    addAccessToken
  );
  documentDownloadPrint.data.status === 200
    ? print(documentDownloadPrint)
    : toast.error("Error printing file", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
}

/***** upload document method *****/
export async function uploadDocument(test, fileName, fileType, documentType) {
  let url = "upload_document";
  let param = "";
  let data = {
    compressedFile: [
      {
        data: test,
        mimetype: fileType,
        documentType: documentType,
        fileName: fileName,
      },
    ],
  };
  let method = "POST";
  let addAccessToken = true;

  //API call
  let uploadData = await APICall(url, param, data, method, addAccessToken);

  //API response
  uploadData.data.status === 200
    ? toast.success((uploadData?.data?.data?.message) ? (uploadData?.data?.data.message) : (uploadData?.data?.data?.message) ? (uploadData?.data?.message) : "Document Uploaded Successfully", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    : toast.error((uploadData?.data?.data?.message) ? (uploadData?.data?.data.message) : (uploadData?.data?.data?.message) ? (uploadData?.data?.message) : "Error uploading file", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return "true"
}
