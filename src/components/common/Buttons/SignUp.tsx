import { Button } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { BiSolidLockOpen } from "react-icons/bi";

interface ButtonProps {
  location?: string;
}

export default function SignUp(props: ButtonProps) {
  const { location } = props;
  const [, setCookie] = useCookies(["redirect_page", "dj_page"]);
  return (
    <>
      <Button
        colorScheme="purple"
        leftIcon={<BiSolidLockOpen />}
        onClick={() => {
          let href = window.location.href.toString();
          setCookie("dj_page", href.indexOf("artist") > 0 ? href.split("/").pop()?.split("?")[0] : "", {
            path: "/",
            domain: ".djfan.app",
          });
          setCookie("redirect_page", href, {
            path: "/",
            domain: ".djfan.app",
          });
          if (window["google_tag_manager"]) {
            window.dataLayer.push({
              event: "signup_start",
              referer_dj: href.toString().split("/").pop()?.split("?")[0],
              element: "create_free_account_btn",
              user_type: "fan",
              eventTimeout: 1000,
              eventCallback: function (id: string) {
                if (id == "GTM-MXLNMK2") {
                  window.open(import.meta.env.VITE_DJFAN_SIGN_UP_URL, "_self");
                }
              },
            });
          } else {
            window.open(import.meta.env.VITE_DJFAN_SIGN_UP_URL, "_self");
          }
        }}
      >
        Sign up for free
      </Button>
    </>
  );
}
