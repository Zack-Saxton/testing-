import Buffer from "buffer";
import printJS from "print-js";
import {toast} from "react-toastify";
import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

/***** Get loan document *****/
export async function loanDocumentController(accountNumber) {
  try {
    let url = !accountNumber ? "active_loan_document" : "loan_document";
    let param = url === "loan_document" ? "/" + accountNumber : "";
    let data = {};
    let method = "GET";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_loanDocumentController_API, error);
  }
}

/***** Download and converting bufferdata *****/
function downloadFileData(fileData) {
  Buffer = require("buffer/").Buffer; // note: the trailing slash is important!
  const buff = Buffer.from(fileData?.data?.bufferFile.data);
  const url = window.URL.createObjectURL(new Blob([buff]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileData?.data?.exportName);
  document.body.appendChild(link);
  link.click();
  if (!toast.isActive("closeToast")) {toast.success(globalMessages.Document_download, {toastId: "closeToast"});}
}

/****** Document Download method *****/
export async function documentdownload(id, name, fileURL) {
  try {
    let url = "cac_download_document";
    let param = "";
    let data = {
      file_id: id,
      name: name,
      fileURL: fileURL,
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    let loanDocumentDownload = await APICall(url, param, data, method, addAccessToken);
    loanDocumentDownload.status === 200
      ? downloadFileData(loanDocumentDownload)
      : toast.error(loanDocumentDownload?.data?.message ?? globalMessages.Document_download_error);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_loanDocumentController_API, error);
  }  
}

/***** Print file *****/
function print(data) {
  Buffer = require("buffer/").Buffer; // note: the trailing slash is important!
  const buff = Buffer.from(data?.data?.bufferFile.data);
  let pdfFile = new Blob([buff]);
  let pdfUrl = URL.createObjectURL(pdfFile);
  printJS(pdfUrl);
}

/***** Print Document method *****/
export async function documentprint(id, name, fileURL) {
  try {
    let url = "cac_download_document";
    let param = "";
    let data = {
      file_id: id,
      name: name,
      fileURL: fileURL
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    let documentDownloadPrint = await APICall(url, param, data, method, addAccessToken);
    documentDownloadPrint.status === 200
      ? print(documentDownloadPrint)
      : toast.error(globalMessages.Document_print_error);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_loanDocumentController_API, error);
  }
}

/***** upload document method *****/
export async function uploadDocument(fileData, fileName, fileType, documentType) {
  try {
    let url = "upload_document";
    let param = "";
    let data = {
      compressedFile: [
        {
          data: fileData,
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
    uploadData.status === 200
      ? toast.success(uploadData?.data?.message ?? globalMessages.Document_upload)
      : toast.error(uploadData?.data?.message ?? globalMessages.Document_upload_error);

    return true;
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_loanDocumentController_API, error);
  }  
}
