// @@@ MATERIAL-UI @@@
import {
  Box,
  Container,
  Grid,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/Inbox';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
// @@@ nextjs @@@

const useStyles = makeStyles((theme) => ({
  rootDL: {
    height: '100vh',
    backgroundColor: '#5652de',
    borderRadius: '5px',
    position: 'fixed',
    left: 0,
    top: 0,
    borderRight: '1px #5652de inset',
    zIndex: 999999,
    border: '1px solid red',
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(5),
  },
  rootAccordion: {
    borderRadius: 0,
    marginBottom: theme.spacing(1),
    backgroundColor: '#6788f5',
  },
  accordionTypo1: {
    display: 'flex',
    alignItems: 'center',
  },
  accordionIcon: {
    marginLeft: theme.spacing(3),
  },
  accordionSubTypo1: {
    marginLeft: theme.spacing(2),
    color: '#f6f6f6',
  },
  accordionUl: {
    listStyle: 'none',
    width: '100%',
  },
  accordionLi: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  accordionLiLink: {
    textDecoration: 'none',
    color: '#f6f6f6',
    width: '100%',
    borderRadius: '5px',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    transition: '0.5s ease',
    '&:hover': {
      backgroundColor: '#f6f6f6',
      color: 'rgba(86,82,222,1)',
    },
  },
  accordionTitle: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(5),
  },
  accordionDetails: {},
  gridItemTop: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const DashboardLeft = () => {
  const classes = useStyles();
  return (
    <>
      <Box component='div' className={classes.rootDL}>
        <Grid container>
          <Grid item md={12} className={classes.gridItemTop}></Grid>
          <Grid item md={12}>
            <div className={classes.root}>
              <Accordion
                elevation={1}
                className={classes.rootAccordion}
                style={{ borderRadius: 0 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color='secondary' />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                  className={classes.accordionTitle}
                >
                  <Typography variant='h6' className={classes.accordionTypo1}>
                    <InboxIcon
                      color='secondary'
                      className={classes.accordionIcon}
                    />{' '}
                    <span className={classes.accordionSubTypo1}>Products</span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    borderTop: '1px solid rgba(233,233,233,0.5)',
                  }}
                  className={classes.accordionDetails}
                >
                  <ul className={classes.accordionUl}>
                    <li className={classes.accordionLi}>
                      <ArrowRightIcon color='secondary' />
                      &nbsp;
                      <Link href='/dashboard/products'>
                        <a
                          rel='noreferrer noopener'
                          className={classes.accordionLiLink}
                        >
                          <Typography variant='subtitle1'>Products</Typography>
                        </a>
                      </Link>
                    </li>
                    <li className={classes.accordionLi}>
                      <ArrowRightIcon color='secondary' />
                      &nbsp;
                      <Link href='/dashboard/products/add-new-product'>
                        <a
                          rel='noreferrer noopener'
                          className={classes.accordionLiLink}
                        >
                          <Typography variant='subtitle1'>
                            Add New Product
                          </Typography>
                        </a>
                      </Link>
                    </li>
                    <li className={classes.accordionLi}>
                      <ArrowRightIcon color='secondary' />
                      &nbsp;
                      <Link href='/dashboard/products/edit-product'>
                        <a
                          rel='noreferrer noopener'
                          className={classes.accordionLiLink}
                        >
                          <Typography variant='subtitle1'>
                            Edit Product
                          </Typography>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </AccordionDetails>
              </Accordion>{' '}
              <Accordion
                elevation={1}
                className={classes.rootAccordion}
                style={{ borderRadius: 0 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color='secondary' />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                  className={classes.accordionTitle}
                >
                  <Typography variant='h6' className={classes.accordionTypo1}>
                    <InboxIcon
                      color='secondary'
                      className={classes.accordionIcon}
                    />{' '}
                    <span className={classes.accordionSubTypo1}>Users</span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{ borderTop: '1px solid rgba(86,82,222,0.2)' }}
                >
                  <ul className={classes.accordionUl}>
                    <li className={classes.accordionLi}>
                      <ArrowRightIcon color='secondary' />
                      &nbsp;
                      <Link href='#!'>
                        <a
                          rel='noreferrer noopener'
                          className={classes.accordionLiLink}
                        >
                          <Typography variant='subtitle1'>
                            View Users
                          </Typography>
                        </a>
                      </Link>
                    </li>
                    <li className={classes.accordionLi}>
                      <ArrowRightIcon color='secondary' />
                      &nbsp;
                      <Link href='#!'>
                        <a
                          rel='noreferrer noopener'
                          className={classes.accordionLiLink}
                        >
                          <Typography variant='subtitle1'>
                            Edit Users
                          </Typography>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </AccordionDetails>
              </Accordion>
              <Accordion
                elevation={1}
                className={classes.rootAccordion}
                style={{ borderRadius: 0 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color='secondary' />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                  className={classes.accordionTitle}
                >
                  <Typography variant='h6' className={classes.accordionTypo1}>
                    <InboxIcon
                      color='secondary'
                      className={classes.accordionIcon}
                    />{' '}
                    <span className={classes.accordionSubTypo1}>Orders</span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{ borderTop: '1px solid rgba(86,82,222,0.2)' }}
                >
                  <ul className={classes.accordionUl}>
                    <li className={classes.accordionLi}>
                      <ArrowRightIcon color='secondary' />
                      &nbsp;
                      <Link href='#!'>
                        <a
                          rel='noreferrer noopener'
                          className={classes.accordionLiLink}
                        >
                          <Typography variant='subtitle1'>
                            View Orders
                          </Typography>
                        </a>
                      </Link>
                    </li>
                    <li className={classes.accordionLi}>
                      <ArrowRightIcon color='secondary' />
                      &nbsp;
                      <Link href='#!'>
                        <a
                          rel='noreferrer noopener'
                          className={classes.accordionLiLink}
                        >
                          <Typography variant='subtitle1'>
                            Edit Orders
                          </Typography>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </AccordionDetails>
              </Accordion>
              <Accordion
                elevation={1}
                className={classes.rootAccordion}
                style={{ borderRadius: 0 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color='secondary' />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                  className={classes.accordionTitle}
                >
                  <Typography variant='h6' className={classes.accordionTypo1}>
                    <InboxIcon
                      color='secondary'
                      className={classes.accordionIcon}
                    />{' '}
                    <span className={classes.accordionSubTypo1}>Pages</span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{ borderTop: '1px solid rgba(86,82,222,0.2)' }}
                >
                  <ul className={classes.accordionUl}>
                    <li className={classes.accordionLi}>
                      <ArrowRightIcon color='secondary' />
                      &nbsp;
                      <Link href='/dashboard/pages/home'>
                        <a
                          rel='noreferrer noopener'
                          className={classes.accordionLiLink}
                        >
                          <Typography variant='subtitle1'>Home Page</Typography>
                        </a>
                      </Link>
                    </li>
                    <li className={classes.accordionLi}>
                      <ArrowRightIcon color='secondary' />
                      &nbsp;
                      <Link href='#!'>
                        <a
                          rel='noreferrer noopener'
                          className={classes.accordionLiLink}
                        >
                          <Typography variant='subtitle1'>
                            Edit Users
                          </Typography>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </AccordionDetails>
              </Accordion>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DashboardLeft;
