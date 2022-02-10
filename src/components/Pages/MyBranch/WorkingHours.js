// Working hours Other American States

// For all california states:
// Mon, Wed, Thu, Fri = 9:00am – 5.30pm
// Tuesday = 10am – 7pm

import Moment from "moment";

export const ca_M_W_Th_F = `[
    {"value":"09:30" , "label": "09:30AM"},
    {"value":"10:00" , "label": "10:00 AM"},
    {"value":"10:30" , "label": "10:30 AM"},
    {"value":"11:00" , "label": "11:00 AM"},
    {"value":"11:30" , "label": "11:30 AM"},
    {"value":"12:00" , "label": "12:00 PM"},
    {"value":"12:30" , "label": "12:30 PM"},
    {"value":"13:00" , "label": "01:00 PM"},
    {"value":"13:30" , "label": "01:30 PM"},
    {"value":"14:00" , "label": "02:00 PM"},
    {"value":"14:30" , "label": "02:30 PM"},
    {"value":"15:00" , "label": "03:00 PM"},
    {"value":"15:30" , "label": "03:30 PM"},
    {"value":"16:00" , "label": "04:00 PM"},
    {"value":"16:30" , "label": "04:30 PM"},
    {"value":"17:00" , "label": "05:00 PM"}
]`;

var updated_ca_M_W_TH_F = [
    { "value": "09:30", "label": "09:30AM" },
    { "value": "10:00", "label": "10:00 AM" },
    { "value": "10:30", "label": "10:30 AM" },
    { "value": "11:00", "label": "11:00 AM" },
    { "value": "11:30", "label": "11:30 AM" },
    { "value": "12:00", "label": "12:00 PM" },
    { "value": "12:30", "label": "12:30 PM" },
    { "value": "13:00", "label": "01:00 PM" },
    { "value": "13:30", "label": "01:30 PM" },
    { "value": "14:00", "label": "02:00 PM" },
    { "value": "14:30", "label": "02:30 PM" },
    { "value": "15:00", "label": "03:00 PM" },
    { "value": "15:30", "label": "03:30 PM" },
    { "value": "16:00", "label": "04:00 PM" },
    { "value": "16:30", "label": "04:30 PM" },
    { "value": "17:00", "label": "05:00 PM" }
].filter((v, i) => {
    if (parseInt(v.value.split(":")[ 0 ]) > Moment(new Date()).format("HH")) {
        return v;
    }
    return null;
}
);
export const upt_ca_M_W_TH_F = updated_ca_M_W_TH_F;

export const ca_Tue = `[
    {"value":"10:30" , "label": "10:30 AM"},
    {"value":"11:00" , "label": "11:00 AM"},
    {"value":"11:30" , "label": "11:30 AM"},
    {"value":"12:00" , "label": "12:00 PM"},
    {"value":"12:30" , "label": "12:30 PM"},
    {"value":"13:00" , "label": "01:00 PM"},
    {"value":"13:30" , "label": "01:30 PM"},
    {"value":"14:00" , "label": "02:00 PM"},
    {"value":"14:30" , "label": "02:30 PM"},
    {"value":"15:00" , "label": "03:00 PM"},
    {"value":"15:30" , "label": "03:30 PM"},
    {"value":"16:00" , "label": "04:00 PM"},
    {"value":"16:30" , "label": "04:30 PM"},
    {"value":"17:00" , "label": "05:00 PM"},
    {"value":"17:30" , "label": "05:30 PM"},
    {"value":"18:00" , "label": "06:00 PM"},
    {"value":"18:30" , "label": "06:30 PM"}

]`;

