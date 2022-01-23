import React, { createContext, useState } from "react";

export const ActiveLoanAccNO = createContext();

const ActiveLoanAccNOContext = (props) => {
	const [data, setData] = useState({
		AccountNumber: '',
		applicationGuid: '',
		isActive: ''

	});

	return (
		<ActiveLoanAccNO.Provider value={{ data: data, setData: setData }}>
			{props.children}
		</ActiveLoanAccNO.Provider>
	);
};

export default ActiveLoanAccNOContext;
