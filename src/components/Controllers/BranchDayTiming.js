import moment from "moment";
import globalMessages from "../../assets/data/globalMessages.json";
import { marinerWorkingSaturdayDateRange, tzMatch } from "../../assets/data/marinerBusinesStates";
import ErrorLogger from "../lib/ErrorLogger";

export default async function BranchDayTiming(branchLookupData) {
    let caState = (branchLookupData.Address.split(" ").find(element => element === "CA")) ? true : false;
    let startDate = new Date(marinerWorkingSaturdayDateRange.start);
    let endDate = new Date(marinerWorkingSaturdayDateRange.end);
    let holidayHourDates = getDates(getSaturdayOfCurrentWeek(startDate), endDate);
    let currentDay = moment().format('dddd');
    let isHolidayHours = holidayHourDates.includes(moment().format('MMDD'));
    let dayInNumber = moment().day();
    let today = new Date();
    let todayHour = today.getHours();
    let closedOrOpen = { "Value1": "Open Now!", "Value2": "", "Value3": "" };
    if (([ 1, 3, 4, 5 ].includes(dayInNumber)) && moment().isBefore(moment().format("YYYY-MM-DD") + "T17:30") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00") && caState) {
        closedOrOpen = branchInfoDisplay('5:30 P.M. ', branchLookupData);
    } else if ((dayInNumber === 2 && moment().isBefore(moment().format("YYYY-MM-DD") + "T19:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T10:00") && caState)) {
        closedOrOpen = branchInfoDisplay('7:00 P.M. ', branchLookupData);
    } else if (([ 1, 3, 4 ].includes(dayInNumber)) && moment().isBefore(moment().format("YYYY-MM-DD") + "T17:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
        branchInfoDisplay('5:00 P.M. ', branchLookupData);
    } else if (dayInNumber === 2 && moment().isBefore(moment().format("YYYY-MM-DD") + "T19:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
        closedOrOpen = branchInfoDisplay('7:00 P.M. ', branchLookupData);
    } else if (dayInNumber === 5 && moment().isBefore(moment().format("YYYY-MM-DD") + "T17:30") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
        closedOrOpen = branchInfoDisplay('5:30 P.M. ', branchLookupData);
    } else if (dayInNumber === 6 && isHolidayHours && moment().isBefore(moment().format("YYYY-MM-DD") + "T13:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
        closedOrOpen = branchInfoDisplay('1:00 P.M. ', branchLookupData);
    } else {
        closedOrOpen = {
            "Value1": "CLOSED",
            "Value2": "",
            "Value3": ""
        };
    }
    if (caState) {
        if (currentDay === 'Tuesday' && moment().isBefore(moment().format("YYYY-MM-DD") + "T19:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T10:00")) {
            closedOrOpen.Value3 = `${ currentDay }: 10:00am - 7:00pm ${ TimeZoneShort(branchLookupData.timeZoneName) }`;
        } else if ((currentDay === 'Saturday') && isHolidayHours && moment().isBefore(moment().format("YYYY-MM-DD") + "T13:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
            closedOrOpen.Value3 = `${ currentDay }: 9:00am - 1:00pm ${ TimeZoneShort(branchLookupData.timeZoneName) }`;
        } else if (([ 'Monday', 'Wednesday', 'Thursday' ].includes(currentDay)) && moment().isBefore(moment().format("YYYY-MM-DD") + "T17:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
            closedOrOpen.Value3 = `${ currentDay }: 9:00am - 5:30pm ${ TimeZoneShort(branchLookupData.timeZoneName) }`;
        } else if ((currentDay === 'Friday') && moment().isBefore(moment().format("YYYY-MM-DD") + "T17:30") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
            closedOrOpen.Value3 = `${ currentDay }: 9:00am - 5:30pm ${ TimeZoneShort(branchLookupData.timeZoneName) }`;
        }
    } else if (!caState) {
        if (([ 'Monday', 'Wednesday', 'Thursday' ].includes(currentDay)) && moment().isBefore(moment().format("YYYY-MM-DD") + "T17:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
            closedOrOpen.Value3 = `${ currentDay }: 9:00am - 5:00pm ${ TimeZoneShort(branchLookupData.timeZoneName) }`;
        } else if ((currentDay === 'Tuesday') && moment().isBefore(moment().format("YYYY-MM-DD") + "T19:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
            closedOrOpen.Value3 = `${ currentDay }: 9:00am - 7:00pm ${ TimeZoneShort(branchLookupData.timeZoneName) }`;
        } else if ((currentDay === 'Saturday') && isHolidayHours && moment().isBefore(moment().format("YYYY-MM-DD") + "T13:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
            closedOrOpen.Value3 = `${ currentDay }: 9:00am - 1:00pm ${ TimeZoneShort(branchLookupData.timeZoneName) }`;
        } else if ((currentDay === 'Friday') && moment().isBefore(moment().format("YYYY-MM-DD") + "T17:30") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
            closedOrOpen.Value3 = `${ currentDay }: 9:00am - 5:30pm ${ TimeZoneShort(branchLookupData.timeZoneName) }`;
        }
    }
    if (closedOrOpen.Value1 === "CLOSED" && todayHour > 16) {
        closedOrOpen.Value1 = "Will open ";
        if ([ 5, 6, 0 ].includes(dayInNumber)) {
            closedOrOpen.Value2 = `Monday at 9am ${ TimeZoneShort(branchLookupData.timeZoneName) }`;
        } else if (dayInNumber === 1) {
            closedOrOpen.Value2 = `Tuesday at 9am ${ TimeZoneShort(branchLookupData.timeZoneName) }`;
        } else if (dayInNumber === 2) {
            closedOrOpen.Value2 = `Wednesday at 9am ${ TimeZoneShort(branchLookupData.timeZoneName) }`;
        } else if (dayInNumber === 3) {
            closedOrOpen.Value2 = `Thursday at 9am ${ TimeZoneShort(branchLookupData.timeZoneName) }`;
        } else if (dayInNumber === 4) {
            closedOrOpen.Value2 = `Friday at 9am ${ TimeZoneShort(branchLookupData.timeZoneName) }`;
        }
    }
    return closedOrOpen;
}
const branchInfoDisplay = function (time, branchLookupData) {
    let tz = tzMatch[ branchLookupData.timeZoneName ];
    return (
        {
            "Value2": `${ time } ${ tz }`,
            "Value1": "OPEN UNTIL",
            "Value3": ""
        }
    );
};
const TimeZoneShort = function (timeZoneName) {
    return tzMatch[ timeZoneName ];
};
export async function mapInformationBranchLocator(branchList) {
    try {
        return (branchList.map((item) => ({
            id: item.id,
            BranchName: item.BranchName,
            BranchAddress: item.Address,
            BranchManager: item.branchManager,
            Phone: item.PhoneNumber,
            Distance: item.distance,
            position: {
                lat: Number(item.latitude),
                lng: Number(item.longitude),
            },
        })));
    } catch (error) {
        ErrorLogger(globalMessages.Error_executing_mapInformationBranchLocator, error);
    }
}

const getDates = function (startDate, endDate) {
    const dates = [];
    let currentDate = startDate;
    const addDays = function (days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };
    while (currentDate <= endDate) {
        dates.push(`${ String(currentDate.getMonth() + 1).padStart(2, '0') }${ String(currentDate.getDate()).padStart(2, '0') }`);
        currentDate = addDays.call(currentDate, 7);
    }
    return dates;
};
const getSaturdayOfCurrentWeek = function (today) {
    return new Date(today.setDate(((today.getDate() - today.getDay() + 1) + 5)));
};
export function branchSaturdaySchedule() {
    let startDate = new Date(marinerWorkingSaturdayDateRange.start);
    let endDate = new Date(marinerWorkingSaturdayDateRange.end);
    return isBetween(getSaturdayOfCurrentWeek(new Date()), startDate, endDate);
}
const isBetween = function (date, start, end) {
    return (date.getTime() >= start.getTime() && date.getTime() <= end.getTime());
};

export function formatDate(date) {
    let MonthNameDate = new Date(date);
    let month = (MonthNameDate.getMonth() + 1).toString().padStart(2, '0');
    let day = MonthNameDate.getDate().toString().padStart(2, '0');
    let year = MonthNameDate.getFullYear();

    return [ year, month, day ].join('-');
}