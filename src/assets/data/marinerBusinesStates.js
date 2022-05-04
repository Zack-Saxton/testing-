const businesStates = [
    'Alabama',
    'Arizona',
    'California',
    'Delaware',
    'Florida',
    'Georgia',
    'Illinois',
    'Indiana',
    'Kentucky',
    'Louisiana',
    'Maryland',
    'Mississippi',
    'Missouri',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'South Carolina',
    'Tennessee',
    'Texas',
    'Utah',
    'Virginia',
    'Wisconsin',
    'Washington'
];
const branch_hours = [
    "Mon: 9:00 a.m. - 5:00 p.m.",
    "Tue: 9:00 a.m. - 7:00 p.m.",
    "Wed: 9:00 a.m. - 5:00 p.m.",
    "Thu: 9:00 a.m. - 5:00 p.m.",
    "Fri: 9:00 a.m. - 5:30 p.m."
];
const ca_branch_hours = [
    "Mon: 9:00 a.m. - 5:30 p.m.",
    "Tue: 10:00 a.m. - 7:00 p.m.",
    "Wed: 9:00 a.m. - 5:30 p.m.",
    "Thu: 9:00 a.m. - 5:30 p.m.",
    "Fri: 9:00 a.m. - 5:30 p.m."
];
const tzMatch = {
    "Eastern Standard Time": "EST",
    "Eastern Daylight Time": "EDT",
    "Central Standard Time": "CST",
    "Central Daylight Time": "CDT",
    "Mountain Standard Time": "MST",
    "Mountain Daylight Time": "MDT",
    "Pacific Standard Time": "PST",
    "Pacific Daylight Time": "PDT",
};
const marinerWorkingSaturdayDateRange = {
    "start": "11/23/2022 00:00:00",
    "end": "12/28/2022 00:00:00"
};
const howManyBranchesforBranchLocatorPages = {
    BranchLocator: 10,
    StatePage: 50,
    BranchPage: 4,
    stateBranchDistanceinMiles: 500
};
export {
    businesStates,
    branch_hours,
    ca_branch_hours,
    tzMatch,
    marinerWorkingSaturdayDateRange,
    howManyBranchesforBranchLocatorPages
};
