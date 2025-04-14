// UserMenu.tsx
import React from 'react';
import { MenuItemLink, UserMenu as RaUserMenu, UserMenuProps } from "react-admin";
import { Logout } from '@mui/icons-material'; // Icon logout

export const UserMenu: React.FC<UserMenuProps> = (props) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Get user from localStorage

    return (
        <RaUserMenu {...props}>
            {user && <span>Welcome, {user.name}</span>}
            <MenuItemLink
                to="/logout"
                primaryText="Logout"
                leftIcon={<Logout />}
            />
        </RaUserMenu>
    );
};