let updated_ca_Tue = [
    { "value": "10:30", "label": "10:30 AM" },
    { "value": "11:00", "label": "11:00 AM" },
    { "value": "11:30", "label": "11:30 AM" },
    { "value": "12:00", "label": "12:00 PM" },
    { "value": "12:30", "label": "12:30 PM" },
    { "value": "13:00", "label": "01:00 PM" },
    { "value": "13:30", "label": "01:30 PM" },
    { "value": "14:00", "label": "02:00 PM" },
    { "value": "14:30", "label": "02:30 PM" },
    { "value": "15:00", "label": "03:00 PM" },
    { "value": "15:30", "label": "03:30 PM" },
    { "value": "16:00", "label": "04:00 PM" },
    { "value": "16:30", "label": "04:30 PM" },
    { "value": "17:00", "label": "05:00 PM" },
    { "value": "17:30", "label": "05:30 PM" },
    { "value": "18:00", "label": "06:00 PM" },
    { "value": "18:30", "label": "06:30 PM" }

].filter((v, i) => {
    if (parseInt(v.value.split(":")[ 0 ]) > Moment(new Date()).format("HH")) {
        return v;
    }
    return null;
});
export const upt_ca_Tue = updated_ca_Tue;

// For all other states:
// Mon, Wed, Thu 9:00am – 5:00pm
// Tuesday = 9:00am – 7:00 pm
// Fri = 9:00am – 5.30pm

export const other_M_W_Thu = `[
   {"value":"09:30" , "label": "09:30AM"},
    {"value":"10:00" , "label": "10:00 AM"},
    {"value":"10:30" , "label": "10:30 AM"},
    {"value":"11:00" , "label": "11:00 AM"},
    {"value":"11:30" , "label": "11:30 AM"},
    {"value":"12:00" , "label": "12:00 PM"},
    {"value":"12:30" , "label": "12:30 PM"},
    { "value": "13:00", "label": "01:00 PM" },
    { "value": "13:30", "label": "01:30 PM" },
    { "value": "14:00", "label": "02:00 PM" },
    { "value": "14:30", "label": "02:30 PM" },
    { "value": "15:00", "label": "03:00 PM" },
    { "value": "15:30", "label": "03:30 PM" },
    { "value": "16:00", "label": "04:00 PM" },
    { "value": "16:30", "label": "04:30 PM" }

]`;

let updated_other_M_W_Thu = [
    { "value": "09:30", "label": "09:30AM" },
    { "value": "10:00", "label": "10:00 AM" },
    { "value": "10:30", "label": "10:30 AM" },
    { "value": "11:00", "label": "11:00 AM" },
    { "value": "11:30", "label": "11:30 AM" },
    { "value": "12:00", "label": "12:00 PM" },
    { "value": "12:30", "label": "12:30 PM" },
    { "value": "13:00", "label": "01:00 PM" },
    { "value": "13:30", "label": "01:30 PM" },
    { "value": "14:00", "label": "02:00 PM" },
    { "value": "14:30", "label": "02:30 PM" },
    { "value": "15:00", "label": "03:00 PM" },
    { "value": "15:30", "label": "03:30 PM" },
    { "value": "16:00", "label": "04:00 PM" },
].filter((v, i) => {
    if (parseInt(v.value.split(":")[ 0 ]) > Moment(new Date()).format("HH")) {
        return v;
    }
    return null;
});
export const upt_other_M_W_Thu = updated_other_M_W_Thu;

export const Other_Fri = `[

    {"value":"09:30" , "label": "09:30AM"},
    {"value":"10:00" , "label": "10:00 AM"},
    {"value":"10:30" , "label": "10:30 AM"},
    {"value":"11:00" , "label": "11:00 AM"},
    {"value":"11:30" , "label": "11:30 AM"},
    {"value":"12:00" , "label": "12:00 PM"},
    {"value":"12:30" , "label": "12:30 PM"},
    {"value":"13:00" , "label": "01:00 PM"},
    {"value":"13:30" , "label": "01:30 PM"},
    {"value":"14:00" , "label": "02:00 PM"},
    {"value":"14:30" , "label": "02:30 PM"},
    {"value":"15:00" , "label": "03:00 PM"},
    {"value":"15:30" , "label": "03:30 PM"},
    {"value":"16:00" , "label": "04:00 PM"},
    {"value":"16:30" , "label": "04:30 PM"},
    {"value":"17:00" , "label": "05:00 PM"}

]`;

