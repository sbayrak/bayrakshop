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
    border: '1px solid blue',
    height: '100vh',
    backgroundColor: '#5652de',
    borderRadius: '5px',
    position: 'fixed',
    left: 0,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(15),
  },
  rootAccordion: {
    backgroundColor: '#f6f6f6',
    borderRadius: 0,
    marginBottom: theme.spacing(0.5),
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
    color: '#5652de',
  },
  accordionUl: {
    listStyle: 'none',
  },
  accordionLi: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  accordionLiLink: {
    textDecoration: 'none',
    color: '#5652de',
    width: '100%',
    borderRadius: '5px',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    transition: '0.5s ease',
    '&:hover': {
      backgroundColor: 'rgba(86,82,222,0.8)',
      color: '#f6f6f6',
    },
  },
  accordionTitle: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(5),
  },
}));

const DashboardLeft = () => {
  const classes = useStyles();
  return (
    <>
      <Box component='div' className={classes.rootDL}>
        <div className={classes.root}>
          <Accordion
            elevation={1}
            className={classes.rootAccordion}
            style={{ borderRadius: 0 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
              className={classes.accordionTitle}
            >
              <Typography variant='h6' className={classes.accordionTypo1}>
                <InboxIcon color='primary' className={classes.accordionIcon} />{' '}
                <span className={classes.accordionSubTypo1}>Products</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ borderTop: '1px solid rgba(86,82,222,0.2)' }}
            >
              <ul className={classes.accordionUl}>
                <li className={classes.accordionLi}>
                  <ArrowRightIcon />
                  &nbsp;
                  <Link href='#!'>
                    <a
                      target='_blank'
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
                  <ArrowRightIcon />
                  &nbsp;
                  <Link href='#!'>
                    <a
                      target='_blank'
                      rel='noreferrer noopener'
                      className={classes.accordionLiLink}
                    >
                      <Typography variant='subtitle1'>Products</Typography>
                    </a>
                  </Link>
                </li>
                <li className={classes.accordionLi}>
                  <ArrowRightIcon />
                  &nbsp;
                  <Link href='#!'>
                    <a
                      target='_blank'
                      rel='noreferrer noopener'
                      className={classes.accordionLiLink}
                    >
                      <Typography variant='subtitle1'>Edit Product</Typography>
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
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
              className={classes.accordionTitle}
            >
              <Typography variant='h6' className={classes.accordionTypo1}>
                <InboxIcon color='primary' className={classes.accordionIcon} />{' '}
                <span className={classes.accordionSubTypo1}>Users</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ borderTop: '1px solid rgba(86,82,222,0.2)' }}
            >
              <ul className={classes.accordionUl}>
                <li className={classes.accordionLi}>
                  <ArrowRightIcon />
                  &nbsp;
                  <Link href='#!'>
                    <a
                      target='_blank'
                      rel='noreferrer noopener'
                      className={classes.accordionLiLink}
                    >
                      <Typography variant='subtitle1'>View Users</Typography>
                    </a>
                  </Link>
                </li>
                <li className={classes.accordionLi}>
                  <ArrowRightIcon />
                  &nbsp;
                  <Link href='#!'>
                    <a
                      target='_blank'
                      rel='noreferrer noopener'
                      className={classes.accordionLiLink}
                    >
                      <Typography variant='subtitle1'>Edit Users</Typography>
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
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
              className={classes.accordionTitle}
            >
              <Typography variant='h6' className={classes.accordionTypo1}>
                <InboxIcon color='primary' className={classes.accordionIcon} />{' '}
                <span className={classes.accordionSubTypo1}>Orders</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ borderTop: '1px solid rgba(86,82,222,0.2)' }}
            >
              <ul className={classes.accordionUl}>
                <li className={classes.accordionLi}>
                  <ArrowRightIcon />
                  &nbsp;
                  <Link href='#!'>
                    <a
                      target='_blank'
                      rel='noreferrer noopener'
                      className={classes.accordionLiLink}
                    >
                      <Typography variant='subtitle1'>View Orders</Typography>
                    </a>
                  </Link>
                </li>
                <li className={classes.accordionLi}>
                  <ArrowRightIcon />
                  &nbsp;
                  <Link href='#!'>
                    <a
                      target='_blank'
                      rel='noreferrer noopener'
                      className={classes.accordionLiLink}
                    >
                      <Typography variant='subtitle1'>Edit Orders</Typography>
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
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
              className={classes.accordionTitle}
            >
              <Typography variant='h6' className={classes.accordionTypo1}>
                <InboxIcon color='primary' className={classes.accordionIcon} />{' '}
                <span className={classes.accordionSubTypo1}>Pages</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ borderTop: '1px solid rgba(86,82,222,0.2)' }}
            >
              <ul className={classes.accordionUl}>
                <li className={classes.accordionLi}>
                  <ArrowRightIcon />
                  &nbsp;
                  <Link href='#!'>
                    <a
                      target='_blank'
                      rel='noreferrer noopener'
                      className={classes.accordionLiLink}
                    >
                      <Typography variant='subtitle1'>Index Page</Typography>
                    </a>
                  </Link>
                </li>
                <li className={classes.accordionLi}>
                  <ArrowRightIcon />
                  &nbsp;
                  <Link href='#!'>
                    <a
                      target='_blank'
                      rel='noreferrer noopener'
                      className={classes.accordionLiLink}
                    >
                      <Typography variant='subtitle1'>Edit Users</Typography>
                    </a>
                  </Link>
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
        </div>
      </Box>
    </>
  );
};

export default DashboardLeft;
