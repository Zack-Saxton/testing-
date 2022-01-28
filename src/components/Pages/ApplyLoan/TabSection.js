import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
export default function TabSection(props) {

  function a11yProps(index) {
    if(index === props.ay){
      return {
        id: `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tab-panel-${index}`,
      };
    } else {
      return {
        id: `scrollable-auto-tab`,
        "aria-controls": `scrollable-auto-tab-panel`,
      };
    }

	}
    return(
        <Grid>
        <Tabs
            value={props?.value}
            onChange={props?.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            id="termsTabs"
            style={{ paddingBottom: "10px" }}
            aria-label="scrollable auto tabs example"
          >
            <Tab
              style={{ fontSize: "0.938rem", fontWeight: "700" }}
              label="1. Select Offer"
              {...a11yProps(0)} 
              disabled={props.ay === 0 ? false : true}
              className={props?.classes.tabLabel}
            />
            <Tab
              label="2. Review & Sign"
              {...a11yProps(1)}
              className={props?.classes.tabLabel}
              disabled={props.ay === 1 ? false : true}
             
            />
            <Tab
              label="3. Final Verification"
              {...a11yProps(2)}
              disabled={props.ay === 2 ? false : true}
              className={props?.classes.tabLabel}
            />
            <Tab
              label="4. Receive your money"
              {...a11yProps(3)}
              disabled={props.ay === 3 ? false : true}
              className={props?.classes.tabLabel}
            />
          </Tabs>
        </Grid>
    )
}