'use client';
import React from 'react';
import { useState } from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react';
import styles from "@/app/page.module.css";
import { usePathname } from 'next/navigation';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { navItems } from './config';
import { navIcons } from './nav-icons';

export function SideNav() {
    const pathname = usePathname();

    const renderNavItems = ({ items = [], pathname }) => {
        const children = items.reduce((acc, curr) => {
            const { key, title, ...item } = curr;

            acc.push(<NavItem key={key} pathname={pathname} title={title} {...item} />);

            return acc;
        }, []);

        return (
            <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {children}
            </Stack>
        );
    };

    function NavItem({ disabled, external, href, icon, matcher, pathname, title }) {
        const active = isNavItemActive({ disabled, external, href, matcher, pathname });
        const IconName = icon ? navIcons[icon] : null;
        const [redirected, setRedirected] = useState(false);

        const handleRedirect = () => {
            if (href) {
                setRedirected(true);
            }
        };

        const [open, setOpen] = useState(false);

        const handleClick = () => {
            setOpen(!open);
        };

        return (
            <li>
                <Box
                    {...(href
                        ? {
                            component: external ? 'a' : RouterLink,
                            href,
                            target: external ? '_blank' : undefined,
                            rel: external ? 'noreferrer' : undefined,
                            onClick: () => setRedirected(false),
                        }
                        : { role: 'button' })} className={`${styles.menuItem} ${active ? styles.active : ''}`}
                >
                    <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
                        {IconName ? (
                            <Icon
                                icon= {IconName}
                                fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
                                fontSize="25"
                                weight={active ? 'fill' : undefined}
                            />
                        ) : null}
                    </Box>
                    <Box sx={{ flex: '1 1 auto' }}>
                        <Typography
                            component="span"
                            sx={{ color: 'inherit', fontSize: '16px', fontWeight: 500, lineHeight: '28px' }}
                        >
                            {title}
                        </Typography>
                    </Box>
                </Box>
            </li>
        );
    }

    return (

        <aside className={styles.aside}>
            <div className={styles.logo}>
                <Icon icon="octicon:logo-github-16" fontSize={45} />
                <button className={styles.b_aside}>
                    <Icon icon="material-symbols:arrow-back-ios" fontSize={18} />
                </button>
            </div>
            <hr className={styles.line} />
            <Box component="nav" className={styles.menu}>
                {renderNavItems({ pathname, items: navItems })}
            </Box>
        </aside>

    );
}