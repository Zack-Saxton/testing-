import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { uploadDocument } from "../../../Controllers/ApplyForLoanController";
import { ButtonPrimary } from "../../../FormsUI";
import messages from "../../../lib/Lang/applyForLoan.json";

// initialising Document upload component
export default function DocumentUpload(props) {
	//Set State
	const [ selectedFile, setSelectedFile ] = useState(null);
	const [ loader, setLoader ] = useState(null);
	let refSelectedFile = useRef();

	//To handle the file select change
	const handleInputChange = () => {
		setSelectedFile(refSelectedFile.current);
	};

	useEffect(() => {
		setSelectedFile(null);
		refSelectedFile.current.value = null;
	}, [ props.resetUpload ]);
	//upload doc functionality
	const uploadDoc = () => {
		if (!selectedFile) {
			if (!toast.isActive("selectFileToUpload")) {
				toast.error(messages?.document?.selectFile, { toastId: "selectFileToUpload" });
			}
			props.setLoadingFlag(false);
			setLoader(false);
		} else {
			let filePath = selectedFile.value;
			let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;

			if (!allowedExtensions.exec(filePath)) {
				if (!toast.isActive("extensionError")) {
					toast.error(messages?.document?.uploadFileExt);
				}
				props.setLoadingFlag(false);
				setLoader(false);

				selectedFile.value = "";

				return false;
			} else if (selectedFile.files[ 0 ].size <= 10240000) {
				let reader = new FileReader();
				if (selectedFile.files && selectedFile.files[ 0 ]) {
					reader.onload = async () => {
					const buffer2 = Buffer.from(reader.result.split(",")[1], "base64");
						let fileData = Buffer.from(buffer2).toJSON().data;
						let fileName = selectedFile.files[ 0 ].name;
						let fileType = selectedFile.files[ 0 ].type;
						let response = await uploadDocument(
							fileData,
							fileName,
							fileType,
							props.docType
						);
						props.setLoadingFlag(response ? false : true);
						setLoader(response ? false : true);
						props.handle(response);
					};
					reader.readAsDataURL(selectedFile.files[ 0 ]);
				}
			} else {
				if (!toast.isActive("fileSizeError")) {
					toast.error(messages?.document?.fileUploadSize);
				}
				props.setLoadingFlag(false);
				setLoader(false);
			}
		}
	};

	//JSX part
	return (
		<Grid container direction="row">
			<Grid style={ { paddingTop: "20px" } }>
				<ButtonPrimary
					variant="contained"
					component="span"
					disabled={ loader }
					margin-right="300px"
					onClick={ () => {
						props.setLoadingFlag(true);
						setLoader(true);
						uploadDoc();
					}
					}
					id="button_stepper_prev"
					stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
				>
					Upload
				</ButtonPrimary>
				<input
					style={ { padding: "0px 15px" } }
					accept="image/png, image/jpeg, application/pdf, image/jpg "
					id="file"
					multiple={ props?.multiple }
					type="file"
					ref={ refSelectedFile }

					onChange={ handleInputChange }
				/>
			</Grid>
		</Grid>
	);
}
DocumentUpload.propTypes = {
	resetUpload: PropTypes.bool,
	setLoadingFlag: PropTypes.func,
	docType: PropTypes.string,
	handle: PropTypes.func,
	multiple: PropTypes.bool
};