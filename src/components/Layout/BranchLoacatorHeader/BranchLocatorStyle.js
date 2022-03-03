import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  pointerCSS: {
    cursor: "pointer",
  },

  toolbar: {
    backgroundColor: "#d2e1e766",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: "0px 30px",
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  title: {
    flexGrow: 1,
    lineHeight: "normal",
  },
  logoFormat: {
    height: 62,
    cursor: "pointer",
  },
  subtitle: {
    color: "#171717",
    fontSize: "1rem",
  },
  navLink: {
    textDecoration: 'none',
    color: "#171717"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create([ 'width', 'margin' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${ drawerWidth }px)`,
    transition: theme.transitions.create([ 'width', 'margin' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hideSection:{
    display:"none"
  },
  showSection:{
    display:"block"
  },
  // sectionDesktop: {
  //   // display: 'none',
  //   // "@media (max-width: 1200px)": {
  //   //   display: 'none',
  //   // },
  //   [ theme.breakpoints.up('lg') ]: {
  //     display: 'flex',

  //   },
  // },
  // sectionMobile: {
  //   display: 'flex',
  //   [ theme.breakpoints.up('lg') ]: {
  //     display: 'none',
  //   },
  // }
}));

export { useStyles };
