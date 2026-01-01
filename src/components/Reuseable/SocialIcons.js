import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function SocialIcons() {
  const x = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2025/12/Component-4.png";
  const fb = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2025/12/Facebook.png";
  const insta = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2025/12/Component-2.png";
  const linkdin = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2025/12/Component-3.png";
  return (
    <ul className="social-links">
      <motion.li whileHover={{ scale: 0.95 }}>
        <Link href="#" target="_blank">
          <Image src={fb} alt="Facebook" width={40} height={40} />
        </Link>
      </motion.li>
      <motion.li whileHover={{ scale: 0.95 }}>
        <Link href="#" target="_blank">
          <Image src={insta} alt="Instagram" width={40} height={40} />
        </Link>
      </motion.li>
      <motion.li whileHover={{ scale: 0.95 }}>
        <Link href="#" target="_blank">
          <Image src={linkdin} alt="LinkedIn" width={40} height={40} />
        </Link>
      </motion.li>
      <motion.li whileHover={{ scale: 0.95 }}>
        <Link href="#" target="_blank">
          <Image src={x} alt="X" width={40} height={40} />
        </Link>
      </motion.li>
    </ul>
  );
}
