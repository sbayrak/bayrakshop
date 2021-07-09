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
  Button,
  TextField,
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
import DashboardLeft from '../../../components/dashboard/DashboardLeft';
// @@@ nextjs @@@

const useStyles = makeStyles((theme) => ({}));

const Home = () => {
  const classes = useStyles();
  return <>hi</>;
};

export default Home;
