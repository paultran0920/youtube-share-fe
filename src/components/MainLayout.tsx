import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  Avatar,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppContext } from '../context/app-context';
import { CustomersSVG } from './images/customers-svg';
import { DashboardSVG } from './images/dashboard-svg';
import DefaultAvatar from './images/default-avatar.png';
import { EmployeesSVG } from './images/employees-svg';
import { FinanceSVG } from './images/finance-svg';
import { InventorySVG } from './images/inventory-svg';
import { ProjectsSVG } from './images/projects-svg';
import { SettingsSVG } from './images/settings-svg';
import { WarrantySVG } from './images/warranty-svg';
import { StyledNavlink } from './shared/styled-components';

interface DrawerItemProps {
  currentKey?: string;
  theme: Theme;
  title: string;
  SVGIcon: any;

  to: string;
  onClick?: (key: string) => void;
}

function isSelected(key?: string, to?: string) {
  if (key === '/' && to === '/') {
    return true;
  } else if (to && to !== '/' && key && key?.startsWith(to)) {
    return true;
  } else {
    return false;
  }
}

function DrawerItem(props: DrawerItemProps) {
  const theme = useTheme();
  return (
    <StyledNavlink to={props.to}>
      <ListItem
        key={props.title}
        disablePadding
        onClick={() => {
          if (props.onClick) {
            props.onClick(props.to);
          }
        }}
        sx={{
          cursor: 'pointer',
        }}
      >
        <ListItem
          sx={{
            color: props.theme.palette.white.main,
            padding: 'unset',
          }}
        >
          <Box
            sx={{
              borderTopLeftRadius: '22px',
              borderBottomLeftRadius: '22px',
              padding: '0.5rem 0.5rem 0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                backgroundColor: props.theme.palette.white.main,
                color: '#F3697E',
              },
              backgroundColor: isSelected(props.currentKey, props.to)
                ? props.theme.palette.white.main
                : 'transparent',
              color: isSelected(props.currentKey, props.to)
                ? '#F3697E'
                : 'inherit',
            }}
            width={'100%'}
          >
            <ListItemIcon
              sx={{
                minWidth: '32px',
                color: 'inherit',
              }}
            >
              <props.SVGIcon />
            </ListItemIcon>
            <ListItemText
              primary={props.title}
              sx={{
                fontWeight: '500',
                fontSize: '14px',
                [theme.breakpoints.down('sm')]: {
                  display: 'none',
                },
              }}
            />
          </Box>
        </ListItem>
      </ListItem>
    </StyledNavlink>
  );
}

export default function MainLayout() {
  const theme = useTheme();
  const appContext = useContext(AppContext);
  const location = useLocation();
  const [key, setKey] = useState('');

  const handleDrawerItemClick = (key: string) => {
    setKey(key);
  };

  useEffect(() => {
    setKey(location.pathname);
  }, [location.pathname]);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh + 32px',
        width: '100%',
      }}
    >
      <Drawer
        sx={{
          width: theme.spacing(24),
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            maxWidth: theme.spacing(24),
            backgroundColor: theme.palette.pink.main,
            border: 'unset',
            boxShadow: '0px 0px 5px grey',
          },
          [theme.breakpoints.down('sm')]: {
            width: theme.spacing(8),
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            padding: '16px 8px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <StyledNavlink to="/settings">
            <Avatar
              alt="default"
              src={
                appContext.contextData.currentUser?.profile.avatarUrl ||
                DefaultAvatar
              }
              sx={{
                width: '48px',
                height: '48px',
                border: '1px solid',
                color: theme.palette.pink.contrastText,
                boxShadow: '2px 2px 5px lightgrey',
              }}
            />
          </StyledNavlink>

          <StyledNavlink to="/notifications">
            <Badge
              color="primary"
              badgeContent={(appContext.contextData.notifications || []).length}
              max={9}
              sx={{
                [theme.breakpoints.down('sm')]: {
                  display: 'none',
                },
              }}
            >
              <NotificationsIcon
                sx={{
                  color: theme.palette.white.main,
                  width: '28px',
                  height: '28px',
                }}
              />
            </Badge>
          </StyledNavlink>
        </Box>
        <List
          sx={{
            paddingLeft: '8px',
          }}
        >
          <DrawerItem
            theme={theme}
            title={'Dashboard'}
            SVGIcon={DashboardSVG}
            onClick={handleDrawerItemClick}
            currentKey={key}
            to="/"
          />
          <DrawerItem
            theme={theme}
            title={'Shared Videos'}
            SVGIcon={ProjectsSVG}
            onClick={handleDrawerItemClick}
            currentKey={key}
            to="/shared-videos"
          />
          <DrawerItem
            theme={theme}
            title={'Other Feature 1'}
            SVGIcon={CustomersSVG}
            onClick={handleDrawerItemClick}
            currentKey={key}
            to="/other-feature-1"
          />
          <DrawerItem
            theme={theme}
            title={'Other Feature 2'}
            SVGIcon={EmployeesSVG}
            onClick={handleDrawerItemClick}
            currentKey={key}
            to="/other-feature-2"
          />
          <DrawerItem
            theme={theme}
            title={'Other Feature 3'}
            SVGIcon={WarrantySVG}
            onClick={handleDrawerItemClick}
            currentKey={key}
            to="/other-feature-3"
          />
          <DrawerItem
            theme={theme}
            title={'Other Feature 4'}
            SVGIcon={InventorySVG}
            onClick={handleDrawerItemClick}
            currentKey={key}
            to="/other-feature-4"
          />
          <DrawerItem
            theme={theme}
            title={'Other Feature 5'}
            SVGIcon={FinanceSVG}
            onClick={handleDrawerItemClick}
            currentKey={key}
            to="/other-feature-5"
          />
          <DrawerItem
            theme={theme}
            title={'Settings'}
            SVGIcon={SettingsSVG}
            onClick={handleDrawerItemClick}
            currentKey={key}
            to="/settings"
          />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
