import Image from "next/image";
import Link from "next/link";
import FooterLogo from "@/assets/loader-logo.png";
import { Fragment } from "react";
import SocialIcons from "../Reuseable/SocialIcons";

export default function Footer() {
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

            <SocialIcons></SocialIcons>
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
