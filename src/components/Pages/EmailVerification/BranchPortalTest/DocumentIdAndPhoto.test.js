import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import DocumentIdAndPhotoId from "../DocumentIdAndPhotoId";
import { steps } from '../../../../__mock__/data/BranchPortalData';
import { MemoryRouter } from "react-router-dom";
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 500000,
		},
	},
});
const theme = createTheme();
window.scrollTo = jest.fn();

let file;
beforeEach(() => {
  file = new File(["profile_image"], "Card/JCB.png", { type: "image/png" });
});

const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
					<DocumentIdAndPhotoId
          applicationNumber={"7001-0000016058"}
          customerEmail={"mariner@mariner.com"}
          steps={steps}
          activeStep={0}
        />;
			</QueryClientProvider>
		</ThemeProvider>
	);
}


test("Render Select Document", () => {
	render(component());
	const element = screen.getByTestId('render_selectDocument');
	expect(element).toBeTruthy();
});

test("Render Document Type", () => {
	render(component());
	const element = screen.getByTestId('render_CheckList');
	expect(element).toBeTruthy();
});

test("Render Select File ", () => {
	render(component());
	const element = screen.getByTestId('selectFile');
	expect(element).toBeTruthy();
});

test("Render Upload from camera ", () => {
	render(component());
	const element = screen.getByTestId('render_uploadFromCamera');
	expect(element).toBeTruthy();
});

test("Select Document Type ", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="selectDocument"]`);
	await act(() => {	
	fireEvent.change(input, { target: { value: "id_doc" } });
});
	expect(input).toBeTruthy();
	expect(input.value).toBe('id_doc');
});

test("Onclick button", () => {
  render(component(), { wrapper: MemoryRouter });
  const button = screen.getByTestId("render_NextButton");
  expect(button).toBeTruthy();
	const button2 = screen.getByTestId("handleSelfieMenuOpen");
  expect(button2).toBeTruthy();
	const button3 = screen.getByTestId("render_selectDocument");
  expect(button3).toBeTruthy();
  fireEvent.click(button);
	fireEvent.click(button2, { button: 0 });
	fireEvent.click(button3,{ button: 0 });
});

test("Verify Selfie camera", async () => {
	
	render(component(), { wrapper: MemoryRouter });
	const button2 = screen.getByTestId("handleSelfieMenuOpen");
  expect(button2).toBeTruthy();
	fireEvent.click(button2, { button: true });
	const button3 = screen.getByTestId("handleSelfieMenuClose");
  fireEvent.click(button3)
  const uploader = screen.getByTestId("selectSelfieFile");
	fireEvent.click(uploader,{ files: [file] });
	await waitFor(() =>
	    fireEvent.change(uploader, {
        target: { files: [file] },
      }),
	);
	
	let image = document.getElementById("selectSelfieFile");
	// check if the file is there
	expect(image.files[0].name).toBe("Card/JCB.png");
	expect(image.files.length).toBe(1);

	const uploadNewButton = screen.getByTestId('enableSelfieCameraOption');
		await act(() => {
		fireEvent.click(uploadNewButton); 
		
	});
	const capture = screen.getByTestId('captureSelfie');	
	await act(() => {
		fireEvent.click(capture); 
		
	});
	
});

test("Verify empty selfie", async () => {	
	render(component(), { wrapper: MemoryRouter });
	const button2 = screen.getByTestId("handleSelfieMenuOpen");
  expect(button2).toBeTruthy();
	fireEvent.click(button2, { button: true });
	const button3 = screen.getByTestId("handleSelfieMenuClose");
	fireEvent.click(button3)
	 const uploader = screen.getByTestId("selectSelfieFile");
	fireEvent.click(uploader,{ files: "" });
	await waitFor(() =>
      fireEvent.change(uploader, {
        target: { files: "" },
      }),
  );
});


test("Verify upload through camera", async () => {
	
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="selectDocument"]`);
	await act(() => {	
	fireEvent.change(input, { target: { value: "id_doc" } });
});
	expect(input).toBeTruthy();
	expect(input.value).toBe('id_doc');
	const button2 = screen.getByTestId("render_selectDocument");
  expect(button2).toBeTruthy();
	fireEvent.click(button2, { button: true });
	const button3 = screen.getByTestId("handleMenuClose");
	fireEvent.click(button3)
	 const uploader = screen.getByTestId("selectFile");
	fireEvent.click(uploader,{ files: [file] });
	await waitFor(() =>
	screen.debug(uploader,1000000),
      fireEvent.change(uploader, {
        target: { files: [file] },
      }),
  );
	
	let image = document.getElementById("selectFile");
	// check if the file is there
	expect(image.files[0].name).toBe("Card/JCB.png");
	expect(image.files.length).toBe(1);
	const uploadNewButton = screen.getByTestId('render_uploadFromCamera');
	fireEvent.click(uploadNewButton); 	
	await act(() => {
		fireEvent.click(uploadNewButton); 
		
	});
	const capture = screen.getByTestId('capture');	
	await act(() => {
		fireEvent.click(capture); 
		
	});
});

test("Check empty image", async () => {
	
	render(component(), { wrapper: MemoryRouter });
	const button2 = screen.getByTestId("render_selectDocument");
  expect(button2).toBeTruthy();
	fireEvent.click(button2, { button: true });
	const button3 = screen.getByTestId("handleMenuClose");
	fireEvent.click(button3)
	 const uploader = screen.getByTestId("selectFile");
	fireEvent.click(uploader,{ files: "" });
	await waitFor(() =>
	screen.debug(uploader,1000000),
      fireEvent.change(uploader, {
        target: { files: "" },
      }),
  );
});