let updated_other_Fri = [
    { "value": "09:30", "label": "09:30AM" },
    { "value": "10:00", "label": "10:00 AM" },
    { "value": "10:30", "label": "10:30 AM" },
    { "value": "11:00", "label": "11:00 AM" },
    { "value": "11:30", "label": "11:30 AM" },
    { "value": "12:00", "label": "12:00 PM" },
    { "value": "12:30", "label": "12:30 PM" },
    { "value": "13:00", "label": "01:00 PM" },
    { "value": "13:30", "label": "01:30 PM" },
    { "value": "14:00", "label": "02:00 PM" },
    { "value": "14:30", "label": "02:30 PM" },
    { "value": "15:00", "label": "03:00 PM" },
    { "value": "15:30", "label": "03:30 PM" },
    { "value": "16:00", "label": "04:00 PM" },
    { "value": "16:30", "label": "04:30 PM" },
    { "value": "17:00", "label": "05:00 PM" }

].filter((v, i) => {
    if (parseInt(v.value.split(":")[ 0 ]) > Moment(new Date()).format("HH")) {
        return v;
    }
    return null;
});

export const upt_other_Fri = updated_other_Fri;

export const other_Tue = `[

    {"value": "09:30", "label": "09:30 AM"},
    {"value":"10:00" , "label": "10:00 AM"},
    {"value":"10:30" , "label": "10:30 AM"},
    {"value":"11:00" , "label": "11:00 AM"},
    {"value":"11:30" , "label": "11:30 AM"},
    {"value":"12:00" , "label": "12:00 PM"},
    {"value":"12:30" , "label": "12:30 PM"},
    {"value":"13:00" , "label": "01:00 PM"},
    {"value":"13:30" , "label": "01:30 PM"},
    {"value":"14:00" , "label": "02:00 PM"},
    {"value":"14:30" , "label": "02:30 PM"},
    {"value":"15:00" , "label": "03:00 PM"},
    {"value":"15:30" , "label": "03:30 PM"},
    {"value":"16:00" , "label": "04:00 PM"},
    {"value":"16:30" , "label": "04:30 PM"},
    {"value":"17:00" , "label": "05:00 PM"},
    {"value":"17:30" , "label": "05:30 PM"},
    {"value":"18:00" , "label": "06:00 PM"},
    {"value":"18:30" , "label": "06:30 PM"}
]`;

let upt_other_Tue = [
    { "value": "09:30", "label": "9:30 AM" },
    { "value": "10:00", "label": "10:00 AM" },
    { "value": "10:30", "label": "10:30 AM" },
    { "value": "11:00", "label": "11:00 AM" },
    { "value": "11:30", "label": "11:30 AM" },
    { "value": "12:00", "label": "12:00 PM" },
    { "value": "12:30", "label": "12:30 PM" },
    { "value": "13:00", "label": "01:00 PM" },
    { "value": "13:30", "label": "01:30 PM" },
    { "value": "14:00", "label": "02:00 PM" },
    { "value": "14:30", "label": "02:30 PM" },
    { "value": "15:00", "label": "03:00 PM" },
    { "value": "15:30", "label": "03:30 PM" },
    { "value": "16:00", "label": "04:00 PM" },
    { "value": "16:30", "label": "04:30 PM" },
    { "value": "17:00", "label": "05:00 PM" },
    { "value": "17:30", "label": "05:30 PM" },
    { "value": "18:00", "label": "06:00 PM" },
    { "value": "18:30", "label": "06:30 PM" }
].filter((v, i) => {
    if (parseInt(v.value.split(":")[ 0 ]) > Moment(new Date()).format("HH")) {
        return v;
    }
    return null;
});
export const updated_other_Tue = upt_other_Tue;
