import moment from "moment";
import {tzMatch} from "../../assets/data/marinerBusinesStates";
export default async function BranchDayTiming(branchLookupData) {
    let caState = (branchLookupData.Address.split(" ").find(element => element === "CA")) ? true : false; 
    let holidayHourDates = ['1121', '1123', '1128', '1205', '1212', '1219', '1226'];
    let currentDay = moment().format('dddd');
    let isholidayHours = holidayHourDates.includes(moment().format('MMDD'));
    let dotw = moment().day();
    let today = new Date();
    let TodayHour = today.getHours();
    let PRP = ` HELLO HOW ARE YOU ${today} is # ${TodayHour}`;
    console.log(' PRP =', PRP)
    let ClosedOrOpen = { "Value1": "Open Now!", "Value2": "", "Value3":"" };
    if (([1, 3, 4, 5].includes(dotw)) && moment().isBefore(moment().format("YYYY-MM-DD") + "T17:30") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00") && caState) {
        ClosedOrOpen = branchInfoDisplay('5:30 P.M. ', branchLookupData)
    } else if ((dotw === 2 && moment().isBefore(moment().format("YYYY-MM-DD") + "T19:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T10:00") && caState)) {
        ClosedOrOpen = branchInfoDisplay('7:00 P.M. ', branchLookupData)
    } else if (([1, 3, 4].includes(dotw)) && moment().isBefore(moment().format("YYYY-MM-DD") + "T17:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
        branchInfoDisplay('5:00 P.M. ', branchLookupData)
    } else if (dotw === 2 && moment().isBefore(moment().format("YYYY-MM-DD") + "T19:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
        ClosedOrOpen = branchInfoDisplay('7:00 P.M. ', branchLookupData)
    } else if (dotw === 5 && moment().isBefore(moment().format("YYYY-MM-DD") + "T17:30") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
        ClosedOrOpen = branchInfoDisplay('5:30 P.M. ', branchLookupData)
    } else if (dotw === 6 && isholidayHours && moment().isBefore(moment().format("YYYY-MM-DD") + "T13:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
        ClosedOrOpen = branchInfoDisplay('1:00 P.M. ', branchLookupData)
    } else {
        ClosedOrOpen = {
            "Value1": "CLOSED",
            "Value2": "",
            "Value3": ""
        }
    }
    if (caState) {
        if (currentDay === 'Tuesday' && moment().isBefore(moment().format("YYYY-MM-DD") + "T19:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T10:00")) {
            ClosedOrOpen.Value3 = currentDay + ": 10:00am - 7:00pm" + " " + TimeZoneShort(branchLookupData.timeZoneName);  
        } else if ((currentDay === 'Saturday') && isholidayHours && moment().isBefore(moment().format("YYYY-MM-DD") + "T13:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
            ClosedOrOpen.Value3 = `${currentDay}: 9:00am - 1:00pm ${TimeZoneShort(branchLookupData.timeZoneName)}`;   
        } else if ((['Monday', 'Wednesday', 'Thursday'].includes(currentDay)) && moment().isBefore(moment().format("YYYY-MM-DD") + "T17:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
            ClosedOrOpen.Value3 = `${currentDay}: 9:00am - 5:30pm ${TimeZoneShort(branchLookupData.timeZoneName)}`;
        } else if ((currentDay === 'Friday') && moment().isBefore(moment().format("YYYY-MM-DD") + "T17:30") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
            ClosedOrOpen.Value3 = `${currentDay}: 9:00am - 5:30pm ${TimeZoneShort(branchLookupData.timeZoneName)}`;
        }
    } else if (!caState) {
        if ((['Monday', 'Wednesday', 'Thursday'].includes(currentDay)) && moment().isBefore(moment().format("YYYY-MM-DD") + "T17:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
            ClosedOrOpen.Value3 = `${currentDay}: 9:00am - 5:00pm ${TimeZoneShort(branchLookupData.timeZoneName)}`;
        } else if ((currentDay === 'Tuesday') && moment().isBefore(moment().format("YYYY-MM-DD") + "T19:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
            ClosedOrOpen.Value3 = `${currentDay}: 9:00am - 7:00pm ${TimeZoneShort(branchLookupData.timeZoneName)}`; 
        } else if ((currentDay === 'Saturday') && isholidayHours && moment().isBefore(moment().format("YYYY-MM-DD") + "T13:00") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
            ClosedOrOpen.Value3 = `${currentDay}: 9:00am - 1:00pm ${TimeZoneShort(branchLookupData.timeZoneName)}`;  
        } else if ((currentDay === 'Friday') && moment().isBefore(moment().format("YYYY-MM-DD") + "T17:30") && moment().isAfter(moment().format("YYYY-MM-DD") + "T09:00")) {
            ClosedOrOpen.Value3 = `${currentDay}: 9:00am - 5:30pm ${TimeZoneShort(branchLookupData.timeZoneName)}`;  
        }
    } 
    if (ClosedOrOpen.Value1 === "CLOSED" && TodayHour > 16) {
        ClosedOrOpen.Value1 = "Will open ";
        if ([5, 6, 0].includes(dotw)) {
            ClosedOrOpen.Value2 = `Monday at 9am ${TimeZoneShort(branchLookupData.timeZoneName)}`;           
        } else if (dotw === 1) {
            ClosedOrOpen.Value2 = `Tuesday at 9am ${TimeZoneShort(branchLookupData.timeZoneName)}`;
        } else if (dotw === 2) {
            ClosedOrOpen.Value2 = `Wednesday at 9am ${TimeZoneShort(branchLookupData.timeZoneName)}`;
        } else if (dotw === 3) {
            ClosedOrOpen.Value2 = `Thursday at 9am ${TimeZoneShort(branchLookupData.timeZoneName)}`;
        } else if (dotw === 4) {
            ClosedOrOpen.Value2 = `Friday at 9am ${TimeZoneShort(branchLookupData.timeZoneName)}`;
        }
    }
    return ClosedOrOpen;
}
const branchInfoDisplay = function (time, branchLookupData) {
    let tz = tzMatch[branchLookupData.timeZoneName];
    return (
        {
            "Value2": `${time} ${tz}`,
            "Value1": "OPEN UNTIL",
            "Value3": ""
        }
    );
}
const TimeZoneShort = function (timeZoneName) {
    return tzMatch[timeZoneName];
}