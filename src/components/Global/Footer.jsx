import Image from "next/image";
import Link from "next/link";
import FooterLogo from "@/assets/loader-logo.png";
import { Fragment } from "react";

export default function Footer() {
  const x = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2025/12/Component-4.png";
  const fb = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2025/12/Facebook.png";
  const insta = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2025/12/Component-2.png";
  const linkdin = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2025/12/Component-3.png";

  return (
    <Fragment>
      <div className="container-fluid footer">
        <div className="row">
          <div className="col-sm-12 text-center">
            <Image src={FooterLogo} alt="Footer Logo" width={200} height={50} />

            <ul className="footer-links">
              <li>
                <Link href="#">Plan</Link>
              </li>
              <li>
                <Link href="#">Case for Change</Link>
              </li>
              <li>
                <Link href="#">Actions and Impact</Link>
              </li>
              <li>
                <Link href="#">Moving Ahead</Link>
              </li>
              <li>
                <Link href="#">Appendices</Link>
              </li>
            </ul>

            <ul className="social-links">
              <li>
                <Link href="#" target="_blank">
                  <Image src={fb} alt="Facebook" width={24} height={24} />
                </Link>
              </li>
              <li>
                <Link href="#" target="_blank">
                  <Image src={insta} alt="Instagram" width={24} height={24} />
                </Link>
              </li>
              <li>
                <Link href="#" target="_blank">
                  <Image src={linkdin} alt="LinkedIn" width={24} height={24} />
                </Link>
              </li>
              <li>
                <Link href="#" target="_blank">
                  <Image src={x} alt="X" width={24} height={24} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container-fluid copyright">
        <div className="row">
          <div className="col-sm-12">
            <p>© 2024 All rights reserved</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
