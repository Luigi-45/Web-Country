import React from 'react';
import { Icon } from '@iconify/react';
import styles from "@/app/page.module.css";

export function SideNav() {

    return (

        <aside className={styles.aside}>
            <div className={styles.logo}>
                <Icon icon="octicon:logo-github-16" fontSize={45} />
                <button className={styles.b_aside}>
                    <Icon icon="material-symbols:arrow-back-ios" fontSize={18} />
                </button>
            </div>
            <hr className={styles.line} />
            <nav className={styles.menu}>
                <a href="#" className={styles.menuItem}><Icon icon="fe:home" fontSize={25} /> HOME</a>
                <a href="#" className={styles.menuItem}><Icon icon="gravity-ui:book" fontSize={25} /> VISTA 1</a>
                <a href="#" className={styles.menuItem}><Icon icon="mdi:flag-variant" fontSize={25} /> VISTA 2</a>
            </nav>
        </aside>

    );
}