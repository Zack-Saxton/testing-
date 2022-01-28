import printJS from "print-js";
import { toast } from "react-toastify";
import APICall from "../lib/AxiosLib";
import Buffer from "buffer"

/***** Get loan document *****/
export async function loanDocumentController(accNo) {
  try {
  let url = accNo === null ? "active_loan_document" : "loan_document";
  let param = url === "loan_document" ? "/" + accNo : "";
  let data = {};
  let method = "GET";
  let addAccessToken = true;

  //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    toast.error("Error executing loanDocumentController API");
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
  if (!toast.isActive("closeToast")) {toast.success("Document Downloaded Successfully");}
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
    : toast.error(loanDocumentDownload?.data?.message ?? "Downloading failed");
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
    : toast.error("Error printing file");
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
  uploadData.status === 200
    ? toast.success(uploadData?.data?.message ?? "Document Uploaded Successfully")
    : toast.error(uploadData?.data?.message ?? "Error uploading file");

  return "true"
}
