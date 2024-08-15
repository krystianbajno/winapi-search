import React from 'react';
import styles from "@/app/components/useful-links/useful-links.module.scss";

interface UsefulLinksProps {
  links: { name: string; href: string }[];
}

const UsefulLinks: React.FC<UsefulLinksProps> = ({ links }) => {
  return (
    <div className={styles.usefulLinks}>
      {links.map((link, index) => (
        <a className={styles.link} key={`${link}-${index}`} href={link.href}>
          @ {link.name}
        </a>
      ))}
    </div>
  );
};

export default UsefulLinks;
